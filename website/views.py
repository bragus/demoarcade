from django.shortcuts import render
from website.forms import playerForm
from website.models import *

# Create your views here.

def Mostrar_home (request):
    form = playerForm(request.POST or None)
    if form.is_valid():
        form.save()
        context = {
            'msg' : "Você foi cadastrado com sucesso!"
        }
        return render (request, 'home.html', context)
    context = {
        'formulary':form
    }
    return render (request, 'home.html', context)

def Mostrar_sobre (request):
    return render (request, 'sobre.html')

def Mostrar_instrucoes (request):
    return render (request, 'instrucoes.html')

def Mostrar_ranking (request):
    return render (request, 'ranking.html')



