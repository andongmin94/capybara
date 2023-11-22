<template>
  <div class="article-detail-wrapper">
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
      <v-btn @click="deleteArticle"> 삭제 </v-btn>
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
        작성자 : {{ comment.user.username }} 내용 : {{ comment.content }}
        <button @click="deleteComment(comment)">댓글 삭제</button>
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
const newComment = ref("");

onMounted(() => {
  axios({
    method: "get",
    url: `${store.API_URL}/articles/${route.params.id}/`,
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

const deleteArticle = function () {
  axios({
    method: "delete",
    url: `${store.API_URL}/articles/${route.params.id}/`,
    headers: { Authorization: `Token ${store.token}` },
  })
    .then((res) => {
      console.log('여기서부터')
      console.log(article);
      article.value = res.data.article;
      setTimeout(() => {
        router.push({ name: "home" });
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
};

const submitComment = (parent_pk: any) => {
  if (!newComment.value.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }
  store.createComments({
    article_pk: route.params.id,
    content: newComment.value,
    parent_pk: parent_pk,
  });
  router.push({ name: "article" });
  newComment.value = "";
};

const deleteComment = (comment: any) => {
  if (confirm("댓글을 삭제하시겠습니까?")) {
    const payload = {
      article_pk: article.value.article.id, // 현재 게시글의 ID
      comment_pk: comment.id, // 삭제할 댓글의 ID
    };

    store
      .deleteComment(payload)
      .then(() => {
        // 성공적으로 삭제된 댓글을 목록에서 제거
        console.log("댓글 삭제 성공");
      })
      .catch((err) => {
        console.error("댓글 삭제 실패:", err);
      });
  }
  // router.push({ name: "article" });
  axios({
    method: "get",
    url: `${store.API_URL}/articles/${route.params.id}/`,
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

.article-detail-wrapper {
  background-color: map-get($colors, third);
}
</style>
