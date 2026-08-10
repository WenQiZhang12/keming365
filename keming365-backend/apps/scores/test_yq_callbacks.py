import hashlib
import hmac
import time
from types import SimpleNamespace
from unittest.mock import patch

from django.test import SimpleTestCase, override_settings
from rest_framework.test import APIRequestFactory

from apps.scores.views.yq_callbacks import yq_score_callback, yq_usage_callback


@override_settings(YQ_CALLBACK_SECRET='callback-test-secret', YQ_CALLBACK_MAX_AGE=300)
class YQCallbackSecurityTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.common = {
            'userId': 'user-1',
            'curriculumId': 'course-1',
            'experimentId': 'experiment-1',
            'score': '90',
        }

    def signed_params(self, purpose):
        timestamp = str(int(time.time()))
        message = '|'.join((purpose, 'user-1', 'course-1', 'experiment-1', timestamp))
        signature = hmac.new(
            b'callback-test-secret', message.encode('utf-8'), hashlib.sha256
        ).hexdigest()
        return {'callbackTs': timestamp, 'callbackSig': signature}

    def test_score_callback_rejects_unsigned_request(self):
        response = yq_score_callback(self.factory.post('/experiment/data/save', self.common))
        self.assertEqual(response.status_code, 403)

    @patch('apps.scores.views.yq_callbacks.TbExperimentScore.objects.create')
    @patch('apps.scores.views.yq_callbacks.TbExperimentScore.objects.filter')
    def test_score_callback_accepts_valid_signature(self, mocked_filter, mocked_create):
        mocked_filter.return_value.first.return_value = None
        params = {**self.common, **self.signed_params('score')}
        response = yq_score_callback(self.factory.post('/experiment/data/save', params))
        self.assertEqual(response.status_code, 200)
        mocked_create.assert_called_once()

    @patch('apps.scores.views.yq_callbacks.TbExperimentScore.objects.filter')
    def test_score_callback_overwrites_existing_operation_score(self, mocked_filter):
        record = SimpleNamespace(operationScore=40, reportScore=None, scoreSum=40, save=lambda **kwargs: None)
        mocked_filter.return_value.first.return_value = record
        params = {**self.common, **self.signed_params('score'), 'score': '14', 'userType': '2'}

        response = yq_score_callback(self.factory.post('/experiment/data/save', params))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(record.operationScore, 14)

    def test_usage_callback_rejects_unsigned_request(self):
        response = yq_usage_callback(self.factory.post('/experiment/useTime', self.common))
        self.assertEqual(response.status_code, 403)
