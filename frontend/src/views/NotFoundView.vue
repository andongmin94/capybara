<template>
  <div>
    <v-container class="d-flex flex-column align-center">
      <h1>404 NOT FOUND</h1>
      <p>잘못된 접근입니다</p>
      <img class="image" src="@/assets/404.png" />
      <v-chip @click="goHome">돌아갈래요</v-chip>
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
.image {
  width: 300px;
}
</style>
