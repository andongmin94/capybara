<template>
  <div class="article-view-wrapper d-flex flex-column align-center">
    <h1 class="article-view-title my-4">게시판 글 목록 페이지</h1>
    <ArticleList />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import ArticleList from "@/components/ArticleList.vue";
</script>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.article-view-wrapper {
  background-color: map-get($colors, third);
}
.article-view-title {
  font-family: Pretendard-Regular;
  font-weight: 300;
}
</style>
