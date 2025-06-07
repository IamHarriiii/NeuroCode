# backend/rlhf/models.py

from django.db import models

class RewardFeedback(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    prompt = models.TextField()
    chosen = models.TextField()
    rejected = models.TextField()

    def __str__(self):
        return f"{self.timestamp}: {self.prompt[:50]}..."