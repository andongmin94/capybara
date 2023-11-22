from django.urls import path
from . import views


urlpatterns = [
    path('comment/<int:article_pk>/<int:parent_pk>/', views.comments_create),
    path('<int:article_pk>/', views.article_detail),
    path('', views.article_list),
]
