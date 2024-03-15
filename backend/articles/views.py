from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404

from .serializers import ArticleSerializer, CommentSerializer
from .models import Article, Comment


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def article_list(request):
    """인증된 사용자의 게시글 목록 조회와 새 게시글 작성을 처리한다."""

    if request.method == "GET":
        articles = Article.objects.select_related("user").all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    serializer = ArticleSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def article_detail(request, article_pk):
    """게시글 상세를 제공하고 수정·삭제는 작성자에게만 허용한다."""

    article = get_object_or_404(
        Article.objects.select_related("user"),
        pk=article_pk,
    )

    if request.method == "GET":
        comments = (
            Comment.objects.filter(article=article)
            .select_related(
                "user",
                "parent_comment",
            )
            .order_by("created_at")
        )
        ar_serializer = ArticleSerializer(article)
        co_serializer = CommentSerializer(comments, many=True)
        return Response(
            {
                "article": ar_serializer.data,
                "comments": co_serializer.data,
            }
        )

    if article.user != request.user:
        return Response(
            {"message": "게시글 작성자가 아닙니다."},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "PUT":
        serializer = ArticleSerializer(
            article,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    article.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def comments_create(request, article_pk, parent_pk):
    """게시글에 일반 댓글 또는 같은 게시글의 대댓글을 작성한다."""

    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    parent_comment = None
    if parent_pk:
        parent_comment = get_object_or_404(
            Comment,
            pk=parent_pk,
            article=article,
        )

    serializer.save(
        user=request.user,
        article=article,
        parent_comment=parent_comment,
    )
    return Response(
        {"message": "success"},
        status=status.HTTP_201_CREATED,
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def comments_delete(request, article_pk, comment_pk):
    """댓글 작성자만 자신의 댓글을 삭제하도록 제한한다."""

    comment = get_object_or_404(Comment, article_id=article_pk, pk=comment_pk)

    if request.user != comment.user:
        return Response(
            {"message": "권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN
        )

    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
