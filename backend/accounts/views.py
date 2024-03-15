from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ProfileSerializer, ProfileUpdateSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detail(request, search_name):
    """인증된 요청자가 자신의 프로필만 조회하도록 제한한다."""

    user = get_object_or_404(get_user_model(), username=search_name)
    if user != request.user:
        return Response(
            {"message": "권한이 없습니다."},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = ProfileSerializer(user)
    return Response(
        {"data": serializer.data, "message": "success"},
        status=status.HTTP_200_OK,
    )


@api_view(["DELETE", "PUT"])
@permission_classes([IsAuthenticated])
def edit(request):
    """현재 사용자의 프로필 수정 또는 계정 삭제 요청을 처리한다."""

    if request.method == "DELETE":
        request.user.delete()
        return Response(
            {"message": "success"},
            status=status.HTTP_200_OK,
        )

    serializer = ProfileUpdateSerializer(
        request.user,
        data=request.data,
        partial=True,
    )
    if not serializer.is_valid():
        return Response(
            {"message": "error", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serializer.save()
    return Response(
        {"message": "success"},
        status=status.HTTP_200_OK,
    )
