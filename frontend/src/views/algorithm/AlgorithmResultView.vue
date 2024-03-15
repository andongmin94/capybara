<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { dataApi, dataSourceMeta } from "@/api";
import type { Recommendation, RecommendationPreferences } from "@/api";
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute();
const recommendations = ref<Recommendation[]>([]);
const loading = ref(true);
const errorMessage = ref("");

function parsePreferences(): RecommendationPreferences {
  const termValue = Number(route.query.term);
  const priorityValue = String(route.query.priority ?? "bonus");
  const channelValue = String(route.query.channel ?? "any");
  return {
    term: [6, 12, 24, 36].includes(termValue) ? termValue : 12,
    priority: ["base", "bonus", "flexibility"].includes(priorityValue)
      ? (priorityValue as RecommendationPreferences["priority"])
      : "bonus",
    channel: ["any", "online", "branch"].includes(channelValue)
      ? (channelValue as RecommendationPreferences["channel"])
      : "any",
  };
}

const preferences = computed(parsePreferences);
const priorityLabel = computed(() => ({ base: "기본금리", bonus: "최고 우대금리", flexibility: "가입 편의" })[preferences.value.priority]);
const channelLabel = computed(() => ({ any: "가입 방식 무관", online: "온라인 가입", branch: "영업점 가입" })[preferences.value.channel]);

async function loadRecommendations(): Promise<void> {
  loading.value = true;
  errorMessage.value = "";
  try {
    recommendations.value = await dataApi.recommend(preferences.value);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "추천 결과를 계산하지 못했습니다.";
  } finally {
    loading.value = false;
  }
}

watch(() => route.fullPath, loadRecommendations, { immediate: true });
</script>

<template>
  <section class="page-section result-page">
    <div class="page-width">
      <div class="result-header">
        <div>
          <span class="eyebrow">Your shortlist</span>
          <h1>입력한 조건과 가까운<br />세 가지 상품입니다.</h1>
          <p>{{ dataSourceMeta.recommendationDisclaimer }}</p>
        </div>
        <RouterLink class="button-secondary" :to="{ name: 'algorithm' }">조건 다시 고르기</RouterLink>
      </div>

      <div class="criteria-bar">
        <span>희망 기간 <strong>{{ preferences.term }}개월</strong></span>
        <span>우선 기준 <strong>{{ priorityLabel }}</strong></span>
        <span>가입 방식 <strong>{{ channelLabel }}</strong></span>
      </div>

      <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
      <div v-else-if="loading" class="product-grid"><article v-for="index in 3" :key="index" class="product-card"><div class="card-skeleton"></div></article></div>
      <div v-else class="product-grid result-grid">
        <div v-for="(item, index) in recommendations" :key="item.product.fin_prdt_cd" class="ranked-product">
          <span class="rank-badge">{{ index + 1 }}</span>
          <ProductCard :product="item.product" :option="item.option" :reason="item.reasons.join(' · ')" />
        </div>
      </div>

      <section class="result-explanation surface-card">
        <div><span class="eyebrow">How ranking works</span><h2>결과는 이렇게 정해집니다</h2></div>
        <ol>
          <li>희망 기간과 일치하거나 가장 가까운 옵션을 상품별로 하나 선택합니다.</li>
          <li>{{ priorityLabel }} 기준과 가입 방식 일치 여부를 점수에 반영합니다.</li>
          <li>점수가 같으면 상품 코드 순으로 정렬해 결과가 매번 바뀌지 않게 합니다.</li>
        </ol>
      </section>
    </div>
  </section>
</template>

<style scoped>
.result-page { background: linear-gradient(180deg, var(--sand-100) 0 360px, transparent 360px); }
.result-header { display: flex; align-items: end; justify-content: space-between; gap: 30px; margin-bottom: 28px; }
.result-header h1 { margin-bottom: 16px; color: var(--brown-900); font-size: clamp(2.2rem, 5vw, 4rem); line-height: 1.12; letter-spacing: -0.05em; }
.result-header p { max-width: 700px; margin: 0; color: var(--ink-soft); line-height: 1.8; }
.criteria-bar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 34px; }
.criteria-bar span { border: 1px solid #d7c1a7; border-radius: 999px; background: rgba(255, 253, 249, 0.72); padding: 9px 14px; color: var(--ink-soft); font-size: 0.78rem; }
.criteria-bar strong { color: var(--brown-900); }
.ranked-product { position: relative; }
.rank-badge { position: absolute; z-index: 2; top: -12px; left: 20px; display: grid; width: 34px; height: 34px; place-items: center; border-radius: 50%; background: var(--brown-900); color: white; font-size: 0.82rem; font-weight: 900; }
.result-explanation { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 40px; margin-top: 50px; padding: 34px; }
.result-explanation h2 { margin: 0; color: var(--brown-900); font-size: 1.7rem; }
.result-explanation ol { display: grid; gap: 12px; margin: 0; color: var(--ink-soft); line-height: 1.7; }
@media (max-width: 760px) {
  .result-header { align-items: start; flex-direction: column; }
  .result-explanation { grid-template-columns: 1fr; }
}
</style>
