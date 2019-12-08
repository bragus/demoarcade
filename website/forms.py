from django import forms
from .models import dados_do_jogador

class dados_do_jogadorForm (forms.ModelForm):

    class Meta:
        model = dados_do_jogador
        fields = [
            'nickname',
            'email',
        ]
        widgets = [
            'senha': forms.PasswordInput(),
        ]