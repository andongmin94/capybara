<template>
  <h1>{{ store.M }}{{ store.B }}{{ store.T }}{{ store.I }}에게 추천하는 상품은 다음 3가지입니다.</h1>


</template>
<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

</script>
