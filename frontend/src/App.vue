<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useArticleStore } from "@/stores/article";

const store = useArticleStore();
</script>

<template>
  <header>
    <v-toolbar>
      <v-toolbar-title>
        <RouterLink :to="{ name: 'home' }">
          <v-img class="title" src="../src/assets/appbarlogo.svg" alt="" />
        </RouterLink>
      </v-toolbar-title>
      <div v-if="store.isLogin">{{ store.search_username }} 님 환영합니다.</div>

      <RouterLink :to="{ name: 'algorithm' }"
        ><v-btn class="nav-item text-black">추천 상품</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'home' }"
        ><v-btn class="nav-item text-black">홈</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'article' }" v-if="store.isLogin"
        ><v-btn class="nav-item text-black">커뮤니티</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'exchange' }"
        ><v-btn class="nav-item text-black">환율</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'interest' }"
        ><v-btn class="nav-item text-black">금리비교</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'map' }"
        ><v-btn class="nav-item text-black">지도</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'cart' }"
        ><v-btn class="nav-item text-black">장바구니</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'login' }" v-if="!store.isLogin"
        ><v-btn class="nav-item text-black">로그인</v-btn></RouterLink
      >
      <RouterLink
        :to="{
          name: 'profile',
          params: { search_username: store.search_username },
        }"
        v-if="store.isLogin"
        ><v-btn class="nav-item text-black">마이페이지</v-btn></RouterLink
      >
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
  height: 50px;
  width: 120px;
  transform: scale(1.4);
  margin-top: 10px;
  margin-left: 10px;
  :hover {
    transform: scale(1.1);
  }
}

.nav-item {
  font-family: Pretendard-Regular;
  font-weight: 900;

  :hover {
    transform: scale(1.2);
    text-decoration: underline;
  }
}
</style>
