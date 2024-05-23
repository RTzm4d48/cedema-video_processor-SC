from rest_framework import viewsets # type: ignore
from rest_framework.decorators import action # type: ignore
from rest_framework.response import Response #type: ignore
from rest_framework import status #type: ignore
from myapp.models import guia, video
import os
import glob

# from django.shortcuts import render # type: ignore
# Create your views here..
class my_apis(viewsets.ModelViewSet):

    #region # TODO: CREATE VIDEO
    @action(detail=False, methods=['post'], url_path='create_video')
    def create_video(self, request):
        if request.method == 'POST':
            title = request.data.get('title')
            attach_file = request.FILES.get('attach_file')
            num_item = request.data.get('num_item')
            old_title = request.data.get('old_title')

        if attach_file is None:
            return Response('No hay archivo adjunto', status=status.HTTP_400_BAD_REQUEST)
        _, extension = os.path.splitext(attach_file.name) # Obtenemos la extencion del archivo
        code = "{ titulo: '"+title+"', extencion: '"+extension+"', number: '"+num_item+"'}," # Codigo de insersion en la guia

        self.write_file(request, title, num_item, old_title, attach_file, extension)
        self.save_video(request, title, num_item, extension, code, old_title)

        return Response(code, status=status.HTTP_200_OK)

    


    #region # TODO: DELETED VIDEO
    @action(detail=False, methods=['post'], url_path='deleted_video')
    def deleted_video(self, request):
        if request.method == 'POST':
            item = request.data.get('num_item')
            if item is not None:
                # NOTE : ELIMINAR UN VIDEO
                video.objects.filter(num_item=item).delete()
                self.delete_file(item)
                return Response('UN VIDEO ELIMINADO', status=status.HTTP_200_OK)
            else:
                # NOTE : ELIMINAR TODOS LOS VIDEOS
                video.objects.all().delete()
                self.delete_file(item)
                return Response('TODOS LOS VIEOS ELIMINADOS', status=status.HTTP_200_OK)
        return Response('MÉTODO NO PERMITIDO', status=status.HTTP_405_METHOD_NOT_ALLOWED)

    #region # TODO: SELECT VIDEOS
    @action(detail=False, methods=['get'], url_path='select_videos')
    def select_videos(self, request):
        myvideo = video.objects.all()[::-1]
        
        data = []
        for i in myvideo:
            data.append({'title': i.title, 'num_items': i.num_item, 'extension': i.extension, 'code': i.code, 'id_guia': i.id_guia.name, 'old_title': i.old_title})

        resultados_json = list(data)
        return Response(resultados_json, status=status.HTTP_200_OK)
    
    # ANCHOR UN FILTRO QUE AÚN NO SE COMO FUNCIONA
    def get_queryset(self):
        pass
    # ANCHOR GUARDA LOS VIDEO EN LA BASE DE DATOS
    def save_video(self, request, title, num_item, extension, code, old_title):
        new_video = video(title=title, num_item=num_item, extension=extension, code=code, old_title=old_title, id_guia=guia.objects.get(name='ES-Guia-v'))
        new_video.save()
    # ANCHOR ECRIBE LOS ARCHIVOS EN LA CARPETA TEMPORAL
    def write_file(self, request, title, num_item, old_title, attach_file, extension):
        with open(f'static/tmp/{title}{extension}', 'wb') as f:
            for chunk in attach_file.chunks():
                f.write(chunk)
    # ANCHOR ELIMINA TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
    def delete_file(self, item):
        if item is None:
            # NOTE : ELIMINAR TODOS LOS VIDEOS
            file_list = glob.glob('static/tmp/*') # OBTENER TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
            for file_path in file_list:
                os.remove(file_path)
        else:
            # NOTE : ELIMINAR UN VIDEO
            directory = 'static/tmp/'
            files = os.listdir(directory) # ENLISTAMOS TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
            for file in files:
                if item+'_' in file: # BUSCAMOS EL ARCHIVO QUE CONTENGA EL NUMERO DE ITEM ejem: 1_
                    path = f'{directory}{file}'
                    os.remove(path)
                    break
        