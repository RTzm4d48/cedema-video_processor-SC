from django.urls import path, include
from api_rest.views import my_apis

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'my_apis', my_apis, basename='my_apis')

urlpatterns = [
    path('', include(router.urls)),
]