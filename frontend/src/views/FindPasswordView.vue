<template>
  <v-sheet class="pa-12">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <p style="text-align: center">가입하신 이메일 주소를 적어주세요.</p>
        <br />
        <v-text-field
          v-model.trim="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 inputform"
          clearable
          label="아이디"
        ></v-text-field>

        <v-text-field
          v-model.trim="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 inputform"
          clearable
          label="이메일 주소"
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
          이메일 전송
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
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

<style lang="scss" scoped></style>
