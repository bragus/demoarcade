from django.db import models

# Create your models here.

class jogador():

    nickname = models.CharField ( max_length = 10 ),
    idade = models.IntegerField (),