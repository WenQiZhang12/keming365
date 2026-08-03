# -*- coding: utf-8 -*-
"""
apps.admin_panel.serializers - 管理后台 序列化器

为管理员提供用户、实验、学校、轮播图、新闻的管理序列化。
"""

from rest_framework import serializers
from django.utils import timezone

from apps.accounts.models import TbUser
from apps.admin_panel.models import UserAccountControl
from apps.common.models import TbSchoolInfo
from apps.courses.models import TbExperiment
from apps.home.models import TbViewpager
from apps.news.models import News
from apps.payments.models import Orders


# ============================================================================
# 用户管理
# ============================================================================

class AdminUserSerializer(serializers.ModelSerializer):
    """用户管理序列化器"""

    status = serializers.SerializerMethodField(help_text='用户状态')
    enabled = serializers.SerializerMethodField()
    createTime = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    expireTime = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = TbUser
        fields = [
            'id', 'username', 'name', 'telephone', 'email', 'type',
            'schoolName', 'className', 'sex', 'status', 'createTime',
            'expireTime', 'enabled',
        ]

    def get_status(self, obj):
        return 1 if self.get_enabled(obj) else 0

    def get_enabled(self, obj):
        control = UserAccountControl.objects.filter(user_id=obj.id).first()
        return True if control is None else control.enabled


class AdminUserCreateSerializer(serializers.ModelSerializer):
    """管理员创建用户序列化器"""

    class Meta:
        model = TbUser
        fields = [
            'id', 'username', 'name', 'telephone', 'email', 'type',
            'schoolName', 'className', 'sex', 'password', 'expireTime', 'enabled',
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': True, 'min_length': 8},
            'id': {'read_only': True},
        }

    def validate_type(self, value):
        if value not in (1, 2, 4, 5, 8):
            raise serializers.ValidationError('用户类型无效（1=教师, 2=学生, 4=管理员, 5=普通用户, 8=临时管理员）')
        return value

    expireTime = serializers.DateTimeField(required=False, allow_null=True)
    enabled = serializers.BooleanField(required=False, default=True)

    def validate_name(self, value):
        if len(value or '') > 20:
            raise serializers.ValidationError('姓名不能超过20个字符')
        return value

    def validate_telephone(self, value):
        if value and len(value) > 11:
            raise serializers.ValidationError('手机号不能超过11位')
        return value

    def validate_username(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('用户名不能为空')
        value = value.strip()
        if TbUser.objects.filter(username=value).exists():
            raise serializers.ValidationError('用户名已存在')
        return value

    def validate(self, attrs):
        if attrs.get('type') == 8:
            expires_at = attrs.get('expireTime')
            if not expires_at or expires_at <= timezone.now():
                raise serializers.ValidationError({'expireTime': '临时管理员必须设置未来的到期时间'})
        else:
            attrs['expireTime'] = None
        return attrs


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    """管理员编辑用户序列化器"""

    class Meta:
        model = TbUser
        fields = [
            'username', 'name', 'telephone', 'email', 'type',
            'schoolName', 'className', 'sex', 'password', 'expireTime', 'enabled',
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False, 'min_length': 8},
            'username': {'required': False},
            'name': {'required': False},
            'telephone': {'required': False},
            'email': {'required': False},
            'type': {'required': False},
            'schoolName': {'required': False},
            'className': {'required': False},
            'sex': {'required': False},
        }

    expireTime = serializers.DateTimeField(required=False, allow_null=True)
    enabled = serializers.BooleanField(required=False)

    def validate_name(self, value):
        if len(value or '') > 20:
            raise serializers.ValidationError('姓名不能超过20个字符')
        return value

    def validate_telephone(self, value):
        if value and len(value) > 11:
            raise serializers.ValidationError('手机号不能超过11位')
        return value

    def validate_username(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('用户名不能为空')
        duplicate = TbUser.objects.filter(username=value).exclude(pk=self.instance.pk).exists()
        if duplicate:
            raise serializers.ValidationError('用户名已存在')
        return value

    def validate(self, attrs):
        user_type = attrs.get('type', self.instance.type)
        if user_type == 8:
            expires_at = attrs.get('expireTime', self.instance.expireTime)
            if not expires_at or expires_at <= timezone.now():
                raise serializers.ValidationError({'expireTime': '临时管理员必须设置未来的到期时间'})
        else:
            attrs['expireTime'] = None
        return attrs

    def validate_type(self, value):
        if value not in (1, 2, 4, 5, 8):
            raise serializers.ValidationError('用户类型无效（1=教师, 2=学生, 4=管理员, 5=普通用户, 8=临时管理员）')
        return value


# ============================================================================
# 实验管理
# ============================================================================

class AdminExperimentSerializer(serializers.ModelSerializer):
    """实验管理序列化器"""

    id = serializers.CharField(read_only=True)
    createTime = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = TbExperiment
        fields = [
            'id', 'title', 'publisher', 'image', 'price',
            'type', 'status', 'chapterId', 'nodeId',
            'appliId', 'parentId',
            'createTime',
        ]

    def create(self, validated_data):
        import uuid
        from django.utils import timezone
        validated_data['id'] = uuid.uuid4().hex[:32]
        validated_data['parentId'] = validated_data.get('parentId') or ''
        validated_data.setdefault('status', 0)
        validated_data['createTime'] = timezone.now()
        validated_data['updatedTime'] = timezone.now()
        return super().create(validated_data)


# ============================================================================
# 学校管理
# ============================================================================

class AdminSchoolSerializer(serializers.ModelSerializer):
    """学校管理序列化器"""

    schoolName = serializers.CharField(source='name', read_only=True, help_text='学校名称')
    address = serializers.SerializerMethodField(help_text='地址')
    contact = serializers.SerializerMethodField(help_text='联系人')
    telephone = serializers.SerializerMethodField(help_text='联系电话')
    createTime = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = TbSchoolInfo
        fields = [
            'id', 'schoolName', 'address', 'contact', 'telephone',
            'createTime',
        ]

    def get_address(self, obj):
        return ''

    def get_contact(self, obj):
        return ''

    def get_telephone(self, obj):
        return ''


class AdminSchoolCreateSerializer(serializers.ModelSerializer):
    """学校创建序列化器"""

    id = serializers.CharField(read_only=True)

    class Meta:
        model = TbSchoolInfo
        fields = ['id', 'name', 'type', 'sortOrder']
        extra_kwargs = {
            'name': {'required': True},
        }

    def create(self, validated_data):
        import uuid
        validated_data['id'] = uuid.uuid4().hex[:32]
        return super().create(validated_data)


# ============================================================================
# 轮播图管理
# ============================================================================

class AdminViewpagerSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    """轮播图管理序列化器"""

    image = serializers.CharField(source='imgPath', read_only=True, help_text='图片路径')
    url = serializers.CharField(source='imgPath', read_only=True, help_text='跳转链接')
    status = serializers.IntegerField(source='flag', read_only=True, help_text='状态')
    sortOrder = serializers.IntegerField(read_only=True)

    class Meta:
        model = TbViewpager
        fields = [
            'id', 'title', 'image', 'url', 'sortOrder', 'status',
        ]


class AdminViewpagerWriteSerializer(serializers.ModelSerializer):
    """轮播图写入序列化器"""

    class Meta:
        model = TbViewpager
        fields = ['id', 'title', 'imgPath', 'sortOrder', 'flag']


# ============================================================================
# 新闻管理
# ============================================================================

class AdminNewsSerializer(serializers.ModelSerializer):
    """新闻管理序列化器"""

    author = serializers.IntegerField(source='userid', read_only=True, help_text='作者ID')
    createTime = serializers.DateTimeField(source='time', format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'author', 'coverImg',
            'priority', 'browsetimes', 'createTime',
        ]


class AdminNewsWriteSerializer(serializers.ModelSerializer):
    """新闻写入序列化器"""

    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'userid', 'coverImg',
            'priority', 'browsetimes',
        ]


# ============================================================================
# 仪表盘统计
# ============================================================================

class DashboardSerializer(serializers.Serializer):
    """仪表盘统计序列化器"""

    userCount = serializers.IntegerField(help_text='用户总数')
    courseCount = serializers.IntegerField(help_text='课程总数')
    experimentCount = serializers.IntegerField(help_text='实验总数')
    orderCount = serializers.IntegerField(help_text='订单总数')
    todayNewUsers = serializers.IntegerField(help_text='今日新增用户')
    todayOrders = serializers.IntegerField(help_text='今日新增订单')
