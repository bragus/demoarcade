from django import forms
from .models import *

class dados_do_jogadorForm(forms.ModelForm):

    senha = forms.CharField(widget = forms.PasswordInput)

    class Meta:
        model = dados_do_jogador
        fields = [
            'nickname',
            'email',
        ]
        
            