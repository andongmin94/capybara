<template>
    <div>
      <h5>{{ finance.id }}</h5>
        <p>{{ finance.kor_co_nm }}</p>
        <p>{{ finance.fin_prdt_nm }}</p>
        <p>{{ finance.etc_note }}</p>
        <p>{{ finance.join_member }}</p>
        <p>{{ finance.join_way }}</p>
        <p>{{ finance.spcl_cnd }}</p>
      <hr>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  
  defineProps({
    finance: Object
  })
  </script>
  