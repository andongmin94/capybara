<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn class="createbtn" v-bind="props"> 글쓰기 </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 card-title">글쓰기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="카테고리*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="말머리"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="제목*"
                  required
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="내용*"
                  v-model.trim="content"
                  id="content"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*반드시 입력해야 하는 값입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- 저장되지 않는다는 경고 메시지 추가하기 -->
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            닫기
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="createArticle">
            게시
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useArticleStore } from "@/stores/article";
import { useRouter } from "vue-router";

const dialog = ref(false);

const title = ref<string>("");
const content = ref<string>("");
const store = useArticleStore();
const router = useRouter();

const createArticle = function () {
  axios({
    method: "post",
    url: `${store.API_URL}/api/v1/articles/`,
    data: {
      title: title.value,
      content: content.value,
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

<script lang="ts">
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>

<style lang="scss" scoped>
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

.card-title {
  font-family: Pretendard-Regular !important;
}
.createbtn {
  background-color: map-get($colors, second);
}
</style>
