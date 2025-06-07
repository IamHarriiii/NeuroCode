from celery import current_app
from celery.result import AsyncResult
from django.http import JsonResponse
from django.views import View
from .tasks import async_retrain_reward_model

class RetrainRewardModel(View):
    def get(self, request):
        task = async_retrain_reward_model.delay()
        return JsonResponse({"task_id": task.id}, status=202)

class CheckTrainingStatus(View):
    def get(self, request, task_id):
        task_result = AsyncResult(task_id, app=current_app)
        return JsonResponse({
            "task_id": task_id,
            "status": task_result.status,
            "result": task_result.result if task_result.ready() else None
        })