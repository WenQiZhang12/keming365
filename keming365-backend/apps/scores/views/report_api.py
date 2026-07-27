# -*- coding: utf-8 -*-
"""JWT-bound APIs for uploaded experiment reports."""

from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.db import connection
from django.http import StreamingHttpResponse
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from utils.user_roles import is_admin, is_teacher_or_admin


LEGACY_REPORT_PREVIEW_URL = 'https://www.keming365.com/sys/attach/preview'


def _report_row(row):
    score = row[6]
    report_id = str(row[0])
    return {
        'id': report_id,
        'userId': row[1],
        'studentName': row[2] or '',
        'experimentId': row[3],
        'experimentName': row[4] or '',
        'curriculumId': row[5],
        'curriculumName': row[7] or '',
        'fileName': row[8] or '',
        'fileUrl': f'/api/v1/scores/reports/{report_id}/file/' if row[8] else '',
        'createTime': row[9].isoformat() if row[9] else '',
        'updateTime': row[10].isoformat() if row[10] else '',
        'classId': row[11],
        'className': row[12] or '',
        'uploadNum': row[13] or 0,
        'reportScore': str(score) if score is not None else None,
        # Legacy uploads initialize report_score to 0, so only a positive score
        # is distinguishable from an unreviewed report in the existing schema.
        'status': 1 if score is not None and score > 0 else 0,
    }


def _report_where(user, report_id=None, own_only=False):
    where = []
    values = []
    if own_only or not is_teacher_or_admin(user):
        where.append('r.user_id=%s')
        values.append(str(user.id))
    elif not is_admin(user):
        where.append(
            'EXISTS (SELECT 1 FROM tb_class_info access_class '
            'WHERE access_class.id=r.class_Id AND access_class.teacher_id=%s)'
        )
        values.append(str(user.id))
    if report_id is not None:
        where.append('r.id=%s')
        values.append(str(report_id))
    return (' WHERE ' + ' AND '.join(where)) if where else '', values


def _query_reports(user, report_id=None, own_only=False):
    clause, values = _report_where(user, report_id, own_only)
    sql = f"""
        SELECT r.id, r.user_id, COALESCE(u.name, r.un, ''), r.experiment_id,
               COALESCE(e.title, ''), r.curriculum_id, r.report_score,
               COALESCE(c.curriculum_name, ''), r.file_name, r.create_time,
               r.update_time, r.class_Id, COALESCE(ci.class_card, ''),
               r.upload_num
        FROM tb_experiment_report r
        LEFT JOIN tb_user u ON r.user_id=u.id
        LEFT JOIN tb_experiment e ON r.experiment_id=e.id
        LEFT JOIN tb_curriculum c ON r.curriculum_id=c.id
        LEFT JOIN tb_class_info ci ON r.class_Id=ci.id
        {clause}
        ORDER BY r.update_time DESC, r.create_time DESC
    """
    with connection.cursor() as cur:
        cur.execute(sql, values)
        return cur.fetchall()


def _pagination(request):
    try:
        page = max(int(request.query_params.get('page', 1)), 1)
        page_size = min(max(int(request.query_params.get('page_size', 20)), 1), 100)
    except (TypeError, ValueError):
        page, page_size = 1, 20
    return page, page_size


def _paginated_response(request, rows):
    page, page_size = _pagination(request)
    start = (page - 1) * page_size
    return Response({
        'count': len(rows),
        'results': [_report_row(row) for row in rows[start:start + page_size]],
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_reports(request):
    return _paginated_response(
        request,
        _query_reports(request.user, own_only=True),
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_reports(request):
    if not is_teacher_or_admin(request.user):
        return Response(
            {'detail': '仅教师或管理员可查看学生报告'},
            status=status.HTTP_403_FORBIDDEN,
        )
    return _paginated_response(request, _query_reports(request.user))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def report_detail(request, report_id):
    rows = _query_reports(request.user, report_id)
    if not rows:
        return Response(
            {'detail': '报告不存在或无权查看'},
            status=status.HTTP_404_NOT_FOUND,
        )
    return Response(_report_row(rows[0]))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def report_file(request, report_id):
    rows = _query_reports(request.user, report_id)
    if not rows or not rows[0][8]:
        return Response(
            {'detail': '报告文件不存在或无权查看'},
            status=status.HTTP_404_NOT_FOUND,
        )
    preview_url = f'{LEGACY_REPORT_PREVIEW_URL}?{urlencode({"fileName": rows[0][8]})}'
    try:
        upstream = urlopen(
            Request(preview_url, headers={'User-Agent': 'Keming365-Report-Proxy/1.0'}),
            timeout=20,
        )
    except (HTTPError, URLError, TimeoutError):
        return Response(
            {'detail': '报告文件暂时无法读取'},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    def stream_chunks():
        try:
            while True:
                chunk = upstream.read(64 * 1024)
                if not chunk:
                    break
                yield chunk
        finally:
            upstream.close()

    response = StreamingHttpResponse(
        stream_chunks(),
        content_type=upstream.headers.get_content_type() or 'application/pdf',
    )
    content_length = upstream.headers.get('Content-Length')
    if content_length:
        response['Content-Length'] = content_length
    response['Content-Disposition'] = 'inline'
    response['Cache-Control'] = 'private, no-store'
    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_report(request, report_id):
    if not is_teacher_or_admin(request.user):
        return Response(
            {'detail': '仅教师或管理员可批阅报告'},
            status=status.HTTP_403_FORBIDDEN,
        )
    rows = _query_reports(request.user, report_id)
    if not rows:
        return Response(
            {'detail': '报告不存在或无权批阅'},
            status=status.HTTP_404_NOT_FOUND,
        )

    score = request.data.get('score')
    if score in ('', None):
        return Response(
            {'detail': '请提供报告分数'},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        score = float(score)
        if score < 0 or score > 100:
            raise ValueError
    except (TypeError, ValueError):
        return Response(
            {'detail': '分数必须在0到100之间'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    with connection.cursor() as cur:
        cur.execute(
            'UPDATE tb_experiment_report '
            'SET report_score=%s, update_time=%s WHERE id=%s',
            [score, timezone.now(), str(report_id)],
        )
    return Response({
        'flag': 1,
        'status': 1 if score > 0 else 0,
        'reportScore': score,
    })
