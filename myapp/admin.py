from django.contrib import admin  # type: ignore
from .models import guia, video

# Register your models here.
admin.site.register(guia)
admin.site.register(video)
