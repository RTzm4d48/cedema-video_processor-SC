from django.urls import path # type: ignore
from . import views


urlpatterns = [
    path('', views.hello),
    path('videos/', views.ListVideoView.as_view(), name='n_videos'),
    # path('videos/<int:pk>/', views.ListVideoView.as_view(), name='n_videos')
]