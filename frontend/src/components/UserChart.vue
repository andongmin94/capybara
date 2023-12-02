<template>
  <Chart
    :size="{ width: 700, height: 500 }"
    :data="data"
    :margin="margin"
    :direction:any="direction"
    :axis:any="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2, 2" />
      <!-- key, value -->
      <Bar
        class="bar"
        :dataKeys="['name', 'lowRate']"
        :barStyle="{ fill: '#59452c' }"
        :borderWidth="2"
      />
      <Bar
        class="bar"
        :dataKeys="['name', 'highRate']"
        :barStyle="{ fill: '#8c704f' }"
        :strok="10"
      />
      <Marker
        :value="1000"
        label="Avg."
        color="#8c704f"
        :strokeWidth="2"
        strokeDasharray="6 6"
      />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#59452c"
        :config="{
          saveTerm: { label: '저축 기간', color: '#402a17' },
          lowRate: { label: '옵션 저축 금리', color: '#59452c' },
          highRate: { label: '최고 우대 금리', color: '#8c704f' },
          name: { label: '상품 이름', color: '#59452c' },
          caption: { label: '참고', color: '#402a17' },
        }"
      />
    </template>
  </Chart>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Chart, Grid, Tooltip, Marker, Bar } from "vue3-charts";

const props = defineProps({
  momProducts: Array,
  cartItems: Array,
});

const cartItems: any = props.cartItems;
const momProducts: any = props.momProducts;
const data: any = ref([]);
watch(
  [cartItems, momProducts],
  ([items, products]) => {
    items?.forEach((item: any) => {
      let momProd = null;
      products.forEach((product: any) => {
        if (item.fin_prdt_cd === product.fin_prdt_cd) {
          momProd = product.fin_prdt_nm;
        }
      });

      if (momProd !== null) {
        data.value.push({
          saveTerm: item.save_trm,
          // 옵션저축 금리
          lowRate: item.intr_rate * 100,
          // 최고 우대 금리
          highRate: item.intr_rate2 * 100,
          // 엄마 상품 이름
          name: `[${item.save_trm}개월] ${momProd}`,
          // 설명
          caption: "금리는 100이 곱해진 값입니다. 예) 405 인 경우 4.05",
        });
      }
    });
  },
  { immediate: true }
);

const direction = ref("horizontal");
const margin = ref({
  left: 0,
  top: 20,
  right: 0,
  bottom: 20,
});

const axis = ref({
  primary: {
    type: "band",
  },
  secondary: {
    domain: ["dataMin", "dataMax"],
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
* {
  font-family: Pretendard-regular;
}

.bar {
  width: 50px;
}
</style>
