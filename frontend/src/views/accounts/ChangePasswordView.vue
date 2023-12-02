<template>
  <v-sheet class="pa-12">
    <v-card class="mx-auto px-8 py-8 d-flex flex-column" max-width="344">
      <h1 class="text-center mb-5">비밀번호 변경</h1>

      <v-text-field
        v-model.trim="old_password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        class="mb-2"
        clearable
        label="기존 비밀번호"
        placeholder="기존 비밀번호를 입력하세요"
        @click:append-inner="visible = !visible"
        variant="solo-filled"
      ></v-text-field>

      <v-text-field
        v-model.trim="new_password1"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        class="mb-2"
        clearable
        label="새로운 비밀번호"
        placeholder="새로운 비밀번호를 입력하세요"
        @click:append-inner="visible = !visible"
        variant="solo-filled"
      ></v-text-field>

      <v-text-field
        v-model.trim="new_password2"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        class="mb-2"
        clearable
        label="비밀번호 확인"
        placeholder="새로운 비밀번호를 확인합니다"
        @click:append-inner="visible = !visible"
        variant="solo-filled"
      ></v-text-field>

      <v-btn
        @click="changePassword"
        class="ch-password-btn"
        size="large"
        type="submit"
        variant="elevated"
      >
        비밀번호 변경하기
      </v-btn>
      <v-card variant="tonal" class="mt-6">
        <v-card-text>
          <h4 class="ch-password-tip my-2">✋ "뭔가 잘못"된 경우는?</h4>
          <p>- ID, e-mail 주소와 유사한 경우</p>
          <p>- 길이가 8자 미만인 경우</p>
          <p>- 너무 흔한 비밀번호인 경우</p>
          <p>- 숫자로만 이루어진 경우</p>
        </v-card-text>
      </v-card>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCommunityStore } from "@/stores/community";

const store = useCommunityStore();

const old_password = ref(null);
const new_password1 = ref(null);
const new_password2 = ref(null);

const visible = ref(false);

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
.ch-password-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
}
</style>
