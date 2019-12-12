from django.shortcuts import render

def Mostrar_game(request):

    nome = request.POST.get('nick')
    print(nome)

    context = {
        'player' : "teste usuario",
        'msg' : "Você foi logado com sucesso!"        
    }

    return render(request, "game.html", context)
