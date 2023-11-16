<template>
    <div>
        <p>{{ finance.fin_prdt_cd }}</p>
        <p>{{ finance.id }}</p>
        <p>{{ finance.kor_co_nm }}</p>
        <p>{{ finance.fin_prdt_nm }}</p>
        <p>{{ finance.etc_note }}</p>
        <p>{{ finance.join_member }}</p>
        <p>{{ finance.join_way }}</p>
        <p>{{ finance.spcl_cnd }}</p>
        <RouterLink :to="{ name: 'interestDetail', params:{ id : finance.fin_prdt_cd }}">
          금리비교
        </RouterLink>
      <hr>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  
  defineProps({
    finance: Object
  })
  </script>
  