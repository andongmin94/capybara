<template>
  <Chart
    :size="{ width: 700, height: 500 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2, 2" />
      <!-- key, value -->
      <Bar :dataKeys="['name', 'lowRate']" :barStyle="{ fill: '#59452c' }" />
      <Bar :dataKeys="['name', 'highRate']" :barStyle="{ fill: '#8c704f' }" />
      <Marker
        :value="1000"
        label="Avg."
        color="#e76f51"
        :strokeWidth="2"
        strokeDasharray="6 6"
      />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          lowRate: { color: '#90e0ef' },
          highRate: { color: '#0096c7' },
        }"
      />
    </template>
  </Chart>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Chart, Grid, Line, Tooltip, Marker, Bar } from "vue3-charts";

const props = defineProps({
  momProducts: Array,
  cartItems: Array,
});

const cartItems = props.cartItems;
const momProducts = props.momProducts;
const data = ref([]);
watch(
  [cartItems, momProducts],
  ([items, products]) => {
    items.forEach((item) => {
      let momProd = null;
      products.forEach((product) => {
        if (item.fin_prdt_cd === product.fin_prdt_cd) {
          momProd = product.fin_prdt_nm;
        }
      });

      data.value.push({
        saveTerm: item.save_trm,
        // 옵션저축 금리
        lowRate: item.intr_rate,
        // 최고 우대 금리
        highRate: item.intr_rate2,
        // 엄마 상품 이름
        name: `${item.save_trm}개월 - ${momProd}`,
      });
    });
  },
  { immediate: true }
);

const direction = ref("horizontal");
const margin = ref({
  left: 20,
  top: 20,
  right: 20,
  bottom: 20,
});

const axis = ref({
  primary: {
    type: "band",
  },
  secondary: {
    domain: ["dataMin", "dataMax+2"],
    type: "linear",
    ticks: 8,
  },
});
</script>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
</style>
