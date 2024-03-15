<script setup lang="ts">
const imageUrl = `${import.meta.env.BASE_URL}404.png`;
</script>

<template>
  <section class="page-section not-found-page">
    <div class="page-width not-found-card surface-card">
      <div><span class="eyebrow">404 · Slow down</span><h1>길을 잠시 잃었어요.</h1><p>요청한 화면이 없거나 주소가 바뀌었습니다. 상품 탐색부터 다시 이어가 보세요.</p><div class="not-found-actions"><RouterLink class="button" :to="{ name: 'home' }">홈으로</RouterLink><RouterLink class="button-secondary" :to="{ name: 'interest' }">상품 탐색</RouterLink></div></div>
      <img :src="imageUrl" alt="길을 안내하는 카피바라" />
    </div>
  </section>
</template>

<style scoped>
.not-found-page { min-height: 70vh; }
.not-found-card { display: grid; max-width: 900px; grid-template-columns: 1.2fr .8fr; align-items: center; gap: 30px; padding: clamp(30px, 6vw, 64px); }
.not-found-card h1 { margin-bottom: 18px; color: var(--brown-900); font-size: clamp(2.3rem, 5vw, 4rem); letter-spacing: -.05em; }
.not-found-card p { color: var(--ink-soft); line-height: 1.8; }
.not-found-card img { width: min(100%, 260px); justify-self: center; }
.not-found-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
@media (max-width: 640px) { .not-found-card { grid-template-columns: 1fr; } .not-found-card img { grid-row: 1; width: 170px; } }
</style>
