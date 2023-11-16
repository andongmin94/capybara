<template>
  <div>
    <h1>금리비교 페이지</h1>

    <InterestList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { RouterLink } from 'vue-router'
import InterestList from '@/components/InterestList.vue'

const store = useCounterStore()

onMounted(() => {
  store.setFinances()
  store.getFinances()
})

</script>

<style>

</style>
