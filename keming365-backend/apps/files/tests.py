# -*- coding: utf-8 -*-
"apps.files.tests - 文件管理 测试"

import tempfile
from pathlib import Path

from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIRequestFactory

from apps.files.views.files import PdfInlinePreviewView


class PdfInlinePreviewViewTests(TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.media_root = Path(self.temp_dir.name)
        self.settings_override = override_settings(MEDIA_ROOT=self.media_root)
        self.settings_override.enable()
        self.pdf_path = self.media_root / 'uploads' / 'ai-vr' / 'course.pdf'
        self.pdf_path.parent.mkdir(parents=True)
        self.pdf_path.write_bytes(b'%PDF-1.4\ncourse slides')

    def tearDown(self):
        self.settings_override.disable()
        self.temp_dir.cleanup()

    def test_returns_complete_pdf_for_same_origin_iframe(self):
        response = self.client.get(
            reverse('pdf_inline_preview', kwargs={'file_path': 'ai-vr/course.pdf'})
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertEqual(response['Content-Disposition'], 'inline')
        self.assertEqual(response['X-Frame-Options'], 'SAMEORIGIN')
        self.assertEqual(b''.join(response.streaming_content), self.pdf_path.read_bytes())

    def test_rejects_path_traversal(self):
        request = APIRequestFactory().get('/api/v1/files/pdf-inline/invalid/')
        response = PdfInlinePreviewView.as_view()(request, file_path='../secret.pdf')

        self.assertEqual(response.status_code, 404)

    def test_rejects_non_pdf_files(self):
        text_path = self.media_root / 'uploads' / 'ai-vr' / 'notes.txt'
        text_path.write_text('not a pdf', encoding='utf-8')

        response = self.client.get(
            reverse('pdf_inline_preview', kwargs={'file_path': 'ai-vr/notes.txt'})
        )

        self.assertEqual(response.status_code, 404)

