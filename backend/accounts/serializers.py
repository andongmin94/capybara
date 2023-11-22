from rest_framework import serializers
from allauth.account.adapter import get_adapter
from .models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class CustomRegisterSerializer(RegisterSerializer):
    # 추가할 필드들을 정의합니다.
    # first_name = serializers.CharField(required=False)
    # last_name = serializers.CharField(required=False)
    nickname = serializers.CharField(
    required=False,
    allow_blank=True,
    max_length=255
    )
    
    def get_cleaned_data(self):
        return {
        'username': self.validated_data.get('username', ''),
        'password1': self.validated_data.get('password1', ''),
        'email': self.validated_data.get('email', ''),
        'nickname': self.validated_data.get('nickname', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        return user


class CustomPasswordResetSerializer(PasswordResetSerializer):
    username = serializers.CharField()


class UserDetailSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    financial_products = serializers.StringRelatedField(many=True)  # ManyToManyField

    class Meta:
        model = User
        fields = [
            'username', 'email', 'created_at', 'updated_at', 'followings', 'followers','id'
        ]
        depth = 1  # followings 필드를 위한 설정

    def get_followers(self, obj):
        # obj는 User 모델의 인스턴스
        return [follower.username for follower in obj.followers.all()]
    
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_superuser', 'is_staff',)
