"""Tests for study-management access, filtering, and pagination."""

from types import SimpleNamespace
from unittest.mock import patch

from django.test import SimpleTestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.scores.views.study_management import _base_where, study_scores


class MemorySession(dict):
    modified = False


def authenticated_user(user_type, user_id='user-1'):
    return SimpleNamespace(
        id=user_id,
        type=user_type,
        is_authenticated=True,
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
