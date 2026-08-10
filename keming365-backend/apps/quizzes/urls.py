# -*- coding: utf-8 -*-
"apps.quizzes.urls - 测验与考试 路由"

from django.urls import path

from apps.quizzes.views.quizzes import QuestionListView, QuestionSubmitView
from apps.quizzes.views.score import QuizScoreSubmitView

urlpatterns = [
    path('<str:experiment_id>/', QuestionListView.as_view(), name='quiz_questions'),
    path('<str:experiment_id>/submit/', QuestionSubmitView.as_view(), name='quiz_submit'),
    path('<str:experiment_id>/score/', QuizScoreSubmitView.as_view(), name='quiz_score_submit'),
]
