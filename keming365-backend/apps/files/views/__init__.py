# -*- coding: utf-8 -*-
"""
apps.files.views - 文件管理 视图
"""

from apps.files.views.files import FilePreviewView, FileUploadView, PdfInlinePreviewView, VideoDetailView, VideoListView, experiment_report

__all__ = [
    'FileUploadView',
    'FilePreviewView',
    'PdfInlinePreviewView',
    'VideoListView',
    'VideoDetailView',
    'experiment_report',
]
