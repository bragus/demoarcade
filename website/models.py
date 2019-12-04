from django.db import models

# Create your models here.

class dados_do_jogador(models.Model):

    nome = models.CharField(max_length=20),
    nickname = models.CharField ( max_length = 10 ),
    idade = models.IntegerField (),
    email = models.EmailField(),

    def __str__ (self):
        return self.nickname