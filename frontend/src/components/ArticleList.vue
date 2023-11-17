<template>
  <div>
    <h3>Article List</h3>
    <ArticleListItem
      v-for="article in store.articles"
      :key="article.title"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from "@/stores/article";
import ArticleListItem from "@/components/ArticleListItem.vue";
import type { Article } from "@/types/Article";

const store = useArticleStore();

console.log(store.articles);
</script>
