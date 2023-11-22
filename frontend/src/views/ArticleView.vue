<template>
  <div class="article-view-wrapper d-flex flex-column">
    <h1 class="my-5">자유 게시판</h1>
    <v-container>
      <ArticleList />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import ArticleList from "@/components/ArticleList.vue";
import { useArticleStore } from "@/stores/article";

const store = useArticleStore();
onMounted(() => {
  store.getArticles();
});
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
  align-items: center;
}
.article-view-title {
  font-family: Pretendard-Regular;
  font-weight: 300;
}
</style>
