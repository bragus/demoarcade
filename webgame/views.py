from django.shortcuts import render

def Mostrar_game(request):

    # nome = request.POST.get('nickname')
    # pontuacao = request.POST.get('pontuacao')

    # if nome == None:
    #     context = {
    #         'anonimo' : True    
    #     }
    # else:        
    #     context = {
    #         'nickname' : nome,
    #         'pontuacao' : pontuacao,     
    #     }

    context = {
        'nickname' : "Everlen",
    }

    return render(request, "game.html", context)
