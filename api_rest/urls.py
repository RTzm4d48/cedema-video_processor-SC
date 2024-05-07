from django.urls import path
from .views import mi_vista_api, traking

urlpatterns = [
    path('api/mi-endpoint/', mi_vista_api, name='mi-vista-api'),
    path('api/traking', traking.as_view({'get': 'traking'}), name='traking'),
]