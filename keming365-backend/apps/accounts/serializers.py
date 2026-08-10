# -*- coding: utf-8 -*-
"""
apps.accounts.serializers - 用户与账户 序列化器
"""

import random
import re

from django.contrib.auth.hashers import check_password
import hashlib

from rest_framework import serializers

from apps.accounts.models import TbUser
from apps.admin_panel.models import UserAccountControl
from utils.exceptions import BusinessError
from utils.sms import sms_client


# ============================================================================
# 辅助函数
# ============================================================================

def _validate_telephone(value):
    """校验手机号格式（中国大陆 11 位）"""
    if not re.match(r'^1[3-9]\d{9}$', value):
        raise serializers.ValidationError('手机号格式不正确')
    return value


# ============================================================================
# 登录
# ============================================================================

class UserLoginSerializer(serializers.Serializer):
    """用户登录序列化器"""

    username = serializers.CharField(max_length=255, required=True, help_text='用户名')
    password = serializers.CharField(
        max_length=255, required=True, write_only=True, help_text='密码',
    )

    _user = None  # 缓存校验通过的用户对象

    @property
    def user(self):
        return self._user

    def validate_username(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('用户名不能为空')
        return value.strip()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        try:
            user = TbUser.objects.get(username=username)
        except TbUser.DoesNotExist:
            raise serializers.ValidationError('用户名或密码错误')

        control = UserAccountControl.objects.filter(user_id=user.id).first()
        if control is not None and not control.enabled:
            raise serializers.ValidationError('该账号已被禁用，请联系管理员')

        if not user.password:
            raise serializers.ValidationError('用户名或密码错误')

        stored = user.password

        # 1. 先尝试 Django 原生格式（pbkdf2_sha256 等）
        try:
            if check_password(password, stored):
                self._user = user
                return attrs
        except (ValueError, TypeError):
            pass  # 非 Django 格式的哈希，跳过

        # 2. 兼容 Java 后端的 MD5 密码格式
        #    Java 前端登录时先做 MD5，后端直接存储 MD5 值
        #    Django 前端直接发明文，所以这里对明文做 MD5 后比较
        md5_hash = hashlib.md5(password.encode('utf-8')).hexdigest()
        if stored == md5_hash:
            self._user = user
            return attrs

        # 3. 也兼容存储的密码本身就是明文（极少数情况）
        raise serializers.ValidationError('用户名或密码错误')


# ============================================================================
# 个人信息
# ============================================================================

class UserProfileSerializer(serializers.ModelSerializer):
    """用户个人信息序列化器（只读）"""

    id = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)
    name = serializers.CharField(read_only=True)
    telephone = serializers.CharField(read_only=True)
    email = serializers.CharField(read_only=True)
    type = serializers.IntegerField(read_only=True)
    schoolName = serializers.CharField(read_only=True)
    className = serializers.CharField(read_only=True)
    sex = serializers.IntegerField(read_only=True)

    userImg = serializers.CharField(read_only=True)
    createTime = serializers.DateTimeField(read_only=True, format='%Y-%m-%d %H:%M:%S')
    expireTime = serializers.DateTimeField(read_only=True, format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = TbUser
        fields = [
            'id', 'username', 'name', 'telephone', 'email', 'type',
            'schoolName', 'className', 'sex', 'userImg', 'createTime', 'expireTime',
        ]
        read_only_fields = fields


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """用户个人信息更新序列化器"""

    name = serializers.CharField(max_length=255, required=False, allow_blank=True, help_text='姓名')
    telephone = serializers.CharField(
        max_length=255, required=False, allow_blank=True, help_text='手机号',
        validators=[_validate_telephone],
    )
    email = serializers.CharField(max_length=255, required=False, allow_blank=True, help_text='邮箱')
    sex = serializers.IntegerField(required=False, help_text='性别（0=未知, 1=男, 2=女）')
    userImg = serializers.CharField(max_length=255, required=False, allow_blank=True, help_text='头像 URL')

    class Meta:
        model = TbUser
        fields = [
            'name', 'telephone', 'email', 'sex', 'userImg',
        ]

    def validate_sex(self, value):
        if value not in (0, 1, 2):
            raise serializers.ValidationError('性别值无效（0=未知, 1=男, 2=女）')
        return value


# ============================================================================
# 发送短信验证码
# ============================================================================

class SendSmsSerializer(serializers.Serializer):
    """发送短信验证码序列化器"""

    telephone = serializers.CharField(
        max_length=255, required=True, help_text='手机号',
        validators=[_validate_telephone],
    )

    _code = None  # 生成的验证码

    @property
    def code(self):
        return self._code

    def validate(self, attrs):
        telephone = attrs.get('telephone')
        # 生成 6 位随机验证码
        self._code = f'{random.randint(100000, 999999)}'
        # 发送短信（开发环境打印日志）
        sms_client.send_verification_code(telephone, self._code)
        return attrs
