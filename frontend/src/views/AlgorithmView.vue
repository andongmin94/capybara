<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row align="center" justify="center" style="margin-left: 55px">
          <v-col cols="12" sm="1" md="1">
            <v-radio-group v-model="store.M" column>
              <v-radio label="E" color="red" value="E"></v-radio>
              <v-radio label="I" color="red-darken-3" value="I"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="1" md="1">
            <v-radio-group v-model="store.B" column>
              <v-radio label="S" color="primary" value="S"></v-radio>
              <v-radio label="N" color="secondary" value="N"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="1" md="1">
            <v-radio-group v-model="store.T" column>
              <v-radio label="T" color="red" value="T"></v-radio>
              <v-radio label="F" color="success" value="F"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="1" md="1">
            <v-radio-group v-model="store.I" column>
              <v-radio label="J" color="orange" value="J"></v-radio>
              <v-radio label="P" color="indigo" value="P"></v-radio>
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

function getFinancesAsync() {
  return Promise.resolve(store.getFinances());
}

onMounted(() => {
  console.log("MBTI 초기화");
  
  store.M = "";
  store.B = "";
  store.T = "";
  store.I = "";

  // 순차적으로 실행되도록 Promise 체이닝 사용
getFinancesAsync()
  .then((res) => {
    console.log("MBTI 초기화 완료");
    console.log(store.finances);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
});
</script>

<style lang="scss">
.resultBtn {
  color: black;
}

.resultBtn:hover {
  color: white;
  background-color: rgb(134, 55, 2);
  transform: scale(1.2);
}
</style>
