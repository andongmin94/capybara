<template>
  <div class="wrapper">
    <v-carousel show-arrows="hover" hide-delimiters height="auto">
      <v-carousel-item
        class="c-image"
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    src: "./src/assets/main1.svg",
  },
  {
    src: "./src/assets/main2.svg",
  },
  {
    src: "./src/assets/main3.svg",
  },
  {
    src: "./src/assets/main4.svg",
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

#app
  > div
  > div
  > div
  > div.v-window-item.v-window-item--active.v-carousel-item
  > div
  > img {
  width: 300px;
}
</style>
