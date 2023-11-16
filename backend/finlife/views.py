from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from .serializers import *
from .models import *


# save_deposit_products requests 모듈을 활용하여 정기예금 상품 목록 데이터를 가져와 정기예금
# 상품 목록과 옵션 목록을 DB에 저장 GET
@api_view(['GET'])
def save_deposit_products(request):
    url = f'http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth={settings.FINAN_KEY}&topFinGrpNo=020000&pageNo=1'
    resp = requests.get(url).json()
    baselist = resp.get("result").get("baseList")
    optionlist = resp.get("result").get("optionList")
    for base in baselist:
        save_data = {
            'fin_prdt_cd': base.get('fin_prdt_cd'),
            'kor_co_nm': base.get('kor_co_nm'),
            'fin_prdt_nm': base.get('fin_prdt_nm'),
            'etc_note': base.get('etc_note'),
            'join_deny': int(base.get('join_deny')),
            'join_member': base.get('join_member'),
            'join_way': base.get('join_way'),
            'spcl_cnd': base.get('spcl_cnd'),
        }
        for elem in save_data:
            if not save_data[elem]:
                save_data[elem] = -1
        serializer = DepositProductsSerializer(data=save_data)
        if serializer.is_valid():
            serializer.save()
    for option in optionlist:
        save_data = {
            'fin_prdt_cd': option.get('fin_prdt_cd'),
            'intr_rate_type_nm': option.get('intr_rate_type_nm'),
            'intr_rate': option.get('intr_rate'),
            'intr_rate2': option.get('intr_rate2'),
            'save_trm': int(option.get('save_trm')),   
        }
        for elem in save_data:
            if not save_data[elem]:
                save_data[elem] = -1
        serializer = DepositOptionsSerializer(data=save_data)
        if serializer.is_valid():
            serializer.save(product=DepositProducts.objects.get(fin_prdt_cd=save_data.get('fin_prdt_cd')))
    return Response({"message": "okay "})


# deposit_products GET: 전체 정기예금 상품 목록 반환
# POST: 상품 데이터 저장 GET, POST
@api_view(['GET', 'POST'])
def deposit_products(request):
    if request.method == 'GET':
        deposit_products = DepositProducts.objects.all()
        serializer = DepositProductsSerializer(deposit_products, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = DepositProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'message':'이미 있는 데이터이거나, 데이터가 잘못 입력되었습니다.'})


# deposit_product_options 특정 상품의 옵션 리스트 반환 GET
@api_view(['GET'])
def deposit_product_options(request, fin_prdt_cd):
    depositoptions = DepositOptions.objects.filter(fin_prdt_cd=fin_prdt_cd)
    serializer = DepositOptionsSerializer(depositoptions, many=True)
    return Response(serializer.data)


# top_rate 가입 기간에 상관없이 금리가 가장 높은 상품과 해당 상품의 옵션 리스트
# 출력 GET
@api_view(['GET'])
def top_rate(request):
    depositoptions = DepositOptions.objects.all()
    top_rate = 0
    top_pk = 0
    for depositoption in depositoptions:
        if top_rate <= depositoption.intr_rate2:
            top_rate = depositoption.intr_rate2
            top_pk = depositoption.pk
    top_option = DepositOptions.objects.get(pk=top_pk)
    serializer2 = DepositOptionsSerializer(top_option)
    serializer1 = DepositProductsSerializer(top_option.product)
    serializer2 = DepositOptionsSerializer(top_option.product.depositoptions_set.all(), many=True)
    return Response({'deposit_product': serializer1.data, 'options': serializer2.data,})