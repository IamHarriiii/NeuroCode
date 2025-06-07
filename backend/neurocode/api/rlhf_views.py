# backend/api/rlhf_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rlhf.data_collector import add_feedback

class SubmitFeedback(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        chosen = request.data.get("chosen")
        rejected = request.data.get("rejected")
        task = request.data.get("task", "bug")

        if not all([prompt, chosen, rejected]):
            return Response({"error": "Missing required fields"}, status=400)

        add_feedback(prompt, chosen, rejected, task)
        return Response({"message": "Feedback submitted successfully"}, status=201)