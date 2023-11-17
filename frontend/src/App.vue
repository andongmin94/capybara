<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <v-toolbar title="Application">
      <RouterLink :to="{ name: 'home' }"><v-btn>홈</v-btn></RouterLink> | 
      <RouterLink :to="{ name: 'article' }"><v-btn>커뮤니티</v-btn></RouterLink> | 
      <RouterLink :to="{ name: 'exchange' }"><v-btn>환율</v-btn></RouterLink> | 
      <RouterLink :to="{ name: 'interest' }"><v-btn>금리비교</v-btn></RouterLink> | 
      <RouterLink :to="{ name: 'map' }"><v-btn>지도</v-btn></RouterLink>
      |
      <RouterLink :to="{ name: 'LogInView' }"><v-btn>LogIn</v-btn></RouterLink> |
      <RouterLink :to="{ name: 'SignUpView' }"><v-btn>SignUp</v-btn></RouterLink> |
    </v-toolbar>
  </header>

  <RouterView />
</template>

<style scoped></style>
