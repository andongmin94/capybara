from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import ProfileSerializer, CustomPasswordResetSerializer
from .models import User
from rest_framework.decorators import permission_classes


@api_view(['GET'])
def detail(request, search_name):
    if request.method == 'GET':
        user = get_user_model().objects.get(username=search_name)
        serializer = ProfileSerializer(user)   
        return Response({'data':serializer.data,'message':'success'}, status=status.HTTP_200_OK)


@api_view(['DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def edit(request):
    if request.method =='DELETE':
        try:
            user_id=request.data['user_id']
            user=User.objects.get(id=user_id)
            user.delete()
            print('삭제 완료')
            return Response({'message':'success'},status=status.HTTP_200_OK)  # 추후 스테이터스 변경 필요
        except:
            return Response({'message':'error'},status=status.HTTP_404_NOT_FOUND)
        
    elif request.method =='PUT':
        try:
            user=User.objects.get(username=request.user)
            user.nickname=request.data['nickname']
            user.email=request.data['email']
            user.save()
            print('수정 완료')
            return Response({'message':'success'},status=status.HTTP_200_OK)  # 추후 스테이터스 변경 필요
        except:
            return Response({'message':'error'},status=status.HTTP_404_NOT_FOUND)
