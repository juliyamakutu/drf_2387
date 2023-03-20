from rest_framework import mixins, permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet

from authapp.models import CustomUser
from authapp.serializers import CustomUserModelSerializer


class CustomUserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    # renderer_classes = [JSONRenderer]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
