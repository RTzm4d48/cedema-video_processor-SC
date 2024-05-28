from rest_framework import viewsets # type: ignore
from rest_framework.decorators import action # type: ignore
from rest_framework.response import Response #type: ignore
from rest_framework import status #type: ignore
from myapp.models import guia, video
import os
import glob
import base64

from PIL import Image
import io

# from django.shortcuts import render # type: ignore
# Create your views here..
class my_apis(viewsets.ModelViewSet):

    #region # TODO: CREATE VIDEO
    @action(detail=False, methods=['post'], url_path='create_video')
    def create_video(self, request):
        if request.method == 'POST':
            video_name = request.data.get('video_name')
            old_name = request.data.get('old_name')
            code = request.data.get('code')
            acronym = request.data.get('acronym')
            attach_file = request.FILES.get('attach_file')
            images_num = request.data.get('images_num')

            #images captured
            images_list = []
            for i in range(int(images_num)):
                images_list.append(request.data.get(f'generated_img_{i+1}'))

        if attach_file is None:
            return Response('No hay archivo adjunto', status=status.HTTP_400_BAD_REQUEST)
        _, extension = os.path.splitext(attach_file.name) # Obtenemos la extencion del archivo

        new_video_name = video_name.replace(' ', '_')
        file_name = new_video_name+"-"+acronym+"-"+code
        script = "{ name: '"+video_name+"', extencion: '"+extension+"', acronimo: '"+acronym+"', files_name: '"+file_name+"', images_num: "+images_num+"}," # Codigo de insersion en la guia

        self.write_file(request, file_name, attach_file, images_num, extension, images_list)
        self.save_video(request, video_name, old_name, extension, file_name, code, script, acronym, images_num)

        return Response({'messaje': 'successfull'}, status=status.HTTP_200_OK)

    #region # TODO: DELETED VIDEO
    @action(detail=False, methods=['post'], url_path='deleted_video')
    def deleted_video(self, request):
        if request.method == 'POST':
            item = request.data.get('num_item')
            if item is None:
                # NOTE : ELIMINAR TODOS LOS VIDEOS
                video.objects.all().delete()
                self.delete_file(item)
                return Response({'datail': 'successfull'}, status=status.HTTP_200_OK)
            else:
                # NOTE : ELIMINAR UN VIDEO
                video.objects.filter(num_item=item).delete()
                self.delete_file(item)
                return Response({'datail': 'successfull'}, status=status.HTTP_200_OK)
        return Response({'datail': 'metodo no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    #region # TODO: SELECT VIDEOS
    @action(detail=False, methods=['get'], url_path='select_videos')
    def select_videos(self, request):
        myvideo = video.objects.all()[::-1]
        
        data = []
        for i in myvideo:
            data.append({'video_name': i.video_name, 'old_name': i.old_name, 'extension': i.extension, 'file_name': i.file_name, 'code': i.code, 'script': i.script, 'acronym': i.acronimo, 'images_num': i.num_images, 'date': i.date})

        resultados_json = list(data)
        return Response(resultados_json, status=status.HTTP_200_OK)
    
    #region # TODO: SELECTS GUIAS
    @action(detail=False, methods=['get'], url_path='slecet_guias')
    def traking(self, request, pk=None):
        myvideo = guia.objects.all()
        
        data = []
        for i in myvideo:
            data.append({'name': i.name, 'description': i.description, 'acronimo': i.acronimo})

        resultados_json = list(data)
        return Response(resultados_json, status=status.HTTP_200_OK)

    # ANCHOR UN FILTRO QUE AÚN NO SE COMO FUNCIONA
    def get_queryset(self):
        pass
    # ANCHOR GUARDA LOS VIDEO EN LA BASE DE DATOS
    def save_video(self, request, video_name, old_name, extension, file_name, code, script, acronym, images_num):
        new_video = video(video_name=video_name, old_name=old_name, extension=extension, file_name=file_name, code=code, script=script, acronimo=acronym, num_images=images_num)
        new_video.save()
    # ANCHOR ECRIBE LOS ARCHIVOS EN LA CARPETA TEMPORAL
    def write_file(self, request, file_name, attach_file, images_num, extension, images_list):
        # NOTE : ESCRIBIMOS EL VIDEO
        with open(f'static/tmp/videos/{file_name}-i{images_num}{extension}', 'wb') as f:
            for chunk in attach_file.chunks():
                f.write(chunk)
        # NOTE : ESCRIBIMOS LAS IMAGESNES
        i = 0
        for imgcapture in images_list:
            i += 1
            if imgcapture is None:
                print('No hay imagen')
            else:
                img_data = imgcapture.replace('data:image/jpeg;base64,', '')  # Eliminar el prefijo
                img_data = base64.b64decode(img_data)  # Decodificar los datos con base64
                img = Image.open(io.BytesIO(img_data))  # Crear una imagen PIL a partir de los datos
                img.save(f'static/tmp/images/{file_name}-{i}.png', 'PNG') # Guardar la imagen en formato PNG
                # with open(f'static/tmp/images/{file_name}-{i}.png', 'wb') as f:
                #     f.write(img_data)
    # ANCHOR ELIMINA TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
    def delete_file(self, item):
        if item is None:
            # NOTE : ELIMINAR TODOS LOS VIDEOS
            file_list = glob.glob('static/tmp/videos/*') # OBTENER TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
            for file_path in file_list:
                os.remove(file_path)
            # NOTE : ELIMINAR TODOS LOS IMAGES
            file_list = glob.glob('static/tmp/images/*') # OBTENER TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
            for file_path in file_list:
                os.remove(file_path)
        else:
            # NOTE : ELIMINAR UN VIDEO
            directory = 'static/tmp/videos/'
            files = os.listdir(directory) # ENLISTAMOS TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
            for file in files:
                if item+'_' in file: # BUSCAMOS EL ARCHIVO QUE CONTENGA EL NUMERO DE ITEM ejem: 1_
                    path = f'{directory}{file}'
                    os.remove(path)
                    break
        