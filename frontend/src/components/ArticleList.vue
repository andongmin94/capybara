<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <v-sheet elevation="3" class="pa-5 article-list-sheet">
            <v-row class="mb-1 article-list-header">
              <v-col cols="2" align="center">
                <div>글 번호</div>
              </v-col>
              <v-col cols="10" align="center">
                <div>글 내용</div>
              </v-col>
              <v-divider class="article-divider"></v-divider>
            </v-row>
            <ArticleListItem
              v-for="article in sortedArticles"
              :key="article.id"
              :article="article"
            />
            <v-pagination
              v-model="page"
              :length="4"
              rounded="circle"
            ></v-pagination>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <ArticleCreate />
  </div>
</template>

<script setup lang="ts">
import ArticleListItem from "@/components/ArticleListItem.vue";
import ArticleCreate from "@/components/ArticleCreate.vue";
import { ref, onMounted } from "vue";
import { useCommunityStore } from "@/stores/community";

const store = useCommunityStore();
const page = ref(1);

const articles = store.articles;
const sortedArticles = articles.sort((a, b) => b.id - a.id);

onMounted(() => {
  store.getArticles();
  // console.log("list: " + articles);
});
</script>

<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.article-list-header {
  background-color: #f2f2f2;
}
.article-list-sheet {
  border-radius: 5px;
  min-width: 344px;
  padding: 10px;
}
.article-divider {
  opacity: 100%;
}
</style>
