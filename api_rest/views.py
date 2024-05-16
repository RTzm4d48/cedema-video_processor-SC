from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
import os
from myapp.models import guia, video

# from django.shortcuts import render # type: ignore
# Create your views here..
class my_apis(viewsets.ModelViewSet):

    # video = video.objects.all()

    @action(detail=False, methods=['post'], url_path='create_video')
    def create_video(self, request):
        if request.method == 'POST':
            title = request.data.get('title')
            attach_file = request.FILES.get('attach_file')
            num_item = request.data.get('num_item')
            old_title = request.data.get('old_title')

        print("----------------")
        print(title)
        print(num_item)
        print(attach_file)
        print(old_title)
        print('Hola desde la consola VAMONOOOS')
        if attach_file is None:
            return Response('No hay archivo adjunto', status=status.HTTP_400_BAD_REQUEST)
        
        _, extension = os.path.splitext(attach_file.name) # Obtenemos la extencion del archivo
        code = "{ titulo: '"+title+"', extencion: '"+extension+"' number: '"+num_item+"'}" # Codigo de insersion en la guia

        self.write_file(request, title, num_item, old_title, attach_file, extension)
        self.save_video(request, title, num_item, extension, code, old_title)
        # code = {
        #     'mensaje': '¡Hola desde tu API en Django! MrBestia',
        # }

        return Response(code, status=status.HTTP_200_OK)


    def get_queryset(self):
        pass

    def write_file(self, request, title, num_item, old_title, attach_file, extension):
        with open(f'static/tmp/{num_item}_{title}{extension}', 'wb') as f:
            for chunk in attach_file.chunks():
                f.write(chunk)

    @action(detail=False, methods=['get'], url_path='deleted_video')
    def deleted_video(self, request):
        video.objects.all().delete()
        # myvideo = video.objects.all()
        # for i in myvideo:
        #     print(i.title)
        
        return Response('Video eliminado', status=status.HTTP_200_OK)
    
    def save_video(self, request, title, num_item, extension, code, old_title):
        new_video = video(title=title, num_item=num_item, extension=extension, code=code, old_title=old_title, id_guia=guia.objects.get(name='ES-Guia-v'))
        new_video.save()

    @action(detail=False, methods=['get'], url_path='select_videos')
    def select_videos(self, request):
        myvideo = video.objects.all()
        data = []
        for i in myvideo:
            print(i.title)
            data.append({'title': i.title, 'num_items': i.num_item, 'extension': i.extension, 'code': i.code, 'id_guia': i.id_guia.name, 'old_title': i.old_title})

        resultados_json = list(data)

        return Response(resultados_json, status=status.HTTP_200_OK)