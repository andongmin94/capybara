<template>
  <div>
    <v-container class="d-flex flex-column align-center">
      <h1 class="half-highlight">404 NOT FOUND</h1>
      <p>잘못된 접근입니다</p>
      <img class="not-found-image" src="/404.png" />
      <v-chip @click="goHome">돌아가기</v-chip>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = function () {
  router.replace({ name: "home" });
};
</script>
<style scoped lang="scss">
* {
  font-family: Pretendard-regular;
}
.not-found-image {
  width: 250px;
}
.half-highlight {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 55%,
    lighten(#59452c, 35%) 50%
  );
  width: fit-content;
}
</style>
