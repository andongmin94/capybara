<template>
  <div class="home-wrapper">
    <v-carousel show-arrows="hover" hide-delimiters height="auto" cycle>
      <v-carousel-item
        class="home-car-image"
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      >
        <!-- 짝수 - 왼쪽 아래 -->
        <v-chip
          variant="elevated"
          size="x-large"
          v-if="i === 2 || i === 0"
          class="home-chip-left"
          @click="goThere(item)"
        >
          {{ item.content }}↗</v-chip
        >
        <!-- 홀수 - 오른쪽 아래 -->
        <v-chip
          variant="elevated"
          size="x-large"
          v-else
          class="home-chip-right"
          @click="goThere(item)"
          ><strong>{{ item.content }}↗</strong></v-chip
        >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted } from "vue";
import { useFinanceStore } from "@/stores/finance";
import { useCommunityStore } from "@/stores/community";

const coStore = useCommunityStore();
const finStore = useFinanceStore();

onMounted(() => {
  coStore.getArticles();
  finStore.setFinances();
});

const goThere = function (item: any) {
  router.push({ name: item.name });
};
const items = [
  {
    src: "/main1.svg",
    name: "interest",
    content: "예금 상품 비교하러 가기 ",
  },
  {
    src: "/main2.svg",
    name: "exchange",
    content: "환율 계산하러 가기 ",
  },
  {
    src: "/main3.svg",
    name: "map",
    content: "가까운 은행 지점 찾기 ",
  },
  {
    src: "/main4.svg",
    name: "algorithm",
    content: "테스트하고 추천받기 ",
  },
];
</script>

<style scoped lang="scss">
* {
  font-family: Pretendard-regular;
}

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
.home-wrapper {
  background-color: map-get($colors, third);
}

.v-image {
  width: 300px;
  max-width: fit-content;
}
.home-car-image {
  position: relative;
}
.home-chip-left {
  position: absolute;
  left: 50px;
  bottom: 50px;
  background-color: map-get($map: $colors, $key: forth);
  color: map-get($map: $colors, $key: fifth);
}

.home-chip-right {
  position: absolute;
  right: 50px;
  bottom: 50px;
  background-color: map-get($map: $colors, $key: third);
  color: map-get($map: $colors, $key: forth);
}
</style>
