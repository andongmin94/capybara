<template>
  <v-sheet class="pa-12" align="center">
    <v-card class="px-6 py-8 form-card" max-width="360">
      <v-form v-model="form" @submit.prevent="editProfile">
        <h1 class="text-center mb-5">회원정보 수정 페이지</h1>

        <v-text-field
          v-model.trim="nickname"
          class="mb-2"
          clearable
          label="닉네임"
          variant="solo-filled"
        ></v-text-field>

        <v-text-field
          v-model.trim="email"
          class="mb-2"
          clearable
          label="이메일"
          variant="solo-filled"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          class="modify-btn"
          size="large"
          type="submit"
        >
          수정하기
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCommunityStore } from "@/stores/community";

const store = useCommunityStore();

const nickname = ref(null);
const email = ref(null);
const form = ref(null);
const loading = ref(false);

const editProfile = function () {
  const payload = {
    nickname: nickname.value,
    email: email.value,
  };
  store.editProfile(payload);
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
* {
  font-family: Pretendard-regular;
}
.modify-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
}
</style>
