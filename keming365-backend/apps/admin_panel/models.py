# -*- coding: utf-8 -*-
"apps.admin_panel.models - admin panel models"

import uuid

from django.db import models


def generate_uuid_hex():
    return uuid.uuid4().hex[:32]


class AiVrCourseContent(models.Model):
    """AI+VR course section resources managed from the admin UI."""

    RESOURCE_TYPES = (
        ('video', '课程视频'),
        ('ppt', '课程PPT'),
        ('test', '在线测验'),
        ('correct', '在线批改'),
        ('ai', 'AI助学'),
        ('vr', 'VR资源'),
    )

    id = models.CharField(primary_key=True, max_length=32, default=generate_uuid_hex)
    curriculum_id = models.CharField(max_length=255, blank=True, default='')
    curriculum_name = models.CharField(max_length=255)
    chapter_title = models.CharField(max_length=255)
    chapter_order = models.PositiveIntegerField(default=0)
    section_title = models.CharField(max_length=255)
    section_order = models.PositiveIntegerField(default=0)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    title = models.CharField(max_length=255, blank=True, default='')
    url = models.TextField(blank=True, default='')
    description = models.TextField(blank=True, default='')
    enabled = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'admin_ai_vr_course_content'
        ordering = [
            'chapter_order',
            'section_order',
            'resource_type',
            'sort_order',
            'create_time',
        ]
        indexes = [
            models.Index(fields=['curriculum_name']),
            models.Index(fields=['curriculum_id']),
            models.Index(fields=['resource_type']),
        ]

    def __str__(self):
        return f'{self.curriculum_name} - {self.section_title} - {self.resource_type}'


class UserAccountControl(models.Model):
    """Mutable account controls kept outside the legacy ``tb_user`` table."""

    user_id = models.CharField(primary_key=True, max_length=255)
    enabled = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'admin_user_account_control'
