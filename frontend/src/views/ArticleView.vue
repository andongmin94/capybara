<template>
  <div>
    <h1>게시판 글 목록 페이지</h1>
    <RouterLink :to="{ name: 'CreateView' }"> [CREATE] </RouterLink>
    <ArticleList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useArticleStore } from "@/stores/article";
import { RouterLink } from "vue-router";
import ArticleList from "@/components/ArticleList.vue";

const store = useArticleStore();

onMounted(() => {
  store.getArticles();
});
</script>

<style scoped></style>
