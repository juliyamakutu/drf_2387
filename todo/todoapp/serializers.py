from rest_framework import serializers

from authapp.serializers import CustomUserModelSerializer
from .models import Todo, Project


class TodoReadSerializer(serializers.ModelSerializer):
    created_by = CustomUserModelSerializer(read_only=True)
    project = serializers.StringRelatedField(source='project.title')

    class Meta:
        model = Todo
        fields = (
            'id',
            'project',
            'title',
            'description',
            'created_at',
            'updated_at',
            'created_by',
            'completed',
        )


class TodoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            'project',
            'title',
            'description',
            'created_by',
            'completed',
        )


class TodoReadSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            'id',
            'project',
            'title',
            'description',
            'created_at',
            'updated_at',
            'created_by',
            'completed',
        )


class ProjectReadSerializer(serializers.ModelSerializer):
    todos = TodoReadSerializer(many=True, read_only=True)
    users = CustomUserModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'repo_url',
            'description',
            'users',
            'todos',
        )


class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'title',
            'repo_url',
            'description',
            'users',
        )
