"""Student-facing AI+VR endpoints."""

from django.urls import path

from apps.admin_panel.views.admin import PublicAiVrCourseContentViewSet


urlpatterns = [
    path(
        'course/',
        PublicAiVrCourseContentViewSet.as_view({'get': 'course'}),
        name='ai-vr-course',
    ),
    path(
        'assistant/',
        PublicAiVrCourseContentViewSet.as_view({'post': 'assistant'}),
        name='ai-vr-assistant',
    ),
]
