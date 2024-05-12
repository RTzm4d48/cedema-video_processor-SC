from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
import os

# from django.shortcuts import render # type: ignore
# Create your views here..
class my_apis(viewsets.ModelViewSet):

    @action(detail=False, methods=['post'], url_path='create_video')
    def create_video(self, request):
        if request.method == 'POST':
            title = request.data.get('title')
            attach_file = request.FILES.get('attach_file')
            num_item = request.data.get('num_item')
            old_title = request.data.get('old_title')

            binary_data = attach_file.read()
            print(attach_file)

        print('Hola desde la consola')

        self.write_file(request, title, num_item, old_title, attach_file)
        _, extension = os.path.splitext(attach_file.name)
        data = "{ titulo: '"+title+"', extencion: '"+extension+"' number: "+num_item+"'}";
        return Response(data, status=status.HTTP_200_OK)


    def get_queryset(self):
        pass

    def write_file(self, request, title, num_item, old_title, attach_file):
        _, extension = os.path.splitext(attach_file.name)
        with open(f'static/tmp/{num_item}_{title}{extension}', 'wb') as f:
            for chunk in attach_file.chunks():
                f.write(chunk)