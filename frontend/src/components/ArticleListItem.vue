<template>
  <div>
    <h5>{{ article!.id }}번 게시글</h5>
    <RouterLink :to="{ name: 'articleDetail', params: { id: article!.id } }">
      <p>제목 : {{ article!.title }}</p>
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

<style scoped lang="scss">
p {
  display: inline;
}
a {
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
}
</style>