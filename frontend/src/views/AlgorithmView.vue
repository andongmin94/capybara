<template>
  <!-- 화면 작아지면 선택지 안보이는 거 수정하기 -->
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-card
          loading
          text="MBTI로 당신의 금융상품을 골라보세요."
          variant="outlined"
          class="mx-auto"
          style="width: 260px; background-color: azure"
        ></v-card>
        <br /><br /><br /><br /><br />
        <v-row align="center" justify="center" class="algorithm-mbti">
          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="algoStore.M" column>
              <v-radio label="E" color="red-darken-3" value="E"></v-radio>
              <v-radio label="I" color="primary" value="I"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="algoStore.B" column>
              <v-radio label="S" color="red" value="S"></v-radio>
              <v-radio label="N" color="secondary" value="N"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="algoStore.T" column>
              <v-radio label="T" color="orange-darken-3" value="T"></v-radio>
              <v-radio label="F" color="info" value="F"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="algoStore.I" column>
              <v-radio label="J" color="indigo" value="J"></v-radio>
              <v-radio label="P" color="success" value="P"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <RouterLink
            :to="{ name: 'algorithmresult' }"
            class="algorithm-result-link"
            ><v-btn
              v-if="
                algoStore.M != '' && algoStore.B != '' && algoStore.T != '' && algoStore.I != ''
              "
              class="algorithm-result-btn"
              @click="changeNavRoute"
              >결과보기</v-btn
            ></RouterLink
          ></v-row
        >
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAlgorithmStore } from "@/stores/algorithm";
import { useFinanceStore } from "@/stores/finance";
import axios from "axios";

const algoStore = useAlgorithmStore();
const finStore = useFinanceStore();

onMounted(() => {
  console.log("MBTI 초기화");
  finStore.getFinances();
  algoStore.M = "";
  algoStore.B = "";
  algoStore.T = "";
  algoStore.I = "";

  // 3부터 6까지의 랜덤한 정수를 선택
  algoStore.pickNumber = getRandomNumber(3, 6);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const changeNavRoute = () => {};
</script>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.algorithm-mbti {
  margin-left: 30px;
  transform: scale(1.2);
}

.algorithm-result-link {
  color: black;
  :hover {
    color: white;
    background-color: map-get($map: $colors, $key: second);
    transform: scale(1.1);
  }
}
.algorithm-result-btn {
  :hover {
    all: unset;
  }
}
</style>
