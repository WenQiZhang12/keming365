"""Tests for study-management access, filtering, and pagination."""

from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from django.test import SimpleTestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.scores.views.study_management import (
    _base_where,
    study_courses,
    study_experiments,
    study_scores,
    study_scores_export,
)
from apps.scores.views.report_api import (
    _query_reports,
    _report_where,
    all_reports,
    my_reports,
    report_detail,
    report_file,
    review_report,
)
from apps.scores.views.student_report import student_report_list
from apps.scores.views.teacher_report import (
    teacher_class_list,
    teacher_report_detail,
    teacher_report_list,
    teacher_submit_score,
)


class MemorySession(dict):
    modified = False


def authenticated_user(user_type, user_id='user-1'):
    return SimpleNamespace(
        id=user_id,
        type=user_type,
        is_authenticated=True,
    )


def report_row(file_name='report.pdf'):
    return (
        'report-1', 'student-1', 'Student', 'experiment-1',
        'Experiment', 'course-1', 90, 'Course', file_name, None,
        None, 'class-1', 'Class 1', 1,
    )


class StudyManagementTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_student_query_is_limited_to_the_current_user(self):
        where, values = _base_where(
            authenticated_user(2, 'student-1'),
            curriculum_id='course-1',
            experiment_id='experiment-1',
        )

        self.assertEqual(
            where,
            ' WHERE s.user_id=%s AND s.curriculum_id=%s AND s.experiment_id=%s',
        )
        self.assertEqual(values, ['student-1', 'course-1', 'experiment-1'])

    def test_teacher_query_uses_only_selected_filters(self):
        where, values = _base_where(
            authenticated_user(1),
            curriculum_id='course-1',
        )

        self.assertEqual(where, ' WHERE s.curriculum_id=%s')
        self.assertEqual(values, ['course-1'])

    def test_anonymous_score_request_is_rejected(self):
        request = self.factory.get('/api/v1/scores/study/scores/')

        response = study_scores(request)

        self.assertEqual(response.status_code, 401)

    @patch('apps.scores.views.study_management._fetch_score_rows')
    def test_score_request_clamps_pagination_and_returns_page_info(self, fetch_rows):
        fetch_rows.return_value = (11, [{'id': 'score-1'}])
        request = self.factory.get(
            '/api/v1/scores/study/scores/',
            {'page': 0, 'page_size': 500},
        )
        request.session = MemorySession()
        force_authenticate(request, user=authenticated_user(2, 'student-1'))

        response = study_scores(request)

        self.assertEqual(response.status_code, 200)
        fetch_rows.assert_called_once_with(
            request.user,
            '',
            '',
            1,
            100,
        )
        self.assertEqual(response.data['count'], 11)
        self.assertEqual(response.data['results'], [{'id': 'score-1'}])
        self.assertEqual(response.data['pageInfo']['pageNum'], 1)
        self.assertEqual(response.data['pageInfo']['pageSize'], 100)
        self.assertEqual(response.data['pageInfo']['pages'], 1)
        self.assertTrue(request.session.modified)


class ReportAccessTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    @patch('apps.scores.views.report_api._query_reports', return_value=[])
    def test_my_reports_is_always_limited_to_the_current_account(self, query_reports):
        for user_type in (2, 1, 4):
            with self.subTest(user_type=user_type):
                request = self.factory.get('/api/v1/scores/my-reports/')
                force_authenticate(request, user=authenticated_user(user_type, f'user-{user_type}')) 

                response = my_reports(request)

                self.assertEqual(response.status_code, 200)
                query_reports.assert_called_with(request.user, own_only=True)

    def test_student_report_detail_filter_includes_owner_and_report_id(self):
        where, values = _report_where(
            authenticated_user(2, 'student-1'),
            report_id='report-2',
        )

        self.assertEqual(where, ' WHERE r.user_id=%s AND r.id=%s')
        self.assertEqual(values, ['student-1', 'report-2'])

    def test_teacher_report_filter_is_limited_to_managed_classes(self):
        where, values = _report_where(
            authenticated_user(1, 'teacher-1'),
            report_id='report-2',
        )

        self.assertIn('access_class.teacher_id=%s', where)
        self.assertTrue(where.endswith(' AND r.id=%s'))
        self.assertEqual(values, ['teacher-1', 'report-2'])

    def test_admin_report_filter_can_access_all_classes(self):
        where, values = _report_where(
            authenticated_user(4, 'admin-1'),
            report_id='report-2',
        )

        self.assertEqual(where, ' WHERE r.id=%s')
        self.assertEqual(values, ['report-2'])

    @patch('apps.scores.views.report_api.connection')
    def test_report_query_reads_uploaded_report_table(self, connection_mock):
        cursor = connection_mock.cursor.return_value.__enter__.return_value
        cursor.fetchall.return_value = []

        _query_reports(authenticated_user(1, 'teacher-1'))

        sql, values = cursor.execute.call_args.args
        self.assertIn('FROM tb_experiment_report r', sql)
        self.assertIn('access_class.teacher_id=%s', sql)
        self.assertEqual(values, ['teacher-1'])

    @patch('apps.scores.views.report_api._query_reports', return_value=[])
    def test_all_reports_rejects_students_and_allows_teacher_and_admin(self, query_reports):
        student_request = self.factory.get('/api/v1/scores/all-reports/')
        force_authenticate(student_request, user=authenticated_user(2, 'student-1'))
        self.assertEqual(all_reports(student_request).status_code, 403)
        query_reports.assert_not_called()

        for user_type in (1, 4):
            with self.subTest(user_type=user_type):
                request = self.factory.get('/api/v1/scores/all-reports/')
                force_authenticate(request, user=authenticated_user(user_type, f'user-{user_type}'))
                self.assertEqual(all_reports(request).status_code, 200)

    def test_report_endpoints_require_authentication(self):
        self.assertEqual(my_reports(self.factory.get('/api/v1/scores/my-reports/')).status_code, 401)
        self.assertEqual(all_reports(self.factory.get('/api/v1/scores/all-reports/')).status_code, 401)

    @patch('apps.scores.views.report_api._query_reports', return_value=[])
    def test_student_cannot_view_another_users_report(self, query_reports):
        request = self.factory.get('/api/v1/scores/reports/report-2/')
        force_authenticate(request, user=authenticated_user(2, 'student-1'))

        response = report_detail(request, 'report-2')

        self.assertEqual(response.status_code, 404)
        query_reports.assert_called_once_with(request.user, 'report-2')

    @patch('apps.scores.views.report_api._query_reports', return_value=[])
    def test_student_cannot_open_another_users_report_file(self, query_reports):
        request = self.factory.get('/api/v1/scores/reports/report-2/file/')
        force_authenticate(request, user=authenticated_user(2, 'student-1'))

        response = report_file(request, 'report-2')

        self.assertEqual(response.status_code, 404)
        query_reports.assert_called_once_with(request.user, 'report-2')

    @patch('apps.scores.views.report_api.urlopen')
    @patch('apps.scores.views.report_api._query_reports')
    def test_report_file_streams_only_after_authorized_lookup(self, query_reports, urlopen):
        query_reports.return_value = [report_row(file_name='student report.pdf')]
        upstream = MagicMock()
        upstream.read.side_effect = [b'%PDF-test', b'']
        upstream.headers.get_content_type.return_value = 'application/pdf'
        upstream.headers.get.return_value = '9'
        urlopen.return_value = upstream
        request = self.factory.get('/api/v1/scores/reports/report-1/file/')
        force_authenticate(request, user=authenticated_user(2, 'student-1'))

        response = report_file(request, 'report-1')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertEqual(b''.join(response.streaming_content), b'%PDF-test')
        requested_url = urlopen.call_args.args[0].full_url
        self.assertIn('fileName=student+report.pdf', requested_url)
        upstream.close.assert_called_once()

    @patch('apps.scores.views.report_api.connection')
    @patch('apps.scores.views.report_api._query_reports')
    def test_review_updates_uploaded_report_table(self, query_reports, connection_mock):
        query_reports.return_value = [report_row()]
        request = self.factory.post(
            '/api/v1/scores/reports/report-1/review/',
            {'score': 92},
            format='json',
        )
        force_authenticate(request, user=authenticated_user(1, 'teacher-1'))

        response = review_report(request, 'report-1')

        self.assertEqual(response.status_code, 200)
        sql = connection_mock.cursor.return_value.__enter__.return_value.execute.call_args.args[0]
        self.assertIn('UPDATE tb_experiment_report', sql)

    @patch('apps.scores.views.report_api._query_reports')
    def test_student_cannot_review_reports(self, query_reports):
        request = self.factory.post(
            '/api/v1/scores/reports/report-1/review/',
            {'score': 90},
            format='json',
        )
        force_authenticate(request, user=authenticated_user(2, 'student-1'))

        response = review_report(request, 'report-1')

        self.assertEqual(response.status_code, 403)
        query_reports.assert_not_called()

    @patch('apps.scores.views.student_report.connection')
    def test_legacy_student_report_ignores_supplied_user_id(self, connection_mock):
        cursor = MagicMock()
        cursor.fetchone.return_value = (0,)
        cursor.fetchall.return_value = []
        connection_mock.cursor.return_value.__enter__.return_value = cursor
        request = self.factory.get(
            '/api/v1/scores/student/reports/',
            {'userId': 'another-student'},
        )
        force_authenticate(request, user=authenticated_user(2, 'student-1'))

        response = student_report_list(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(cursor.execute.call_args_list[0].args[1], ['student-1'])
        self.assertEqual(cursor.execute.call_args_list[1].args[1], ['student-1', 10, 0])

    def test_legacy_report_endpoints_require_jwt_and_reject_students(self):
        anonymous = self.factory.get('/api/v1/scores/student/reports/')
        self.assertEqual(student_report_list(anonymous).status_code, 401)

        cases = [
            (teacher_class_list, self.factory.get('/api/v1/scores/teacher/classes/', {'userId': 'teacher-1'}), ()),
            (teacher_report_list, self.factory.get('/api/v1/scores/teacher/reports/', {'userId': 'teacher-1'}), ()),
            (teacher_report_detail, self.factory.get('/api/v1/scores/teacher/report/report-1/', {'userId': 'teacher-1'}), ('report-1',)),
            (teacher_submit_score, self.factory.post('/api/v1/scores/teacher/report/report-1/score/', {'scoreSum': 90, 'userId': 'teacher-1'}, format='json'), ('report-1',)),
        ]
        for view, request, args in cases:
            with self.subTest(view=view.__name__):
                force_authenticate(request, user=authenticated_user(2, 'student-1'))
                self.assertEqual(view(request, *args).status_code, 403)

    @patch('apps.scores.views.teacher_report.connection')
    def test_legacy_teacher_cannot_access_another_teachers_class(self, connection_mock):
        connection_mock.cursor.return_value.__enter__.return_value.fetchone.return_value = None
        request = self.factory.get(
            '/api/v1/scores/teacher/reports/',
            {
                'classId': 'foreign-class',
                'curriculumId': 'course-1',
                'experimentId': 'experiment-1',
            },
        )
        force_authenticate(request, user=authenticated_user(1, 'teacher-1'))

        response = teacher_report_list(request)

        self.assertEqual(response.status_code, 403)


class ScoreApiPermissionMatrixTests(SimpleTestCase):
    ROLE_CASES = (
        ('anonymous', None),
        ('student', 2),
        ('teacher', 1),
        ('admin', 4),
    )

    def setUp(self):
        self.factory = APIRequestFactory()

    def authenticate(self, request, user_type):
        request.session = MemorySession()
        if user_type is not None:
            force_authenticate(
                request,
                user=authenticated_user(user_type, f'user-{user_type}'),
            )
        return request

    @patch('apps.scores.views.study_management.connection')
    @patch('apps.scores.views.study_management._fetch_score_rows', return_value=(0, []))
    def test_study_management_permission_matrix(self, _fetch_rows, connection_mock):
        connection_mock.cursor.return_value.__enter__.return_value.fetchall.return_value = []
        endpoints = (
            ('courses', study_courses, '/api/v1/scores/study/courses/'),
            ('experiments', study_experiments, '/api/v1/scores/study/experiments/'),
            ('scores', study_scores, '/api/v1/scores/study/scores/'),
            ('export', study_scores_export, '/api/v1/scores/study/scores/export/'),
        )

        for endpoint, view, path in endpoints:
            for role, user_type in self.ROLE_CASES:
                with self.subTest(endpoint=endpoint, role=role):
                    request = self.authenticate(self.factory.get(path), user_type)
                    response = view(request)
                    self.assertEqual(response.status_code, 401 if user_type is None else 200)

    @patch('apps.scores.views.report_api.connection')
    @patch('apps.scores.views.report_api._query_reports')
    def test_current_report_permission_matrix(self, query_reports, _connection):
        query_reports.return_value = [report_row()]
        endpoints = (
            ('my_reports', my_reports, 'get', '/api/v1/scores/my-reports/', (), {
                None: 401, 2: 200, 1: 200, 4: 200,
            }),
            ('all_reports', all_reports, 'get', '/api/v1/scores/all-reports/', (), {
                None: 401, 2: 403, 1: 200, 4: 200,
            }),
            ('detail', report_detail, 'get', '/api/v1/scores/reports/report-1/', ('report-1',), {
                None: 401, 2: 200, 1: 200, 4: 200,
            }),
            ('review', review_report, 'post', '/api/v1/scores/reports/report-1/review/', ('report-1',), {
                None: 401, 2: 403, 1: 200, 4: 200,
            }),
        )

        for endpoint, view, method, path, args, expected in endpoints:
            for role, user_type in self.ROLE_CASES:
                with self.subTest(endpoint=endpoint, role=role):
                    factory_method = getattr(self.factory, method)
                    request = factory_method(path, {'score': 90}, format='json') if method == 'post' else factory_method(path)
                    self.authenticate(request, user_type)
                    self.assertEqual(view(request, *args).status_code, expected[user_type])

    @patch('apps.scores.views.student_report.connection')
    def test_legacy_student_report_permission_matrix(self, connection_mock):
        cursor = connection_mock.cursor.return_value.__enter__.return_value
        cursor.fetchone.return_value = (0,)
        cursor.fetchall.return_value = []

        for role, user_type in self.ROLE_CASES:
            with self.subTest(role=role):
                request = self.authenticate(
                    self.factory.get('/api/v1/scores/student/reports/', {'userId': 'forged-user'}),
                    user_type,
                )
                response = student_report_list(request)
                self.assertEqual(response.status_code, 401 if user_type is None else 200)

    @patch('apps.scores.views.teacher_report.connection')
    def test_legacy_teacher_report_permission_matrix(self, connection_mock):
        cursor = connection_mock.cursor.return_value.__enter__.return_value
        cursor.fetchall.return_value = []
        cursor.fetchone.return_value = (
            'report-1', '', 80, 90, 90, 'experiment-1',
            'course-1', 'class-1', 'student-1', 'Student', 'Experiment', 'Course',
        )
        endpoints = (
            ('classes', teacher_class_list, 'get', '/api/v1/scores/teacher/classes/', ()),
            ('reports', teacher_report_list, 'get', '/api/v1/scores/teacher/reports/', ()),
            ('detail', teacher_report_detail, 'get', '/api/v1/scores/teacher/report/report-1/', ('report-1',)),
            ('score', teacher_submit_score, 'post', '/api/v1/scores/teacher/report/report-1/score/', ('report-1',)),
        )
        expected = {None: 401, 2: 403, 1: 200, 4: 200}

        for endpoint, view, method, path, args in endpoints:
            for role, user_type in self.ROLE_CASES:
                with self.subTest(endpoint=endpoint, role=role):
                    if method == 'post':
                        request = self.factory.post(path, {'scoreSum': 90}, format='json')
                    else:
                        request = self.factory.get(path)
                    self.authenticate(request, user_type)
                    self.assertEqual(view(request, *args).status_code, expected[user_type])
