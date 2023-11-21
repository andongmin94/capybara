<template>
  <v-sheet class="pa-12 wrapper">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="logIn">
        <h1 class="text-center mb-5">로그인</h1>
        <v-text-field
          v-model.trim="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 inputform"
          clearable
          label="아이디"
          variant="solo-filled"
        ></v-text-field>

        <v-text-field
          v-model.trim="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 inputform"
          clearable
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          @click:append-inner="visible = !visible"
          variant="solo-filled"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          class="inputform btn"
          color="white"
          size="large"
          type="submit"
          variant="elevated"
        >
          로그인하기  
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        <span class="mx-3">
          <RouterLink
            :to="{ name: 'findpassword' }"
            style="text-decoration: none; color: black"
            >비밀번호 찾기</RouterLink
          >
          <v-icon icon="mdi-chevron-right"></v-icon>
        </span>

        <RouterLink
          :to="{ name: 'signup' }"
          style="text-decoration: none; color: black"
          >회원가입하기</RouterLink
        >
        <v-icon icon="mdi-chevron-right"></v-icon>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useArticleStore } from "@/stores/article";
import { RouterLink } from "vue-router";

const form = ref(false);
const loading = ref(false);

const store = useArticleStore();
const username = ref(null);
const password = ref(null);

const visible = ref(false);

const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value,
  };
  store.logIn(payload);
};

function required(v: any) {
  return !!v || "필수 값입니다";
}
</script>

<script lang="ts">
export default {
  data: () => ({
    visible: false,
  }),
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

.inputform {
  font-family: Pretendard-Regular;
  font-weight: 300;
}

.btn {
  background-color: map-get($colors, second) !important;
  color: white !important;
}
</style>
