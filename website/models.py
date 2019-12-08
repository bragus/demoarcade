from django.db import models

# Create your models here.

class dados_do_jogador(models.Model):

    nickname = models.CharField ( max_length = 10 ),
    email = models.EmailField(),
    senha = models.CharField ( max_length = 8),

    def __str__ (self):
        return self.nickname