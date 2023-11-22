<template>
  <div class="nav-wrapper">
    <nav class="navbar navbar-expand-lg p-0">
      <!-- 내브바 타이틀 -->

      <RouterLink :to="{ name: 'home' }" class="px-2">
        <v-img class="title" src="../src/assets/appbarlogo.svg" alt="" />
      </RouterLink>

      <!-- 토글러 버튼 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!--  내브 아이템들 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mb-3">
          <li class="ml-auto mr-5 mt-2 pt-3">
            <div>{{ store.search_username }}님 환영합니다.</div>
          </li>

          <!-- mbti -->
          <li class="nav-item ml-auto mr-5">
            <RouterLink :to="{ name: 'algorithm' }" class="nav-item-link mx-1"
              ><div class="nav-item-text text-black">
                ✨MBTI로 추천받기✨
              </div></RouterLink
            >
          </li>
          <!-- 커뮤니티 -->
          <li v-if="store.isLogin" class="nav-item ml-auto mr-5">
            <RouterLink
              :to="{ name: 'article' }"
              class="nav-item-link mx-1"
              aria-current="page"
              ><div class="nav-item-text text-black">커뮤니티</div></RouterLink
            >
          </li>
          <!-- 금리비교 -->
          <li class="nav-item ml-auto mr-5">
            <RouterLink :to="{ name: 'interest' }" class="nav-item-link mx-1"
              ><div class="nav-item-text text-black">상품보기</div></RouterLink
            >
          </li>
          <!--  -->
          <li class="nav-item ml-auto mr-5">
            <RouterLink :to="{ name: 'exchange' }" class="nav-item-link mx-1"
              ><div class="nav-item-text text-black">환전하기</div></RouterLink
            >
          </li>
          <!--  -->
          <li class="nav-item ml-auto mr-5">
            <RouterLink :to="{ name: 'map' }" class="nav-item-link mx-1"
              ><div class="nav-item-text text-black">은행찾기</div></RouterLink
            >
          </li>

          <li v-if="!store.isLogin" class="nav-item ml-auto mr-5">
            <RouterLink :to="{ name: 'login' }" class="nav-item-link mx-1"
              ><div class="nav-item-text text-black">로그인</div></RouterLink
            >
          </li>

          <li class="nav-item ml-auto mr-5" v-if="store.isLogin">
            <RouterLink
              :to="{
                name: 'profile',
                params: { search_username: store.search_username },
              }"
              class="nav-item-link mx-1"
            >
              <div class="nav-item-text text-black">마이페이지</div>
            </RouterLink>
          </li>
        </ul>

        <!-- 서치 버튼
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> -->
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useArticleStore } from "@/stores/article";
import tempnavbar from "@/components/NavBar.vue.js";

const store = useArticleStore();
</script>

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
  height: 45px;
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
  height: 50px;
}

.nav-item-link {
  text-decoration: none;

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
