<template>
  <div>
    <v-container>
      <v-sheet elevation="3" class="pa-10 article-list-sheet">
        <v-row class="mb-3">
          <v-col cols="2" align="center">
            <div>글 번호</div>
          </v-col>
          <v-col cols="8" align="center">
            <div>글 내용</div>
          </v-col>
          <v-col cols="2">
            <RouterLink :to="{ name: 'create' }"
              ><v-chip class="article-create-btn mb-1" elevation="2"
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
    </v-container>
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

<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.article-list-sheet {
  border-radius: 5px;
}
.article-divider {
  opacity: 100%;
}

.article-create-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
}
</style>
