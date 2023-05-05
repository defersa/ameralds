from django.contrib.auth.models import User
from rest_framework import serializers
from ..models import Person
from ..common.serializers import IdSerializer


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    # Притащить это сюда
    # orders =
    patterns = IdSerializer(many=True)

    class Meta:
        model = Person
        fields = ['verify', 'location', 'patterns']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'is_staff', 'person']
