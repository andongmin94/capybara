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
      <input
        type="text"
        v-model.number="payment2"
        @change="updatePayment1((payment2 * rate!) / currencyUnit!)"
      />
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

watch([select1, select2], ([newOption1, newOption2]) => {
  if (newOption1 !== null && newOption2 !== null) {
    axios({
      url: `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.${newOption1}${newOption2}`,
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

const updatePayment1 = function (value: number) {
  payment1.value = value;
};

const updatePayment2 = function (value: number) {
  payment2.value = value;
};

const rate = ref<number | null>(null);
const currencyUnit = ref<number | null>(null);
</script>

<style scoped></style>
