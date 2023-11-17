<template>
  <div>
    <h5>{{ article!.id }}</h5>
    <p>{{ article!.title }}</p>
    <RouterLink :to="{ name: 'DetailView', params: { id: article!.id } }">
      [Detail]
    </RouterLink>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps({
  article: Object,
});
</script>
