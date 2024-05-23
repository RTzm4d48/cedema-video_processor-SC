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
    video_name = models.CharField(max_length=70, default='')
    img_name = models.CharField(max_length=70, default='') # El nombre de la miniatura del video
    old_name = models.CharField(max_length=70, default='')
    extension = models.CharField(max_length=10, default='')
    code = models.CharField(max_length=10, default='', null=False) # Codigo Example: 8jd36h
    script = models.TextField(null=True)
    acronimo = models.CharField(max_length=10, default='') # El acriónimo de la guía simpre mayusculas
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.video_name + ' | ' + self.code