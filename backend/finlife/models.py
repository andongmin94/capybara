from django.db import models


class DepositProducts(models.Model):
    # dcls_month varchar(6) 공시 제출월(YYYYMM)
    dcls_month = models.CharField(max_length=6)

    # fin_prdt_cd text ( unique ) 금융 상품 코드
    fin_prdt_cd = models.TextField(unique=True)
    
    # kor_co_nm text 금융회사명
    kor_co_nm = models.TextField()
    
    # fin_prdt_nm text 금융 상품명
    fin_prdt_nm = models.TextField()
    
    # etc_note text 금융 상품 설명
    etc_note = models.TextField()
    
    # join_deny integer 가입 제한(1: 제한없음, 2:서민전용, 3:일부제한)
    join_deny = models.IntegerField()
    
    # join_member text 가입대상
    join_member = models.TextField()
    
    # join_way text 가입 방법
    join_way = models.TextField()
    
    # spcl_cnd text 우대조건
    spcl_cnd = models.TextField()
    

class DepositOptions(models.Model):
    # dcls_month varchar(6) 공시 제출월(YYYYMM)
    dcls_month = models.CharField(max_length=6)

    # product integer 외래 키(DepositProducts 클래스 참조)
    product = models.ForeignKey(DepositProducts, on_delete=models.CASCADE)
    
    # fin_prdt_cd text 금융 상품 코드
    fin_prdt_cd = models.TextField()
    
    # intr_rate_type_nm varchar(100) 저축금리 유형명
    intr_rate_type_nm = models.CharField(max_length=100)
    
    # intr_rate float 저축금리
    intr_rate = models.FloatField()
    
    # intr_rate2 float 최고우대금리
    intr_rate2 = models.FloatField()
    
    # save_trm integer 저축기간 (단위: 개월)  
    save_trm = models.IntegerField()


class installmentsProducts(models.Model):
    # dcls_month varchar(6) 공시 제출월(YYYYMM)
    dcls_month = models.CharField(max_length=6)

    # kor_co_nm text 금융회사명
    kor_co_nm = models.TextField()

    # fin_prdt_cd text ( unique ) 금융 상품 코드
    fin_prdt_cd = models.TextField(unique=True)
    
    # fin_prdt_nm text 금융 상품명
    fin_prdt_nm = models.TextField()

    # join_way text 가입 방법
    join_way = models.TextField()

    # mtlt_rate float 만기 후 연금리
    mtlt_rate = models.FloatField()

    # spcl_cnd text 우대조건
    spcl_cnd = models.TextField()
    
    # join_deny integer 가입 제한(1: 제한없음, 2:서민전용, 3:일부제한)
    join_deny = models.IntegerField()
    
    # join_member text 가입대상
    join_member = models.TextField()
    
    # etc_note text 금융 상품 설명
    etc_note = models.TextField()
    

# class installmentsOptions(models.Model):
#     # product integer 외래 키(installmentsProducts 클래스 참조)
#     product = models.ForeignKey(installmentsProducts, on_delete=models.CASCADE)
    
#     # fin_prdt_cd text 금융 상품 코드
#     fin_prdt_cd = models.TextField()
    
#     # intr_rate_type_nm varchar(100) 저축금리 유형명
#     intr_rate_type_nm = models.CharField(max_length=100)
     
#     # save_trm integer 저축기간 (단위: 개월)  
#     save_trm = models.IntegerField()

#     # intr_rate float 저축금리
#     intr_rate = models.FloatField()
    
#     # intr_rate2 float 최고우대금리
#     intr_rate2 = models.FloatField()
