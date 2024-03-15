<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { dataApi } from "@/api";
import type { DepositOption, DepositProduct } from "@/api";
import { useDemoStore } from "@/stores/demo";

const route = useRoute();
const store = useDemoStore();
const product = ref<DepositProduct | null>(null);
const options = ref<DepositOption[]>([]);
const loading = ref(true);
const errorMessage = ref("");

const sortedOptions = computed(() => [...options.value].sort((a, b) => a.save_trm - b.save_trm));

async function loadProduct(code: string): Promise<void> {
  loading.value = true;
  errorMessage.value = "";
  try {
    const [nextProduct, nextOptions] = await Promise.all([
      dataApi.getProduct(code),
      dataApi.getOptions(code),
    ]);
    product.value = nextProduct;
    options.value = nextOptions;
    if (!nextProduct) errorMessage.value = "요청한 상품을 찾을 수 없습니다.";
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "상품 정보를 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
}

watch(
  () => String(route.params.id ?? ""),
  (code) => loadProduct(code),
  { immediate: true },
);
</script>

<template>
  <section class="page-section">
    <div class="page-width detail-page">
      <RouterLink class="back-link" :to="{ name: 'interest' }">← 상품 목록</RouterLink>

      <div v-if="loading" class="surface-card detail-loading"><div class="card-skeleton"></div></div>
      <div v-else-if="errorMessage || !product" class="empty-state">
        <div>
          <div class="empty-state__icon">!</div>
          <h1>상품을 확인할 수 없어요</h1>
          <p>{{ errorMessage }}</p>
          <RouterLink class="button" :to="{ name: 'interest' }">상품 목록으로</RouterLink>
        </div>
      </div>
      <template v-else>
        <header class="detail-hero surface-card">
          <div>
            <span class="eyebrow">{{ product.kor_co_nm }}</span>
            <h1>{{ product.fin_prdt_nm }}</h1>
            <p>{{ product.etc_note }}</p>
          </div>
          <div class="detail-hero__badge">
            <span>선택 가능한 기간</span>
            <strong>{{ sortedOptions.length }}개</strong>
          </div>
        </header>

        <section class="detail-section">
          <div class="section-title-row">
            <div>
              <span class="eyebrow">Rate options</span>
              <h2>기간별 금리</h2>
            </div>
            <RouterLink class="text-link" :to="{ name: 'cart' }">찜 목록 보기 →</RouterLink>
          </div>
          <div class="option-grid">
            <article v-for="option in sortedOptions" :key="option.id" class="option-card">
              <div class="option-card__term">{{ option.save_trm }}<span>개월</span></div>
              <dl>
                <div><dt>금리 유형</dt><dd>{{ option.intr_rate_type_nm }}</dd></div>
                <div><dt>기본금리</dt><dd>{{ option.intr_rate.toFixed(2) }}%</dd></div>
                <div><dt>최고 우대금리</dt><dd>{{ option.intr_rate2.toFixed(2) }}%</dd></div>
              </dl>
              <button
                class="option-card__save"
                :class="{ 'option-card__save--active': store.isSaved(product.fin_prdt_cd, option.id) }"
                type="button"
                @click="store.toggleSaved(product.fin_prdt_cd, option.id)"
              >
                {{ store.isSaved(product.fin_prdt_cd, option.id) ? "♥ 찜 해제" : "♡ 이 옵션 찜하기" }}
              </button>
            </article>
          </div>
        </section>

        <section class="detail-section detail-info-grid">
          <article><span>가입 대상</span><p>{{ product.join_member }}</p></article>
          <article><span>가입 방법</span><p>{{ product.join_way }}</p></article>
          <article><span>우대 조건</span><p>{{ product.spcl_cnd }}</p></article>
          <article><span>가입 제한</span><p>{{ product.join_deny === 1 ? "제한 없음" : "일부 제한" }}</p></article>
        </section>
      </template>
    </div>
  </section>
</template>

<style scoped>
.detail-page { max-width: 1040px; }
.back-link { display: inline-block; margin-bottom: 24px; color: var(--ink-soft); font-weight: 800; }
.detail-loading { min-height: 360px; padding: 30px; }
.detail-hero { display: flex; align-items: end; justify-content: space-between; gap: 32px; padding: clamp(28px, 5vw, 54px); background: linear-gradient(135deg, #fffdf9, #f0e1ce); }
.detail-hero h1 { margin-bottom: 16px; color: var(--brown-900); font-size: clamp(2rem, 5vw, 3.8rem); letter-spacing: -0.05em; }
.detail-hero p { max-width: 650px; margin: 0; color: var(--ink-soft); line-height: 1.8; }
.detail-hero__badge { flex: 0 0 auto; border-radius: 18px; background: var(--brown-900); color: white; padding: 18px 22px; text-align: center; }
.detail-hero__badge span { display: block; margin-bottom: 7px; color: #d7c3ae; font-size: 0.7rem; }
.detail-hero__badge strong { font-size: 1.3rem; }
.detail-section { margin-top: 58px; }
.section-title-row { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
.section-title-row h2 { margin: 0; color: var(--brown-900); font-size: 1.8rem; }
.option-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.option-card { border: 1px solid var(--border); border-radius: 22px; background: var(--white); padding: 20px; }
.option-card__term { margin-bottom: 20px; color: var(--brown-900); font-size: 2rem; font-weight: 900; }
.option-card__term span { margin-left: 3px; font-size: 0.84rem; }
.option-card dl { display: grid; gap: 9px; }
.option-card dl div { display: flex; justify-content: space-between; gap: 12px; font-size: 0.78rem; }
.option-card dt { color: var(--ink-soft); }
.option-card dd { margin: 0; font-weight: 800; }
.option-card__save { width: 100%; min-height: 42px; margin-top: 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--sand-100); color: var(--brown-700); font-size: 0.8rem; font-weight: 900; }
.option-card__save--active { background: #f7e2de; color: #923f36; }
.detail-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.detail-info-grid article { border: 1px solid var(--border); border-radius: 20px; background: var(--white); padding: 23px; }
.detail-info-grid span { color: var(--brown-700); font-size: 0.74rem; font-weight: 900; }
.detail-info-grid p { margin: 11px 0 0; line-height: 1.7; }

@media (max-width: 850px) { .option-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) {
  .detail-hero { align-items: start; flex-direction: column; }
  .detail-hero__badge { width: 100%; }
  .option-grid, .detail-info-grid { grid-template-columns: 1fr; }
}
</style>
