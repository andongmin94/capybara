<template>
  <div class="wrapper">
    <h1 class="title">게시판 글 목록 페이지</h1>
    <RouterLink :to="{ name: 'create' }"><v-btn>글쓰기</v-btn></RouterLink>
    <ArticleList />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import ArticleList from "@/components/ArticleList.vue";
import temparticlelist from "@/components/temparticlelist.vue";
import { watch } from "vue";
</script>

<style lang="scss" scoped>
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
.title {
  font-family: Pretendard-Regular;
  font-weight: 300;
}
</style>
