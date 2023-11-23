<template>
  <div>
    <v-container>
      <v-chip @click="goBack">뒤로 가기</v-chip>

      <v-row>
        <v-col align="center" justify="center">
          <h1 class="mb-5 interest-detail-product">
            {{ finStore.selectedItem?.value?.fin_prdt_nm }}
          </h1>
          <h2 class="mb-6">{{ finStore.selectedItem?.value?.kor_co_nm }}</h2>
          <v-divider
            class="interest-detail-divider mb-5"
            :thickness="3"
          ></v-divider>
          <v-col cols="10" lg="8">
            <v-row>
              <v-col cols="6">
                <v-col>
                  <v-chip>상품 설명</v-chip>
                </v-col>
                <v-col>
                  {{ finStore.selectedItem?.value?.etc_note }}
                </v-col>
              </v-col>

              <v-col cols="6">
                <v-col>
                  <v-chip>가입 대상</v-chip>
                </v-col>
                <v-col>
                  {{ finStore.selectedItem?.value?.join_member }}
                </v-col>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-col>
                  <v-chip>가입 방법</v-chip>
                </v-col>
                <v-col>
                  {{ finStore.selectedItem?.value?.join_way }}
                </v-col>
              </v-col>

              <v-col cols="6">
                <v-col>
                  <v-chip>특이 사항</v-chip>
                </v-col>
                <v-col>
                  {{ finStore.selectedItem?.value?.spcl_cnd }}
                </v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-divider
          class="interest-detail-divider mb-5"
          :thickness="1"
        ></v-divider>
        <v-chip class="mt-3">가입기간</v-chip>
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
              ><v-chip elevation="1" @click="addCart(detail)"
                >✔ 찜하기</v-chip
              ></v-card-actions
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <RouterLink :to="{ name: 'cart' }" class="go-cart-link">
      <v-tooltip activator="parent" location="start">찜한 목록 보기</v-tooltip>
      <v-chip size="x-large" class="go-cart-btn mb-1" elevation="3"
        ><strong>🎁</strong>
      </v-chip></RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFinanceStore } from "@/stores/finance";

const finStore = useFinanceStore();

const router = useRouter();
const route = useRoute();
const finance = ref();

const goBack = function () {
  router.go(-1);
};

// 해당 상품에 걸린 옵션들 가져오기
onMounted(() => {
  axios({
    method: "get",
    url: `${finStore.API_URL}/finlife/deposit-product-options/${route.params.id}/`,
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

  // 현재 localStorage 에 저장된 데이터 가져오기
  // 만약 없다면 비어있는 리스트로 초기화
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // 중복된 제품이 있는지 확인
  const isDuplicate =
    existingCart.length > 0 &&
    existingCart.find((item) => item.id === detail.id);

  // 중복이 아니라면 추가
  if (!isDuplicate) {
    alert("찜 목록에 추가합니다.");
    existingCart.push(detail);
  } else {
    alert("이미 찜한 상품입니다.");
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

.interest-detail-divider {
  opacity: 100%;
  width: 200px;
}

.go-cart-link {
  position: fixed;
  bottom: 20px;
  right: 20px;
  :hover {
    transform: scale(1.2);
  }
}

.go-cart-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
  :hover {
    transform: scale(1);
  }
}
</style>
