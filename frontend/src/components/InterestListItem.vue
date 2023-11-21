<template>
  <v-card class="container">
    <v-tabs v-model="tab" color="black" align-tabs="center">
      <v-tab :value="1">예금</v-tab>
      <v-tab :value="2">적금</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 2" :key="n" :value="n">
        <div v-if="n === 1">
          <RouterLink :to="{ name: 'cart' }" class="custom"
            ><v-chip class="nav-item text-black mt-4 custom2"
              >내가 찜한 목록 🎁</v-chip
            ></RouterLink
          >
          <v-container>
            <v-row align="center" justify="center">
              <v-col
                class="d-flex align-self-start"
                cols="12"
                md="6"
                lg="4"
                v-for="finance in store.finances"
                :key="finance"
              >
                <v-card
                  class="card mx-auto mb-6"
                  height="380"
                  width="525"
                  elevation="16"
                >
                  <v-card-item class="mx-2 mb-4 card-item">
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
        </div>
        <div v-else class="wrapper-none">
          <div><img src="@/assets/workingon.png" alt="" /></div>
          <div class="content"><strong>서비스 준비 중입니다. </strong></div>
        </div>
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
</script>

<script lang="ts">
export default {
  data: () => ({
    tab: null,
  }),
};
</script>

<style lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.container {
  background-color: map-get($map: $colors, $key: third);
}
.card {
  background-color: map-get($colors, first);
  color: map-get($colors, fifth);
  display: flex;
  flex-direction: column;
}

.card-item {
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

.wrapper-none {
  height: 1000px;
  img {
    width: 200px;
  }
}

.content {
  font-size: larger;
}

.custom {
  :hover {
    transform: scale(1.2);
  }
}

.custom2 {
  :hover {
    transform: none;
  }
}
</style>