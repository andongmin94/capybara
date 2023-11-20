<template>
  <div>
    <v-chip @click="goBack">상품 목록으로 돌아가기</v-chip>
    {{ store.selectedItem.value.kor_co_nm }}

    <div v-for="detail in finance">
      <p>옵션 번호 : {{ detail.id }}</p>
      <p>가입 기간 : {{ detail.save_trm }}개월</p>
      <p>상품 코드 : {{ detail.fin_prdt_cd }}</p>
      <p>이율 : {{ detail.intr_rate_type_nm }}</p>
      <p>이자율 : {{ detail.intr_rate }}</p>
      <p>이자율 : {{ detail.intr_rate2 }}</p>
      <v-chip>가입하기</v-chip>
      <hr />
    </div>
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
