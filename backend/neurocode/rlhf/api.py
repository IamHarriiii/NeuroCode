# backend/rlhf/api.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .data_collector import add_feedback
from .reward_model import train_reward_model

class SubmitFeedback(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        chosen = request.data.get("chosen")
        rejected = request.data.get("rejected")

        if not all([prompt, chosen, rejected]):
            return Response({"error": "Missing required fields"}, status=400)

        add_feedback(prompt, chosen, rejected)
        return Response({"message": "Feedback submitted successfully"}, status=201)


class RetrainRewardModel(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        train_reward_model()
        return Response({"message": "Reward model retraining started"}, status=202)


class CheckTrainingStatus(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        # Placeholder implementation for checking training status
        # In a real implementation, this would check the status of the training task
        return Response({
            "task_id": task_id,
            "status": "running",  # Could be: pending, running, completed, failed
            "progress": 0.5,
            "message": "Training in progress"
        }, status=200)
