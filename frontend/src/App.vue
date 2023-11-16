<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <v-toolbar title="Application">
      <RouterLink :to="{ name: 'home' }">홈</RouterLink>
      <RouterLink :to="{ name: 'community' }">커뮤니티</RouterLink>
      <RouterLink :to="{ name: 'exchange' }">환율</RouterLink>
      <RouterLink :to="{ name: 'interest' }">금리비교</RouterLink>
      <RouterLink :to="{ name: 'map' }">지도</RouterLink>
    </v-toolbar>
  </header>

  <RouterView />
</template>

<style scoped></style>
