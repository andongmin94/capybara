<template>
  <div>
    <h1>내 주변 은행 찾기</h1>
    <!-- single select -->

    <select v-model="province">
      <option disabled value="">도/시</option>
      <option v-for="province in store.infos" :key="store.infos.prov">
        {{ store.infos.prov }}
      </option>
    </select>
    <select v-model="city">
      <option disabled value="">시/군/구</option>
      <option>Alice</option>
      <option>Bella</option>
      <option>Cathy</option>
    </select>
    <select v-model="bank">
      <option disabled value="">은행명</option>
      <option>Alice</option>
      <option>Bella</option>
      <option>Cathy</option>
    </select>
    <MapComponent />
  </div>
</template>

<script setup lang="ts">
import MapComponent from "@/components/MapComponent.vue";
import { ref } from "vue";
import { useMapStore } from "@/stores/map";

const store = useMapStore();

const province = ref("");
const city = ref("");
const bank = ref("");
</script>
