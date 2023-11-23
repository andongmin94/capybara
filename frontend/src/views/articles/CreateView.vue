<template>
  <div>
    <v-container>
      <v-row class="d-flex justify-center mt-4">
        <h1 class="article-create-header mb-7 mt-1 half-highlight">
          새 글 작성
        </h1>
      </v-row>
      <v-row>
        <v-col cols="8" offset="2">
          <v-sheet elevation="2" class="article-create-wrapper py-10 px-10">
            <v-text-field v-model="title" label="제목" variant="solo-filled" />
            <v-textarea v-model="content" label="내용" variant="solo-filled" />
            <v-file-input
              v-model="img"
              label="파일 첨부하기"
              variant="solo-filled"
            />
            <!-- 아래 에디터는 v-model 적용이 안되는 이슈가 있음 -->
            <!-- <QuillEditor v-model="content" toolbar="essential" theme="snow" style="height: 500px" /> -->
            <div class="d-flex flex-row-reverse">
              <v-chip elevation="1" color="primary" @click="createArticle"
                >게시하기</v-chip
              >
              <v-chip elevation="1" class="mr-2" color="red" @click="goBack"
                >취소하기</v-chip
              >
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCommunityStore } from "@/stores/community";
import { useRouter } from "vue-router";
import axios from "axios";

const store = useCommunityStore();

const router = useRouter();
const title = ref<string>("");
const content = ref<string>("");
const img = ref<[]>([]);

const goBack = function () {
  if (title.value || content.value) {
    if (confirm("작성 중인 글이 저장되지 않습니다. 정말 떠나시겠습니까?")) {
      router.go(-1);
    }
  } else {
    router.go(-1);
  }
};

const createArticle = function () {
  axios({
    method: "post",
    url: `${store.API_URL}/articles/`,
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
      store.getArticles();
    })
    .then(() => {
      console.log("게시글 작성 완료");
      setTimeout(() => {
        router.push({ name: "article" });
      }, 500);
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
* {
  font-family: Pretendard-regular;
}
.article-create-wrapper {
  min-width: 344px;
  border-radius: 5px;
}

.article-create-header {
  font-family: Pretendard-Regular;
  text-align: center;
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
