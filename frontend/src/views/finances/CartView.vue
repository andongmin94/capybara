<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { dataApi } from "@/api";
import type { SavedProduct } from "@/api";
import { useDemoStore } from "@/stores/demo";

const store = useDemoStore();
const items = ref<SavedProduct[]>([]);
const loading = ref(true);
const errorMessage = ref("");
const chartMax = computed(() =>
  Math.max(1, ...items.value.flatMap((item) => [item.option.intr_rate, item.option.intr_rate2])),
);

const barWidth = (value: number) => `${Math.max(5, (value / chartMax.value) * 100)}%`;

async function loadSaved(): Promise<void> {
  try {
    items.value = await dataApi.listSavedProducts();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "찜 목록을 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
}

function remove(item: SavedProduct): void {
  store.toggleSaved(item.productCode, item.optionId);
  items.value = items.value.filter(
    (saved) => saved.productCode !== item.productCode || saved.optionId !== item.optionId,
  );
}

onMounted(loadSaved);
</script>

<template>
  <section class="page-section">
    <div class="page-width saved-page">
      <div class="page-heading">
        <div>
          <span class="eyebrow">Saved options</span>
          <h1>찜한 상품 비교</h1>
          <p>상품이 아니라 기간 옵션 단위로 저장해, 같은 상품의 서로 다른 기간도 나란히 볼 수 있습니다.</p>
        </div>
        <RouterLink class="button-secondary" :to="{ name: 'interest' }">상품 더 찾아보기</RouterLink>
      </div>

      <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
      <div v-else-if="loading" class="surface-card saved-loading"><div class="card-skeleton"></div></div>
      <div v-else-if="items.length" class="saved-list">
        <figure class="rate-chart surface-card">
          <figcaption>
            <div><span class="eyebrow">Rate comparison</span><h2>찜한 옵션 금리 비교</h2></div>
            <div class="chart-legend"><span><i class="base"></i>기본금리</span><span><i class="bonus"></i>최고 우대금리</span></div>
          </figcaption>
          <div class="chart-rows">
            <div v-for="item in items" :key="`chart-${item.productCode}-${item.optionId}`" class="chart-row" :aria-label="`${item.product.fin_prdt_nm} ${item.option.save_trm}개월 기본금리 ${item.option.intr_rate}%, 최고 우대금리 ${item.option.intr_rate2}%`">
              <div class="chart-row__label"><strong>{{ item.product.fin_prdt_nm }}</strong><span>{{ item.option.save_trm }}개월</span></div>
              <div class="chart-bars">
                <div><span class="chart-bar chart-bar--base" :style="{ width: barWidth(item.option.intr_rate) }"></span><em>{{ item.option.intr_rate.toFixed(2) }}%</em></div>
                <div><span class="chart-bar chart-bar--bonus" :style="{ width: barWidth(item.option.intr_rate2) }"></span><em>{{ item.option.intr_rate2.toFixed(2) }}%</em></div>
              </div>
            </div>
          </div>
        </figure>
        <article v-for="item in items" :key="`${item.productCode}-${item.optionId}`" class="saved-row surface-card">
          <div class="saved-row__name">
            <span>{{ item.product.kor_co_nm }}</span>
            <h2>{{ item.product.fin_prdt_nm }}</h2>
          </div>
          <dl>
            <div><dt>기간</dt><dd>{{ item.option.save_trm }}개월</dd></div>
            <div><dt>기본금리</dt><dd>{{ item.option.intr_rate.toFixed(2) }}%</dd></div>
            <div><dt>최고 우대금리</dt><dd>{{ item.option.intr_rate2.toFixed(2) }}%</dd></div>
            <div><dt>가입</dt><dd>{{ item.product.join_way }}</dd></div>
          </dl>
          <div class="saved-row__actions">
            <RouterLink class="text-link" :to="{ name: 'interestDetail', params: { id: item.productCode } }">상세 보기</RouterLink>
            <button class="remove-button" type="button" @click="remove(item)">삭제</button>
          </div>
        </article>
        <p class="storage-note">이 목록은 현재 브라우저에 저장됩니다.</p>
      </div>
      <div v-else class="empty-state">
        <div>
          <div class="empty-state__icon">♡</div>
          <h2>아직 찜한 옵션이 없어요</h2>
          <p>상품 상세에서 비교하고 싶은 기간 옵션을 담아보세요.</p>
          <RouterLink class="button" :to="{ name: 'interest' }">상품 둘러보기</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.saved-page { max-width: 1040px; }
.saved-loading { min-height: 260px; padding: 30px; }
.saved-list { display: grid; gap: 14px; }
.rate-chart { margin: 0 0 16px; padding: clamp(22px, 4vw, 34px); }
.rate-chart figcaption { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.rate-chart h2 { margin: 0; color: var(--brown-900); font-size: 1.5rem; }
.chart-legend { display: flex; gap: 14px; color: var(--ink-soft); font-size: .68rem; }
.chart-legend span { display: flex; align-items: center; gap: 6px; }
.chart-legend i { width: 10px; height: 10px; border-radius: 3px; }
.chart-legend .base { background: var(--sand-500); }
.chart-legend .bonus { background: var(--brown-700); }
.chart-rows { display: grid; gap: 18px; }
.chart-row { display: grid; grid-template-columns: 180px 1fr; align-items: center; gap: 18px; }
.chart-row__label { display: grid; gap: 4px; min-width: 0; }
.chart-row__label strong { overflow: hidden; color: var(--brown-900); font-size: .78rem; text-overflow: ellipsis; white-space: nowrap; }
.chart-row__label span { color: var(--ink-soft); font-size: .67rem; }
.chart-bars { display: grid; gap: 5px; }
.chart-bars > div { position: relative; height: 19px; border-radius: 6px; background: var(--sand-100); }
.chart-bar { display: block; height: 100%; border-radius: 6px; }
.chart-bar--base { background: var(--sand-500); }
.chart-bar--bonus { background: var(--brown-700); }
.chart-bars em { position: absolute; top: 2px; right: 6px; color: var(--brown-900); font-size: .62rem; font-style: normal; font-weight: 900; }
.saved-row { display: grid; grid-template-columns: 1.1fr 2fr auto; align-items: center; gap: 30px; padding: 24px; }
.saved-row__name span { color: var(--brown-700); font-size: 0.73rem; font-weight: 900; }
.saved-row__name h2 { margin: 7px 0 0; color: var(--brown-900); font-size: 1.15rem; }
.saved-row dl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 0; }
.saved-row dt { margin-bottom: 6px; color: var(--ink-soft); font-size: 0.67rem; }
.saved-row dd { margin: 0; font-size: 0.84rem; font-weight: 900; }
.saved-row__actions { display: flex; align-items: center; gap: 14px; font-size: 0.8rem; }
.remove-button { border: 0; background: transparent; color: #9b493e; font-weight: 800; }
.storage-note { margin: 8px 4px 0; color: var(--ink-soft); font-size: 0.76rem; }
@media (max-width: 850px) {
  .saved-row { grid-template-columns: 1fr auto; }
  .saved-row dl { grid-column: 1 / -1; grid-row: 2; }
}
@media (max-width: 560px) {
  .rate-chart figcaption { align-items: start; flex-direction: column; }
  .chart-row { grid-template-columns: 1fr; gap: 7px; }
  .saved-row { grid-template-columns: 1fr; gap: 20px; }
  .saved-row dl { grid-column: auto; grid-row: auto; grid-template-columns: repeat(2, 1fr); }
  .saved-row__actions { justify-content: space-between; }
}
</style>
