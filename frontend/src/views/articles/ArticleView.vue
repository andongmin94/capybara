<template>
  <div class="article-view-wrapper d-flex flex-column my-3">
    <h1 class="mt-5 half-highlight">자유 게시판</h1>
    <v-container>
      <ArticleList />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ArticleList from "@/components/ArticleList.vue";
import { useCommunityStore } from "@/stores/community";

const store = useCommunityStore();
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
* {
  font-family: Pretendard-regular;
}
.article-view-wrapper {
  background-color: map-get($colors, third);
  align-items: center;
  border-radius: 5px;
}
.article-view-title {
  font-family: Pretendard-Regular;
  font-weight: 300;
}
.half-highlight {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 55%,
    lighten(#59452c, 35%) 50%
  );
  width: fit-content;
}
</style>
