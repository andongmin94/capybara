<template>
  <div>
    <InterestListItem />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import InterestListItem from "@/components/InterestListItem.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import { onMounted } from "vue";
import { useFinanceStore } from "@/stores/finance";

const finStore = useFinanceStore();

onMounted(async () => {
  try {
    finStore.getFinances();
    console.log("마운트함");
  } catch (error) {
    console.error("오류 발생:", error);
  }
});
</script>

<style>
* {
  font-family: Pretendard-regular;
}
</style>