<template>
  <Chart
    :size="{ width: 500, height: 420 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['name', 'pl']" :barStyle="{ fill: '#90e0ef' }" />
      <Bar :dataKeys="['name', 'avg']" :barStyle="{ fill: '#0096c7' }" />
      <Bar :dataKeys="['name', 'inc']" :barStyle="{ fill: '#48cae4' }" />
      <Marker
        :value="1000"
        label="Avg."
        color="#e76f51"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          pl: { color: '#90e0ef' },
          avg: { color: '#0096c7' },
          inc: { color: '#48cae4' },
        }"
      />
    </template>
  </Chart>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Chart, Grid, Line } from "vue3-charts";

const data = ref([]);
const direction = ref("horizontal");
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
});

const axis = ref({
  primary: {
    type: "band",
  },
  secondary: {
    domain: ["dataMin", "dataMax + 100"],
    type: "linear",
    ticks: 8,
  },
});

const existingCart = JSON.parse(localStorage.getItem("cart"));
console.log(existingCart[0].fin_prdt_nm);

// 데이터를 만들껀데
// const xAxis = existingCart.map((item) => {
//     const obj = {
//         name : item.fin_prdt_nm,
//         pl:

//     }
// });
</script>
