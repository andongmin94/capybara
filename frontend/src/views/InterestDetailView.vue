<template>
  <div>
    <v-container>
      <v-chip @click="goBack">상품 목록으로 돌아가기</v-chip>
      <!-- <v-chip @click="addCart(store.selectedItem.value)">
        장바구니에 추가
      </v-chip> -->

      <v-row>
        <v-col align="center" justify="center">
          <h1 class="mb-5">{{ store.selectedItem?.value?.fin_prdt_nm }}</h1>
          <h2 class="mb-10">{{ store.selectedItem?.value?.kor_co_nm }}</h2>
          <v-row>
            <v-col cols="6">
              <v-col>
                <v-chip>상품 설명</v-chip>
              </v-col>
              <v-col>
                {{ store.selectedItem.value.etc_note }}
              </v-col>
            </v-col>
            <v-col cols="6">
              <v-col>
                <v-chip>가입 대상</v-chip>
              </v-col>
              <v-col>
                {{ store.selectedItem.value.join_member }}
              </v-col>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-col>
                <v-chip>가입 방법</v-chip>
              </v-col>
              <v-col>
                {{ store.selectedItem.value.join_way }}
              </v-col>
            </v-col>

            <v-col cols="6">
              <v-col>
                <v-chip>특이 사항</v-chip>
              </v-col>
              <v-col>
                {{ store.selectedItem.value.spcl_cnd }}
              </v-col>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- <hr /> -->
      <!-- <v-row>
        <img src="@/assets/hr.svg" alt="" />
      </v-row> -->
      <v-row align="center" justify="center">
        <v-chip>가입기간</v-chip>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4" lg="3" v-for="detail in finance" :key="detail">
          <v-card class="mx-auto my-8" max-width="344" elevation="16">
            <v-card-item>
              <v-card-title>{{ detail.save_trm }}개월 </v-card-title>
              <v-card-subtitle
                ><p>이율 : {{ detail.intr_rate_type_nm }}</p></v-card-subtitle
              >
            </v-card-item>

            <v-card-text>
              <p>저축 금리 : {{ detail.intr_rate }}%</p>
              <p>최고 우대 금리: {{ detail.intr_rate2 }}%</p>
            </v-card-text>
            <v-card-actions
              ><v-chip @click="addCart(detail)"
                >가입하기</v-chip
              ></v-card-actions
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRouter, useRoute } from "vue-router";
import { defineProps } from "vue";

const router = useRouter();
const store = useCounterStore();
const route = useRoute();
const finance = ref();

const goBack = function () {
  router.push("/interest");
};

// 해당 상품에 걸린 옵션들 가져오기
onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/finlife/deposit-product-options/${route.params.id}/`,
  })
    .then((res) => {
      finance.value = res.data;
    })
    .then((res) => {
      // save_trm 필터링
      finance.value = finance.value.reduce((unique, item) => {
        const existing = unique.find((el) => el.save_trm === item.save_trm);
        if (!existing) {
          unique.push(item);
        }
        return unique;
      }, []);
      // console.log(finance._rawValue);
    })
    .catch((err) => {
      console.log("실패했다람쥐");
      console.log(err);
    });
});

const addCart = (detail) => {
  console.log(detail.id);
  // 하나의 데이터만 저장하기
  // 문제점 : 덮어쓰기 된다.
  // localStorage.setItem('cart', JSON.stringify(product))

  // 여러 데이터 저장하기
  // 현재 localStorage 에 저장된 데이터 가져오기
  // 만약 없다면 비어있는 리스트로 초기화
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // 중복된 제품이 있는지 확인
  const isDuplicate =
    existingCart.length > 0 &&
    existingCart.find((item) => item.id === detail.id);

  // 중복이 아니라면 추가
  if (!isDuplicate) {
    alert("장바구니에 추가합니다.");
    existingCart.push(detail);
    router.go(-1);
  } else {
    alert("이미 장바구니에 추가된 상품입니다.");
  }

  // 수정된 카트 데이터를 localStorage 에 저장
  localStorage.setItem("cart", JSON.stringify(existingCart));
};
</script>

<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

* {
  font-family: Pretendard-Regular;
  font-weight: 600;
}

.description {
  background-color: map-get($colors, third);
}
</style>
