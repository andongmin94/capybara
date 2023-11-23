<template>
  <div class="d-flex flex-column align-center">
    <h1 class="my-6 half-highlight">환율 계산기</h1>
    <v-card elevation="10" class="d-flex flex-column align-center pa-10">
      <div>
        <strong v-if="modifiedAt">{{ modifiedAt.substr(0, 10) }}</strong>
        <span v-if="modifiedAt" class="ml-1">기준</span>
      </div>

      <div class="mb-5">
        <p v-if="rate == -1">현재 통화 선택이 유효하지 않습니다.</p>
        <p v-else-if="rate">
          현재 환율은
          <strong>{{ (currencyUnit / rate).toFixed(3) }}</strong>
          입니다.
        </p>
        <p v-else>환전할 통화를 선택하세요.</p>
      </div>

      <v-select
        clearable
        :items="payments"
        v-model="select1"
        class="exchange-select-box"
        label="환전 출발"
        variant="solo-filled"
      >
      </v-select>
      <v-select
        clearable
        :items="payments"
        v-model="select2"
        class="exchange-select-box"
        label="환전 도착"
        variant="solo-filled"
      >
      </v-select>

      <div class="mb-4">환전할 금액을 입력하세요.</div>

      <v-text-field
        v-model.number="input_money"
        class="exchange-select-box"
        label="금액"
        variant="solo-filled"
      />

      <v-chip @click="calculate" class="exchange-cal-btn" elevation="4"
        >환율 계산하기</v-chip
      >
      <div class="d-flex flex-column align-center justify-center">
        <p class="mt-5">계산 결과</p>
        <div class="exchange-output">
          {{ output_money.toFixed(2) }} {{ country[select2] }}
        </div>
        <p>입니다.</p>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

// prettier-ignore
const payments = ref(["KRW", "USD","JPY","CNY", "EUR", "TWD", "VND", "GBP","CHF","CAD","AUD","HKD","SEK","NZD", "SGD","NOK","MXN","INR","RUB","ZAR","TRY","BRL","AED","BHD","BND","CNH","CZK","DKK","IDR","ILS","MYR","QAR","SAR","THB","CLP","COP","EGP","HUF","KWD","OMR","PHP","PLN","PKR","RON", "BDT","DZD","ETB","FJD","JOD","KES","KHR","KZT","LKR","LYD","MMK","MNT","MOP","NPR","TZS","UZS",
]);

const country = ref({
  KRW: "원",
  USD: "US 달러",
  JPY: "엔",
  CNY: "위안",
  EUR: "유로",
  TWD: "대만달러",
  VND: "동",
  GBP: "파운드",
  CHF: "스위스 프랑",
  CAD: "캐내디안 달러",
  AUD: "오스트레일리아 달러",
  HKD: "홍콩 달러",
  SEK: "스웨덴 크로나",
  NZD: "뉴질랜드 달러",
  SGD: "싱가포르 달러",
  NOK: "노르웨이 크로네",
  MXN: "멕시코 페소",
  INR: "인디안 루피",
  RUB: "러시아 루블",
  ZAR: "남아공 랜드",
  TRY: "터키 리라",
  BRL: "브라질리안 헤알",
  AED: "아랍에미리트 디르함",
  BHD: "바레인 디나르",
  BND: "브루나이 달러",
  CNH: "역외 중국 위안",
  CZK: "체코 코루나",
  DKK: "덴마크 크로네",
  IDR: "인도네시아 루피아",
  ILS: "이스라엘 셰켈",
  MYR: "말레이시아 링겟",
  QAR: "카타르 리알",
  SAR: "사우디 리알",
  THB: "태국 바트",
  CLP: "칠레 페소",
  COP: "콜롬비아 페소",
  EGP: "이집트 파운드",
  HUF: "헝가리 포린트",
  KWD: "쿠웨이트 디나르",
  OMR: "오만 리알",
  PHP: "필리핀 페소",
  PLN: "폴란드 즐로티",
  PKR: "파키스탄 루피",
  RON: "루마니아 레우",
  BDT: "방글라데쉬 타카",
  DZD: "알제리 디나르",
  ETB: "에디오피아 디르",
  FJD: "피지 달러",
  JOD: "요르단 디나르",
  KES: "케냐 실링",
  KHR: "캄보디아 릴",
  KZT: "카자흐스탄 텡게",
  LKR: "스리랑카 루피",
  LYD: "리비아 디나르",
  MMK: "미얀마 차트",
  MNT: "몽골 투그리크",
  MOP: "마카오 파타카",
  NPR: "네팔 루피",
  TZS: "탄자니아 실링",
  UZS: "우즈베키스탄 숨",
});

const select1 = ref(null);
const select2 = ref(null);

// 두 환율 옵션이 선택되었을 때에 환율 금액 정보 가져오기
watch([select1, select2], ([newOption1, newOption2]) => {
  if (newOption1 !== null && newOption2 !== null) {
    if (newOption1 == "KRW") {
      axios({
        url: `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${newOption2}`,
        method: "GET",
      })
        .then(({ data }) => {
          rate.value = data[0]?.basePrice || -1;
          currencyUnit.value = data[0]?.currencyUnit || 1;
          modifiedAt.value = data[0]?.modifiedAt || 1;
        })
        .catch((err) => console.log(err));
    } else if (newOption2 == "KRW") {
      axios({
        url: `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${newOption1}`,
        method: "GET",
      })
        .then(({ data }) => {
          rate.value = 1 / data[0]?.basePrice || -1;
          currencyUnit.value = 1 / data[0]?.currencyUnit || 1;
          modifiedAt.value = data[0]?.modifiedAt || 1;
        })
        .catch((err) => console.log(err));
    } else {
      let rate1 = -1;
      let rate2 = -1;
      let cunit1 = -1;
      let cunit2 = -1;
      axios({
        url: `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${newOption1}`,
        method: "GET",
      })
        .then(({ data }) => {
          rate1 = data[0]?.basePrice || -1;
          cunit1 = data[0]?.currencyUnit || 1;
        })
        .catch((err) => console.log(err));
      axios({
        url: `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${newOption2}`,
        method: "GET",
      })
        .then(({ data }) => {
          rate2 = data[0]?.basePrice || -1;
          cunit2 = data[0]?.currencyUnit || 1;
          modifiedAt.value = data[0]?.modifiedAt || 1;
          rate.value = rate2 / rate1;
          currencyUnit.value = cunit2 / cunit1;
        })
        .catch((err) => console.log(err));
    }
  }
});

const input_money = ref(0);
const output_money = ref(0);
const rate = ref(null);
const currencyUnit = ref(null);
const modifiedAt = ref(null);

const calculate = function () {
  output_money.value = (input_money.value / rate.value) * currencyUnit.value;
};
</script>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
* {
  font-family: Pretendard-regular;
}
.exchange-select-box {
  width: 300px;
}

.exchange-cal-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
}

.exchange-output {
  font-size: larger;
  font-weight: 900;
}

.half-highlight {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 55%,
    lighten(#59452c, 35%) 50%
  );
}
</style>
