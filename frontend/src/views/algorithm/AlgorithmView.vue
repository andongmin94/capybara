<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { RecommendationPreferences } from "@/api";

const router = useRouter();
const term = ref(12);
const priority = ref<RecommendationPreferences["priority"]>("bonus");
const channel = ref<RecommendationPreferences["channel"]>("any");

function submit(): void {
  router.push({
    name: "algorithmresult",
    query: { term: String(term.value), priority: priority.value, channel: channel.value },
  });
}
</script>

<template>
  <section class="page-section discover-page">
    <div class="page-width discover-layout">
      <div class="discover-copy">
        <span class="eyebrow">Guided discovery</span>
        <h1>세 가지 조건으로<br />후보를 골라볼게요.</h1>
        <p>성격 유형이나 무작위 선택 대신, 예치 기간·금리 우선순위·가입 방식을 점수로 계산합니다.</p>
        <ol>
          <li><span>1</span> 희망 기간과 가까운 옵션을 찾습니다.</li>
          <li><span>2</span> 선택한 금리 기준으로 점수를 더합니다.</li>
          <li><span>3</span> 같은 조건에는 항상 같은 결과를 냅니다.</li>
        </ol>
      </div>

      <form class="preference-form surface-card" @submit.prevent="submit">
        <div class="form-step">
          <div class="form-step__label"><span>01</span><h2>얼마나 맡겨둘까요?</h2></div>
          <div class="choice-grid choice-grid--four">
            <label v-for="month in [6, 12, 24, 36]" :key="month" :class="{ active: term === month }">
              <input v-model="term" type="radio" name="term" :value="month" />
              <strong>{{ month }}개월</strong>
            </label>
          </div>
        </div>

        <div class="form-step">
          <div class="form-step__label"><span>02</span><h2>무엇을 먼저 볼까요?</h2></div>
          <div class="choice-grid">
            <label :class="{ active: priority === 'base' }">
              <input v-model="priority" type="radio" name="priority" value="base" />
              <strong>기본금리</strong><small>조건 없이 받는 금리 중심</small>
            </label>
            <label :class="{ active: priority === 'bonus' }">
              <input v-model="priority" type="radio" name="priority" value="bonus" />
              <strong>최고 우대금리</strong><small>조건 충족 시 금리 중심</small>
            </label>
            <label :class="{ active: priority === 'flexibility' }">
              <input v-model="priority" type="radio" name="priority" value="flexibility" />
              <strong>가입 편의</strong><small>비대면·영업점 선택 폭 중심</small>
            </label>
          </div>
        </div>

        <div class="form-step">
          <div class="form-step__label"><span>03</span><h2>선호하는 가입 방식은?</h2></div>
          <div class="choice-grid">
            <label :class="{ active: channel === 'any' }"><input v-model="channel" type="radio" name="channel" value="any" /><strong>상관없음</strong></label>
            <label :class="{ active: channel === 'online' }"><input v-model="channel" type="radio" name="channel" value="online" /><strong>온라인</strong></label>
            <label :class="{ active: channel === 'branch' }"><input v-model="channel" type="radio" name="channel" value="branch" /><strong>영업점</strong></label>
          </div>
        </div>

        <button class="button preference-submit" type="submit">조건에 맞는 상품 보기 →</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.discover-page { background: linear-gradient(115deg, #f4e6d3 0 42%, transparent 42%); }
.discover-layout { display: grid; grid-template-columns: 0.8fr 1.2fr; align-items: start; gap: 70px; }
.discover-copy { position: sticky; top: 140px; }
.discover-copy h1 { margin-bottom: 20px; color: var(--brown-900); font-size: clamp(2.2rem, 5vw, 4rem); line-height: 1.15; letter-spacing: -0.05em; }
.discover-copy > p { color: var(--ink-soft); line-height: 1.8; }
.discover-copy ol { display: grid; gap: 16px; margin: 34px 0 0; padding: 0; list-style: none; }
.discover-copy li { display: flex; align-items: center; gap: 12px; color: var(--brown-700); font-size: 0.88rem; font-weight: 700; }
.discover-copy li span { display: grid; width: 28px; height: 28px; flex: 0 0 auto; place-items: center; border-radius: 50%; background: var(--brown-900); color: white; font-size: 0.7rem; }
.preference-form { display: grid; gap: 38px; padding: clamp(24px, 5vw, 44px); }
.form-step__label { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.form-step__label span { color: var(--brown-500); font-size: 0.72rem; font-weight: 900; }
.form-step__label h2 { margin: 0; color: var(--brown-900); font-size: 1.1rem; }
.choice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.choice-grid--four { grid-template-columns: repeat(4, 1fr); }
.choice-grid label { display: flex; min-height: 86px; flex-direction: column; justify-content: center; gap: 6px; border: 1px solid var(--border); border-radius: 16px; background: white; padding: 15px; cursor: pointer; transition: 150ms ease; }
.choice-grid label:hover { border-color: var(--brown-500); }
.choice-grid label.active { border-color: var(--brown-700); background: var(--sand-100); box-shadow: inset 0 0 0 1px var(--brown-700); }
.choice-grid input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.choice-grid strong { color: var(--brown-900); font-size: 0.86rem; }
.choice-grid small { color: var(--ink-soft); font-size: 0.68rem; line-height: 1.5; }
.preference-submit { width: 100%; }
@media (max-width: 880px) {
  .discover-page { background: var(--sand-100); }
  .discover-layout { grid-template-columns: 1fr; gap: 36px; }
  .discover-copy { position: static; }
}
@media (max-width: 560px) {
  .choice-grid, .choice-grid--four { grid-template-columns: repeat(2, 1fr); }
}
</style>
