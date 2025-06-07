# backend/rlhf/admin.py

from django.contrib import admin
import pandas as pd
from .models import RewardFeedback

@admin.register(RewardFeedback)
class RewardFeedbackAdmin(admin.ModelAdmin):
    list_display = ("timestamp", "prompt_preview", "chosen_preview", "rejected_preview")
    search_fields = ["prompt", "chosen", "rejected"]

    def prompt_preview(self, obj):
        return obj.prompt[:50] + "..."

    def chosen_preview(self, obj):
        return obj.chosen[:50] + "..."

    def rejected_preview(self, obj):
        return obj.rejected[:50] + "..."

    prompt_preview.short_description = "Prompt"
    chosen_preview.short_description = "Chosen"
    rejected_preview.short_description = "Rejected"