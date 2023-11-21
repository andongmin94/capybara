<template>
  <div>
    <h3>게시글 목록</h3>
    <ArticleListItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useArticleStore } from "@/stores/article";
import ArticleListItem from "@/components/ArticleListItem.vue";

const store = useArticleStore();
const articles = store.articles;

console.log(articles);
</script>
