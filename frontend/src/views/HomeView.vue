<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { dataApi, dataSourceMeta } from "@/api";
import type { DepositOption } from "@/api";
import ProductCard from "@/components/ProductCard.vue";
import { useDemoStore } from "@/stores/demo";

const store = useDemoStore();
const featuredOptions = ref<Record<string, DepositOption>>({});
const loadError = ref("");
const mascotUrl = `${import.meta.env.BASE_URL}1.png`;

const featuredProducts = computed(() => store.products.slice(0, 3));
const bankCount = computed(
  () => new Set(store.products.map((product) => product.kor_co_nm)).size,
);

onMounted(async () => {
  try {
    const products = await store.loadProducts();
    const optionGroups = await Promise.all(
      products.slice(0, 3).map((product) => dataApi.getOptions(product.fin_prdt_cd)),
    );
    products.slice(0, 3).forEach((product, index) => {
      const best = [...optionGroups[index]].sort((a, b) => b.intr_rate2 - a.intr_rate2)[0];
      if (best) featuredOptions.value[product.fin_prdt_cd] = best;
    });
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : "상품을 불러오지 못했습니다.";
  }
});
</script>

<template>
  <div>
    <section class="hero">
      <div class="page-width hero__inner">
        <div class="hero__copy">
          <span class="eyebrow">Deposit finder</span>
          <h1>내 기준에 맞는 예금,<br />느긋하지만 분명하게.</h1>
          <p>
            상품명과 은행, 예치 기간으로 후보를 좁히고 기본금리와 우대금리를
            같은 화면에서 비교해 보세요.
          </p>
          <div class="hero__actions">
            <RouterLink class="button" :to="{ name: 'interest' }">상품 탐색하기</RouterLink>
            <RouterLink class="button-secondary" :to="{ name: 'algorithm' }">조건으로 골라보기</RouterLink>
          </div>
          <dl class="hero__stats">
            <div>
              <dt>비교 가능한 상품</dt>
              <dd>{{ store.products.length || 8 }}개</dd>
            </div>
            <div>
              <dt>{{ dataSourceMeta.providerLabel }}</dt>
              <dd>{{ bankCount || 4 }}곳</dd>
            </div>
            <div>
              <dt>핵심 탐색 단계</dt>
              <dd>3단계</dd>
            </div>
          </dl>
        </div>

        <div class="hero__visual" aria-hidden="true">
          <div class="hero__orb hero__orb--one"></div>
          <div class="hero__orb hero__orb--two"></div>
          <div class="hero__mascot-wrap">
            <img :src="mascotUrl" alt="" class="hero__mascot" />
          </div>
          <div class="floating-card floating-card--rate">
            <span>조건 일치</span>
            <strong>12개월 · 온라인</strong>
          </div>
          <div class="floating-card floating-card--saved">
            <span>관심 옵션</span>
            <strong>새로고침 후에도 유지</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="flow-section">
      <div class="page-width">
        <div class="section-heading">
          <div>
            <span class="eyebrow">How it works</span>
            <h2>비교부터 저장까지 한 흐름으로</h2>
          </div>
          <p>복잡한 표 대신, 선택에 필요한 정보만 순서대로 확인합니다.</p>
        </div>
        <ol class="flow-grid">
          <li>
            <span>01</span>
            <div class="flow-icon">⌕</div>
            <h3>조건으로 좁히기</h3>
            <p>상품명·은행·예치 기간을 선택하면 URL에도 같은 조건이 남습니다.</p>
          </li>
          <li>
            <span>02</span>
            <div class="flow-icon">≋</div>
            <h3>금리와 가입 방식 비교</h3>
            <p>기본금리, 최고 우대금리, 기간과 가입 방식을 한 카드에서 봅니다.</p>
          </li>
          <li>
            <span>03</span>
            <div class="flow-icon">♡</div>
            <h3>관심 옵션 저장</h3>
            <p>기간 옵션 단위로 찜하고, 브라우저를 새로 열어도 다시 확인합니다.</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="featured-section page-section">
      <div class="page-width">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Featured</span>
            <h2>먼저 살펴볼 만한 상품</h2>
          </div>
          <RouterLink class="text-link" :to="{ name: 'interest' }">전체 상품 보기 →</RouterLink>
        </div>
        <p v-if="loadError" class="status-message">{{ loadError }}</p>
        <div v-else class="product-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.fin_prdt_cd"
            :product="product"
            :option="featuredOptions[product.fin_prdt_cd]"
          />
        </div>
      </div>
    </section>

    <section class="home-cta">
      <div class="page-width home-cta__inner">
        <div>
          <span class="eyebrow">Find your pace</span>
          <h2>어떤 기준부터 볼지 고민이라면</h2>
          <p>희망 기간과 중요하게 보는 조건 세 가지만 고르면 같은 입력에 항상 같은 결과를 보여줍니다.</p>
        </div>
        <RouterLink class="button" :to="{ name: 'algorithm' }">내 조건 입력하기</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  overflow: hidden;
  padding-block: 72px 80px;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  align-items: center;
  gap: 70px;
}

.hero__copy > p {
  max-width: 610px;
  color: var(--ink-soft);
  font-size: 1.07rem;
  line-height: 1.85;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.hero__stats {
  display: flex;
  gap: 34px;
  margin: 46px 0 0;
}

.hero__stats div {
  border-left: 1px solid var(--border);
  padding-left: 18px;
}

.hero__stats dt {
  margin-bottom: 6px;
  color: var(--ink-soft);
  font-size: 0.7rem;
}

.hero__stats dd {
  margin: 0;
  color: var(--brown-900);
  font-size: 1.15rem;
  font-weight: 900;
}

.hero__visual {
  position: relative;
  min-height: 520px;
}

.hero__mascot-wrap {
  position: absolute;
  inset: 45px 10px 24px 45px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(110, 77, 48, 0.13);
  border-radius: 48% 52% 44% 56% / 46% 40% 60% 54%;
  background: linear-gradient(145deg, #ead1ad, #d9bb96);
  box-shadow: 0 40px 80px rgba(89, 69, 44, 0.18);
  transform: rotate(-3deg);
}

.hero__mascot {
  width: min(84%, 370px);
  transform: rotate(3deg);
  filter: drop-shadow(0 20px 24px rgba(64, 42, 23, 0.16));
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
}

.hero__orb--one {
  top: 0;
  right: -90px;
  width: 240px;
  height: 240px;
  background: #f2d9a9;
}

.hero__orb--two {
  bottom: -40px;
  left: -20px;
  width: 170px;
  height: 170px;
  background: #b9c7ad;
}

.floating-card {
  position: absolute;
  z-index: 2;
  display: grid;
  gap: 5px;
  border: 1px solid rgba(230, 217, 201, 0.82);
  border-radius: 16px;
  background: rgba(255, 253, 249, 0.94);
  box-shadow: 0 16px 34px rgba(64, 42, 23, 0.13);
  padding: 14px 17px;
  backdrop-filter: blur(10px);
}

.floating-card span { color: var(--ink-soft); font-size: 0.7rem; }
.floating-card strong { color: var(--brown-900); font-size: 0.84rem; }
.floating-card--rate { top: 52px; left: 0; }
.floating-card--saved { right: -10px; bottom: 46px; }

.flow-section {
  padding-block: 72px;
  background: var(--brown-900);
  color: #fff7eb;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 32px;
}

.section-heading h2,
.home-cta h2 {
  margin-bottom: 0;
  color: var(--brown-900);
  font-size: clamp(1.7rem, 3.2vw, 2.6rem);
  letter-spacing: -0.035em;
}

.section-heading > p {
  max-width: 420px;
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.flow-section .section-heading h2 { color: white; }
.flow-section .section-heading p { color: #dac9b7; }
.flow-section .eyebrow { color: #e7c79d; }

.flow-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.11);
  list-style: none;
}

.flow-grid li {
  position: relative;
  background: #4b3421;
  padding: 30px;
}

.flow-grid li > span {
  position: absolute;
  top: 22px;
  right: 24px;
  color: #a99178;
  font-size: 0.72rem;
  font-weight: 900;
}

.flow-icon {
  display: grid;
  width: 46px;
  height: 46px;
  margin-bottom: 30px;
  place-items: center;
  border-radius: 14px;
  background: #d9bb96;
  color: #402a17;
  font-size: 1.3rem;
}

.flow-grid h3 { margin-bottom: 10px; font-size: 1.05rem; }
.flow-grid p { margin: 0; color: #d7c5b1; font-size: 0.86rem; line-height: 1.7; }

.featured-section { background: #f8f1e7; }

.home-cta { padding-block: 62px; background: var(--sand-500); }
.home-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.home-cta p { max-width: 680px; margin: 12px 0 0; color: var(--brown-700); line-height: 1.7; }

@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__visual { min-height: 430px; }
  .flow-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .hero { padding-block: 46px 58px; }
  .hero__stats { gap: 14px; justify-content: space-between; }
  .hero__stats div { padding-left: 10px; }
  .hero__visual { min-height: 340px; }
  .hero__mascot-wrap { inset: 28px 8px 18px 26px; }
  .floating-card--rate { top: 6px; }
  .floating-card--saved { right: 0; bottom: 14px; }
  .section-heading,
  .home-cta__inner { align-items: start; flex-direction: column; }
}
</style>
