"""Canonical user role values and authorization helpers."""

from django.utils import timezone


TEACHER = 1
STUDENT = 2
ADMIN = 4
ORDINARY_USER = 5
TEMPORARY_ADMIN = 8


def is_temporary_admin_active(user) -> bool:
    if getattr(user, 'type', None) != TEMPORARY_ADMIN:
        return False
    expires_at = getattr(user, 'expireTime', None)
    if expires_at and timezone.is_naive(expires_at):
        expires_at = timezone.make_aware(expires_at)
    return bool(expires_at and expires_at > timezone.now())


def is_admin(user) -> bool:
    return getattr(user, 'type', None) == ADMIN or is_temporary_admin_active(user)


def is_teacher_or_admin(user) -> bool:
    return getattr(user, 'type', None) == TEACHER or is_admin(user)
