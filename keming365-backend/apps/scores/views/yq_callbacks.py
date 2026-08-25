# -*- coding: utf-8 -*-
"""
Cloud rendering callbacks.

These endpoints replace the legacy JSP callbacks used by YQ/LarkXR:
- /experiment/data/save
- /experiment/useTime
"""

from decimal import Decimal, InvalidOperation
import hashlib
import hmac
import time
from uuid import uuid4

from django.conf import settings
from django.utils.timezone import now
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.scores.models import TbExperimentScore, TbExperimentUsetime, TbPersonScore


def _payload(request):
    data = {}
    data.update(request.GET.dict())
    if hasattr(request, 'data') and request.data:
        data.update(request.data.items())
    else:
        data.update(request.POST.dict())
    return data


def _first(data, *keys, default=''):
    for key in keys:
        value = data.get(key)
        if value not in (None, ''):
            return str(value)
    return default


def _decimal(value, default='0'):
    try:
        return Decimal(str(value if value not in (None, '') else default))
    except (InvalidOperation, TypeError, ValueError):
        return Decimal(default)
-

    
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def yq_score_callback(request):
    data = _payload(request)
    user_id = _first(data, 'userId', 'user_id', 'uid')
    curriculum_id = _first(data, 'curriculumId', 'curriculum_id', 'cid')
    experiment_id = _first(data, 'experimentId', 'experiment_id', 'eid')
    user_type = _first(data, 'userType', 'user_type')
    score = _decimal(_first(data, 'score', 'operationScore', 'operation_score', default='0'))

    if not user_id or not curriculum_id or not experiment_id:
        return Response({'code': 1, 'flag': 0, 'msg': 'missing required params'})
    if not _authorize_callback(data, 'score', user_id, curriculum_id, experiment_id):
        return Response({'code': 403, 'flag': 0, 'msg': 'invalid callback signature'}, status=403)

    timestamp = now()
    if user_type == '5':
        obj = TbPersonScore.objects.filter(userId=user_id, cid=curriculum_id, eid=experiment_id).first()
        if obj:
            obj.score = score
            obj.updateTime = timestamp
            obj.save(update_fields=['score', 'updateTime'])
        else:
            TbPersonScore.objects.create(
                id=str(uuid4()),
                userId=user_id,
                cid=curriculum_id,
                eid=experiment_id,
                score=score,
                flag='1',
                createTime=timestamp,
                updateTime=timestamp,
            )
    else:
        obj = TbExperimentScore.objects.filter(userId=user_id, experimentId=experiment_id).first()
        if obj:
            obj.curriculumId = curriculum_id or obj.curriculumId
            obj.operationScore = score
            obj.scoreSum = score if obj.reportScore in (None, '') else obj.scoreSum
            obj.updateTime = timestamp
            obj.save(update_fields=['curriculumId', 'operationScore', 'scoreSum', 'updateTime'])
        else:
            TbExperimentScore.objects.create(
                id=str(uuid4()),
                userId=user_id,
                curriculumId=curriculum_id,
                experimentId=experiment_id,
                operationScore=score,
                scoreSum=score,
                flag=1,
                createTime=timestamp,
                updateTime=timestamp,
            )

    return Response({'code': 0, 'flag': 1, 'msg': 'success'})


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def yq_usage_callback(request):
    data = _payload(request)
    user_id = _first(data, 'userId', 'user_id', 'uid')
    curriculum_id = _first(data, 'curriculumId', 'curriculum_id', 'cid')
    experiment_id = _first(data, 'experimentId', 'experiment_id', 'eid')
    school_id = _first(data, 'schoolId', 'school_id', 'experimentType')
    use_time = _first(data, 'useTime', 'use_time', 'newUsetime', 'newUseTime', 'timeUsed', default='0')

    if not user_id or not curriculum_id or not experiment_id:
        return Response({'code': 1, 'msg': 'missing required params'})
    if not _authorize_callback(data, 'usage', user_id, curriculum_id, experiment_id):
        return Response({'code': 403, 'flag': 0, 'msg': 'invalid callback signature'}, status=403)

    timestamp = now()
    obj = TbExperimentUsetime.objects.filter(userId=user_id, cid=curriculum_id, eid=experiment_id).first()
    if obj:
        obj.newUsetime = use_time
        obj.usetime = str(_safe_int(obj.usetime) + _safe_int(use_time))
        obj.updateTime = timestamp
        obj.save(update_fields=['newUsetime', 'usetime', 'updateTime'])
    else:
        TbExperimentUsetime.objects.create(
            id=str(uuid4()),
            cid=curriculum_id,
            eid=experiment_id,
            userId=user_id,
            newUsetime=use_time,
            usetime=use_time,
            experimentType=school_id,
            flag=1,
            
            createTime=timestamp,
            updateTime=timestamp,
        )

    return Response({'code': 0, 'flag': 1, 'msg': 'success'})


def _safe_int(value):
    try:
        return int(float(value or 0))
    except (TypeError, ValueError):
        return 0
