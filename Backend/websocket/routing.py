from django.urls import path
from .consumers import CodeEditorConsumer

websocket_urlpatterns = [
    path("ws/code/<str:session_id>/", CodeEditorConsumer.as_asgi()),
]