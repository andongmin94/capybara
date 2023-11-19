<template>
  <div class="wrapper">
    <div v-if="article">
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성일 : {{ article.created_at.slice(0,4) }}년 {{ article.created_at.slice(5,7) }}월 {{ article.created_at.slice(8,10) }}일 {{ article.created_at.slice(11,13) }}시 {{ article.created_at.slice(14,16) }}분</p>
      <p>수정일 : {{ article.updated_at.slice(0,4) }}년 {{ article.updated_at.slice(5,7) }}월 {{ article.updated_at.slice(8,10) }}일 {{ article.updated_at.slice(11,13) }}시 {{ article.updated_at.slice(14,16) }}분</p>
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
const article = ref();

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((res) => {
      console.log(res.data)
      article.value = res.data.article;
    })
    .catch((err) => {
      console.log(err);
    });
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

.wrapper {
  background-color: map-get($colors, third);
}
</style>
