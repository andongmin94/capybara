<template>
  <!-- 화면 작아지면 선택지 안보이는 거 수정하기 -->
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row align="center" justify="center" class="row">
          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="store.M" column>
              <v-radio label="E" color="red-darken-3" value="E"></v-radio>
              <v-radio label="I" color="primary" value="I"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="store.B" column>
              <v-radio label="S" color="red" value="S"></v-radio>
              <v-radio label="N" color="secondary" value="N"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="store.T" column>
              <v-radio label="T" color="orange-darken-3" value="T"></v-radio>
              <v-radio label="F" color="info" value="F"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="2" md="1">
            <v-radio-group v-model="store.I" column>
              <v-radio label="J" color="indigo" value="J"></v-radio>
              <v-radio label="P" color="success" value="P"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <RouterLink :to="{ name: 'algorithmresult' }"
            ><v-btn
              class="resultBtn"
              v-if="
                store.M != '' && store.B != '' && store.T != '' && store.I != ''
              "
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
import { useCounterStore } from "@/stores/counter";
import axios from "axios";

const store = useCounterStore();

onMounted(() => {
  console.log("MBTI 초기화");
  store.getFinances();
  store.M = "";
  store.B = "";
  store.T = "";
  store.I = "";

  // 3부터 6까지의 랜덤한 정수를 선택
  store.pickNumber = getRandomNumber(3, 6);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<style lang="scss" scoped>
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.row {
  margin-left: 30px;
  transform: scale(1.2);
}

.resultBtn {
  color: black;
}

.resultBtn:hover {
  color: white;
  background-color: map-get($map: $colors, $key: second);
  transform: scale(1.2);
}
</style>
