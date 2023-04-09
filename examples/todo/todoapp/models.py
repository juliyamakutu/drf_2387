from django.db import models

from authapp.models import CustomUser


class Project(models.Model):
    title = models.CharField(max_length=200)
    repo_url = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    users = models.ManyToManyField(CustomUser, related_name="projects")

    def __str__(self):
        return self.title


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="todos")
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
