from django.db import models

# Create your models here.

class player(models.Model):
    nickname = models.CharField(max_length=10)
    senha = models.CharField(max_length=20)
    def __str__(self):
        return self.nickname

class pontuacao(models.Model):
    player = models.ForeignKey(player, on_delete=models.CASCADE)
    pontuacao = models.IntegerField()