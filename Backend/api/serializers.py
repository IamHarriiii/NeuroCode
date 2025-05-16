from rest_framework import serializers

class CodeInputSerializer(serializers.Serializer):
    code = serializers.CharField()