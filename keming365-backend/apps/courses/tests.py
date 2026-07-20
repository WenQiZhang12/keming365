# -*- coding: utf-8 -*-
"apps.courses.tests - 课程管理 测试"

from unittest.mock import patch

from django.test import SimpleTestCase

from apps.courses.yqcloud import get_yq_path


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

