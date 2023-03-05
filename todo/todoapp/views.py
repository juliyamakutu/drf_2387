from rest_framework.viewsets import ModelViewSet
from todoapp.models import Project, Todo
from todoapp.serializers import (
    TodoCreateSerializer,
    TodoReadSerializer,
    ProjectReadSerializer,
    ProjectCreateSerializer,
)


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return ProjectCreateSerializer
        return ProjectReadSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return TodoCreateSerializer
        return TodoReadSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset
