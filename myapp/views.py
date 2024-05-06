from django.shortcuts import render # type: ignore

# Create your views here.

def hello(request):
    return render(request, 'index.html')