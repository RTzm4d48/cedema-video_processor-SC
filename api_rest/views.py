# from django.shortcuts import render # type: ignore
from rest_framework import viewsets
from myapp.models import guia, video
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
class traking(viewsets.ModelViewSet):
    @action(detail=True, methods=['get'], url_path='traking')
    def traking(self, request, pk=None):
        print('Hola desde la consola')
        data = {
            'mensaje': '¡Hola desde tu API en Django! MrBestia conejo malvado',
        }
        return Response(data)


@api_view(['GET'])
def mi_vista_api(request):
    # Aquí puedes escribir tu lógica para obtener datos
    print('Hola desde la consola')
    data = {
        'mensaje': '¡Hola desde tu API en Django! MrBestia',
    }
    return Response(data)