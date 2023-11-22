<template>
  <div>
    
    <InterestListItem />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import InterestListItem from "@/components/InterestListItem.vue";
const store = useCounterStore();

onMounted(async () => {
  try {
    store.getFinances();
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
