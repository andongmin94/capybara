from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from .models import Article, Comment


class ArticleApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.author = user_model.objects.create_user(
            username="author",
            password="CapybaraDemo!4821",
            nickname="작성자",
        )
        self.other_user = user_model.objects.create_user(
            username="reader",
            password="CapybaraDemo!5932",
            nickname="독자",
        )
        self.article = Article.objects.create(
            user=self.author,
            title="예금 정보 공유",
            content="상품 조건을 확인했습니다.",
        )

    def test_empty_article_list_returns_empty_array(self):
        Article.objects.all().delete()
        self.client.force_authenticate(self.author)

        response = self.client.get("/articles/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])

    def test_article_response_does_not_expose_user_secrets(self):
        response = self.client.get(f"/articles/{self.article.pk}/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            set(response.data["article"]["user"]),
            {"id", "username", "nickname"},
        )
        self.assertNotIn("password", response.data["article"]["user"])
        self.assertNotIn("is_staff", response.data["article"]["user"])

    def test_only_author_can_update_or_delete_article(self):
        url = f"/articles/{self.article.pk}/"

        anonymous_response = self.client.delete(url)
        self.assertEqual(anonymous_response.status_code, 401)

        self.client.force_authenticate(self.other_user)
        forbidden_response = self.client.put(
            url,
            {"title": "권한 없는 수정"},
            format="json",
        )
        self.assertEqual(forbidden_response.status_code, 403)

        self.client.force_authenticate(self.author)
        update_response = self.client.put(
            url,
            {"title": "수정된 제목"},
            format="json",
        )
        self.assertEqual(update_response.status_code, 200)
        self.article.refresh_from_db()
        self.assertEqual(self.article.title, "수정된 제목")

        delete_response = self.client.delete(url)
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(Article.objects.filter(pk=self.article.pk).exists())

    def test_comment_parent_must_belong_to_same_article(self):
        other_article = Article.objects.create(
            user=self.author,
            title="다른 게시글",
            content="다른 내용",
        )
        other_comment = Comment.objects.create(
            article=other_article,
            user=self.author,
            content="다른 게시글의 댓글",
        )
        self.client.force_authenticate(self.other_user)

        response = self.client.post(
            f"/articles/comment/{self.article.pk}/{other_comment.pk}/",
            {"content": "잘못 연결된 답글"},
            format="json",
        )

        self.assertEqual(response.status_code, 404)
        self.assertFalse(Comment.objects.filter(content="잘못 연결된 답글").exists())

    def test_only_comment_author_can_delete_comment(self):
        comment = Comment.objects.create(
            article=self.article,
            user=self.author,
            content="작성자 댓글",
        )
        url = f"/articles/comment/{self.article.pk}/{comment.pk}/delete/"

        self.client.force_authenticate(self.other_user)
        forbidden_response = self.client.delete(url)
        self.assertEqual(forbidden_response.status_code, 403)

        self.client.force_authenticate(self.author)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Comment.objects.filter(pk=comment.pk).exists())

    def test_authenticated_user_can_create_root_comment(self):
        self.client.force_authenticate(self.other_user)

        response = self.client.post(
            f"/articles/comment/{self.article.pk}/0/",
            {"content": "새 댓글"},
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        comment = Comment.objects.get(content="새 댓글")
        self.assertEqual(comment.user, self.other_user)
        self.assertIsNone(comment.parent_comment)
