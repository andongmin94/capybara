<template>
  <v-sheet class="pa-12 wrapper">
    <v-card class="px-6 py-8 form-card" max-width="344">
      <v-form v-model="form" @submit.prevent="editProfile">
        <h1 class="text-center mb-5">회원정보 수정 페이지</h1>

        <v-text-field
          v-model.trim="nickname"
          class="mb-2 inputform"
          clearable
          label="닉네임"
          variant="solo-filled"
        ></v-text-field>

        <v-text-field
          v-model.trim="email"
          class="mb-2 inputform"
          clearable
          label="이메일"
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
          수정하기
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useArticleStore } from "@/stores/article";

const router = useRouter();
const store = useArticleStore();

const nickname = ref(null);
const email = ref(null);

const editProfile = function () {
  const payload = {
    nickname: nickname.value,
    email: email.value,
  };
  store.editProfile(payload);
};
</script>

<style lang="scss" scoped>
.form-card {
}
</style>
