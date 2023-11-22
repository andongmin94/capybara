<template>
  <br>
  <h1 style="text-align: center;">
    {{ store.M }}{{ store.B }}{{ store.T }}{{ store.I }}에게 추천하는 상품은
    {{ store.pickNumber }}가지입니다.
  </h1>
  <br>
  <v-card class="container">
    <v-window v-model="tab">
      <v-window-item>
        <v-container>
          <v-row align="center" justify="center">
            <v-col
              class="d-flex align-self-start"
              cols="12"
              md="6"
              lg="4"
              v-for="finance in randomElements"
              :key="finance"
            >
              <v-card
                class="card2 mx-auto mb-6"
                height="380"
                width="525"
                elevation="16"
              >
                <v-card-item class="mx-2 mb-4 card-item2">
                  <div class="text-overline mt-2 mb-3">
                    <v-chip>{{ finance!.kor_co_nm }}</v-chip>
                  </div>
                  <div class="text-h5 mb-4">
                    {{ finance!.fin_prdt_nm }}
                  </div>
                  <div class="text-caption">
                    <p>{{ finance!.etc_note }}</p>
                    <p>- 대상 : {{ finance!.join_member }}</p>
                    <p>- 가입 방법 : {{ finance.join_way }}</p>
                    <p>- 특이 사항 : {{ finance.spcl_cnd }}</p>
                  </div>
                </v-card-item>

                <v-btn block @click="selectItem(finance)" class="btn-wrapper"
                  ><RouterLink
                    :to="{ name: 'interestDetail', params: { id: finance!.fin_prdt_cd }}"
                    class="text-decoration-none detailbtn"
                    >상품 보기
                  </RouterLink></v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
  
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

const tab = ref(null);
const store = useCounterStore();
const selectedItem = store.selectedItem;

const selectItem = (finance: any) => {
  selectedItem.value = finance;
};
function getRandomElements(arr, numElements) {
  // 배열의 복사본을 만들어 사용하여 기존 배열을 수정하지 않습니다.
  const shuffledArray = arr.slice();

  // Fisher-Yates 알고리즘을 사용하여 배열을 섞습니다.
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // 배열에서 처음 numElements 개의 요소를 반환합니다.
  return shuffledArray.slice(0, numElements);
}
let a = 3;
const randomElements = getRandomElements(store.finances, store.pickNumber);
</script>

<style lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.container2 {
  background-color: map-get($map: $colors, $key: third);
}
.card2 {
  background-color: map-get($colors, first);
  color: map-get($colors, fifth);
  display: flex;
  flex-direction: column;
}

.card-item2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-wrapper {
  background-color: map-get($map: $colors, $key: second);
  max-height: 50px;
}
.detailbtn {
  color: map-get($colors, fifth);
}
</style>
