<template>
  <div class="article-detail-wrapper">
    <v-container>
      <v-row>
        <v-col cols="8" offset="2">
          <v-sheet elevation="3" class="article-detail-sheet pa-10">
            <v-chip @click="goBack" class="mb-5">뒤로 가기</v-chip>
            <div v-if="article">
              <p class="article-detail-title mb-7">{{ article.article.title }}</p>
              <div class="d-flex mb-7">
              <p class="article-detail-detail mr-5">
                <strong>작성자</strong>
                <div>{{ article.article.user.nickname }}</div>
              </p>
                <p class="article-detail-detail mr-5">
                  <strong>작성일시</strong> 
                  <div>
                  {{ article.article.created_at.slice(0, 4) }}년
                  {{ article.article.created_at.slice(5, 7) }}월
                  {{ article.article.created_at.slice(8, 10) }}일
                  {{ article.article.created_at.slice(11, 13) }}시
                  {{ article.article.created_at.slice(14, 16) }}분
                </div>
                </p>
                <p class="article-detail-detail">
                 <strong> 마지막 수정일시 </strong>
                  <div>
                  {{ article.article.updated_at.slice(0, 4) }}년
                  {{ article.article.updated_at.slice(5, 7) }}월
                  {{ article.article.updated_at.slice(8, 10) }}일
                  {{ article.article.updated_at.slice(11, 13) }}시
                  {{ article.article.updated_at.slice(14, 16) }}분
                </div>
                </p>
              </div>
              <p class="article-detail-content mb-5 pa-3">
                {{ article.article.content }}
              </p>
              <div class="d-flex flex-row-reverse">
                <v-chip elevation="2" @click="deleteArticle" color="red" class="ml-2"> 글 삭제 </v-chip>
                <v-chip  elevation="2" color="primary"> 글 수정 </v-chip>
            </div>
            </div>
            <!-- 댓글 작성 폼 -->
            <div class="mt-6">
              <div class="text-xl font-bold mb-3">댓글</div>
              <div class="d-flex">
              <v-text-field
                v-model.trim="newComment"
                class="article-detail-comment-input mr-4"
                placeholder="댓글을 입력하세요"
              ></v-text-field>
              <v-chip
                @click="submitComment(0)"
             elevation="2"
                class="mt-2 text-black font-bold py-2 px-4"
              >
                 작성
              </v-chip>
            </div>
            </div>

            
            <div v-if="article">
              <p v-for="comment in article.comments" class="mb-5">
                <div class="article-detail-comment-user">
                  <strong> {{ comment.user.nickname }}</strong>
                </div>
                
                <div class="d-flex justify-space-between"> 
                  <div>{{ comment.content }}</div>
                  <v-chip size="small" @click="deleteComment(comment)">x</v-chip>
                </div>
              </p>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
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
      console.log("여기서부터");
      console.log(article);
      article.value = res.data.article;
      store.getArticles();

      setTimeout(() => {
        router.push({ name: "article" });
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

.article-detail-sheet {
  border-radius: 5px;
}

.article-detail-title {
  font-size: xx-large;
  font-weight: 900;
}

.article-detail-detail {
  font-size: smaller;
}
.article-detail-content {
  background-color: map-get($map: $colors, $key: fifth);
  min-height: 400px;
  
}

.article-detail-comment-input{
  min-width : 50px;

}
.article-detail-comment-user {
  font-size: smaller;
}
</style>
