from django.db import models # type: ignore

# Create your models here.

class guia(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    acronimo = models.CharField(max_length=10, default='')
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

class video(models.Model):
    # Información del video
    video_name = models.CharField(max_length=70, null=False)
    old_name = models.CharField(max_length=70, null=False)
    extension = models.CharField(max_length=10, null=False)

    # Identificadores
    code = models.CharField(max_length=10, null=False) # Codigo Example: 8jd36, null=Falseh
    script = models.TextField(null=False)
    acronimo = models.CharField(max_length=10, null=True) # El acriónimo de la guía simpre mayusculas

    # Imagenes
    video_img_name = models.CharField(max_length=70, default='', null=False) # El nombre de la miniatura del video
    extra_img_name1 = models.CharField(max_length=70, null=True) # El nombre de la imagen extra del video
    extra_img_name2 = models.CharField(max_length=70, null=True) # El nombre de la imagen extra del video
    num_images = models.IntegerField(default=0) # Numero de imagenes que tiene el video

    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.video_name + ' | ' + self.code