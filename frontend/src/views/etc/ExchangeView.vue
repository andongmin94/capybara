<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { dataApi, dataSourceMeta } from "@/api";
import type { CurrencyQuote } from "@/api";

const quotes = ref<CurrencyQuote[]>([]);
const amount = ref(1000000);
const from = ref<CurrencyQuote["code"]>("KRW");
const to = ref<CurrencyQuote["code"]>("USD");
const loading = ref(true);
const errorMessage = ref("");

const quoteByCode = computed(() => new Map(quotes.value.map((quote) => [quote.code, quote])));
const result = computed(() => {
  const fromQuote = quoteByCode.value.get(from.value);
  const toQuote = quoteByCode.value.get(to.value);
  if (!fromQuote || !toQuote || !Number.isFinite(amount.value)) return 0;
  const won = amount.value * (fromQuote.wonPerUnit / fromQuote.unit);
  return won / (toQuote.wonPerUnit / toQuote.unit);
});

const formatter = computed(
  () => new Intl.NumberFormat("ko-KR", { maximumFractionDigits: to.value === "KRW" ? 0 : 2 }),
);

function swap(): void {
  const previous = from.value;
  from.value = to.value;
  to.value = previous;
}

onMounted(async () => {
  try {
    quotes.value = await dataApi.getQuotes();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "환율 기준값을 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="page-section exchange-page">
    <div class="page-width exchange-layout">
      <div class="exchange-copy">
        <span class="eyebrow">Currency calculator</span>
        <h1>통화를 바꿔보면<br />얼마가 될까요?</h1>
        <p>{{ dataSourceMeta.currencyIntro }}</p>
        <div class="quote-list" v-if="quotes.length">
          <div v-for="quote in quotes.filter((item) => item.code !== 'KRW')" :key="quote.code"><span>{{ quote.code }}</span><strong>{{ quote.wonPerUnit.toLocaleString() }}원 / {{ quote.unit }}{{ quote.code }}</strong></div>
        </div>
      </div>

      <div class="calculator surface-card">
        <div class="calculator__mode"><span></span>{{ dataSourceMeta.currencyBadge }}</div>
        <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
        <template v-else>
          <div class="currency-block">
            <label for="from-currency">보내는 금액</label>
            <div><input v-model.number="amount" id="from-currency" type="number" min="0" step="100" /><select v-model="from" aria-label="보내는 통화"><option v-for="quote in quotes" :key="quote.code" :value="quote.code">{{ quote.code }}</option></select></div>
          </div>
          <button class="swap-button" type="button" aria-label="통화 순서 바꾸기" @click="swap">⇅</button>
          <div class="currency-block currency-block--result">
            <label>받는 금액</label>
            <div><strong>{{ loading ? "—" : formatter.format(result) }}</strong><select v-model="to" aria-label="받는 통화"><option v-for="quote in quotes" :key="quote.code" :value="quote.code">{{ quote.code }}</option></select></div>
          </div>
          <p class="calculator__note">계산 결과는 기능 체험용이며 환전 거래에 사용할 수 없습니다.</p>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exchange-page { background: linear-gradient(135deg, #f0e1cd 0 50%, #fbf7f0 50%); }
.exchange-layout { display: grid; grid-template-columns: 1fr 0.9fr; align-items: center; gap: 80px; min-height: 580px; }
.exchange-copy h1 { margin-bottom: 18px; color: var(--brown-900); font-size: clamp(2.3rem, 5vw, 4.3rem); line-height: 1.12; letter-spacing: -0.05em; }
.exchange-copy > p { max-width: 570px; color: var(--ink-soft); line-height: 1.8; }
.quote-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 28px; }
.quote-list div { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid #d7c1a8; padding: 10px 0; font-size: 0.72rem; }
.quote-list span { color: var(--brown-700); font-weight: 900; }
.calculator { position: relative; padding: clamp(24px, 5vw, 42px); box-shadow: var(--shadow); }
.calculator__mode { display: flex; align-items: center; gap: 7px; margin-bottom: 30px; color: var(--ink-soft); font-size: 0.72rem; font-weight: 800; }
.calculator__mode span { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
.currency-block { display: grid; gap: 10px; }
.currency-block label { color: var(--ink-soft); font-size: 0.74rem; font-weight: 800; }
.currency-block > div { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; }
.currency-block input, .currency-block select { min-height: 58px; border: 1px solid var(--border); border-radius: 15px; background: white; padding: 0 15px; }
.currency-block input { min-width: 0; font-size: 1.25rem; font-weight: 900; }
.currency-block select { min-width: 92px; font-weight: 900; }
.currency-block--result { border-radius: 18px; background: var(--sand-100); padding: 18px; }
.currency-block--result strong { min-width: 0; overflow: hidden; color: var(--brown-900); font-size: 1.5rem; text-overflow: ellipsis; }
.swap-button { display: grid; width: 38px; height: 38px; margin: 14px auto; place-items: center; border: 1px solid var(--border); border-radius: 50%; background: white; font-weight: 900; }
.calculator__note { margin: 20px 0 0; color: var(--ink-soft); font-size: 0.7rem; line-height: 1.6; }
@media (max-width: 820px) { .exchange-page { background: var(--sand-100); } .exchange-layout { grid-template-columns: 1fr; gap: 36px; } }
</style>
