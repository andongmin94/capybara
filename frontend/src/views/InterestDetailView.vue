<template>
    <div>
      <h1>Detail</h1>
      <div v-if="finance">
        <p>{{ finance.fin_prdt_cd }}</p>
        <p>{{ finance.intr_rate_type_nm }}</p>
        <p>{{ finance.intr_rate }}</p>
        <p>{{ finance.intr_rate2 }}</p>
        <p>{{ finance.save_trm }}</p>
      </div>
      <hr>
    </div>
  </template>
  
  <script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRoute } from 'vue-router'

const store = useCounterStore()
const route = useRoute()
const finance = ref(null)

onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/finlife/deposit-products/${route.params.id}/`
  })
    .then((res) => {
      // console.log(res.data)
      finance.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})
  
  </script>
  