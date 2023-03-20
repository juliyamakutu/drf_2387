import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, APIRequestFactory, force_authenticate, APISimpleTestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from authapp.views import CustomUserViewSet
from todoapp.models import Todo
from authapp.models import CustomUser

class TestCustomUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/users/',
            {
                'username': 'makutu',
                'first_name': 'Юлия',
                'last_name': 'Брюховских',
                'email': 'mail@mail.ru',
            },
            format='json'
        )
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/users/',
            {
                'username': 'makutu',
                'first_name': 'Юлия',
                'last_name': 'Брюховских',
                'email': 'mail@mail.ru',
            },
            format='json')
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = CustomUser.objects.create(
            username='makutu',
            first_name= 'Юлия',
            last_name='Брюховских',
            email='mail@mail.ru'
        )
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_guest(self):
        user = CustomUser.objects.create(
            username='makutu',
            first_name='Юлия',
            last_name='Брюховских',
            email='mail@mail.ru'
        )
        client = APIClient()
        response = client.put(
            f'/api/users/{user.id}/',
            {
                'username': 'makutu',
                'first_name': 'Юлия',
                'last_name': 'Брюховских',
                'email': 'mail@mail.ru',
            })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = CustomUser.objects.create(
            username='user1',
            first_name='John',
            last_name='Doe',
            email='jd@mail.ru'
        )
        CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client = APIClient()
        client.login(username='admin', password='admin123456')
        response = client.put(
            f'/api/users/{user.id}/',
            {
                'username': 'user2',
                'first_name': 'Jane',
                'last_name': 'Dow',
                'email': 'dj@mail.ru',
            })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = CustomUser.objects.get(id=user.id)
        self.assertEqual(user.username, 'user2')
        self.assertEqual(user.first_name, 'Jane')
        self.assertEqual(user.last_name, 'Dow')
        self.assertEqual(user.email, 'dj@mail.ru')
        client.logout()


