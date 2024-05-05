from django.urls import path
from . import views # corto y pego de ./mysite/urls.py

urlpatterns = [
    path('', views.hello),
    # path('about/', views.about) #corto y pego de ./mysite/urls.py
]