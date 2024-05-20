# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import guia, video

@receiver(post_save, sender=video)
def create_profile(sender, instance, created, **kwargs):
    if created:
        print("ÑÑÑÑÑÑÑÑÑÑÑÑÑÑOOOOOOOOOOOOOOLLLLLLLLLLLLAAAAAAAAAAAAAAAAAA")