# -*- coding: utf-8 -*-
"apps.accounts.tests - 用户与账户 测试"

from types import SimpleNamespace
from unittest.mock import patch
from datetime import timedelta

from django.test import SimpleTestCase, override_settings
from django.utils import timezone

from apps.accounts.serializers import UserRegisterSerializer
from utils.permissions import IsAdminUser, IsTeacherOrAdmin


class UserRoleTests(SimpleTestCase):
    def request_for_type(self, user_type, expire_time=None):
        return SimpleNamespace(
            user=SimpleNamespace(is_authenticated=True, type=user_type, expireTime=expire_time)
        )

    def test_student_cannot_access_admin_permissions(self):
        request = self.request_for_type(2)
        self.assertFalse(IsAdminUser().has_permission(request, None))
        self.assertFalse(IsTeacherOrAdmin().has_permission(request, None))

    def test_teacher_and_admin_roles_are_recognized(self):
        self.assertTrue(IsTeacherOrAdmin().has_permission(self.request_for_type(1), None))
        self.assertTrue(IsTeacherOrAdmin().has_permission(self.request_for_type(4), None))
        self.assertTrue(IsAdminUser().has_permission(self.request_for_type(4), None))

    def test_temporary_admin_access_expires(self):
        active = self.request_for_type(8, timezone.now() + timedelta(days=1))
        expired = self.request_for_type(8, timezone.now() - timedelta(seconds=1))
        self.assertTrue(IsAdminUser().has_permission(active, None))
        self.assertFalse(IsAdminUser().has_permission(expired, None))

    @patch('apps.accounts.serializers.TbUser.objects.filter')
    def test_public_registration_forces_student_type(self, user_filter):
        user_filter.return_value.exists.return_value = False
        serializer = UserRegisterSerializer(data={
            'username': 'new-student',
            'password': 'secure-password',
            'type': 4,
        })
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['type'], 2)

    @override_settings(TEACHER_REGISTRATION_CODE='teacher-secret')
    @patch('apps.accounts.serializers.TbUser.objects.filter')
    def test_teacher_registration_requires_matching_code(self, user_filter):
        user_filter.return_value.exists.return_value = False
        serializer = UserRegisterSerializer(data={
            'username': 'new-teacher',
            'password': 'secure-password',
            'role': 'teacher',
            'inviteCode': 'wrong-code',
        })
        self.assertFalse(serializer.is_valid())
        self.assertIn('inviteCode', serializer.errors)

    @override_settings(TEMP_ADMIN_REGISTRATION_CODE='temporary-secret', TEMP_ADMIN_MAX_DAYS=30)
    @patch('apps.accounts.serializers.TbUser.objects.filter')
    def test_temporary_admin_gets_expiry(self, user_filter):
        user_filter.return_value.exists.return_value = False
        serializer = UserRegisterSerializer(data={
            'username': 'temporary-admin',
            'password': 'secure-password',
            'role': 'temporary_admin',
            'inviteCode': 'temporary-secret',
            'temporaryDays': 7,
        })
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['type'], 8)
        self.assertGreater(serializer.validated_data['expireTime'], timezone.now())

