<template>
    
    <v-sheet class="pa-12 wrapper">
      <v-card class="mx-auto px-8 py-8" max-width="344">
        <v-form v-model="form" @submit.prevent="changePassword">
          <h1 class="text-center mb-5">비밀번호 변경</h1>
  
          <v-text-field
          v-model.trim="old_password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          class="mb-2 inputform"
          clearable
          label="기존 비밀번호"
          placeholder="기존 비밀번호를 입력하세요"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          v-model.trim="new_password1"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          class="mb-2 inputform"
          clearable
          label="새로운 비밀번호"
          placeholder="새로운 비밀번호를 입력하세요"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          v-model.trim="new_password2"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          class="mb-2 inputform"
          clearable
          label="비밀번호 확인"
          placeholder="새로운 비밀번호를 확인합니다"
          @click:append-inner="visible = !visible"
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
          비밀번호 변경하기
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

const name = ref(null);
const nickname = ref(null);
const email = ref(null);
const age = ref(null);
const money = ref(null);
const salary = ref(null);


const editProfile = function () {
  const payload = {
    name: name.value,
    nickname: nickname.value,
    email: email.value,
    age: age.value,
    money: money.value,
    salary: salary.value,
  };
  store.editProfile(payload);
};

const changePassword = function () {
  const payload = {
    old_password: old_password.value,
    new_password1: new_password1.value,
    new_password2: new_password2.value,
  };
  store.changePassword(payload);
};

</script>

<style lang="scss" scoped>

</style>