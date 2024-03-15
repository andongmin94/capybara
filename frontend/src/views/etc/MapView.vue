<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { dataApi, dataSourceMeta } from "@/api";
import type { BankBranch } from "@/api";

const route = useRoute();
const router = useRouter();
const allBranches = ref<BankBranch[]>([]);
const branches = ref<BankBranch[]>([]);
const province = ref(typeof route.query.province === "string" ? route.query.province : "");
const city = ref(typeof route.query.city === "string" ? route.query.city : "");
const bank = ref(typeof route.query.bank === "string" ? route.query.bank : "");
const selectedId = ref<number | null>(null);
const errorMessage = ref("");

const provinces = computed(() => [...new Set(allBranches.value.map((item) => item.province))].sort());
const cities = computed(() => [...new Set(allBranches.value.filter((item) => !province.value || item.province === province.value).map((item) => item.city))].sort());
const banks = computed(() => [...new Set(allBranches.value.map((item) => item.bank))].sort());
const selectedBranch = computed(() => branches.value.find((item) => item.id === selectedId.value) ?? branches.value[0]);

async function search(): Promise<void> {
  branches.value = await dataApi.searchBranches({ province: province.value, city: city.value, bank: bank.value });
  selectedId.value = branches.value[0]?.id ?? null;
}

watch(province, () => {
  if (!cities.value.includes(city.value)) city.value = "";
});

watch([province, city, bank], async () => {
  await router.replace({ query: { ...(province.value ? { province: province.value } : {}), ...(city.value ? { city: city.value } : {}), ...(bank.value ? { bank: bank.value } : {}) } });
  await search();
});

onMounted(async () => {
  try {
    allBranches.value = await dataApi.searchBranches({});
    await search();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "지점 정보를 불러오지 못했습니다.";
  }
});
</script>

<template>
  <section class="page-section branches-page">
    <div class="page-width">
      <div class="page-heading">
        <div><span class="eyebrow">Branch finder</span><h1>은행 지점 찾기</h1><p>{{ dataSourceMeta.branchIntro }}</p></div>
      </div>

      <div class="branch-filters surface-card">
        <div class="form-control"><label for="province">시·도</label><select id="province" v-model="province"><option value="">전체 지역</option><option v-for="item in provinces" :key="item">{{ item }}</option></select></div>
        <div class="form-control"><label for="city">시·군·구</label><select id="city" v-model="city"><option value="">전체</option><option v-for="item in cities" :key="item">{{ item }}</option></select></div>
        <div class="form-control"><label for="bank">은행</label><select id="bank" v-model="bank"><option value="">모든 은행</option><option v-for="item in banks" :key="item">{{ item }}</option></select></div>
      </div>

      <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
      <div v-else class="branch-layout">
        <div class="branch-list" aria-live="polite">
          <div class="branch-list__summary"><strong>{{ branches.length }}개 지점</strong><span>{{ dataSourceMeta.branchSummaryLabel }}</span></div>
          <button v-for="branch in branches" :key="branch.id" type="button" :class="{ active: selectedBranch?.id === branch.id }" @click="selectedId = branch.id">
            <span>{{ branch.bank }}</span><strong>{{ branch.name }}</strong><small>{{ branch.address }}</small><em>{{ branch.hours }}</em>
          </button>
          <div v-if="!branches.length" class="branch-empty"><strong>조건에 맞는 지점이 없어요.</strong><span>지역 또는 은행 조건을 넓혀보세요.</span></div>
        </div>

        <div class="demo-map" role="img" :aria-label="dataSourceMeta.branchMapLabel">
          <div class="demo-map__road demo-map__road--one"></div><div class="demo-map__road demo-map__road--two"></div><div class="demo-map__river"></div>
          <button v-for="branch in branches" :key="branch.id" class="map-marker" :class="{ active: selectedBranch?.id === branch.id }" type="button" :style="{ left: `${branch.x}%`, top: `${branch.y}%` }" :aria-label="branch.name" @click="selectedId = branch.id"><span></span></button>
          <div v-if="selectedBranch" class="map-card"><span>{{ selectedBranch.bank }}</span><strong>{{ selectedBranch.name }}</strong><small>{{ selectedBranch.address }}</small></div>
          <div class="map-attribution">{{ dataSourceMeta.branchAttribution }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.branches-page { background: #f5ede2; }
.branch-filters { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px; padding: 18px; }
.branch-layout { display: grid; grid-template-columns: 360px 1fr; min-height: 560px; overflow: hidden; border: 1px solid var(--border); border-radius: 25px; background: white; box-shadow: var(--shadow); }
.branch-list { overflow: auto; max-height: 620px; border-right: 1px solid var(--border); }
.branch-list__summary { display: flex; justify-content: space-between; padding: 20px; background: var(--sand-100); font-size: 0.76rem; }
.branch-list__summary span { color: var(--ink-soft); }
.branch-list > button { display: grid; width: 100%; gap: 5px; border: 0; border-bottom: 1px solid var(--border); background: white; padding: 18px 20px; text-align: left; }
.branch-list > button:hover, .branch-list > button.active { background: #fbf3e8; }
.branch-list > button span { color: var(--brown-700); font-size: 0.69rem; font-weight: 900; }
.branch-list > button strong { color: var(--brown-900); }
.branch-list > button small { color: var(--ink-soft); line-height: 1.5; }
.branch-list > button em { margin-top: 4px; color: var(--green); font-size: 0.7rem; font-style: normal; font-weight: 800; }
.branch-empty { display: grid; gap: 8px; padding: 30px 20px; }
.branch-empty span { color: var(--ink-soft); font-size: 0.78rem; }
.demo-map { position: relative; min-height: 560px; overflow: hidden; background: linear-gradient(135deg, #e9e1d3, #dfe6d5); }
.demo-map::before, .demo-map::after { position: absolute; content: ""; border: 1px solid rgba(108, 128, 101, 0.2); background: rgba(255, 253, 249, 0.46); }
.demo-map::before { inset: 12% 9% 52% 48%; border-radius: 30px; }
.demo-map::after { inset: 57% 52% 8% 8%; border-radius: 30px; }
.demo-map__road { position: absolute; z-index: 1; height: 18px; background: rgba(255,255,255,.74); box-shadow: 0 0 0 1px rgba(116,94,72,.08); transform-origin: left; }
.demo-map__road--one { top: 25%; left: -5%; width: 115%; transform: rotate(18deg); }
.demo-map__road--two { top: 80%; left: 5%; width: 100%; transform: rotate(-24deg); }
.demo-map__river { position: absolute; z-index: 0; top: -20%; left: 50%; width: 70px; height: 150%; background: rgba(132,184,189,.5); transform: rotate(25deg); }
.map-marker { position: absolute; z-index: 4; width: 24px; height: 24px; border: 0; border-radius: 50% 50% 50% 0; background: var(--brown-700); box-shadow: 0 4px 12px rgba(47,33,24,.28); transform: translate(-50%, -100%) rotate(-45deg); }
.map-marker span { display: block; width: 8px; height: 8px; margin: 8px; border-radius: 50%; background: white; }
.map-marker.active { z-index: 5; background: #a54d3d; transform: translate(-50%, -100%) rotate(-45deg) scale(1.28); }
.map-card { position: absolute; z-index: 6; top: 20px; left: 20px; display: grid; min-width: 240px; gap: 5px; border: 1px solid var(--border); border-radius: 16px; background: rgba(255,253,249,.94); box-shadow: var(--shadow); padding: 16px; }
.map-card span { color: var(--brown-700); font-size: .7rem; font-weight: 900; }
.map-card small { color: var(--ink-soft); }
.map-attribution { position: absolute; z-index: 5; right: 12px; bottom: 10px; border-radius: 5px; background: rgba(255,255,255,.8); padding: 4px 7px; color: var(--ink-soft); font-size: .58rem; }
@media (max-width: 800px) { .branch-layout { grid-template-columns: 1fr; } .branch-list { max-height: 330px; border-right: 0; border-bottom: 1px solid var(--border); } .demo-map { min-height: 420px; } }
@media (max-width: 560px) { .branch-filters { grid-template-columns: 1fr; } }
</style>
