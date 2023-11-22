from django.urls import path
from . import views


urlpatterns = [
    path('', views.article_list),
    path('<int:article_pk>/', views.article_detail),
    path('comment/<int:article_pk>/<int:parent_pk>/', views.comments_create),
]
