from django.contrib.auth.models import User
from rest_framework import serializers
from ..models import Person


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['verify', 'location']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'is_staff', 'person']
