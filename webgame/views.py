from django.shortcuts import render

# Create your views here.

def Mostrar_game(request):
    return render(request, "game.html")
