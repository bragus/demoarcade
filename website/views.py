from django.shortcuts import render
from .forms import dados_do_jogadorForm

# Create your views here.

def Mostrar_home (request):
    return render (request, 'home.html')

def Mostrar_sobre (request):
    return render (request, 'sobre.html')

def Mostrar_instrucoes (request):
    return render (request, 'instrucoes.html')

def Mostrar_ranking (request):
    return render (request, 'ranking.html')

def dados_do_jogador_new (request):
    return render (request, 'website/dados_do_jogador_edit.html', {'form':form})