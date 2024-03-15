<script setup lang="ts">
import { onMounted, ref } from "vue";
import { dataApi, dataSourceMeta } from "@/api";
import type { Article } from "@/api";

const articles = ref<Article[]>([]);
const loading = ref(true);
const errorMessage = ref("");

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric" }).format(
    new Date(value),
  );

onMounted(async () => {
  try {
    articles.value = await dataApi.listArticles();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "이야기를 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="page-section community-page">
    <div class="page-width community-layout">
      <header class="community-hero">
        <div>
          <span class="eyebrow">Community notes</span>
          <h1>서로의 비교 기준을<br />나누는 이야기</h1>
          <p>{{ dataSourceMeta.communityIntro }}</p>
        </div>
        <RouterLink class="button" :to="{ name: 'create' }">새 이야기 쓰기</RouterLink>
      </header>

      <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
      <div v-else-if="loading" class="article-list" aria-label="이야기 불러오는 중">
        <div v-for="index in 3" :key="index" class="surface-card article-skeleton"><div class="card-skeleton"></div></div>
      </div>
      <div v-else class="article-list">
        <RouterLink
          v-for="(article, index) in articles"
          :key="article.id"
          class="article-row"
          :to="{ name: 'articleDetail', params: { id: article.id } }"
        >
          <span class="article-row__number">{{ String(index + 1).padStart(2, "0") }}</span>
          <div class="article-row__body">
            <div class="article-row__meta">
              <span>{{ article.user.nickname }}</span>
              <time :datetime="article.created_at">{{ formatDate(article.created_at) }}</time>
            </div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
          </div>
          <span class="article-row__arrow" aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.community-page { background: linear-gradient(180deg, #f1e3d1 0 330px, transparent 330px); }
.community-layout { max-width: 1000px; }
.community-hero { display: flex; min-height: 230px; align-items: end; justify-content: space-between; gap: 30px; margin-bottom: 54px; }
.community-hero h1 { margin-bottom: 16px; color: var(--brown-900); font-size: clamp(2.3rem, 5vw, 4rem); line-height: 1.12; letter-spacing: -0.05em; }
.community-hero p { max-width: 600px; margin: 0; color: var(--ink-soft); line-height: 1.8; }
.article-list { display: grid; }
.article-skeleton { margin-bottom: 14px; padding: 24px; }
.article-row { display: grid; grid-template-columns: 54px 1fr auto; align-items: center; gap: 22px; border-bottom: 1px solid var(--border); padding: 28px 12px; transition: 160ms ease; }
.article-row:first-child { border-top: 1px solid var(--border); }
.article-row:hover { background: rgba(255, 253, 249, 0.72); padding-inline: 22px; }
.article-row__number { color: #b1977c; font-size: 0.76rem; font-weight: 900; }
.article-row__meta { display: flex; gap: 12px; margin-bottom: 9px; color: var(--ink-soft); font-size: 0.72rem; }
.article-row__meta span { color: var(--brown-700); font-weight: 900; }
.article-row h2 { margin-bottom: 8px; color: var(--brown-900); font-size: 1.22rem; }
.article-row p { display: -webkit-box; overflow: hidden; margin: 0; color: var(--ink-soft); font-size: 0.86rem; line-height: 1.6; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
.article-row__arrow { display: grid; width: 38px; height: 38px; place-items: center; border-radius: 50%; background: var(--sand-100); color: var(--brown-700); }
@media (max-width: 620px) {
  .community-hero { align-items: start; flex-direction: column; }
  .article-row { grid-template-columns: 1fr auto; }
  .article-row__number { display: none; }
}
</style>
