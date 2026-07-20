# -*- coding: utf-8 -*-
"Serializers for AI+VR course content."

from rest_framework import serializers

from apps.admin_panel.models import AiVrCourseContent


class AiVrCourseContentSerializer(serializers.ModelSerializer):
    """AI+VR course resource serializer."""

    createTime = serializers.DateTimeField(source='create_time', format='%Y-%m-%d %H:%M:%S', read_only=True)
    updateTime = serializers.DateTimeField(source='update_time', format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = AiVrCourseContent
        fields = [
            'id',
            'curriculum_id',
            'curriculum_name',
            'chapter_title',
            'chapter_order',
            'section_title',
            'section_order',
            'resource_type',
            'title',
            'url',
            'description',
            'enabled',
            'sort_order',
            'createTime',
            'updateTime',
        ]

    def validate(self, attrs):
        for field in ('curriculum_name', 'chapter_title', 'section_title', 'resource_type'):
            if not str(attrs.get(field, '')).strip():
                raise serializers.ValidationError({field: '该字段不能为空'})
        return attrs
