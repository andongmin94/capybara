<template>
    
    <v-sheet class="pa-12 wrapper">
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form v-model="form" @submit.prevent="editProfile">
          <h1 class="text-center mb-5">회원정보 수정 페이지</h1>
  
          <v-text-field
            v-model.trim="name"
            class="mb-2 inputform"
            clearable
            label="이름"
          ></v-text-field>

          <v-text-field
            v-model.trim="nickname"
            class="mb-2 inputform"
            clearable
            label="닉네임"
          ></v-text-field>

          <v-text-field
            v-model.trim="email"
            class="mb-2 inputform"
            clearable
            label="이메일"
          ></v-text-field>

          <v-text-field
            v-model.trim="age"
            class="mb-2 inputform"
            clearable
            label="나이"
          ></v-text-field>

          <v-text-field
            v-model.trim="money"
            class="mb-2 inputform"
            clearable
            label="자산"
          ></v-text-field>

          <v-text-field
            v-model.trim="salary"
            class="mb-2 inputform"
            clearable
            label="연봉"
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

</script>

<style lang="scss" scoped>

</style>