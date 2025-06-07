from django.urls import path
from .api import SubmitFeedback, RetrainRewardModel, CheckTrainingStatus

urlpatterns = [
    path('feedback/', SubmitFeedback.as_view(), name='submit-feedback'),
    path('train-reward/', RetrainRewardModel.as_view(), name='retrain-reward-model'),
    path('train-status/<str:task_id>/', CheckTrainingStatus.as_view(), name='check-training-status'),
]