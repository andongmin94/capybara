<template>
  <div>
    <h1>Detail</h1>
      <div v-for="detail in finance">
        {{ detail }}
      </div>
    <hr />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRoute } from "vue-router";

const store = useCounterStore();
const route = useRoute();
const finance = ref(null);

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/finlife/deposit-product-options/${route.params.id}/`
  })
    .then((res) => {
      finance.value = res.data;
    })
    .then((res)=>{
      console.log(finance._rawValue)
    })
    .catch((err) => {
      console.log(실패했다람쥐);
      console.log(err);
    });
});
</script>
