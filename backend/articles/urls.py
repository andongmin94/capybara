from django.urls import path
from . import views


urlpatterns = [
    path('comment/<int:article_pk>/<int:parent_pk>/', views.comments_create),
    # path('<str:article_type>/', views.article_list),
    # path('<str:article_type>/<int:article_pk>/', views.article_detail),
    path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.article_detail),
]
