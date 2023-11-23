<template>
  <div>
    <h1 class="algo-title mt-5">
      <span
        v-if="
          !storedMbtiType || (Array.isArray(mbtiType) && mbtiType.length === 0)
        "
      >
        ✨ {{ algoStore.M }}{{ algoStore.B }}{{ algoStore.T }}{{ algoStore.I }} ✨
      </span>
      <span v-else> ✨{{ storedMbtiType.substr(1, 4) }} ✨ </span>
    </h1>
    <div class="algo-title mt-4 mb-5">
     추천하는 상품은
      <span
        v-if="
          !storedMbtiNum || (Array.isArray(mbtiNum) && mbtiNum.length === 0)
        "
      >
        {{ algoStore.pickNumber }}가지입니다.
      </span>
      <span v-else> {{ storedMbtiNum }}가지입니다. </span>
    </div>
    <div align="center">
      <RouterLink :to="{ name: 'algorithm' }" class="algorithm-test-link"
        ><v-chip
          class="algorithm-test-btn mb-5"
          @click="resetMbtiData"
          elevation="2"
          >다시 추천받기</v-chip
        ></RouterLink
      >
    </div>
    <v-card class="algo-result-container" align="center">
      <v-window v-model="tab">
        <v-window-item>
          <v-container>
            <v-row align="center" justify="center">
              <v-col
                class="d-flex align-self-start"
                cols="12"
                md="6"
                lg="4"
                v-for="finance in mbtiElements"
                :key="finance"
              >
                <v-card
                  class="algo-result-card mx-auto mb-6"
                  height="380"
                  width="525"
                  elevation="16"
                >
                  <v-card-item class="mx-2 mb-4 algo-result-card-item">
                    <div class="text-overline mt-2 mb-3">
                      <v-chip>{{ finance!.kor_co_nm }}</v-chip>
                    </div>
                    <div class="text-h5 mb-4">
                      {{ finance!.fin_prdt_nm }}
                    </div>
                    <div class="algo-result-card-text">
                      <p>{{ finance!.etc_note }}</p>
                      <p>- 대상 : {{ finance!.join_member }}</p>
                      <p>- 가입 방법 : {{ finance.join_way }}</p>
                      <p>- 특이 사항 : {{ finance.spcl_cnd }}</p>
                    </div>
                  </v-card-item>

                  <v-btn
                    block
                    @click="selectItem(finance)"
                    class="algo-result-btn"
                    ><RouterLink
                      :to="{ name: 'interestDetail', params: { id: finance!.fin_prdt_cd }}"
                      class="text-decoration-none algo-result-link"
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
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAlgorithmStore } from "@/stores/algorithm";
import { useFinanceStore } from "@/stores/finance";
import { ref } from "vue";

const algoStore = useAlgorithmStore();
const finStore = useFinanceStore();

const tab = ref(null);
const selectedItem = finStore.selectedItem;

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

//  결과배열
let mbtiElements:any;
let mbtiType:any;
let mbtiNum:any;

////////////////
const storedMbtiData = localStorage.getItem("mbtiData");
const storedMbtiType = localStorage.getItem("mbtiType");
const storedMbtiNum = localStorage.getItem("mbtiNum");

if (storedMbtiData) {
  mbtiElements = JSON.parse(storedMbtiData);
  mbtiType = JSON.parse(storedMbtiType);
  mbtiNum = JSON.parse(storedMbtiNum);

  if (Array.isArray(mbtiElements) && mbtiElements.length === 0) {
    mbtiElements = getRandomElements(finStore.finances, algoStore.pickNumber);
    localStorage.setItem("mbtiData", JSON.stringify(mbtiElements));
    localStorage.setItem(
      "mbtiType",
      JSON.stringify(`${algoStore.M}${algoStore.B}${algoStore.T}${algoStore.I}`)
    );
    localStorage.setItem("mbtiNum", JSON.stringify(algoStore.pickNumber));
  }
} else {
  mbtiElements = getRandomElements(finStore.finances, algoStore.pickNumber);
  localStorage.setItem("mbtiData", JSON.stringify(mbtiElements));
  localStorage.setItem(
    "mbtiType",
    JSON.stringify(`${algoStore.M}${algoStore.B}${algoStore.T}${algoStore.I}`)
  );
  localStorage.setItem("mbtiNum", JSON.stringify(algoStore.pickNumber));
}

const resetMbtiData = function () {
  localStorage.setItem("mbtiData", JSON.stringify([]));
  localStorage.setItem("mbtiType", JSON.stringify([]));
  localStorage.setItem("mbtiNum", JSON.stringify([]));
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

.algo-title {
  text-align: center;
}
.algo-result-container {
  background-color: map-get($map: $colors, $key: third);
}
.algo-result-card {
  background-color: map-get($colors, first);
  color: map-get($colors, fifth);
  display: flex;
  flex-direction: column;
}

.algo-result-card-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: small;
  font-weight: 100;
}

.algo-result-btn {
  background-color: map-get($map: $colors, $key: second);
  max-height: 50px;
}
.algo-result-link {
  color: map-get($colors, fifth);
}

.algorithm-test-link {
  color: map-get($map: $colors, $key: fifth);
}

.algorithm-test-btn {
  background-color: map-get($map: $colors, $key: second);
}
</style>
