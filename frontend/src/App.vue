<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav><RouterLink :to="{ name: 'home' }" /></nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
