from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.faiss_utils import retrieve_context_from_faiss, build_faiss_index
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import UsageLog
from .serializers import RegisterSerializer, LoginSerializer, CodeInputSerializer, UsageLogSerializer
import requests
import logging
import json

logger = logging.getLogger(__name__)

def run_model_inference(code, mode="bug"):
    try:
        response = requests.post("http://model-server:5000/infer/", json={"code": code, "mode": mode})
        logger.info(f"Inference request sent to model server: {response.status_code}")
        return response.json().get("response", "")
    except Exception as e:
        logger.error(f"Model inference failed: {e}")
        return str(e)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User registered successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PredictBugView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CodeInputSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data["code"]
            result = run_model_inference(code, mode="bug")
            UsageLog.objects.create(
                user=request.user,
                session_id="temp_session",
                action="bug-predict",
                code=code,
                response=result
            )
            return Response({"response": result}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OptimizeCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CodeInputSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data["code"]
            result = run_model_inference(code, mode="optimize")
            UsageLog.objects.create(
                user=request.user,
                session_id="temp_session",
                action="optimize",
                code=code,
                response=result
            )
            return Response({"response": result}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GenerateDocsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CodeInputSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data["code"]
            result = run_model_inference(code, mode="doc")
            UsageLog.objects.create(
                user=request.user,
                session_id="temp_session",
                action="document",
                code=code,
                response=result
            )
            return Response({"response": result}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        question = request.data.get("question")
        if not question:
            return Response({"error": "Question is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve relevant context using FAISS
        context = retrieve_context_from_faiss(question)
        
        # Build prompt with context
        prompt = f"### Developer Q&A\nContext:\n{context}\n\nQuestion:\n{question}\nAnswer:"
        
        # Run inference with context-aware prompt
        result = run_model_inference(prompt, mode="chat")

        # Log usage
        UsageLog.objects.create(
            user=request.user,
            session_id="temp_session",
            action="chat",
            code=prompt,
            response=result
        )

        return Response({"response": result})


class UsageLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = UsageLog.objects.filter(user=request.user).order_by("-timestamp")[:100]
        serializer = UsageLogSerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExportLogsCSV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        import csv
        from django.http import HttpResponse

        logs = UsageLog.objects.filter(user=request.user).order_by("-timestamp")

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="usage_logs.csv"'

        writer = csv.writer(response)
        writer.writerow(['Timestamp', 'Session ID', 'Action', 'Code', 'Response'])

        for log in logs:
            writer.writerow([log.timestamp, log.session_id, log.action, log.code, log.response])

        return response


class FilteredLogsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = UsageLog.objects.filter(user=request.user)

        action = request.GET.get("action")
        start = request.GET.get("start")
        end = request.GET.get("end")

        if action:
            logs = logs.filter(action=action)
        if start and end:
            logs = logs.filter(timestamp__range=[start, end])

        logs = logs.order_by("-timestamp")[:200]
        serializer = UsageLogSerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddDocumentView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        document = request.data.get("document")
        if not document:
            return Response({"error": "Missing document content"}, status=status.HTTP_400_BAD_REQUEST)

        # Load existing documents
        try:
            with open("api/faiss_index/documents.json", "r") as f:
                documents = json.load(f)
        except FileNotFoundError:
            documents = []

        # Append new document
        documents.append(document)

        # Save updated documents
        with open("api/faiss_index/documents.json", "w") as f:
            json.dump(documents, f)

        # Rebuild FAISS index
        try:
            build_faiss_index(documents, save_path="api/faiss_index")
            return Response({"message": "Document added and index rebuilt successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Failed to rebuild FAISS index: {e}")
            return Response({"error": "Failed to rebuild index"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)