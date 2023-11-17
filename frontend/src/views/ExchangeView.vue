<template>
  <div>
    <h1>환율 계산기</h1>
    <p v-if="rate">현재 환율은 {{ rate }}입니다.</p>
    <div>
      <select v-model="select1">
        <option v-for="payment in payments" :key="payment" :value="payment">
          {{ payment }}
        </option>
      </select>
      :
      <input
        type="text"
        placeholder="0"
        :disabled="!select1"
        v-model.number="payment1"
        @change="updatePayment2((payment1 / rate!) * currencyUnit!)"
      />
    </div>
    <div>
      <select v-model="select2">
        <option v-for="payment in payments" :key="payment" :value="payment">
          {{ payment }}
        </option>
      </select>
      :
      <!-- input이 아니라 결과값을 받아오는 곳 -->
      <span v-bind="payment2">{{ payment2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import axios from "axios";

const payments = ref<string[]>([
  "EUR",
  "JPY",
  "GBP",
  "CHF",
  "CAD",
  "AUD",
  "CNY",
  "HKD",
  "SEK",
  "NZD",
  "KRW",
  "SGD",
  "NOK",
  "MXN",
  "INR",
  "RUB",
  "ZAR",
  "TRY",
  "BRL",
  "AED",
  "BHD",
  "BND",
  "CNH",
  "CZK",
  "DKK",
  "IDR",
  "ILS",
  "MYR",
  "QAR",
  "SAR",
  "THB",
  "TWD",
  "CLP",
  "COP",
  "EGP",
  "HKD",
  "HUF",
  "KWD",
  "OMR",
  "PHP",
  "PLN",
  "PKR",
  "RON",
  "BRL",
  "BDT",
  "DZD",
  "ETB",
  "FJD",
  "JOD",
  "KES",
  "KHR",
  "KZT",
  "LKR",
  "LYD",
  "MMK",
  "MNT",
  "MOP",
  "NPR",
  "TZS",
  "UZS",
  "VND",
]);

const select1 = ref<string | null>(null);
const select2 = ref<string | null>(null);
const searchdate = ref<Date | null>(null);

// 비영업일의 데이터, 혹은 영업당일 11시 이전에 해당일의 데이터를 요청할 경우 null 값이 반환
watch([select1, select2], ([newOption1, newOption2]) => {
  if (newOption1 !== null && newOption2 !== null && payment1 !== null) {
    axios({
      // url: `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=AUTHKEYD7gdaKVlsgDEXQqLWxGsMFedqWG9xOzf&searchdate=${searchdate}&data=AP01${newOption1}${newOption2}`,
      method: "GET",
    })
      .then(({ data }) => {
        rate.value = data[0]?.basePrice || -1;
        currencyUnit.value = data[0]?.currencyUnit || 1;
      })
      .catch((err) => console.log(err));
  }
});

const payment1 = ref<number>(0);
const payment2 = ref<number>(0);

const updatePayment2 = function (value: number) {
  payment2.value = value;
};

const rate = ref<number | null>(null);
const currencyUnit = ref<number | null>(null);
</script>

<style scoped></style>
