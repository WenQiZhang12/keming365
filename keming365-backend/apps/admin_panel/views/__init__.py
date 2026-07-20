# -*- coding: utf-8 -*-
"apps.admin_panel.views - 管理后台 视图"

from .admin import (
    AiVrCourseContentViewSet,
    CourseManageViewSet,
    DashboardView,
    ExperimentManageViewSet,
    NewsManageViewSet,
    SchoolManageViewSet,
    UserManageViewSet,
    ViewpagerManageViewSet,
)

__all__ = [
    'AiVrCourseContentViewSet',
    'UserManageViewSet',
    'CourseManageViewSet',
    'ExperimentManageViewSet',
    'SchoolManageViewSet',
    'ViewpagerManageViewSet',
    'NewsManageViewSet',
    'DashboardView',
]
