<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="logIn">
      <input type="text" v-model.trim="username" />
      <input type="password" v-model.trim="password" />
      <v-btn type="submit">Submit</v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useArticleStore } from "@/stores/article";

const store = useArticleStore();
const username = ref(null);
const password = ref(null);

const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value,
  };
  store.logIn(payload);
};
</script>

<style></style>
