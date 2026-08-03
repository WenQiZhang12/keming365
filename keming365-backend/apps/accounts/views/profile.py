# -*- coding: utf-8 -*-
"""
apps.accounts.views.profile - 个人信息相关视图

提供个人信息查看与个人资料修改接口
"""

import logging

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.models import TbUser
from apps.accounts.serializers import (
    UserProfileSerializer,
    UserProfileUpdateSerializer,
)
from utils.exceptions import BusinessError

logger = logging.getLogger(__name__)


# ============================================================================
# 个人信息
# ============================================================================

class ProfileView(APIView):
    """个人信息查看与修改

    GET  /api/v1/accounts/auth/profile/  → 查看个人信息
    PUT  /api/v1/accounts/auth/profile/  → 修改个人信息
    需要认证
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """查看个人信息"""
        # JWT 认证后，request.user 是 TokenUser 实例，需要通过 id 查询
        user_id = request.user.id
        try:
            user = TbUser.objects.get(id=user_id)
        except TbUser.DoesNotExist:
            raise BusinessError(
                message='用户不存在',
                code='USER_NOT_FOUND',
                status_code=404,
            )

        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """修改个人信息"""
        user_id = request.user.id
        try:
            user = TbUser.objects.get(id=user_id)
        except TbUser.DoesNotExist:
            raise BusinessError(
                message='用户不存在',
                code='USER_NOT_FOUND',
                status_code=404,
            )

        serializer = UserProfileUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        for attr, value in serializer.validated_data.items():
            setattr(user, attr, value)

        user.save()

        # 返回更新后的完整信息
        result_serializer = UserProfileSerializer(user)
        return Response(result_serializer.data, status=status.HTTP_200_OK)
