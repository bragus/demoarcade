from django.shortcuts import render

# Create your views here.

def Mostrar_home (request):
    return render (request, 'home.html')

def Mostrar_sobre (request):
    return render (request, 'sobre.html')

def Mostrar_instrucoes (request):
    return render (request, 'instrucoes.html')

def Mostrar_ranking (request):
    return render (request, 'ranking.html')