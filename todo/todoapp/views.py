from rest_framework import status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from todoapp.models import Project, Todo
from todoapp.serializers import (
    TodoCreateSerializer,
    TodoReadSerializer,
    ProjectReadSerializer,
    ProjectCreateSerializer,
)


class TenPageNumberPagination(PageNumberPagination):
    page_size = 10


class TwentyPageNumberPagination(PageNumberPagination):
    page_size = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    # pagination_class = TenPageNumberPagination


    def get_serializer_class(self):
        if self.action == 'create':
            return ProjectCreateSerializer
        return ProjectReadSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        title = self.request.query_params.get('title')
        if title:
            queryset = queryset.filter(title__icontains=title)
        return queryset


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    # pagination_class = TwentyPageNumberPagination

    def get_serializer_class(self):
        if self.action == 'create':
            return TodoCreateSerializer
        return TodoReadSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        project = self.request.query_params.get('project')
        if project:
            queryset = queryset.filter(project__title__icontains=project)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.completed = True
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)