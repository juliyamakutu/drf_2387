from django.db import models

from authapp.models import CustomUser


class Project(models.Model):
    title = models.CharField(max_length=200)
    repo_url = models.URLField()
    description = models.TextField()
    users = models.ManyToManyField(CustomUser, related_name="projects")

    def __str__(self):
        return self.title


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
