from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.contrib.admin.views.decorators import staff_member_required
from .models import RewardFeedback

@staff_member_required
@require_http_methods(["GET"])
def feedback_dashboard(request):
    """
    Admin-only dashboard to review and filter feedback before training.
    """
    query_params = request.GET
    feedbacks = RewardFeedback.objects.all().order_by("-timestamp")

    # Apply filters
    if "task" in query_params:
        feedbacks = feedbacks.filter(task=query_params["task"])

    if "start_date" in query_params and "end_date" in query_params:
        feedbacks = feedbacks.filter(
            timestamp__range=[query_params["start_date"], query_params["end_date"]]
        )

    context = {
        "feedbacks": feedbacks,
        "tasks": list(set(feedbacks.values_list("task", flat=True).distinct())),
    }

    return render(request, "api/feedback_dashboard.html", context)