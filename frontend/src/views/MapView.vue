<template>
  <div>
    <h1>내 주변 은행 찾기</h1>
    <!-- single select -->

    <select v-model="province">
      <option disabled value="">도/시</option>
      <option></option>
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

const province = ref("");
const city = ref("");
const bank = ref("");

const infos = ref([
  {
    prov: "서울특별시",
    city: [
      "종로구",
      "중구",
      "용산구",
      "성동구",
      "광진구",
      "동대문구",
      "중랑구",
      "성북구",
      "강북구",
      "도봉구",
      "노원구",
      "은평구",
      "서대문구",
      "마포구",
      "양천구",
      "강서구",
      "구로구",
      "금천구",
      "영등포구",
      "동작구",
      "관악구",
      "서초구",
      "강남구",
      "송파구",
      "강동구",
    ],
  },
  {
    prov: "부산광역시",
    city: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "기장군",
    ],
  },
]);
</script>
