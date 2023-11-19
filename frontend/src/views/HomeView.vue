<template>
  <div class="wrapper">
    <v-carousel show-arrows="hover" hide-delimiters height="auto">
      <v-carousel-item
        class="c-image"
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        @click="goThere(item)"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

const goThere = function (item: any) {
  router.push({ name: item.name });
};
const items = [
  {
    src: "./src/assets/main1.svg",
    name: "interest",
  },
  {
    src: "./src/assets/main2.svg",
    name: "exchange",
  },
  {
    src: "./src/assets/main3.svg",
    name: "map",
  },
  {
    src: "./src/assets/main4.svg",
    name: "profile",
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

.wrapper {
  background-color: map-get($colors, third);
}

.v-image {
  width: 300px;
  max-width: fit-content;
}
</style>
