<script setup lang="ts">
import { computed } from "vue";
import type { DepositOption, DepositProduct } from "@/api";
import { useDemoStore } from "@/stores/demo";

const props = defineProps<{
  product: DepositProduct;
  option?: DepositOption;
  reason?: string;
}>();

const store = useDemoStore();
const saved = computed(() =>
  props.option ? store.isSaved(props.product.fin_prdt_cd, props.option.id) : false,
);

function toggleSaved(): void {
  if (!props.option) return;
  store.toggleSaved(props.product.fin_prdt_cd, props.option.id);
}
</script>

<template>
  <article class="product-card">
    <div class="product-card__topline">
      <span class="eyebrow">{{ product.kor_co_nm }}</span>
      <button
        v-if="option"
        class="save-button"
        type="button"
        :aria-label="saved ? `${product.fin_prdt_nm} 찜 해제` : `${product.fin_prdt_nm} 찜하기`"
        :aria-pressed="saved"
        @click="toggleSaved"
      >
        {{ saved ? "♥" : "♡" }}
      </button>
    </div>
    <h3>{{ product.fin_prdt_nm }}</h3>
    <p class="product-card__description">{{ product.etc_note }}</p>
    <p v-if="reason" class="match-note">{{ reason }}</p>

    <dl v-if="option" class="rate-grid">
      <div>
        <dt>기본금리</dt>
        <dd>{{ option.intr_rate.toFixed(2) }}%</dd>
      </div>
      <div>
        <dt>최고 우대금리</dt>
        <dd>{{ option.intr_rate2.toFixed(2) }}%</dd>
      </div>
      <div>
        <dt>기간</dt>
        <dd>{{ option.save_trm }}개월</dd>
      </div>
    </dl>
    <div v-else class="card-skeleton" aria-label="상품 옵션 불러오는 중"></div>

    <div class="product-card__footer">
      <span>{{ product.join_way }}</span>
      <RouterLink
        class="text-link"
        :to="{ name: 'interestDetail', params: { id: product.fin_prdt_cd } }"
      >
        자세히 보기 <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </article>
</template>
