import requests
from django.conf import settings
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import DepositOptions, DepositProducts
from .serializers import DepositOptionsSerializer, DepositProductsSerializer


FINLIFE_DEPOSIT_URL = "https://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json"


def _text_or_default(value):
    if value is None or value == "":
        return "-1"
    return str(value)


def _number_or_default(value, converter):
    if value is None or value == "":
        return converter(-1)
    try:
        return converter(value)
    except (TypeError, ValueError):
        return converter(-1)


def _fetch_deposit_products():
    """금융감독원에서 정기예금 상품과 기간별 옵션 목록을 조회한다."""

    response = requests.get(
        FINLIFE_DEPOSIT_URL,
        params={
            "auth": settings.FSS_API_KEY,
            "topFinGrpNo": "020000",
            "pageNo": 1,
        },
        timeout=settings.FSS_API_TIMEOUT,
    )
    response.raise_for_status()
    payload = response.json()

    result = payload.get("result") if isinstance(payload, dict) else None
    if not isinstance(result, dict):
        raise ValueError("Missing result object")

    base_list = result.get("baseList")
    option_list = result.get("optionList")
    if not isinstance(base_list, list) or not isinstance(option_list, list):
        raise ValueError("Missing product lists")

    return base_list, option_list


def _save_products(base_list, option_list):
    """상품과 옵션을 하나의 트랜잭션에서 갱신해 부분 저장을 방지한다."""

    products_by_code = {}

    with transaction.atomic():
        for base in base_list:
            if not isinstance(base, dict):
                continue

            product_code = base.get("fin_prdt_cd")
            if not product_code:
                continue

            product, _ = DepositProducts.objects.update_or_create(
                fin_prdt_cd=str(product_code),
                defaults={
                    "dcls_month": _text_or_default(base.get("dcls_month")),
                    "kor_co_nm": _text_or_default(base.get("kor_co_nm")),
                    "fin_prdt_nm": _text_or_default(base.get("fin_prdt_nm")),
                    "etc_note": _text_or_default(base.get("etc_note")),
                    "join_deny": _number_or_default(
                        base.get("join_deny"),
                        int,
                    ),
                    "join_member": _text_or_default(base.get("join_member")),
                    "join_way": _text_or_default(base.get("join_way")),
                    "spcl_cnd": _text_or_default(base.get("spcl_cnd")),
                },
            )
            products_by_code[str(product_code)] = product

        for option in option_list:
            if not isinstance(option, dict):
                continue

            product_code = option.get("fin_prdt_cd")
            if not product_code:
                continue

            product_code = str(product_code)
            product = products_by_code.get(product_code)
            if product is None:
                product = DepositProducts.objects.filter(
                    fin_prdt_cd=product_code
                ).first()
            if product is None:
                continue

            identity = {
                "product": product,
                "dcls_month": _text_or_default(option.get("dcls_month")),
                "fin_prdt_cd": product_code,
                "intr_rate_type_nm": _text_or_default(option.get("intr_rate_type_nm")),
                "save_trm": _number_or_default(option.get("save_trm"), int),
            }
            DepositOptions.objects.update_or_create(
                **identity,
                defaults={
                    "intr_rate": _number_or_default(
                        option.get("intr_rate"),
                        float,
                    ),
                    "intr_rate2": _number_or_default(
                        option.get("intr_rate2"),
                        float,
                    ),
                },
            )


@api_view(["GET"])
def save_deposit_products(request):
    """금융감독원 정기예금 데이터를 가져와 로컬 DB에 갱신한다."""

    if not settings.FSS_API_KEY:
        return Response(
            {"message": "FSS_API_KEY가 설정되지 않았습니다."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    try:
        base_list, option_list = _fetch_deposit_products()
        _save_products(base_list, option_list)
    except (requests.RequestException, ValueError):
        return Response(
            {"message": "금융상품 데이터를 불러오지 못했습니다."},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    return Response({"message": "okay "}, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def deposit_products(request):
    """정기예금 상품 목록을 조회하거나 새 상품을 저장한다."""

    if request.method == "GET":
        products = DepositProducts.objects.all()
        serializer = DepositProductsSerializer(products, many=True)
        return Response(serializer.data)

    serializer = DepositProductsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(
        {"message": "이미 있는 데이터이거나, 데이터가 잘못 입력되었습니다."},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
def deposit_product_options(request, fin_prdt_cd):
    """상품 코드에 연결된 모든 기간별 금리 옵션을 반환한다."""

    options = DepositOptions.objects.filter(fin_prdt_cd=fin_prdt_cd)
    serializer = DepositOptionsSerializer(options, many=True)
    return Response(serializer.data)
