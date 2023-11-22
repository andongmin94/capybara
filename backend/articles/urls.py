from django.urls import path
from . import views


urlpatterns = [
    path('comment/<int:article_pk>/<int:parent_pk>/', views.comments_create),
    path('articles/<int:article_pk>/', views.article_detail),
    path('articles/', views.article_list),
]
