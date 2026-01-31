from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task, Category


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)


    class Meta:
        model = User
        fields = ['username', 'email', 'password']


    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['owner']

class TaskSerializer(serializers.ModelSerializer):
    is_overdue = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['owner', 'created_at']

    def get_is_overdue(self, obj):
        return obj.is_overdue()
