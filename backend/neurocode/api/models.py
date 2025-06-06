from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=30, unique=False, null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UsageLog(models.Model):
    ACTION_CHOICES = [
        ('bug-predict', 'Bug Prediction'),
        ('optimize', 'Code Optimization'),
        ('document', 'Documentation Generation'),
        ('chat', 'Chatbot Query')
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    session_id = models.CharField(max_length=100)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    code = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action}"