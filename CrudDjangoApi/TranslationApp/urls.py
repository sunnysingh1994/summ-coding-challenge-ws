from django.conf.urls import url
from TranslationApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^translation$',views.translationApi),
    url(r'^translation/([0-9]+)$',views.translationApi),

]