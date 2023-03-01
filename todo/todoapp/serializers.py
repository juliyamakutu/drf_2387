from rest_framework import serializers
from .models import Todo, Project


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            'title',
            'description',
            'created_at',
            'updated_at',
            'created_by',
            'completed',
        )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'title',
            'repo_url',
            'description',
            'users',
        )
