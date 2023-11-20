<template>
  <div class="wrapper">
    <v-container>
      <h1 class="header">새 글 작성</h1>

      <v-text-field v-model="title" label="제목" />
      <v-textarea v-model="content" label="내용 " />
      <v-file-input v-model="img" label="파일 첨부하기"></v-file-input>
      <!-- 아래 에디터는 v-model 적용이 안되는 이슈가 있음 -->
      <!-- <QuillEditor v-model="content" toolbar="essential" theme="snow" style="height: 500px" /> -->

      <v-btn @click="goBack">취소하기</v-btn>
      <v-btn @click="createArticle">게시하기</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { QuillEditor } from "@vueup/vue-quill";
import { useArticleStore } from "@/stores/article";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";

const title = ref<string>("");
const content = ref<string>("");
const img = ref<[]>([]);
const store = useArticleStore();
const router = useRouter();

const goBack = function () {
  if (title.value || content.value) {
    confirm("작성 중인 글이 저장되지 않습니다. 정말 떠나시겠습니까?");
  } else {
    router.go(-1);
  }
};

const createArticle = function () {
  axios({
    method: "post",
    url: `${store.API_URL}/api/v1/articles/`,
    data: {
      title: title.value,
      content: content.value,
      // image: img.value,
    },
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((res) => {
      // console.log(res)
      router.push({ name: "article" });
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

.header {
  background-color: map-get($colors, third);
  font-family: Pretendard-Regular;
}
</style>
