from django.db import models

# Create your models here.

class Translations(models.Model):
    TranslationId = models.AutoField(primary_key=True)
    TranslationInputs = models.CharField(max_length=500)
    TranslationOutputs = models.CharField(max_length=500)