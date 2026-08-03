# -*- coding: utf-8 -*-
"apps.accounts.tests - 用户与账户 测试"

from types import SimpleNamespace
from unittest.mock import patch
from datetime import timedelta

from django.test import SimpleTestCase
from django.urls import Resolver404, resolve
from django.utils import timezone

from apps.accounts.serializers import UserLoginSerializer
from utils.auth_backend import TbUserJWTAuthentication
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

class PublicRegistrationTests(SimpleTestCase):
    def test_public_registration_route_is_not_available(self):
        with self.assertRaises(Resolver404):
            resolve('/api/v1/accounts/auth/register/')

    def test_self_service_password_change_route_is_not_available(self):
        with self.assertRaises(Resolver404):
            resolve('/api/v1/accounts/auth/change-password/')


class DisabledAccountAuthenticationTests(SimpleTestCase):
    @patch('apps.accounts.serializers.UserAccountControl.objects.filter')
    @patch('apps.accounts.serializers.TbUser.objects.get')
    def test_disabled_account_cannot_log_in(self, user_get, control_filter):
        user_get.return_value = SimpleNamespace(
            id='disabled-user',
            username='disabled-user',
            password='unused',
        )
        control_filter.return_value.first.return_value = SimpleNamespace(enabled=False)

        serializer = UserLoginSerializer(data={
            'username': 'disabled-user',
            'password': 'password-123',
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn('non_field_errors', serializer.errors)

    @patch('utils.auth_backend.UserAccountControl.objects.filter')
    def test_existing_jwt_is_rejected_after_account_is_disabled(self, control_filter):
        control_filter.return_value.first.return_value = SimpleNamespace(enabled=False)
        authentication = TbUserJWTAuthentication()
        request = SimpleNamespace()
        user = SimpleNamespace(id='disabled-user')

        with patch.object(authentication, 'get_header', return_value=b'Bearer token'), \
                patch.object(authentication, 'get_raw_token', return_value=b'token'), \
                patch.object(authentication, 'get_validated_token', return_value={'user_id': user.id}), \
                patch.object(authentication, 'get_user', return_value=user):
            result = authentication.authenticate(request)

        self.assertIsNone(result)
