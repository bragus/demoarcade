from django import forms
from website.models import player

class playerForm(forms.ModelForm):
    nickname = forms.CharField(widget=forms.TextInput(
        attrs={
            'class': 'form'
        }
    ))
    senha = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form'
        }
    ))
    
    class Meta:
        model = player
        fields = [
            'nickname',
            'senha',
        ]