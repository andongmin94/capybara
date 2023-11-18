<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-text-field
        density="compact"
        placeholder="아이디를 입력하세요"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model.trim="username"
      ></v-text-field>

      <div>
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          비밀번호를 잊으셨나요?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        v-model.trim="password"
        density="compact"
        placeholder="비밀번호를 입력하세요"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="logIn"
      >
        로그인하기
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          <RouterLink :to="{ name: 'SignUpView' }">회원가입하기</RouterLink>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

import { useArticleStore } from "@/stores/article";

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
</script>

<script lang="ts">
export default {
  data: () => ({
    visible: false,
  }),
};
</script>
