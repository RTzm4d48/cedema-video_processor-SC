from django.shortcuts import render # type: ignore
from .models import guia, video
from django.views.generic import ListView # type: ignore
# Create your views here.

def hello(request):

    return render(request, 'index.html')


class ListVideoView(ListView):
    model = video
    template_name = 'index.html'
    context_object_name = 'videos'

    def get(self, request):
        video_data = video.objects.values('id', 'tittle', 'total_items', 'before_tittle', 'id_guia__name')
        video_data_json = list(video_data)

        num_item = video.objects.all()
        num_item_json = list(num_item)
        # num_item.calculate_siguiente_registro()
        
        print(num_item_json)
        print("Hola")

        with open('static/textoLENAY.txt', 'w') as f:
            f.write('linea uno')
        print('Archivo creado')
        print('última linea de código')

        return render(request, 'index.html', {'videos': video_data_json})