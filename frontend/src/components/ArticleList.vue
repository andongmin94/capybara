<template>
  <div>
    <v-sheet elevation="3" class="pa-10">
      <v-row>
        <v-col cols="10">
          <h3>게시글 목록</h3>
        </v-col>
        <v-col cols="2">
          <RouterLink :to="{ name: 'create' }"
            ><v-chip class="write-btn" elevation="1">글쓰기</v-chip></RouterLink
          >
        </v-col>
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
import { ref, computed } from "vue";
import { useArticleStore } from "@/stores/article";
import ArticleListItem from "@/components/ArticleListItem.vue";

const store = useArticleStore();
const articles = store.articles;

console.log(articles);
</script>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.write-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
}
</style>
