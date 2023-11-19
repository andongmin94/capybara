<template>
  <div class="wrapper">
    <h1>메인 페이지</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
* {
  font-family: Pretendard-regular;
}

$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.wrapper {
  background-color: map-get($colors, third);
}
</style>
