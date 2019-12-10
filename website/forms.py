from django import forms
from website.models import player

class playerForm(forms.ModelForm):
    class Meta:
        model = player
        fields = [
            'nome',
            'nickname',
            'senha',
            'email',
        ]