from django.db import models
from django.contrib.auth.models import AbstractUser
from allauth.account.adapter import DefaultAccountAdapter


class User(AbstractUser):
    """닉네임을 포함하도록 Django 기본 사용자를 확장한 서비스 사용자 모델."""

    username = models.CharField(max_length=30, unique=True)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    USERNAME_FIELD = "username"

    groups = models.ManyToManyField(
        "auth.Group",
        verbose_name="groups",
        blank=True,
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
        related_name="custom_user_set",
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name="user permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        related_name="custom_user_set",
        related_query_name="user",
    )

    def __str__(self):
        return self.username


class CustomAccountAdapter(DefaultAccountAdapter):
    """회원가입 입력을 커스텀 사용자 필드에 저장하는 allauth 어댑터."""

    def save_user(self, request, user, form, commit=True):
        """회원가입 폼의 사용자명, 이메일, 닉네임과 비밀번호를 사용자에 저장한다."""

        from allauth.account.utils import user_email, user_field, user_username

        data = form.cleaned_data
        email = data.get("email")
        username = data.get("username")
        nickname = data.get("nickname")

        user_email(user, email)
        user_username(user, username)

        if nickname:
            user_field(user, "nickname", nickname)
        if "password1" in data:
            user.set_password(data["password1"])
        else:
            user.set_unusable_password()
        self.populate_username(request, user)
        if commit:
            user.save()
        return user


class FinancialProduct(models.Model):
    name = models.CharField(max_length=100)
