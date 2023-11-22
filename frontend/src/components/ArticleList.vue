<template>
  <div>
    <v-sheet elevation="3" class="pa-10">
      <v-row class="mb-3">
        <v-col cols="2">
          <div>글 번호</div>
        </v-col>
        <v-col cols="8">
          <div>글 내용</div>
        </v-col>
        <v-col cols="2">
          <RouterLink :to="{ name: 'create' }"
            ><v-chip class="article-create-btn mb-1" elevation="1"
              >글쓰기</v-chip
            ></RouterLink
          >
        </v-col>
        <v-divider class="article-divider"></v-divider>
      </v-row>
      <ArticleListItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useArticleStore } from "@/stores/article";
import ArticleListItem from "@/components/ArticleListItem.vue";

const store = useArticleStore();
const articles = store.articles;

onMounted(() => {
  store.getArticles();
});

console.log(articles);
</script>

<style scoped lang="scss">
.article-divider {
  opacity: 100%;
}
</style>
