from django.shortcuts import render
from website.models import *

# Create your views here.

def Mostrar_home (request):
    return render (request, 'home.html')

def Mostrar_instrucoes (request):
    return render (request, 'instrucoes.html')