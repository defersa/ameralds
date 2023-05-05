from rest_framework import serializers


class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class IdNameSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

