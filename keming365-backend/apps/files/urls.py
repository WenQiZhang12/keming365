# -*- coding: utf-8 -*-
"""
apps.files.urls - 文件管理 路由

路由前缀：/api/v1/files/
"""

from django.urls import path

from apps.files.views.files import (
    FilePreviewView,
    FileUploadView,
    PdfInlinePreviewView,
    VideoDetailView,
    VideoListView,
    experiment_report,
    ppt_oss_preview,
)

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file_upload'),
    path('report/<str:experiment_id>/', experiment_report, name='experiment_report'),
    path('ppt-oss-preview/', ppt_oss_preview, name='ppt_oss_preview'),
    path('pdf-inline/<path:file_path>/', PdfInlinePreviewView.as_view(), name='pdf_inline_preview'),
    path('preview/<path:file_path>/', FilePreviewView.as_view(), name='file_preview'),
    path('videos/', VideoListView.as_view(), name='video_list'),
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video_detail'),
]
