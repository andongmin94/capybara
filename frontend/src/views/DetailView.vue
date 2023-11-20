<template>

  <div class="wrapper">
    <v-btn @click="goBack">목록</v-btn>
    <div v-if="article">
      <p>제목 : {{ article.article.title }}</p>
      <p>작성자 : {{ article.article.user.username }}</p>
      <p>내용 : {{ article.article.content }}</p>
      <p>
        작성일 : {{ article.article.created_at.slice(0, 4) }}년
        {{ article.article.created_at.slice(5, 7) }}월
        {{ article.article.created_at.slice(8, 10) }}일
        {{ article.article.created_at.slice(11, 13) }}시
        {{ article.article.created_at.slice(14, 16) }}분
      </p>
      <p>
        수정일 : {{ article.article.updated_at.slice(0, 4) }}년
        {{ article.article.updated_at.slice(5, 7) }}월
        {{ article.article.updated_at.slice(8, 10) }}일
        {{ article.article.updated_at.slice(11, 13) }}시
        {{ article.article.updated_at.slice(14, 16) }}분
      </p>
    </div>
    <!-- 댓글 작성 폼 -->
    <div class="mt-6">
      <h2 class="text-xl font-bold mb-3">댓글 작성하기</h2>
      <textarea
        v-model.trim="newComment"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="댓글을 입력하세요"
      ></textarea>
      <v-btn
        @click="submitComment(0)"
        class="mt-2 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
      >
        댓글 작성
      </v-btn>
    </div>

    <p>댓글 목록</p>
    <div v-if="article">
      <p v-for="comment in article.comments">
        작성자 : {{ comment.user.username }}
        내용 : {{ comment.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useArticleStore } from "@/stores/article";
import { useRoute, useRouter } from "vue-router";
import type { Article } from "@/types/Article";

const store = useArticleStore();
const route = useRoute();
const router = useRouter();
const article = ref();
const comments = ref();
const newComment = ref("");

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/api/v1/articles/${route.params.id}/`,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      article.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const goBack = function () {
  router.go(-1);
};

const submitComment = (parent_pk: any) => {
  if (!newComment.value.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }
  const newCommentObject = {
    article_pk: route.params.id,
    content: newComment.value,
    parent_pk: parent_pk,
    parent_comment: parent_pk === 0 ? null : parent_pk,
    user: { username: store.search_username },
    created_at: "now",
    id: "temp",
  };

  store.createComments({
    article_pk: route.params.id,
    content: newComment.value,
    parent_pk: parent_pk,
  });
  comments.value.push(newCommentObject);
  newComment.value = "";
};
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
