# -*- coding: utf-8 -*-
"""
apps.scores.urls - 成绩管理 路由

路由前缀（在 config/urls.py 中定义）：/api/v1/scores/
"""

from django.urls import path, re_path

from apps.scores.views.scores import (
    ExperimentScoreDetailView,
    MyScoreView,
    UsetimeStatsView,
    my_experiments,
)
from apps.scores.views.teacher_report import (
    teacher_class_list,
    teacher_course_list,
    teacher_experiment_list,
    teacher_report_list,
    teacher_report_detail,
    teacher_submit_score,
)
from apps.scores.views.student_report import student_report_list
from apps.scores.views.report_api import (
    all_reports,
    my_reports,
    report_detail,
    report_file,
    review_report,
)
from apps.scores.views.study_management import (
    study_courses,
    study_experiments,
    study_scores,
    study_scores_export,
)
from apps.scores.views.yq_callbacks import yq_score_callback, yq_usage_callback

app_name = 'scores'

urlpatterns = [
    # --- 实验成绩 ---
    path('my/', MyScoreView.as_view(), name='my_scores'),
    path('my-experiments/', my_experiments, name='my_experiments'),
    path('experiment/<str:pk>/', ExperimentScoreDetailView.as_view(), name='score_detail'),
    path('time-stats/', UsetimeStatsView.as_view(), name='time_stats'),
    path('report/', yq_score_callback, name='yq_score_callback'),
    path('usage/', yq_usage_callback, name='yq_usage_callback'),
    # --- 教师实验报告管理 ---
    path('teacher/classes/', teacher_class_list, name='teacher_class_list'),
    path('teacher/courses/', teacher_course_list, name='teacher_course_list'),
    path('teacher/experiments/', teacher_experiment_list, name='teacher_experiment_list'),
    path('teacher/reports/', teacher_report_list, name='teacher_report_list'),
    re_path(r'^teacher/report/(?P<report_id>[^/]+)/$', teacher_report_detail, name='teacher_report_detail'),
    re_path(r'^teacher/report/(?P<report_id>[^/]+)/score/$', teacher_submit_score, name='teacher_submit_score'),
    # --- 学生实验报告 ---
    path('student/reports/', student_report_list, name='student_report_list'),
    path('my-reports/', my_reports, name='my_reports'),
    path('all-reports/', all_reports, name='all_reports'),
    re_path(r'^reports/(?P<report_id>[^/]+)/file/$', report_file, name='report_file'),
    re_path(r'^reports/(?P<report_id>[^/]+)/$', report_detail, name='report_detail'),
    re_path(r'^reports/(?P<report_id>[^/]+)/review/$', review_report, name='review_report'),
    # --- 学习管理（兼容旧 sycj.jsp） ---
    path('study/courses/', study_courses, name='study_courses'),
    path('study/experiments/', study_experiments, name='study_experiments'),
    path('study/scores/', study_scores, name='study_scores'),
    path('study/scores/export/', study_scores_export, name='study_scores_export'),
]
