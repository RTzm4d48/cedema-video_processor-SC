from django.shortcuts import render # type: ignore
from rest_framework import viewsets, action
from .models import video

# Create your views here.
class traking(viewsets.viewsets):

    @action(detail=True, methods=['get'], url_path='traking')
    def traking(self, request, pk=None):
        video = self.get_object()
        return render(request, 'index.html', {'video': video})