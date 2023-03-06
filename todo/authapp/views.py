from rest_framework import mixins
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet

from authapp.models import CustomUser
from authapp.serializers import CustomUserModelSerializer


class CustomUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    # renderer_classes = [JSONRenderer]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
