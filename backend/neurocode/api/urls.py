from django.urls import path
from .views import (
    PredictBugView, OptimizeCodeView, GenerateDocsView,
    ChatbotView, RegisterView, LoginView,
    UsageLogView, ExportLogsCSV, FilteredLogsView
)

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('bug-predict/', PredictBugView.as_view(), name='bug-predict'),
    path('optimize/', OptimizeCodeView.as_view(), name='optimize'),
    path('document/', GenerateDocsView.as_view(), name='document'),
    path('chat/', ChatbotView.as_view(), name='chatbot'),
    path('logs/', UsageLogView.as_view(), name='usage-logs'),
    path('logs/export/', ExportLogsCSV.as_view(), name='export-logs'),
    path('logs/filter/', FilteredLogsView.as_view(), name='filter-logs'),
]