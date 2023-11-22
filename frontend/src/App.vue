<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useArticleStore } from "@/stores/article";
import NavBar from "@/components/NavBar.vue";

const store = useArticleStore();

</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
  
</template>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

* {
  background-color: map-get($colors, third);
}

.title {
  height: 50px;
  width: 120px;
  transform: scale(1.4);
  margin-top: 10px;
  margin-left: 10px;
  min-width: 120px;
  :hover {
    transform: scale(1.1);
  }
}
.nav-item {
  :hover {
    transform: scale(1.1);
  }
}
.nav-item-text {
  font-family: Pretendard-Regular;
  font-weight: 900;
  :hover {
    transform: none;
  }
}
</style>
