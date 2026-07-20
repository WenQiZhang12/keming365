# -*- coding: utf-8 -*-
"Django admin registrations for the admin panel."

from django.contrib import admin

from apps.admin_panel.models import AiVrCourseContent


@admin.register(AiVrCourseContent)
class AiVrCourseContentAdmin(admin.ModelAdmin):
    list_display = (
        'curriculum_name',
        'chapter_title',
        'section_title',
        'resource_type',
        'title',
        'enabled',
        'sort_order',
        'update_time',
    )
    list_filter = ('resource_type', 'enabled', 'curriculum_name')
    search_fields = ('curriculum_name', 'chapter_title', 'section_title', 'title', 'url')
