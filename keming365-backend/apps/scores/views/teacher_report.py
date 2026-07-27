# -*- coding: utf-8 -*-
"""
Teacher Report - 教师实验报告管理 API
对应 Java: ExperimentScoreController 中的教师查询部分 + sybgforteacher.jsp
"""

from datetime import datetime

from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes

from utils.permissions import IsTeacherOrAdmin
from utils.user_roles import is_admin


def _teacher_can_manage_class(user, class_id):
    if is_admin(user):
        return True
    with connection.cursor() as cur:
        cur.execute(
            'SELECT 1 FROM tb_class_info WHERE id=%s AND teacher_id=%s',
            [class_id, str(user.id)],
        )
        return cur.fetchone() is not None


def _score_access_clause(user):
    if is_admin(user):
        return '', []
    return (
        ' AND EXISTS (SELECT 1 FROM tb_class_info access_class '
        'WHERE access_class.id=s.class_Id AND access_class.teacher_id=%s)',
        [str(user.id)],
    )


@api_view(['GET', 'POST'])
@permission_classes([IsTeacherOrAdmin])
def teacher_class_list(request):
    """
    GET/POST /api/v1/scores/teacher/classes/
    获取教师管理的班级列表
    """
    user = request.user
    with connection.cursor() as cur:
        if is_admin(user):
            # 管理员查看所有班级
            cur.execute(
                "SELECT id, class_card, school_id FROM tb_class_info WHERE type!=%s ORDER BY create_time",
                ['0']
            )
        else:
            # 教师查看自己的班级
            cur.execute(
                "SELECT id, class_card, school_id FROM tb_class_info WHERE teacher_id=%s AND type!=%s ORDER BY create_time",
                [user.id, '0']
            )
        rows = cur.fetchall()
        results = [{'id': r[0], 'classCard': r[1], 'schoolId': r[2]} for r in rows]
    return JsonResponse({'flag': 1, 'list': results})


@api_view(['GET', 'POST'])
@permission_classes([IsTeacherOrAdmin])
def teacher_course_list(request):
    """课程列表"""
    params = request.query_params if request.method == 'GET' else request.data
    class_id = params.get('classId')
    if not class_id:
        return JsonResponse({'flag': 0, 'msg': '缺少 classId'})
    if not _teacher_can_manage_class(request.user, class_id):
        return JsonResponse({'detail': '无权访问该班级'}, status=403)
    with connection.cursor() as cur:
        cur.execute("SELECT school_id FROM tb_class_info WHERE id=%s", [class_id])
        row = cur.fetchone()
        if not row:
            return JsonResponse({'flag': 0, 'list': []})
        school_id = row[0] or ''
        cur.execute("""
            SELECT DISTINCT s.curriculum_id, c.curriculum_name
            FROM tb_experiment_score s
            LEFT JOIN tb_curriculum c ON s.curriculum_id = c.id
            WHERE s.class_Id=%s AND s.curriculum_id IS NOT NULL
        """, [class_id])
        rows = cur.fetchall()
        if not rows:
            cur.execute("""
                SELECT DISTINCT sc.curriculum_id, c.curriculum_name
                FROM school_curriculum sc
                LEFT JOIN tb_curriculum c ON sc.curriculum_id = c.id
                WHERE sc.school_id=%s
            """, [school_id])
            rows = cur.fetchall()
        results = [{'curriculumId': r[0], 'curriculumStr': r[1] or '未知课程'} for r in rows]
    return JsonResponse({'flag': 1, 'list': results})


@api_view(['GET', 'POST'])
@permission_classes([IsTeacherOrAdmin])
def teacher_experiment_list(request):
    """实验列表"""
    params = request.query_params if request.method == 'GET' else request.data
    class_id = params.get('classId')
    curriculum_id = params.get('curriculumId')
    if not class_id:
        return JsonResponse({'flag': 0, 'msg': '缺少 classId'})
    if not _teacher_can_manage_class(request.user, class_id):
        return JsonResponse({'detail': '无权访问该班级'}, status=403)
    with connection.cursor() as cur:
        if curriculum_id:
            cur.execute("""
                SELECT DISTINCT s.experiment_id, e.title
                FROM tb_experiment_score s
                LEFT JOIN tb_experiment e ON s.experiment_id = e.id
                WHERE s.class_Id=%s AND s.curriculum_id=%s AND s.experiment_id IS NOT NULL
            """, [class_id, curriculum_id])
        else:
            cur.execute("""
                SELECT DISTINCT s.experiment_id, e.title
                FROM tb_experiment_score s
                LEFT JOIN tb_experiment e ON s.experiment_id = e.id
                WHERE s.class_Id=%s AND s.experiment_id IS NOT NULL
            """, [class_id])
        rows = cur.fetchall()
        if not rows and curriculum_id:
            cur.execute("SELECT id, title FROM tb_experiment WHERE parent_id=%s", [curriculum_id])
            rows = cur.fetchall()
        results = [{'experimentId': r[0], 'experimentStr': r[1] or '未知实验'} for r in rows]
    return JsonResponse({'flag': 1, 'list': results})


@api_view(['GET', 'POST'])
@permission_classes([IsTeacherOrAdmin])
def teacher_report_list(request):
    """
    GET/POST /api/v1/scores/teacher/reports/
    获取教师管理的实验报告列表
    """
    params = request.query_params if request.method == 'GET' else request.data
    class_id = params.get('classId')
    curriculum_id = params.get('curriculumId')
    experiment_id = params.get('experimentId')
    try:
        start_page = max(int(params.get('startPage', '1')), 1)
        page_size = min(max(int(params.get('PageSize', '10')), 1), 100)
    except (TypeError, ValueError):
        start_page, page_size = 1, 10

    if not class_id or not curriculum_id or not experiment_id:
        return JsonResponse({
            'flag': 0, 'msg': '缺少参数',
            'list': {'rows': [], 'pageInfo': {'pageNum': start_page, 'pages': 0, 'total': 0, 'prePage': 0, 'nextPage': 0, 'navigatepageNums': []}}
        })
    if not _teacher_can_manage_class(request.user, class_id):
        return JsonResponse({'detail': '无权访问该班级'}, status=403)

    offset = (start_page - 1) * page_size
    with connection.cursor() as cur:
        cur.execute("""
            SELECT COUNT(*) FROM tb_experiment_score s
            WHERE s.class_Id=%s AND s.curriculum_id=%s AND s.experiment_id=%s
        """, [class_id, curriculum_id, experiment_id])
        total = cur.fetchone()[0]
        cur.execute("""
            SELECT s.id, s.id_card, s.user_id, s.class_Id, s.curriculum_id, s.experiment_id,
                   COALESCE(u.name, ''), COALESCE(u.class_name, ''),
                   COALESCE(c.curriculum_name, ''), COALESCE(e.title, ''),
                   s.operation_score, s.report_score, s.score_sum, s.pdf_path, s.experiment_num,
                   CASE WHEN s.pdf_path IS NOT NULL AND s.pdf_path != '' THEN 1 ELSE 0 END
            FROM tb_experiment_score s
            LEFT JOIN tb_user u ON s.user_id = u.id
            LEFT JOIN tb_curriculum c ON s.curriculum_id = c.id
            LEFT JOIN tb_experiment e ON s.experiment_id = e.id
            WHERE s.class_Id=%s AND s.curriculum_id=%s AND s.experiment_id=%s
            ORDER BY u.name LIMIT %s OFFSET %s
        """, [class_id, curriculum_id, experiment_id, page_size, offset])
        rows = cur.fetchall()

    results = []
    for r in rows:
        has_report = r[15]
        results.append({
            'id': r[0], 'idCard': r[1] or '', 'userId': r[2], 'classId': r[3],
            'studentName': r[6] or '', 'classStr': r[7] or '',
            'curriculumStr': r[8] or '', 'experimentStr': r[9] or '',
            'operationScore': str(r[10]) if r[10] is not None else '',
            'reportScore': str(r[11]) if r[11] is not None else '',
            'scoreSum': str(r[12]) if r[12] is not None else '',
            'pdfPath': r[13] or '', 'experimentNum': r[14] or 0,
            'reportType': '已上传' if has_report else '未上传', 'flag': has_report,
        })

    pages = (total + page_size - 1) // page_size if total > 0 else 0
    pre_page = start_page - 1 if start_page > 1 else 1
    next_page = start_page + 1 if start_page < pages else pages
    nav_start = max(1, start_page - 2)
    nav_end = min(pages, start_page + 2)
    if nav_end - nav_start < 4:
        nav_end = min(pages, nav_start + 4) if nav_start == 1 else max(1, nav_end - 4)
    navigatepage_nums = list(range(nav_start, nav_end + 1))

    return JsonResponse({
        'flag': 1 if results else 0,
        'list': {
            'rows': results,
            'pageInfo': {'pageNum': start_page, 'pages': pages, 'total': total,
                         'prePage': pre_page, 'nextPage': next_page, 'navigatepageNums': navigatepage_nums},
        }
    })


@api_view(['GET'])
@permission_classes([IsTeacherOrAdmin])
def teacher_report_detail(request, report_id):
    """查询实验报告详情"""
    access_clause, access_values = _score_access_clause(request.user)
    with connection.cursor() as cur:
        cur.execute(f"""
            SELECT s.id, s.pdf_path, s.operation_score, s.report_score, s.score_sum,
                   s.experiment_id, s.curriculum_id, s.class_Id, s.user_id,
                   COALESCE(u.name, ''), COALESCE(e.title, ''), COALESCE(c.curriculum_name, '')
            FROM tb_experiment_score s
            LEFT JOIN tb_user u ON s.user_id = u.id
            LEFT JOIN tb_experiment e ON s.experiment_id = e.id
            LEFT JOIN tb_curriculum c ON s.curriculum_id = c.id
            WHERE s.id=%s{access_clause}
        """, [report_id, *access_values])
        row = cur.fetchone()
    if not row:
        return JsonResponse({'flag': 0, 'msg': '报告不存在'})
    return JsonResponse({
        'flag': 1, 'id': row[0], 'pdfPath': row[1] or '',
        'operationScore': str(row[2]) if row[2] is not None else '',
        'reportScore': str(row[3]) if row[3] is not None else '',
        'scoreSum': str(row[4]) if row[4] is not None else '',
        'experimentId': row[5], 'curriculumId': row[6],
        'classId': row[7], 'userId': row[8],
        'studentName': row[9], 'experimentName': row[10], 'curriculumName': row[11],
    })


@api_view(['POST'])
@permission_classes([IsTeacherOrAdmin])
def teacher_submit_score(request, report_id):
    """教师提交批阅分数"""
    score_sum = request.data.get('scoreSum') or request.query_params.get('scoreSum')
    if score_sum in ('', None):
        return JsonResponse({'flag': 0, 'msg': '请提供报告分数'}, status=400)
    try:
        score_sum = float(score_sum)
        if score_sum < 0 or score_sum > 100:
            raise ValueError
    except (TypeError, ValueError):
        return JsonResponse({'flag': 0, 'msg': '分数必须在0到100之间'}, status=400)

    access_clause, access_values = _score_access_clause(request.user)
    now = datetime.now()
    with connection.cursor() as cur:
        cur.execute(
            f'SELECT s.id FROM tb_experiment_score s WHERE s.id=%s{access_clause}',
            [report_id, *access_values],
        )
        if not cur.fetchone():
            return JsonResponse({'flag': 0, 'msg': '记录不存在或无权操作'}, status=404)
        cur.execute(
            'UPDATE tb_experiment_score '
            'SET report_score=%s, score_sum=%s, update_time=%s WHERE id=%s',
            [score_sum, score_sum, now, report_id],
        )
    return JsonResponse({'flag': 1, 'msg': '提交成功'})
