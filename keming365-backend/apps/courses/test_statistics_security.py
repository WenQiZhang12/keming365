from django.test import SimpleTestCase
from rest_framework.test import APIRequestFactory

from apps.courses.views.statistics import StatisticsWriteThrottle, record_practice, record_visit


class StatisticsSecurityTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_visit_requires_authentication(self):
        request = self.factory.post('/api/v1/courses/experiments/exp-1/record-visit/')
        response = record_visit(request, 'exp-1')
        self.assertEqual(response.status_code, 401)

    def test_practice_requires_authentication(self):
        request = self.factory.post('/api/v1/courses/experiments/exp-1/record-practice/')
        response = record_practice(request, 'exp-1')
        self.assertEqual(response.status_code, 401)

    def test_statistics_write_throttle_is_configured(self):
        throttle = StatisticsWriteThrottle()
        self.assertEqual(throttle.get_rate(), '10/min')
