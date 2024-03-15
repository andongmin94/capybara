from django.db import models
from django.conf import settings


class Article(models.Model):
    """사용자가 작성하고 좋아요를 남길 수 있는 커뮤니티 게시글."""

    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_articles')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image= models.ImageField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    """게시글에 속하며 같은 게시글의 댓글을 부모로 가질 수 있는 댓글."""

    parent_comment = models.ForeignKey('self', on_delete = models.CASCADE, null=True)
    article = models.ForeignKey(Article, on_delete = models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_comments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
