from django.shortcuts import render

def Mostrar_game(request):
    return render(request, "game.html")
