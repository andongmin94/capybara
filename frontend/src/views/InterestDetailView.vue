<template>
  <div>
    <v-container>
      <v-chip @click="goBack">상품 목록으로 돌아가기</v-chip>

      <v-row>
        <v-col align="center" justify="center">
          <h1>{{ store.selectedItem.value.fin_prdt_nm }}</h1>
          <h2>{{ store.selectedItem.value.kor_co_nm }}</h2>
          <v-list lines="default" class="description">
            <v-list-item><v-chip>상품 설명</v-chip></v-list-item>
            <v-list-item>{{ store.selectedItem.value.etc_note }}</v-list-item>

            <v-list-item><v-chip>가입 대상</v-chip></v-list-item>
            <v-list-item>
              {{ store.selectedItem.value.join_member }}</v-list-item
            >
            <v-list-item><v-chip>가입 방법</v-chip></v-list-item>
            <v-list-item>{{ store.selectedItem.value.join_way }}</v-list-item>

            <v-list-item><v-chip>특이 사항</v-chip></v-list-item>
            <v-list-item>{{ store.selectedItem.value.spcl_cnd }}</v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4" lg="3" v-for="detail in finance" :key="detail">
          <v-card class="mx-auto my-8" max-width="344" elevation="16">
            <v-card-item>
              <v-card-title
                >가입 기간 : {{ detail.save_trm }}개월
              </v-card-title>
              <v-card-subtitle
                ><p>이율 : {{ detail.intr_rate_type_nm }}</p></v-card-subtitle
              >
            </v-card-item>

            <v-card-text>
              <p>저축 금리 : {{ detail.intr_rate }}%</p>
              <p>최고 우대 금리: {{ detail.intr_rate2 }}%</p>
            </v-card-text>
            <v-card-actions> <v-chip>가입하기</v-chip></v-card-actions>
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
  router.go(-1);
};

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
