<template>
  <v-sheet class="pa-12">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <h1 class="text-center mb-5">회원 가입</h1>
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
          v-model.trim="nickname"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 inputform"
          clearable
          label="닉네임"
          variant="solo-filled"
        ></v-text-field>

        <v-text-field
          v-model.trim="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 inputform"
          clearable
          label="이메일 주소"
          variant="solo-filled"
        ></v-text-field>

        <v-text-field
          v-model.trim="password1"
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

        <v-text-field
          v-model.trim="password2"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :readonly="loading"
          :rules="[required, passwordMatch]"
          class="inputform"
          clearable
          label="비밀번호 확인"
          placeholder="비밀번호를 입력하세요"
          @click:append-inner="visible = !visible"
          variant="solo-filled"
        ></v-text-field>

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
          회원가입하기
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        <RouterLink
          :to="{ name: 'login' }"
          style="text-decoration: none; color: black"
          >로그인하기</RouterLink
        >
        <v-icon icon="mdi-chevron-right"></v-icon>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCommunityStore } from "@/stores/community";
import { RouterLink } from "vue-router";

const form = ref(false);
const loading = ref(false);
const store = useCommunityStore();

const username = ref(null);
const nickname = ref(null);
const email = ref(null);
const password1 = ref(null);
const password2 = ref(null);

const visible = ref(false);

function onSubmit() {
  console.log("가입시도중");

  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);

  signUp();
}

function required(v: any) {
  return !!v || "필수 값입니다";
}

const signUp = function () {
  const payload = {
    username: username.value,
    nickname: nickname.value,
    email: email.value,
    password1: password1.value,
    password2: password2.value,
  };
  store.signUp(payload);
};

function passwordMatch() {
  // 비밀번호와 비밀번호 확인이 서로 다를 경우 에러 메시지 반환
  return password1.value === password2.value || "비밀번호가 일치하지 않습니다";
}
</script>

<script lang="ts">
export default {
  data: () => ({
    visible: false,
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

.inputform {
  font-family: Pretendard-Regular;
  font-weight: 300;
}

.btn {
  background-color: map-get($colors, second) !important;
  color: white !important;
}
</style>
