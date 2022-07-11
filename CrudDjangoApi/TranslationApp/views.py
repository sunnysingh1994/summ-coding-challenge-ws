from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from TranslationApp.models import Translations
from TranslationApp.serializers import TranslationsSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def translationApi(request,id=0):
    if request.method=='GET':
        translations = Translations.objects.all()
        translations_serializer=TranslationsSerializer(translations,many=True)
        return JsonResponse(translations_serializer.data,safe=False)
    elif request.method=='POST':
        translation_data=JSONParser().parse(request)
        translations_serializer=TranslationsSerializer(data=translation_data)
        if translations_serializer.is_valid():
            translations_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        translation_data=JSONParser().parse(request)
        translation=Translations.objects.get(TranslationId = translation_data['TranslationId'])
        translations_serializer=TranslationsSerializer(translation,data=translation_data)
        if translations_serializer.is_valid():
            translations_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        translation=Translations.objects.get(TranslationId=id)
        translation.delete()
        return JsonResponse("Deleted Successfully",safe=False)
