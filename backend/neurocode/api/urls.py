from django.urls import path, include
from .views import (
    PredictBugView, OptimizeCodeView, GenerateDocsView, ChatbotView,
    RegisterView, LoginView, UsageLogView, ExportLogsCSV, FilteredLogsView,
    AddDocumentView
)
from .rlhf_views import SubmitFeedback  # <-- Imported the new feedback view
from .feedback_dashboard import feedback_dashboard

urlpatterns = [
    # Authentication routes
    path('signup/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    
    # AI feature routes
    path('bug-predict/', PredictBugView.as_view(), name='bug-predict'),
    path('optimize/', OptimizeCodeView.as_view(), name='optimize'),
    path('document/', GenerateDocsView.as_view(), name='document'),
    path('chat/', ChatbotView.as_view(), name='chatbot'),
    path('add-document/', AddDocumentView.as_view(), name='add-document'),
    
    # Logging routes
    path('logs/', UsageLogView.as_view(), name='usage-logs'),
    path('logs/export/', ExportLogsCSV.as_view(), name='export-logs'),
    path('logs/filter/', FilteredLogsView.as_view(), name='filter-logs'),
    
    # Feedback routes
    path('feedback/', SubmitFeedback.as_view(), name='submit-feedback'),  # <-- Added direct feedback endpoint
    path('feedback/', include('rlhf.urls')),  # <-- Kept existing feedback namespace
    path('feedback/dashboard/', feedback_dashboard, name='feedback-dashboard'),
]