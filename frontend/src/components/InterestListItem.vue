<template>
  <div>
    <!-- <p>{{ finance.fin_prdt_cd }}</p> -->
    <!-- <p>{{ finance.id }}</p> -->
    <p>{{ finance!.kor_co_nm }}</p>
    <p>{{ finance!.fin_prdt_nm }}</p>
    <p>{{ finance!.etc_note }}</p>
    <p>{{ finance!.join_member }}</p>
    <p>{{ finance!.join_way }}</p>
    <p>{{ finance!.spcl_cnd }}</p>
    <RouterLink :to="{ name: 'interestDetail', params: { id: finance!.fin_prdt_cd } }">
      <v-btn>상품 보기</v-btn>
    </RouterLink>

    <hr />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps({
  finance: Object,
});
</script>
