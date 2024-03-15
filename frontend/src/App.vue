<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { dataSourceMeta } from "@/api";
import { useDemoStore } from "@/stores/demo";

const route = useRoute();
const store = useDemoStore();
const menuOpen = ref(false);
const logoUrl = `${import.meta.env.BASE_URL}appbarlogo.svg`;

const navItems = computed(() => [
  { name: "interest", label: "상품 탐색" },
  { name: "algorithm", label: "조건으로 찾기" },
  { name: "cart", label: `찜 ${store.wishlistCount || ""}`.trim() },
  { name: "article", label: "이야기" },
  { name: "exchange", label: "환율 계산" },
  { name: "map", label: "은행 찾기" },
]);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
    store.refreshWishlist();
  },
);
</script>

<template>
  <div class="app-shell">
    <div class="demo-ribbon" role="note">
      <span class="demo-ribbon__dot" aria-hidden="true"></span>
      {{ dataSourceMeta.globalNotice }}
    </div>

    <header class="site-header">
      <div class="site-header__inner page-width">
        <RouterLink class="brand" :to="{ name: 'home' }" aria-label="카피바라 홈">
          <img :src="logoUrl" alt="카피바라" />
        </RouterLink>

        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="main-navigation"
          aria-label="메뉴 열기"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>

        <nav id="main-navigation" class="main-nav" :class="{ 'main-nav--open': menuOpen }">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="{ name: item.name }"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <RouterLink
          class="profile-chip"
          :to="{ name: 'profile', params: { search_username: store.currentUser.username } }"
        >
          <span class="profile-chip__avatar">C</span>
          <span>{{ store.currentUser.nickname }}</span>
        </RouterLink>
      </div>
    </header>

    <main id="main-content">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="page-width site-footer__inner">
        <div>
          <strong>카피바라</strong>
          <p>복잡한 예금 조건을 차분하게 비교하는 금융상품 탐색 서비스</p>
        </div>
        <div class="site-footer__links">
          <RouterLink :to="{ name: 'interest' }">상품 탐색</RouterLink>
          <RouterLink :to="{ name: 'algorithm' }">조건으로 찾기</RouterLink>
          <RouterLink :to="{ name: 'article' }">이야기</RouterLink>
        </div>
      </div>
    </footer>

    <Transition name="toast">
      <div v-if="store.notice" class="toast" role="status">{{ store.notice }}</div>
    </Transition>
  </div>
</template>
