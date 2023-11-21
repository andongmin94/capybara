<template>
  <div style="text-align: center">
    <v-row>
      <v-col align="center">
        <h1>환율 계산기</h1>
        <p>기준 시각 : {{ modifiedAt }}</p>
        <br />
        <p v-if="rate == -1">현재 통화 선택이 유효하지 않습니다.</p>
        <p v-else-if="rate">현재 환율은 {{ currencyUnit / rate }}입니다.</p>
        <p v-else>환전할 금액을 입력해 주세요.</p>
        <br />

        <br />

        <v-select
          clearable
          :items="payments"
          v-model="select1"
          class="selectbox"
          label="환전 출발"
          variant="solo-inverted"
        >
        </v-select>

        <v-select
          clearable
          :items="payments"
          v-model="select2"
          class="selectbox"
          label="환전 도착"
          variant="solo-inverted"
        >
        </v-select>

        <br />
        <br />
        계산할 금액을 입력하세요.
        <v-text-field
          v-model.number="input_money"
          class="selectbox"
          label="금액"
        />
        <p>계산 결과 : {{ output_money.toFixed(2) }}</p>
        <br />
        <v-chip @click="calculate">계산</v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
// prettier-ignore
const payments = ref(["KRW", "USD","JPY","CNY", "EUR", "TWD", "VND", "GBP","CHF","CAD","AUD","HKD","SEK","NZD", "SGD","NOK","MXN","INR","RUB","ZAR","TRY","BRL","AED","BHD","BND","CNH","CZK","DKK","IDR","ILS","MYR","QAR","SAR","THB","CLP","COP","EGP","HUF","KWD","OMR","PHP","PLN","PKR","RON", "BDT","DZD","ETB","FJD","JOD","KES","KHR","KZT","LKR","LYD","MMK","MNT","MOP","NPR","TZS","UZS",
  ]);

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
.selectbox {
  width: 300px;
}
</style>
