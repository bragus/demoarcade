from django.shortcuts import render, redirect
from website.forms import playerForm
from website.models import *
from django.contrib.auth import authenticate, login

# Create your views here.

def Mostrar_home (request):
    form = playerForm(request.POST or None)
    list_ranking = pontuacao.objects.filter().order_by('pontuacao').reverse()

    if request.POST:
        if form.is_valid(): #Cadastro
            nickname = form.cleaned_data['nickname']
            senha = form.cleaned_data['senha']            

            #Buscar correspondencia no banco          
            #user = authenticate(nickname = nickname, senha = senha)

            nick_existente = player.objects.filter(nickname = nickname).first()

            if nick_existente is not None:

                user = player.objects.filter(nickname = nickname, senha = senha).first()                
                
                if user is not None:
                    
                    valor_pontuacao = 0 
                    campo_pontuacao = pontuacao.objects.filter(player = user).first() 
                    if campo_pontuacao is not None:
                        valor_pontuacao = campo_pontuacao.pontuacao 

                    context = {
                        'nickname' : nickname, 
                        'pontuacao' : valor_pontuacao                        
                    }
                    return render (request, 'game.html', context)
                    #return redirect("/game")  

                else:
                    context = {
                        'formulary':form,
                        'msg' : "Este Nickname ja esta em uso, encontre o seu! Ou digite a senha correta...",
                        'list_ranking': list_ranking,        
                    }
                    return render (request, 'home.html', context) 

            else:
                form.save()
                context = {
                        'nickname' : nickname, 
                        'pontuacao' : 0                           
                }
                return render (request, 'game.html', context) 
            

    context = {
        'formulary': form,
        'list_ranking': list_ranking,
    }

    return render (request, 'home.html', context)

def Mostrar_sobre (request):
    return render (request, 'sobre.html')

def Mostrar_instrucoes (request):
    return render (request, 'instrucoes.html')

def Mostrar_ranking (request):

    list_ranking = pontuacao.objects.filter().order_by('pontuacao').reverse()

    contexto = {        
        "list_ranking": list_ranking,
    }

    print(len(list_ranking))

    return render (request, 'ranking.html', contexto)


def Mostrar_game(request):
    
    #form = playerForm(request.POST or None)

    nickname_js = request.POST.get('nickname_js')

    if nickname_js != None:
        #nickname_js = form.cleaned_data['nickname_js']
        print(nickname_js)
        return render(request, "home.html")
        
        # print(nickname)
        # print(recorde)

    nickname = request.POST.get('nickname')
    recorde = request.POST.get('pontuacao')

    if nickname == None:
        context = {
            'anonimo' : True    
        }
    else:        
        context = {
            'nickname' : nickname,
            'pontuacao' : recorde,     
        }

    return render(request, "game.html", context)



