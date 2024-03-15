<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { dataApi, dataSourceMeta } from "@/api";
import type { DepositOption } from "@/api";
import ProductCard from "@/components/ProductCard.vue";
import { useDemoStore } from "@/stores/demo";

const route = useRoute();
const router = useRouter();
const store = useDemoStore();
const query = ref("");
const bank = ref("");
const term = ref("");
const optionsByProduct = ref<Record<string, DepositOption[]>>({});
const loading = ref(true);
const errorMessage = ref("");

const firstQueryValue = (value: unknown) =>
  typeof value === "string" ? value : Array.isArray(value) ? String(value[0] ?? "") : "";

function hydrateFromRoute(): void {
  query.value = firstQueryValue(route.query.q);
  bank.value = firstQueryValue(route.query.bank);
  term.value = firstQueryValue(route.query.term);
}

watch(() => route.query, hydrateFromRoute, { immediate: true });

watch([query, bank, term], ([nextQuery, nextBank, nextTerm]) => {
  const next = {
    ...(nextQuery ? { q: nextQuery } : {}),
    ...(nextBank ? { bank: nextBank } : {}),
    ...(nextTerm ? { term: nextTerm } : {}),
  };
  const current = {
    ...(firstQueryValue(route.query.q) ? { q: firstQueryValue(route.query.q) } : {}),
    ...(firstQueryValue(route.query.bank) ? { bank: firstQueryValue(route.query.bank) } : {}),
    ...(firstQueryValue(route.query.term) ? { term: firstQueryValue(route.query.term) } : {}),
  };
  if (JSON.stringify(next) !== JSON.stringify(current)) router.replace({ query: next });
});

const banks = computed(() =>
  [...new Set(store.products.map((product) => product.kor_co_nm))].sort(),
);

const visibleProducts = computed(() => {
  const normalized = query.value.trim().toLowerCase();
  return store.products.filter((product) => {
    const matchesKeyword =
      !normalized ||
      product.fin_prdt_nm.toLowerCase().includes(normalized) ||
      product.kor_co_nm.toLowerCase().includes(normalized);
    const matchesBank = !bank.value || product.kor_co_nm === bank.value;
    const matchesTerm =
      !term.value ||
      (optionsByProduct.value[product.fin_prdt_cd] ?? []).some(
        (option) => String(option.save_trm) === term.value,
      );
    return matchesKeyword && matchesBank && matchesTerm;
  });
});

function representativeOption(code: string): DepositOption | undefined {
  const options = optionsByProduct.value[code] ?? [];
  if (term.value) {
    const exact = options.find((option) => String(option.save_trm) === term.value);
    if (exact) return exact;
  }
  return [...options].sort((a, b) => b.intr_rate2 - a.intr_rate2)[0];
}

function resetFilters(): void {
  query.value = "";
  bank.value = "";
  term.value = "";
}

onMounted(async () => {
  try {
    const products = await store.loadProducts();
    const groups = await Promise.all(
      products.map((product) => dataApi.getOptions(product.fin_prdt_cd)),
    );
    products.forEach((product, index) => {
      optionsByProduct.value[product.fin_prdt_cd] = groups[index];
    });
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "상품을 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="page-section">
    <div class="page-width">
      <div class="page-heading">
        <div>
          <span class="eyebrow">Browse deposits</span>
          <h1>예금 상품 탐색</h1>
          <p>이름, 금융사, 예치 기간을 조합해 필요한 후보만 남겨보세요. 선택한 조건은 주소에 저장됩니다.</p>
        </div>
        <RouterLink class="button-secondary" :to="{ name: 'cart' }">찜한 옵션 {{ store.wishlistCount }}개</RouterLink>
      </div>

      <div class="filter-panel surface-card">
        <div class="form-control filter-panel__search">
          <label for="product-query">상품명 또는 은행</label>
          <input id="product-query" v-model="query" type="search" placeholder="예: 카피은행, 느긋한 첫 예금" />
        </div>
        <div class="form-control">
          <label for="bank-filter">은행</label>
          <select id="bank-filter" v-model="bank">
            <option value="">모든 은행</option>
            <option v-for="bankName in banks" :key="bankName" :value="bankName">{{ bankName }}</option>
          </select>
        </div>
        <div class="form-control">
          <label for="term-filter">예치 기간</label>
          <select id="term-filter" v-model="term">
            <option value="">모든 기간</option>
            <option v-for="month in [6, 12, 24, 36]" :key="month" :value="String(month)">{{ month }}개월</option>
          </select>
        </div>
        <button class="button-quiet" type="button" @click="resetFilters">초기화</button>
      </div>

      <div class="result-summary" aria-live="polite">
        <strong>{{ visibleProducts.length }}개 상품</strong>
        <span v-if="query || bank || term">선택한 조건에 맞는 결과입니다.</span>
        <span v-else>{{ dataSourceMeta.catalogDefaultSummary }}</span>
      </div>

      <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
      <div v-else-if="loading" class="product-grid" aria-label="상품 불러오는 중">
        <article v-for="index in 6" :key="index" class="product-card"><div class="card-skeleton"></div></article>
      </div>
      <div v-else-if="visibleProducts.length" class="product-grid">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.fin_prdt_cd"
          :product="product"
          :option="representativeOption(product.fin_prdt_cd)"
        />
      </div>
      <div v-else class="empty-state">
        <div>
          <div class="empty-state__icon">⌕</div>
          <h2>조건에 맞는 상품이 없어요</h2>
          <p>검색어 또는 기간 조건을 조금 넓혀보세요.</p>
          <button class="button-secondary" type="button" @click="resetFilters">모든 상품 보기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filter-panel {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr auto;
  align-items: end;
  gap: 14px;
  padding: 20px;
}

.result-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px 2px 18px;
  color: var(--ink-soft);
  font-size: 0.86rem;
}

.result-summary strong { color: var(--brown-900); font-size: 1rem; }

@media (max-width: 850px) {
  .filter-panel { grid-template-columns: repeat(2, 1fr); }
  .filter-panel__search { grid-column: 1 / -1; }
}

@media (max-width: 540px) {
  .filter-panel { grid-template-columns: 1fr; }
  .filter-panel__search { grid-column: auto; }
}
</style>
