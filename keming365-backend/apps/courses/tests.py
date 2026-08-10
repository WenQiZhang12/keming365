# -*- coding: utf-8 -*-
"apps.courses.tests - 课程管理 测试"

from types import SimpleNamespace
from unittest.mock import MagicMock, patch
from urllib.parse import parse_qs, urlsplit

from django.test import SimpleTestCase, override_settings
from django.http import Http404
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from apps.courses.yqcloud import get_yq_path, get_yq_path_from_experiment
from apps.courses.views.experiment import ExperimentDetailView


class YQCloudTests(SimpleTestCase):
    @patch('apps.courses.yqcloud.urlopen')
    def test_school_id_is_optional_for_cloud_rendering(self, mocked_urlopen):
        response = mocked_urlopen.return_value.__enter__.return_value
        response.read.return_value = (
            b'{"code":1000,"message":"","result":"/webclient/?appliId=app-1"}'
        )

        result = get_yq_path(
            token_url='http://cloud.example.test',
            app_key='app-key',
            app_secret='app-secret',
            appli_id='app-1',
            curriculum_id='course-1',
            experiment_id='experiment-1',
            user_id='user-1',
            post_url='http://new.example.test/api/v1/scores/report/',
            use_time_url='http://new.example.test/api/v1/scores/usage/',
            school_id='',
            user_type='2',
        )

        self.assertEqual(result['code'], 0)
        self.assertTrue(result['resultUrl'].startswith('/webclient/'))

    @override_settings(
        YQ_SCORE_URL='https://www.keming365.com/experiment/data/save',
        YQ_USAGE_URL='https://www.keming365.com/experiment/useTime',
    )
    @patch('apps.courses.yqcloud.get_yq_path')
    @patch('apps.courses.models.TbExperimentReport.objects.filter')
    def test_cloud_rendering_uses_configured_public_callback_urls(
        self, mocked_report_filter, mocked_get_yq_path
    ):
        mocked_report_filter.return_value.first.return_value = None
        mocked_get_yq_path.return_value = {'code': 0}
        experiment = SimpleNamespace(id='experiment-1', parentId='1', type=0, appliId='app-1')
        user = SimpleNamespace(id='user-1', schoolId='', type='2')

        get_yq_path_from_experiment(experiment, user, request=object())

        score_url = urlsplit(mocked_get_yq_path.call_args.kwargs['post_url'])
        usage_url = urlsplit(mocked_get_yq_path.call_args.kwargs['use_time_url'])
        self.assertEqual(score_url.geturl().split('?')[0], 'https://www.keming365.com/experiment/data/save')
        self.assertEqual(usage_url.geturl().split('?')[0], 'https://www.keming365.com/experiment/useTime')
        self.assertIn('callbackSig', parse_qs(score_url.query))
        self.assertIn('callbackSig', parse_qs(usage_url.query))


class ExperimentDetailFallbackTests(SimpleTestCase):
    def test_appli_id_fallback_is_limited_to_selected_curriculum(self):
        factory = APIRequestFactory()
        view = ExperimentDetailView()
        view.request = Request(factory.get('/api/v1/courses/experiments/app-1/', {'curriculumId': 'course-1'}))
        view.kwargs = {'pk': 'app-1'}
        view.check_object_permissions = MagicMock()

        experiment = SimpleNamespace(id='experiment-1', parentId='course-1')
        queryset = MagicMock()
        course_queryset = MagicMock()
        queryset.filter.return_value = course_queryset
        course_queryset.filter.return_value = course_queryset
        course_queryset.first.return_value = experiment

        with patch('rest_framework.generics.RetrieveAPIView.get_object', side_effect=Http404), \
                patch.object(ExperimentDetailView, 'get_queryset', return_value=queryset):
            result = view.get_object()

        self.assertIs(result, experiment)
        queryset.filter.assert_called_once_with(appliId='app-1')
        course_queryset.filter.assert_called_once_with(parentId='course-1')

