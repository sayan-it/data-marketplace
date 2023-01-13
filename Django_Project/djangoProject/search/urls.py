from django.urls import path

from search.views import SearchDataAsset

urlpatterns = [
    path('data/<str:query>/', SearchDataAsset.as_view())
]