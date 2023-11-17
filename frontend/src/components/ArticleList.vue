<template>
  <div>
    <h3>Article List</h3>
    <ArticleListItem
      v-for="article in articles"
      :key="article"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from "@/stores/article";
import ArticleListItem from "@/components/ArticleListItem.vue";

const store = useArticleStore();
const articles = store.articles;

console.log(store.articles);
</script>
