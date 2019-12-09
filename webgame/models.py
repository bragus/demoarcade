from django.db import models

# Create your models here.

class jogador(models.Model):
    nome = models.CharField(max_length=25),
    nickname = models.CharField(max_length=10),
    senha = models.CharField(),
    email = models.EmailField(),

    def __str__():
        return self.nickname

    