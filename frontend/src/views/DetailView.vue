<template>
  <div>
    <h1>Detail</h1>
    <div v-if="article">
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성일 : {{ article.created_at }}</p>
      <p>수정일 : {{ article.updated_at }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useArticleStore } from "@/stores/article";
import { useRoute } from "vue-router";
import type { Article } from "@/types/Article";

const store = useArticleStore();
const route = useRoute();
const article = ref<Article>(null);

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`,
  })
    .then((res) => {
      // console.log(res.data)
      article.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style></style>
