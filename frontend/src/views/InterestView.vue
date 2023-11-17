<template>
  <div>
    <h1>금리비교 페이지</h1>

    <InterestList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import { RouterLink } from "vue-router";
import InterestList from "@/components/InterestList.vue";

const store = useCounterStore();

onMounted(async () => {
  try {
    await store.setFinances();
    await store.getFinances();
    console.log('마운트함');
  } catch (error) {
    console.error('오류 발생:', error);
  }
});
</script>

<style></style>
