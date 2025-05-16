from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CodeInputSerializer
from .utils import run_model_inference, retrieve_context_from_faiss


class PredictBugView(APIView):
    def post(self, request):
        serializer = CodeInputSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data["code"]
            result = run_model_inference(code, mode="bug")
            return Response(result)
        return Response(serializer.errors, status=400)


class OptimizeCodeView(APIView):
    def post(self, request):
        serializer = CodeInputSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data["code"]
            result = run_model_inference(code, mode="optimize")
            return Response(result)
        return Response(serializer.errors, status=400)


class GenerateDocsView(APIView):
    def post(self, request):
        serializer = CodeInputSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data["code"]
            result = run_model_inference(code, mode="doc")
            return Response(result)
        return Response(serializer.errors, status=400)


class ChatbotView(APIView):
    def post(self, request):
        question = request.data.get("question")
        if not question:
            return Response({"error": "No question provided"}, status=400)

        context = retrieve_context_from_faiss(question)
        prompt = f"### Developer Q&A Context:\n{context}\n\n### Question:\n{question}\n### Answer:"

        response = run_model_inference(prompt, mode="chat")
        return Response({"answer": response})