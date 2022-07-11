from rest_framework import serializers
from TranslationApp.models import Translations

class TranslationsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Translations
        fields=('TranslationId','TranslationInputs', 'TranslationOutputs')
