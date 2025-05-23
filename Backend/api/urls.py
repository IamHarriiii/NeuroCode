from django.urls import path
from .views import PredictBugView, OptimizeCodeView, GenerateDocsView,ChatbotView

urlpatterns = [
    path("bug-predict/", PredictBugView.as_view(), name="bug-predict"),
    path("optimize/", OptimizeCodeView.as_view(), name="optimize"),
    path("document/", GenerateDocsView.as_view(), name="document"),
    path("chat/", ChatbotView.as_view(), name="chatbot"),
]