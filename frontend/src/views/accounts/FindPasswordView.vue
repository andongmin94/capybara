<template>
  <v-sheet class="pa-12">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <div class="d-flex flex-column align-center mb-8">
          <h1 class="mb-2">비밀번호 찾기</h1>
          <p>가입하신 이메일 주소를 적어주세요.</p>
        </div>
        <v-text-field
          v-model.trim="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="아이디"
          variant="solo-filled"
        ></v-text-field>

        <v-text-field
          v-model.trim="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="이메일 주소"
          variant="solo-filled"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          class="find-password-btn"
          color="white"
          size="large"
          type="submit"
          variant="elevated"
        >
          이메일 전송
        </v-btn>

        <v-card-text class="d-flex justify-center mt-3">
          <RouterLink
            :to="{ name: 'login' }"
            style="text-decoration: none; color: black"
            >로그인하기</RouterLink
          >
          <v-icon icon="mdi-chevron-right"></v-icon>
          <RouterLink
            :to="{ name: 'signup' }"
            style="text-decoration: none; color: black"
            >회원가입하기</RouterLink
          >
          <v-icon icon="mdi-chevron-right"></v-icon>
        </v-card-text>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const username = ref(null);
const email = ref(null);

function onSubmit() {
  axios({
    method: "get",
    url: `http://127.0.0.1:8000/accounts/password/reset/`,
    data: {
      username: username.value,
      email: email.value,
    },
  })
    .then((res) => {
      console.log(res);
      router.push({ name: "login" });
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style lang="scss" scoped>
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
.find-password-btn {
  background-color: map-get($colors, second) !important;
  color: white !important;
}
</style>
