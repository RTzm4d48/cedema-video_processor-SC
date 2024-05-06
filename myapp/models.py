from django.db import models # type: ignore

# Create your models here.

class guia(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class video(models.Model):
    tittle = models.CharField(max_length=70)
    total_items = models.IntegerField()
    before_tittle = models.CharField(max_length=70)
    id_guia = models.ForeignKey(guia, on_delete=models.CASCADE)

    def __str__(self):
        return self.tittle + ' | ' + self.id_guia.name
    
    def calcular_siguiente_registro(self):
        return self.total_items + 1