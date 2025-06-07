from django.contrib import admin
from .models import CustomUser, UsageLog, RewardFeedback

@admin.register(RewardFeedback)
class RewardFeedbackAdmin(admin.ModelAdmin):
    list_display = ("timestamp", "task", "prompt_preview", "chosen_preview", "rejected_preview")
    search_fields = ["prompt", "chosen", "rejected"]
    list_filter = ["task"]

    def prompt_preview(self, obj):
        return obj.prompt[:50] + "..." if obj.prompt else ""

    def chosen_preview(self, obj):
        return obj.chosen[:50] + "..." if obj.chosen else ""

    def rejected_preview(self, obj):
        return obj.rejected[:50] + "..." if obj.rejected else ""

    prompt_preview.short_description = "Prompt"
    chosen_preview.short_description = "Chosen"
    rejected_preview.short_description = "Rejected"