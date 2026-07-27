# -*- coding: utf-8 -*-
"""
apps.admin_panel.views.admin - 管理后台 视图

所有后台接口允许教师（type=1）或管理员（type=4）访问。
使用 ViewSet 实现 CRUD，使用 APIView 实现仪表盘统计。
"""

import uuid
import json
import logging
from datetime import datetime, timedelta
from pathlib import Path
from urllib.error import URLError, HTTPError
from urllib.request import Request, urlopen

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import connection
from django.db.models import Q
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from apps.accounts.models import TbUser
from apps.common.models import TbSchoolInfo
from apps.courses.models import TbCurriculum, TbExperiment
from apps.home.models import TbViewpager
from apps.news.models import News
from apps.payments.models import Orders
from apps.admin_panel.models import AiVrCourseContent
from apps.admin_panel.ai_vr_serializers import AiVrCourseContentSerializer
from apps.admin_panel.user_deletion import delete_user_with_history

from apps.admin_panel.serializers import (
    AdminExperimentSerializer,
    AdminNewsSerializer,
    AdminNewsWriteSerializer,
    AdminSchoolCreateSerializer,
    AdminSchoolSerializer,
    AdminUserCreateSerializer,
    AdminUserSerializer,
    AdminUserUpdateSerializer,
    AdminViewpagerSerializer,
    AdminViewpagerWriteSerializer,
    DashboardSerializer,
)

from utils.pagination import StandardPagination
from utils.permissions import IsTeacherOrAdmin


logger = logging.getLogger(__name__)


def _convert_ppt_to_pdf(ppt_path: Path):
    """Create a browser-previewable PDF next to an uploaded PowerPoint file."""
    pdf_path = ppt_path.with_suffix('.pdf')
    powerpoint = None
    presentation = None
    try:
        import pythoncom
        import win32com.client

        pythoncom.CoInitialize()
        powerpoint = win32com.client.DispatchEx('PowerPoint.Application')
        presentation = powerpoint.Presentations.Open(
            str(ppt_path.resolve()),
            ReadOnly=True,
            Untitled=False,
            WithWindow=False,
        )
        presentation.SaveAs(str(pdf_path.resolve()), 32)
        return pdf_path if pdf_path.exists() else None
    except Exception as exc:
        logger.warning('Unable to create PPT PDF preview for %s: %s', ppt_path, exc)
        return None
    finally:
        if presentation is not None:
            try:
                presentation.Close()
            except Exception:
                pass
        if powerpoint is not None:
            try:
                powerpoint.Quit()
            except Exception:
                pass
        try:
            import pythoncom
            pythoncom.CoUninitialize()
        except Exception:
            pass


# ============================================================================
# 用户管理
# ============================================================================

class UserManageViewSet(ModelViewSet):
    """
    用户管理

    list    GET    /api/v1/admin/users/        - 用户列表（分页，支持搜索）
    create  POST   /api/v1/admin/users/        - 创建用户
    retrieve GET   /api/v1/admin/users/{id}/   - 用户详情
    update  PUT    /api/v1/admin/users/{id}/   - 编辑用户
    destroy DELETE /api/v1/admin/users/{id}/   - 删除用户
    """

    queryset = TbUser.objects.all()
    permission_classes = [IsTeacherOrAdmin]
    pagination_class = StandardPagination
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.action == 'create':
            return AdminUserCreateSerializer
        if self.action in ('update', 'partial_update'):
            return AdminUserUpdateSerializer
        return AdminUserSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # 搜索支持
        search = self.request.query_params.get('search', '').strip()
        if search:
            from django.db.models import Q
            qs = qs.filter(
                Q(username__icontains=search)
                | Q(name__icontains=search)
                | Q(telephone__icontains=search)
            )
        # 按类型过滤
        user_type = self.request.query_params.get('type')
        if user_type:
            qs = qs.filter(type=user_type)
        return qs.order_by('-createTime')

    def perform_create(self, serializer):
        # 从 validated_data 中拿出字段
        validated = serializer.validated_data.copy()
        validated['id'] = str(uuid.uuid4()).replace('-', '')[:32]
        if validated.get('password'):
            validated['password'] = make_password(validated['password'])
        validated['createTime'] = timezone.now()
        serializer.save(**validated)

    def perform_update(self, serializer):
        data = serializer.validated_data
        # 如果提供了密码，加密
        if data.get('password'):
            data['password'] = make_password(data['password'])
        else:
            data.pop('password', None)
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        username = user.username or user.name or str(user.pk)
        result = delete_user_with_history(user)
        return Response({
            'message': f'用户“{username}”及关联历史数据已删除',
            'details': result,
        }, status=status.HTTP_200_OK)


# ============================================================================
# 实验管理
# ============================================================================

class ExperimentManageViewSet(ModelViewSet):
    """
    实验管理

    list    GET    /api/v1/admin/experiments/        - 实验列表
    create  POST   /api/v1/admin/experiments/        - 创建实验
    retrieve GET   /api/v1/admin/experiments/{id}/   - 实验详情
    update  PUT    /api/v1/admin/experiments/{id}/   - 编辑实验
    destroy DELETE /api/v1/admin/experiments/{id}/   - 删除实验
    """

    queryset = TbExperiment.objects.all()
    serializer_class = AdminExperimentSerializer
    permission_classes = [IsTeacherOrAdmin]
    pagination_class = StandardPagination
    lookup_field = 'pk'

    def get_queryset(self):
        qs = super().get_queryset()
        # 搜索
        search = self.request.query_params.get('search', '').strip()
        if search:
            from django.db.models import Q
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(publisher__icontains=search)
            )
        return qs.order_by('-createTime')

    def perform_create(self, serializer):
        serializer.save(createTime=timezone.now())

    def perform_update(self, serializer):
        serializer.save()


# ============================================================================
# 学校管理
# ============================================================================

class SchoolManageViewSet(ModelViewSet):
    """
    学校管理

    list    GET    /api/v1/admin/schools/        - 学校列表
    create  POST   /api/v1/admin/schools/        - 创建学校
    retrieve GET   /api/v1/admin/schools/{id}/   - 学校详情
    update  PUT    /api/v1/admin/schools/{id}/   - 编辑学校
    destroy DELETE /api/v1/admin/schools/{id}/   - 删除学校
    """

    queryset = TbSchoolInfo.objects.all()
    permission_classes = [IsTeacherOrAdmin]
    pagination_class = StandardPagination
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return AdminSchoolCreateSerializer
        return AdminSchoolSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(name__icontains=search)
        return qs.order_by('-createTime')

    def perform_create(self, serializer):
        # 生成 ID（若未提供）
        data = serializer.validated_data
        if not data.get('id'):
            data['id'] = str(uuid.uuid4()).replace('-', '')[:32]
        data['createTime'] = timezone.now()
        serializer.save(**data)

    def perform_update(self, serializer):
        serializer.save()


# ============================================================================
# 轮播图管理
# ============================================================================

class ViewpagerManageViewSet(ModelViewSet):
    """
    轮播图管理

    list    GET    /api/v1/admin/viewpagers/        - 轮播图列表
    create  POST   /api/v1/admin/viewpagers/        - 创建轮播图
    retrieve GET   /api/v1/admin/viewpagers/{id}/   - 轮播图详情
    update  PUT    /api/v1/admin/viewpagers/{id}/   - 编辑轮播图
    destroy DELETE /api/v1/admin/viewpagers/{id}/   - 删除轮播图
    """

    queryset = TbViewpager.objects.all()
    permission_classes = [IsTeacherOrAdmin]
    pagination_class = StandardPagination
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return AdminViewpagerWriteSerializer
        return AdminViewpagerSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.order_by('sortOrder')

    def perform_create(self, serializer):
        data = serializer.validated_data
        if not data.get('id'):
            data['id'] = str(uuid.uuid4()).replace('-', '')[:32]
        data['createTime'] = timezone.now()
        serializer.save(**data)

    def perform_update(self, serializer):
        serializer.save()


# ============================================================================
# 新闻管理
# ============================================================================

class NewsManageViewSet(ModelViewSet):
    """
    新闻管理

    list    GET    /api/v1/admin/news/        - 新闻列表
    create  POST   /api/v1/admin/news/        - 创建新闻
    retrieve GET   /api/v1/admin/news/{id}/   - 新闻详情
    update  PUT    /api/v1/admin/news/{id}/   - 编辑新闻
    destroy DELETE /api/v1/admin/news/{id}/   - 删除新闻
    """

    queryset = News.objects.all()
    permission_classes = [IsTeacherOrAdmin]
    pagination_class = StandardPagination
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return AdminNewsWriteSerializer
        return AdminNewsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(title__icontains=search)
        return qs.order_by('-priority', '-time')

    def perform_create(self, serializer):
        data = serializer.validated_data
        data['time'] = timezone.now()
        # news.userid 是 int 类型，取不到整数ID时用 0
        try:
            uid = int(self.request.user.id)
        except (ValueError, TypeError):
            uid = 0
        data['userid'] = uid
        serializer.save(**data)

    def perform_update(self, serializer):
        serializer.save()


# ============================================================================
# 仪表盘统计
# ============================================================================

class DashboardView(APIView):
    """
    仪表盘统计

    GET /api/v1/admin/dashboard/
    """

    permission_classes = [IsTeacherOrAdmin]

    def get(self, request):
        today = timezone.localdate()
        has_orders_table = Orders._meta.db_table in connection.introspection.table_names()
        serializer = DashboardSerializer(data={
            'userCount': TbUser.objects.count(),
            'courseCount': TbCurriculum.objects.count(),
            'experimentCount': TbExperiment.objects.count(),
            'orderCount': Orders.objects.count() if has_orders_table else 0,
            'todayNewUsers': TbUser.objects.filter(createTime__date=today).count(),
            'todayOrders': Orders.objects.filter(createTime__date=today).count() if has_orders_table else 0,
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class AiVrCourseContentViewSet(ModelViewSet):
    """Manage AI+VR course resources and expose the course tree."""

    queryset = AiVrCourseContent.objects.all()
    serializer_class = AiVrCourseContentSerializer
    pagination_class = StandardPagination
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    lookup_field = 'pk'

    def get_permissions(self):
        return [IsTeacherOrAdmin()]

    def get_queryset(self):
        qs = super().get_queryset()
        curriculum_name = self.request.query_params.get('curriculumName', '').strip()
        curriculum_id = self.request.query_params.get('curriculumId', '').strip()
        resource_type = self.request.query_params.get('resourceType', '').strip()
        search = self.request.query_params.get('search', '').strip()

        if curriculum_name:
            qs = qs.filter(curriculum_name=curriculum_name)
        if curriculum_id:
            qs = qs.filter(curriculum_id=curriculum_id)
        if resource_type:
            qs = qs.filter(resource_type=resource_type)
        if search:
            qs = qs.filter(
                Q(curriculum_name__icontains=search)
                | Q(chapter_title__icontains=search)
                | Q(section_title__icontains=search)
                | Q(title__icontains=search)
            )
        return qs.order_by('chapter_order', 'section_order', 'resource_type', 'sort_order', 'create_time')

    @action(detail=False, methods=['get'], url_path='course')
    def course(self, request):
        curriculum_name = request.query_params.get('curriculumName', '').strip()
        curriculum_id = request.query_params.get('curriculumId', '').strip()
        if not curriculum_name and not curriculum_id:
            return Response({'detail': 'curriculumName 或 curriculumId 必填'}, status=status.HTTP_400_BAD_REQUEST)

        qs = AiVrCourseContent.objects.filter(enabled=True)
        if curriculum_id:
            qs = qs.filter(curriculum_id=curriculum_id)
        if curriculum_name:
            qs = qs.filter(curriculum_name=curriculum_name)
        qs = qs.order_by('chapter_order', 'section_order', 'resource_type', 'sort_order', 'create_time')

        chapters = []
        chapter_map = {}
        section_map = {}

        for item in qs:
            chapter_key = (item.chapter_order, item.chapter_title)
            if chapter_key not in chapter_map:
                chapter = {
                    'title': item.chapter_title,
                    'defaultOpen': item.chapter_order == 0,
                    'children': [],
                }
                chapter_map[chapter_key] = chapter
                chapters.append(chapter)

            section_key = (chapter_key, item.section_order, item.section_title)
            if section_key not in section_map:
                section = {
                    'title': item.section_title,
                    'defaultOpen': item.section_order == 0,
                    'resources': {
                        'video': [],
                        'ppt': [],
                        'test': [],
                        'correct': [],
                        'ai': [],
                        'vr': [],
                    },
                    'pptUrl': '',
                    'videoUrl': '',
                    'testUrl': '',
                    'correctUrl': '',
                    'aiUrl': '',
                    'vrUrl': '',
                }
                section_map[section_key] = section
                chapter_map[chapter_key]['children'].append(section)

            section = section_map[section_key]
            field_name = f'{item.resource_type}Url'
            existing = section.get(field_name, '')
            url = item.url.strip()
            section['resources'][item.resource_type].append({
                'id': item.id,
                'type': item.resource_type,
                'title': item.title or item.section_title,
                'description': item.description,
                'url': url,
            })
            if url:
                section[field_name] = f'{existing};{url}' if existing else url

        return Response({
            'intro': {
                'title': '课程概述',
                'content': '',
                'goals': [],
                'references': [],
            },
            'chapters': chapters,
        })

    @action(detail=False, methods=['post'], url_path='upload')
    def upload(self, request):
        uploaded_file = request.FILES.get('file')
        file_type = request.data.get('type', 'other') or 'other'
        if not uploaded_file:
            return Response({'detail': '请选择上传文件'}, status=status.HTTP_400_BAD_REQUEST)

        ext = Path(uploaded_file.name).suffix.lower()
        unique_name = f'{uuid.uuid4().hex}{ext}'
        upload_subdir = Path('uploads') / 'ai-vr' / file_type
        upload_dir = settings.MEDIA_ROOT / upload_subdir
        upload_dir.mkdir(parents=True, exist_ok=True)
        dest_path = upload_dir / unique_name

        with open(dest_path, 'wb') as dest:
            for chunk in uploaded_file.chunks():
                dest.write(chunk)

        source_url = f'{settings.MEDIA_URL}{upload_subdir.as_posix()}/{unique_name}'
        preview_path = _convert_ppt_to_pdf(dest_path) if ext in {'.ppt', '.pptx'} else None
        file_url = (
            f'{settings.MEDIA_URL}{upload_subdir.as_posix()}/{preview_path.name}'
            if preview_path
            else source_url
        )
        return Response({
            'url': file_url,
            'sourceUrl': source_url,
            'fileName': uploaded_file.name,
            'fileType': file_type,
            'previewReady': bool(preview_path) if ext in {'.ppt', '.pptx'} else True,
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='assistant')
    def assistant(self, request):
        question = str(request.data.get('question', '')).strip()
        curriculum_name = str(request.data.get('curriculumName', '')).strip()
        curriculum_id = str(request.data.get('curriculumId', '')).strip()
        if not question:
            return Response({'detail': '请输入问题'}, status=status.HTTP_400_BAD_REQUEST)

        recommendations = self._recommend_courses(question, curriculum_name, curriculum_id)
        fallback_answer = self._fallback_ai_answer(question, recommendations)
        answer = self._call_llm(question, curriculum_name, recommendations) or fallback_answer

        return Response({
            'answer': answer,
            'recommendations': recommendations,
            'llmEnabled': bool(getattr(settings, 'AI_ASSISTANT_API_KEY', '')),
        })

    def _recommend_courses(self, question, curriculum_name='', curriculum_id=''):
        keywords = self._tokenize_question(question)
        candidates = []

        course_qs = TbCurriculum.objects.all()
        if curriculum_id:
            course_qs = course_qs.filter(id=curriculum_id)
        elif curriculum_name:
            course_qs = course_qs.filter(
                Q(curriculumName__icontains=curriculum_name) | Q(curriculumName__icontains=question)
            )
        else:
            name_query = Q()
            for word in keywords[:8]:
                name_query |= Q(curriculumName__icontains=word)
            if keywords:
                course_qs = course_qs.filter(name_query)
        for course in course_qs[:12]:
            score = self._match_score(question, keywords, course.curriculumName or '')
            candidates.append({
                'id': course.id,
                'title': course.curriculumName or '',
                'type': 'course',
                'reason': '课程名称与问题相关' if score else '当前课程',
                'score': score + (10 if curriculum_id and str(course.id) == curriculum_id else 0),
            })

        content_qs = AiVrCourseContent.objects.filter(enabled=True)
        if curriculum_id:
            content_qs = content_qs.filter(curriculum_id=curriculum_id)
        if curriculum_name:
            content_qs = content_qs.filter(curriculum_name=curriculum_name)
        text_query = Q()
        for word in keywords[:10]:
            text_query |= (
                Q(curriculum_name__icontains=word)
                | Q(chapter_title__icontains=word)
                | Q(section_title__icontains=word)
                | Q(title__icontains=word)
                | Q(description__icontains=word)
            )
        if keywords:
            content_qs = content_qs.filter(text_query)
        for item in content_qs.order_by('chapter_order', 'section_order', 'sort_order')[:20]:
            haystack = ' '.join([
                item.curriculum_name,
                item.chapter_title,
                item.section_title,
                item.title,
                item.description,
            ])
            score = self._match_score(question, keywords, haystack)
            candidates.append({
                'id': item.curriculum_id or item.id,
                'title': item.title or item.section_title,
                'courseName': item.curriculum_name,
                'chapterTitle': item.chapter_title,
                'sectionTitle': item.section_title,
                'type': item.resource_type,
                'reason': item.description[:80] if item.description else '与问题关键词匹配',
                'score': score,
            })

        if not candidates and not curriculum_id:
            for course in TbCurriculum.objects.all().order_by('sortOrder', '-createTime')[:5]:
                candidates.append({
                    'id': course.id,
                    'title': course.curriculumName or '',
                    'type': 'course',
                    'reason': '可从该课程开始查找相关内容',
                    'score': 0,
                })

        candidates.sort(key=lambda item: item.get('score', 0), reverse=True)
        return [{key: value for key, value in item.items() if key != 'score'} for item in candidates[:5]]

    def _tokenize_question(self, question):
        normalized = ''.join(ch if ch.isalnum() or '\u4e00' <= ch <= '\u9fff' else ' ' for ch in question)
        words = [word.strip() for word in normalized.lower().split() if len(word.strip()) > 1]
        chinese_chunks = [normalized[i:i + 2] for i in range(max(len(normalized) - 1, 0)) if '\u4e00' <= normalized[i] <= '\u9fff']
        return list(dict.fromkeys(words + chinese_chunks))

    def _match_score(self, question, keywords, text):
        text_lower = (text or '').lower()
        score = 0
        for word in keywords:
            if word and word in text_lower:
                score += len(word)
        if question.lower() in text_lower:
            score += 20
        return score

    def _fallback_ai_answer(self, question, recommendations):
        if recommendations:
            names = '、'.join(item.get('sectionTitle') or item.get('title') or item.get('courseName', '') for item in recommendations[:3])
            return f'可以先围绕“{question}”查看这些相关内容：{names}。建议先看带你学里的视频或PPT，再进入陪你练巩固，最后用帮你改检查掌握情况。'
        return f'已收到你的问题：“{question}”。当前还没有匹配到明确课程内容，可以换一个更具体的知识点、章节名或课程名再问。'

    def _call_llm(self, question, curriculum_name, recommendations):
        api_key = getattr(settings, 'AI_ASSISTANT_API_KEY', '')
        if not api_key:
            return ''

        endpoint = getattr(settings, 'AI_ASSISTANT_BASE_URL', 'https://api.openai.com/v1').rstrip('/') + '/chat/completions'
        model = getattr(settings, 'AI_ASSISTANT_MODEL', 'gpt-4o-mini')
        context = json.dumps(recommendations, ensure_ascii=False)
        payload = {
            'model': model,
            'messages': [
                {
                    'role': 'system',
                    'content': '你是科明365 AI+VR课程智能体。回答要简洁、面向学习者，并根据给出的课程候选推荐相应课程、章节或资源。'
                },
                {
                    'role': 'user',
                    'content': f'当前课程：{curriculum_name or "未指定"}\n学生问题：{question}\n候选课程内容：{context}'
                }
            ],
            'temperature': 0.2,
        }
        data = json.dumps(payload).encode('utf-8')
        request = Request(
            endpoint,
            data=data,
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json',
            },
            method='POST',
        )
        try:
            with urlopen(request, timeout=getattr(settings, 'AI_ASSISTANT_TIMEOUT', 20)) as response:
                result = json.loads(response.read().decode('utf-8'))
            return result.get('choices', [{}])[0].get('message', {}).get('content', '').strip()
        except (HTTPError, URLError, TimeoutError, KeyError, ValueError):
            return ''


class PublicAiVrCourseContentViewSet(AiVrCourseContentViewSet):
    """Read-only learning endpoints kept outside the admin URL namespace."""

    def get_permissions(self):
        if self.action == 'course':
            return [AllowAny()]
        if self.action == 'assistant':
            return [IsAuthenticated()]
        return [IsTeacherOrAdmin()]
