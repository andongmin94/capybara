<template>
  <div>
    <h1>내 주변 은행 찾기</h1>
    <!-- single select -->

    <select v-model="province" @change="updateCities">
      <option disabled value="">도/시</option>
      <option v-for="info in infos" :key="info.id">
        {{ info.prov }}
      </option>
    </select>
    <select v-model="city" :disabled="!province">
      <option disabled value="">시/군/구</option>
      <option v-for="c in cities" :key="c">{{ c }}</option>
    </select>
    <select v-model="bank" :disabled="!city">
      <option disabled value="">은행명</option>
      <option v-for="b in banks" :key="b">{{ b }}</option>
    </select>
    <MapComponent :province="province" :city="city" :bank="bank" />
  </div>
</template>

<script setup lang="ts">
import MapComponent from "@/components/MapComponent.vue";
import { ref, watch } from "vue";
import { useMapStore } from "@/stores/map";
import type { Infos } from "@/types/CityInfo";

const store = useMapStore();

const infos: Infos[] = store.infos;
const banks = store.banks;
const cities = ref<string[]>([]);

const province = ref("");
const city = ref("");
const bank = ref("");

const updateCities = () => {
  const selectedInfo = infos.find((info) => info.prov === province.value);
  cities.value = selectedInfo ? selectedInfo.city : [];
};

watch(province, () => {
  updateCities();
});

updateCities();
</script>
