<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signUp">
      <!-- <input type="text" v-model.trim="아이디" />
      <input type="password" v-model.trim="비밀번호" />
      <input type="password" v-model.trim="비밀번호확인" />
      <v-btn type="submit">Submit</v-btn> -->
      <v-text-field label="아이디" v-model.trim="username"></v-text-field>
      <v-text-field label="이메일 주소" v-model.trim="email"></v-text-field>
      <v-text-field type="password" label="비밀번호" v-model.trim="password1"></v-text-field>
      <v-text-field type="password" label="비밀번호 확인" v-model.trim="password2"></v-text-field>
      <v-btn type="submit">Submit</v-btn>
    </form>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useArticleStore } from "@/stores/article";

const store = useArticleStore();
const username = ref(null);
const email = ref(null);
const password1 = ref(null);
const password2 = ref(null);

const signUp = function () {
  const payload = {
    username: username.value,
    email: email.value,
    password1: password1.value,
    password2: password2.value,
  };
  store.signUp(payload);
};
</script>

<style></style>

