from django.db import models # type: ignore

# Create your models here.

class guia(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class video(models.Model):
    title = models.CharField(max_length=70, default='')
    num_items = models.IntegerField(default=0)
    extension = models.CharField(max_length=10, default='')
    code = models.TextField(null=True)
    id_guia = models.ForeignKey(guia, on_delete=models.CASCADE)

    def __str__(self):
        return self.title + ' | ' + self.id_guia.name
    
    def calcular_siguiente_registro(self):
        return self.num_items + 1