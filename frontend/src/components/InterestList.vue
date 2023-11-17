<template>
  <div>
    <h3>정기예금 List</h3>
    <InterestListItem
      v-for="finance in store.finances"
      :key="finance"
      :finance="finance"
    />
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import InterestListItem from "@/components/InterestListItem.vue";

const store = useCounterStore();
</script>
