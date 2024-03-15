from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from .serializers import UserSerializer


class AccountApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username="demo-user",
            password="CapybaraDemo!4821",
            nickname="데모 사용자",
            email="demo@example.com",
        )
        self.other_user = user_model.objects.create_user(
            username="other-user",
            password="CapybaraDemo!5932",
            nickname="다른 사용자",
            email="other@example.com",
        )

    def test_public_user_serializer_exposes_only_safe_identity_fields(self):
        data = UserSerializer(self.user).data

        self.assertEqual(set(data), {"id", "username", "nickname"})
        self.assertNotIn("password", data)
        self.assertNotIn("is_staff", data)
        self.assertNotIn("is_superuser", data)
        self.assertNotIn("user_permissions", data)

    def test_profile_is_available_only_to_authenticated_owner(self):
        url = "/accounts/profile/get_user_data/demo-user/"

        anonymous_response = self.client.get(url)
        self.assertEqual(anonymous_response.status_code, 401)

        self.client.force_authenticate(self.other_user)
        forbidden_response = self.client.get(url)
        self.assertEqual(forbidden_response.status_code, 403)

        self.client.force_authenticate(self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["message"], "success")
        self.assertEqual(
            set(response.data["data"]),
            {
                "id",
                "username",
                "nickname",
                "email",
                "date_joined",
                "last_login",
            },
        )

    def test_profile_update_ignores_privileged_fields(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            "/accounts/profile/edit/",
            {
                "nickname": "수정된 사용자",
                "email": "updated@example.com",
                "is_staff": True,
                "is_superuser": True,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.nickname, "수정된 사용자")
        self.assertEqual(self.user.email, "updated@example.com")
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)

    def test_account_delete_cannot_target_another_user(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            "/accounts/profile/edit/",
            {"user_id": self.other_user.id},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertFalse(get_user_model().objects.filter(pk=self.user.pk).exists())
        self.assertTrue(get_user_model().objects.filter(pk=self.other_user.pk).exists())

    def test_registration_serializer_remains_compatible(self):
        response = self.client.post(
            "/accounts/signup/",
            {
                "username": "new-user",
                "nickname": "새 사용자",
                "email": "new@example.com",
                "password1": "CapybaraDemo!6043",
                "password2": "CapybaraDemo!6043",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201, response.data)
        created_user = get_user_model().objects.get(username="new-user")
        self.assertEqual(created_user.nickname, "새 사용자")
        self.assertTrue(created_user.check_password("CapybaraDemo!6043"))
