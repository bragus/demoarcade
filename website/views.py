from django.shortcuts import render, redirect
from website.forms import playerForm
from website.models import *
from django.contrib.auth import authenticate, login

# Create your views here.

def Mostrar_home (request):
    form = playerForm(request.POST or None)

    if request.POST:
        if form.is_valid(): #Cadastro
            nickname = form.cleaned_data['nickname']
            senha = form.cleaned_data['senha']            

            #Buscar correspondencia no banco          
            user = authenticate(nickname = nickname, senha = senha)
            if user is not None:
                context = {
                    'msg' : "Você foi logado com sucesso!"        
                }
                return redirect("/game")  

            else:
                form.save()
                context = {
                    'msg' : "Você foi cadastrado com sucesso!"        
                }
                return redirect("/game")      
            

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



