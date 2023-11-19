<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useArticleStore } from "@/stores/article";

const store = useArticleStore();
</script>

<template>
  <header>
    <v-toolbar class="title" title="카피바라">
      <RouterLink :to="{ name: 'home' }"
        ><v-btn class="nav-item text-black">홈</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'article' }" v-if="store.isLogin"
        ><v-btn class="nav-item text-black">커뮤니티</v-btn></RouterLink
      >
      

      <!-- <RouterLink :to="{ name: 'exchange' }"
        ><v-btn class="nav-item text-black">환율</v-btn></RouterLink
      > -->

      <RouterLink :to="{ name: 'interest' }"
        ><v-btn class="nav-item text-black">금리비교</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'map' }"
        ><v-btn class="nav-item text-black">지도</v-btn></RouterLink
      >

      <!-- 로그인 되어있으면 프로필 페이지로, 아니면 로그인으로, 로그인 내에 회원가입으로 -->
      <RouterLink :to="{ name: 'login' }" v-if="!store.isLogin"
        ><v-btn class="nav-item text-black">로그인</v-btn></RouterLink
      >
      <RouterLink :to="{ name: 'signup' }" v-if="!store.isLogin"
        ><v-btn class="nav-item text-black">회원가입</v-btn></RouterLink
      >
      <RouterLink :to="{ name: 'profile' }" v-if="store.isLogin"
        ><v-btn class="nav-item text-black">마이페이지</v-btn></RouterLink
      >
      <!-- 마이페이지에 넣기 -->
      <!-- <v-btn @click="store.logOut()" v-if="store.isLogin" class="nav-item text-black">로그아웃</v-btn> -->
    </v-toolbar>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

* {
  background-color: map-get($colors, third);
}

.title {
  font-family: Pretendard-Regular;
  font-weight: 300;
  background-color: map-get($map: $colors, $key: third);
}

.nav-item {
  font-family: Pretendard-Regular;
  font-weight: 200;
}
</style>
