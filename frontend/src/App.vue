<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useCommunityStore } from "@/stores/community";

const store = useCommunityStore();

const existingData = localStorage.getItem("mbtiData");
const mbtiElements = JSON.parse(existingData);
</script>

<template>
  <header>
    <v-toolbar elevation="1">
      <!--화면 가장 작을때 사라지는거 수정하기 -->
      <v-toolbar-title>
        <RouterLink :to="{ name: 'home' }">
          <v-img class="title" src="../src/assets/appbarlogo.svg" alt="" />
        </RouterLink>
      </v-toolbar-title>
      <div v-if="store.isLogin">{{ store.search_username }}님 환영합니다.</div>

      <div>
        <RouterLink
          :to="{ name: 'algorithmresult' }"
          class="nav-item mx-1"
          v-if="Array.isArray(mbtiElements) && mbtiElements.length !== 0"
          ><v-btn class="nav-item-text text-black"
            >✨MBTI 다시보기✨</v-btn
          ></RouterLink
        >

        <RouterLink
          :to="{ name: 'algorithm' }"
          class="nav-item mx-1"
          v-else-if="
            (Array.isArray(mbtiElements) && mbtiElements.length === 0) ||
            !mbtiElements
          "
          ><v-btn class="nav-item-text text-black"
            >✨MBTI로 추천받기✨</v-btn
          ></RouterLink
        >
      </div>

      <RouterLink
        :to="{ name: 'article' }"
        class="nav-item mx-1"
        v-if="store.isLogin"
        ><v-btn class="nav-item-text text-black">커뮤니티</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'interest' }" class="nav-item mx-1"
        ><v-btn class="nav-item-text text-black">상품보기</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'exchange' }" class="nav-item mx-1"
        ><v-btn class="nav-item-text text-black">환전하기</v-btn></RouterLink
      >

      <RouterLink :to="{ name: 'map' }" class="nav-item mx-1"
        ><v-btn class="nav-item-text text-black">은행찾기</v-btn></RouterLink
      >

      <RouterLink
        :to="{ name: 'login' }"
        class="nav-item mx-1"
        v-if="!store.isLogin"
        ><v-btn class="nav-item-text text-black">로그인</v-btn></RouterLink
      >
      <RouterLink
        :to="{
          name: 'profile',
          params: { search_username: store.search_username },
        }"
        class="nav-item mx-1"
        v-if="store.isLogin"
        ><v-btn class="nav-item-text text-black">마이페이지</v-btn></RouterLink
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
  min-width: 120px;
  :hover {
    transform: scale(1.1);
  }
}
.nav-item {
  :hover {
    transform: scale(1.1);
  }
}
.nav-item-text {
  font-family: Pretendard-Regular;
  font-weight: 900;
  :hover {
    transform: none;
  }
}
</style>
