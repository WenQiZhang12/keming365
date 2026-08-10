from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.scores.models import TbExperimentScore


class QuizScoreSubmitView(APIView):
    """Save a locally-rendered quiz result as the experiment operation score."""

    permission_classes = [IsAuthenticated]

    def post(self, request, experiment_id: str):
        try:
            score = float(request.data.get('score'))
        except (TypeError, ValueError):
            return Response({'detail': 'score must be a number'}, status=status.HTTP_400_BAD_REQUEST)
        if score < 0 or score > 100:
            return Response({'detail': 'score must be between 0 and 100'}, status=status.HTTP_400_BAD_REQUEST)

        identities = [str(request.user.id), str(getattr(request.user, 'username', '') or '')]
        phone = str(getattr(request.user, 'telephone', '') or getattr(request.user, 'phone', '') or '')
        if phone:
            identities.append(phone)
        score_record = TbExperimentScore.objects.filter(
            experimentId=experiment_id,
            userId__in=[value for value in identities if value],
        ).first()
        if score_record is None:
            return Response({'detail': 'experiment score record not found'}, status=status.HTTP_404_NOT_FOUND)

        score_record.operationScore = round(score, 2)
        score_record.save(update_fields=['operationScore', 'updateTime'])
        return Response({'operationScore': str(score_record.operationScore)})
