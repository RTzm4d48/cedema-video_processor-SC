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
    file_name = models.TextField(null=False)

    # Identificadores
    code = models.CharField(max_length=10, null=False) # Codigo Example: 8jd36, null=Falseh
    script = models.TextField(null=False)
    acronimo = models.CharField(max_length=10, null=True) # El acriónimo de la guía simpre mayusculas

    num_images = models.IntegerField(default=0) # Numero de imagenes que tiene el video

    fecha = models.TextField(default='')
    position = models.TextField(default='') # Posición horizontal o vertical del video


    def __str__(self):
        return self.video_name + ' | ' + self.code