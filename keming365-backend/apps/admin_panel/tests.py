"""Tests for admin dashboard access, statistics, and shared pagination."""

from types import SimpleNamespace
from unittest.mock import patch

from django.test import SimpleTestCase, TestCase
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.admin_panel.models import AiVrCourseContent
from apps.admin_panel.serializers import AdminUserCreateSerializer
from apps.admin_panel.views.admin import (
    AiVrCourseContentViewSet,
    DashboardView,
    PublicAiVrCourseContentViewSet,
    UserManageViewSet,
)
from utils.pagination import StandardPagination


def authenticated_user(user_type):
    return SimpleNamespace(
        id=f'user-{user_type}',
        type=user_type,
        expireTime=None,
        is_authenticated=True,
    )


class DashboardViewTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def get_dashboard(self, user=None):
        request = self.factory.get('/api/v1/admin/dashboard/')
        if user is not None:
            force_authenticate(request, user=user)
        return DashboardView.as_view()(request)

    def test_anonymous_and_student_requests_are_rejected(self):
        self.assertEqual(self.get_dashboard().status_code, 401)
        self.assertEqual(self.get_dashboard(authenticated_user(2)).status_code, 403)

    @patch('apps.admin_panel.views.admin.Orders.objects.filter')
    @patch('apps.admin_panel.views.admin.TbUser.objects.filter')
    @patch('apps.admin_panel.views.admin.Orders.objects.count', return_value=9)
    @patch('apps.admin_panel.views.admin.TbExperiment.objects.count', return_value=30)
    @patch('apps.admin_panel.views.admin.TbCurriculum.objects.count', return_value=20)
    @patch('apps.admin_panel.views.admin.TbUser.objects.count', return_value=10)
    @patch('apps.admin_panel.views.admin.connection.introspection.table_names', return_value=['orders'])
    def test_admin_receives_database_counts(
        self,
        _table_names,
        _user_count,
        _course_count,
        _experiment_count,
        _order_count,
        user_filter,
        order_filter,
    ):
        user_filter.return_value.count.return_value = 2
        order_filter.return_value.count.return_value = 3

        response = self.get_dashboard(authenticated_user(4))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'userCount': 10,
            'courseCount': 20,
            'experimentCount': 30,
            'orderCount': 9,
            'todayNewUsers': 2,
            'todayOrders': 3,
        })

    @patch('apps.admin_panel.views.admin.Orders.objects.filter')
    @patch('apps.admin_panel.views.admin.Orders.objects.count')
    @patch('apps.admin_panel.views.admin.TbUser.objects.filter')
    @patch('apps.admin_panel.views.admin.TbExperiment.objects.count', return_value=30)
    @patch('apps.admin_panel.views.admin.TbCurriculum.objects.count', return_value=20)
    @patch('apps.admin_panel.views.admin.TbUser.objects.count', return_value=10)
    @patch('apps.admin_panel.views.admin.connection.introspection.table_names', return_value=[])
    def test_admin_receives_zero_when_orders_table_is_absent(
        self,
        _table_names,
        _user_count,
        _course_count,
        _experiment_count,
        user_filter,
        order_count,
        order_filter,
    ):
        user_filter.return_value.count.return_value = 1

        response = self.get_dashboard(authenticated_user(4))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['orderCount'], 0)
        self.assertEqual(response.data['todayOrders'], 0)
        order_count.assert_not_called()
        order_filter.assert_not_called()


class AdminApiPermissionMatrixTests(SimpleTestCase):
    ROLE_CASES = (
        ('anonymous', None),
        ('student', 2),
        ('teacher', 1),
        ('admin', 4),
    )

    def setUp(self):
        self.factory = APIRequestFactory()

    def assert_matrix(self, endpoint, view, request_factory, expected):
        for role, user_type in self.ROLE_CASES:
            with self.subTest(endpoint=endpoint, role=role):
                request = request_factory()
                if user_type is not None:
                    force_authenticate(request, user=authenticated_user(user_type))
                self.assertEqual(view(request).status_code, expected[user_type])

    def test_admin_namespace_permission_matrix(self):
        expected = {None: 401, 2: 403, 1: 403, 4: 200}
        cases = (
            (
                'dashboard',
                patch.object(DashboardView, 'get', return_value=Response({})),
                lambda: DashboardView.as_view(),
                lambda: self.factory.get('/api/v1/admin/dashboard/'),
            ),
            (
                'users',
                patch.object(UserManageViewSet, 'list', return_value=Response([])),
                lambda: UserManageViewSet.as_view({'get': 'list'}),
                lambda: self.factory.get('/api/v1/admin/users/'),
            ),
            (
                'ai_vr_contents',
                patch.object(AiVrCourseContentViewSet, 'list', return_value=Response([])),
                lambda: AiVrCourseContentViewSet.as_view({'get': 'list'}),
                lambda: self.factory.get('/api/v1/admin/ai-vr/'),
            ),
            (
                'admin_ai_vr_course',
                patch.object(AiVrCourseContentViewSet, 'course', return_value=Response({'chapters': []})),
                lambda: AiVrCourseContentViewSet.as_view({'get': 'course'}),
                lambda: self.factory.get('/api/v1/admin/ai-vr/course/'),
            ),
            (
                'admin_ai_vr_assistant',
                patch.object(AiVrCourseContentViewSet, 'assistant', return_value=Response({'answer': ''})),
                lambda: AiVrCourseContentViewSet.as_view({'post': 'assistant'}),
                lambda: self.factory.post('/api/v1/admin/ai-vr/assistant/', {'question': 'test'}, format='json'),
            ),
        )

        for endpoint, handler_patch, view_factory, request_factory in cases:
            with handler_patch:
                self.assert_matrix(endpoint, view_factory(), request_factory, expected)

    def test_public_ai_vr_permission_matrix(self):
        cases = (
            (
                'public_course',
                patch.object(PublicAiVrCourseContentViewSet, 'course', return_value=Response({'chapters': []})),
                PublicAiVrCourseContentViewSet.as_view({'get': 'course'}),
                lambda: self.factory.get('/api/v1/ai-vr/course/'),
                {None: 200, 2: 200, 1: 200, 4: 200},
            ),
            (
                'public_assistant',
                patch.object(PublicAiVrCourseContentViewSet, 'assistant', return_value=Response({'answer': ''})),
                PublicAiVrCourseContentViewSet.as_view({'post': 'assistant'}),
                lambda: self.factory.post('/api/v1/ai-vr/assistant/', {'question': 'test'}, format='json'),
                {None: 401, 2: 200, 1: 200, 4: 200},
            ),
        )

        for endpoint, handler_patch, view, request_factory, expected in cases:
            with handler_patch:
                self.assert_matrix(endpoint, view, request_factory, expected)


class StandardPaginationTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_page_and_page_size_are_applied(self):
        request = Request(self.factory.get('/items/', {'page': 2, 'page_size': 3}))
        paginator = StandardPagination()

        page = paginator.paginate_queryset(list(range(8)), request)
        response = paginator.get_paginated_response(page)

        self.assertEqual(page, [3, 4, 5])
        self.assertEqual(response.data['count'], 8)
        self.assertIsNotNone(response.data['next'])
        self.assertIsNotNone(response.data['previous'])

    def test_page_size_is_limited_to_one_hundred(self):
        request = Request(self.factory.get('/items/', {'page_size': 1000}))
        paginator = StandardPagination()

        page = paginator.paginate_queryset(list(range(150)), request)

        self.assertEqual(len(page), 100)


class AdminUserManagementValidationTests(TestCase):
    @patch('apps.admin_panel.serializers.TbUser.objects.filter')
    def test_create_validates_duplicate_username_and_field_lengths(self, user_filter):
        user_filter.return_value.exists.return_value = True
        duplicate = AdminUserCreateSerializer(data={
            'username': 'existing',
            'password': 'password-123',
            'name': '测试用户',
            'type': 2,
        })
        self.assertFalse(duplicate.is_valid())
        self.assertIn('username', duplicate.errors)

        user_filter.return_value.exists.return_value = False
        long_name = AdminUserCreateSerializer(data={
            'username': 'new-user',
            'password': 'password-123',
            'name': '一' * 21,
            'type': 2,
        })
        self.assertFalse(long_name.is_valid())
        self.assertIn('name', long_name.errors)

    @patch('apps.admin_panel.serializers.TbUser.objects.filter')
    def test_temporary_admin_requires_future_expiry(self, user_filter):
        user_filter.return_value.exists.return_value = False
        serializer = AdminUserCreateSerializer(data={
            'username': 'temporary-admin',
            'password': 'password-123',
            'name': '临时管理员',
            'type': 8,
        })
        self.assertFalse(serializer.is_valid())
        self.assertIn('expireTime', serializer.errors)

    def test_current_user_cannot_be_deleted(self):
        target = SimpleNamespace(id='user-4', username='admin', type=4)
        view = UserManageViewSet.as_view({'delete': 'destroy'})
        request = APIRequestFactory().delete('/api/v1/admin/users/user-4/')
        force_authenticate(request, user=authenticated_user(4))
        with patch.object(UserManageViewSet, 'get_object', return_value=target):
            response = view(request, pk='user-4')
        self.assertEqual(response.status_code, 400)

    def test_current_user_cannot_disable_or_change_own_role(self):
        view = UserManageViewSet()
        view.request = SimpleNamespace(user=authenticated_user(8))
        target = SimpleNamespace(id='user-8', username='temporary-admin', type=8)

        for changes in ({'enabled': False}, {'type': 4}):
            with self.subTest(changes=changes):
                serializer = SimpleNamespace(
                    instance=target,
                    validated_data=dict(changes),
                )
                with self.assertRaisesMessage(ValidationError, '不能禁用或变更当前登录账号身份'):
                    view.perform_update(serializer)

    def test_reset_password_rejects_short_password(self):
        target = SimpleNamespace(id='student-1', username='student')
        view = UserManageViewSet.as_view({'post': 'reset_password'})
        request = APIRequestFactory().post(
            '/api/v1/admin/users/student-1/reset-password/',
            {'newPassword': 'short'},
            format='json',
        )
        force_authenticate(request, user=authenticated_user(4))
        with patch.object(UserManageViewSet, 'get_object', return_value=target):
            response = view(request, pk='student-1')
        self.assertEqual(response.status_code, 400)


class AiVrCourseContentCrudTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.admin = authenticated_user(4)
        self.payload = {
            'curriculum_id': 'course-100',
            'curriculum_name': '画法几何与机械制图',
            'chapter_title': '第一章',
            'chapter_order': 1,
            'section_title': '第一节',
            'section_order': 1,
            'resource_type': 'video',
            'title': '课程视频',
            'url': '/media/test.mp4',
            'description': '带你学测试内容',
            'enabled': True,
            'sort_order': 1,
        }

    def test_public_course_endpoint_is_outside_admin_and_allows_anonymous_reads(self):
        response = self.client.get(
            '/api/v1/ai-vr/course/',
            {'curriculumName': self.payload['curriculum_name']},
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn('chapters', response.data)

    def test_student_cannot_use_course_action_under_admin_prefix(self):
        request = self.factory.get(
            '/api/v1/admin/ai-vr/course/',
            {'curriculumName': self.payload['curriculum_name']},
        )
        force_authenticate(request, user=authenticated_user(2))

        response = AiVrCourseContentViewSet.as_view({'get': 'course'})(request)

        self.assertEqual(response.status_code, 403)

    def test_public_assistant_requires_login_and_allows_authenticated_roles(self):
        view = PublicAiVrCourseContentViewSet.as_view({'post': 'assistant'})
        anonymous_request = self.factory.post(
            '/api/v1/ai-vr/assistant/',
            {'question': 'test question'},
            format='json',
        )
        self.assertEqual(view(anonymous_request).status_code, 401)

        for user_type in (2, 1, 4):
            with self.subTest(user_type=user_type):
                request = self.factory.post(
                    '/api/v1/ai-vr/assistant/',
                    {'question': 'test question'},
                    format='json',
                )
                force_authenticate(request, user=authenticated_user(user_type))
                with patch.object(PublicAiVrCourseContentViewSet, '_recommend_courses', return_value=[]), \
                        patch.object(PublicAiVrCourseContentViewSet, '_call_llm', return_value=''):
                    response = view(request)

                self.assertEqual(response.status_code, 200)
                self.assertIn('answer', response.data)

    def test_student_cannot_use_assistant_action_under_admin_prefix(self):
        request = self.factory.post(
            '/api/v1/admin/ai-vr/assistant/',
            {'question': 'test question'},
            format='json',
        )
        force_authenticate(request, user=authenticated_user(2))

        response = AiVrCourseContentViewSet.as_view({'post': 'assistant'})(request)

        self.assertEqual(response.status_code, 403)

    def test_only_admin_can_use_course_action_under_admin_prefix(self):
        view = AiVrCourseContentViewSet.as_view({'get': 'course'})
        for user_type, expected_status in ((1, 403), (4, 200)):
            with self.subTest(user_type=user_type):
                request = self.factory.get(
                    '/api/v1/admin/ai-vr/course/',
                    {'curriculumName': self.payload['curriculum_name']},
                )
                force_authenticate(request, user=authenticated_user(user_type))

                self.assertEqual(view(request).status_code, expected_status)

    def test_admin_can_create_learning_content_for_existing_course(self):
        request = self.factory.post('/api/v1/admin/ai-vr/', self.payload, format='json')
        force_authenticate(request, user=self.admin)

        response = AiVrCourseContentViewSet.as_view({'post': 'create'})(request)

        self.assertEqual(response.status_code, 201)
        content = AiVrCourseContent.objects.get(pk=response.data['id'])
        self.assertEqual(content.curriculum_id, 'course-100')
        self.assertEqual(content.curriculum_name, '画法几何与机械制图')
        self.assertEqual(content.resource_type, 'video')

    def test_admin_can_update_existing_content_to_practice_type(self):
        content = AiVrCourseContent.objects.create(**{
            key: value for key, value in self.payload.items() if key != 'title'
        }, title='原课程视频')
        updated_payload = {
            **self.payload,
            'resource_type': 'test',
            'title': '在线测验',
            'url': '',
            'description': '陪你练测试内容',
        }
        request = self.factory.put(
            f'/api/v1/admin/ai-vr/{content.pk}/',
            updated_payload,
            format='json',
        )
        force_authenticate(request, user=self.admin)

        response = AiVrCourseContentViewSet.as_view({'put': 'update'})(request, pk=content.pk)

        self.assertEqual(response.status_code, 200)
        content.refresh_from_db()
        self.assertEqual(content.resource_type, 'test')
        self.assertEqual(content.title, '在线测验')
        self.assertEqual(content.description, '陪你练测试内容')

    def test_admin_cannot_create_content_for_unsupported_course(self):
        request = self.factory.post(
            '/api/v1/admin/ai-vr/',
            {**self.payload, 'curriculum_name': '材料力学'},
            format='json',
        )
        force_authenticate(request, user=self.admin)

        response = AiVrCourseContentViewSet.as_view({'post': 'create'})(request)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(AiVrCourseContent.objects.count(), 0)
