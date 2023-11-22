<template>
  <div>
    <RouterLink :to="{ name: 'create' }" class="article-create-link">
      <v-tooltip activator="parent" location="start">새 글 작성하기</v-tooltip>
      <v-chip size="x-large" class="article-create-btn mb-1" elevation="3"
        ><strong>+</strong>
      </v-chip></RouterLink
    >
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.article-create-link {
  position: fixed;
  bottom: 20px;
  right: 20px;
  :hover {
    transform: scale(1.2);
    cursor: pointer;
  }
}

.article-create-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
  :hover {
    transform: scale(1);
  }
}
</style>
