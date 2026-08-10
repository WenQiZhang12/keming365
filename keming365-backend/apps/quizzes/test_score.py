from types import SimpleNamespace
from unittest.mock import Mock, patch

from django.test import SimpleTestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.quizzes.views.score import QuizScoreSubmitView


class QuizScoreSubmitTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_requires_authentication(self):
        request = self.factory.post('/api/v1/quizzes/exp-1/score/', {'score': 12}, format='json')
        response = QuizScoreSubmitView.as_view()(request, experiment_id='exp-1')
        self.assertEqual(response.status_code, 401)

    @patch('apps.quizzes.views.score.TbExperimentScore.objects.filter')
    def test_updates_operation_score_for_current_user(self, mocked_filter):
        record = SimpleNamespace(operationScore=40, save=Mock())
        mocked_filter.return_value.first.return_value = record
        user = SimpleNamespace(id='user-1', username='student', telephone='', is_authenticated=True)
        request = self.factory.post('/api/v1/quizzes/exp-1/score/', {'score': 12}, format='json')
        force_authenticate(request, user=user)

        response = QuizScoreSubmitView.as_view()(request, experiment_id='exp-1')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(record.operationScore, 12)
        record.save.assert_called_once_with(update_fields=['operationScore', 'updateTime'])
        mocked_filter.assert_called_once_with(experimentId='exp-1', userId__in=['user-1', 'student'])
