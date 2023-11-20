<template>
  <v-card class="container">
    <v-tabs v-model="tab" color="black" align-tabs="center">
      <v-tab :value="1">예금</v-tab>
      <v-tab :value="2">적금</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 2" :key="n" :value="n">
        <v-container>
          <v-row align="center" justify="center">
            <v-col
              cols="12"
              md="6"
              lg="4"
              v-for="finance in store.finances"
              :key="finance"
            >
              <v-card
                class="mx-auto card"
                max-width="600"
                height="300px"
                elevation="16"
              >
                <v-card-item>
                  <div class="text-overline mb-1">
                    {{ finance!.kor_co_nm }}
                  </div>
                  <div class="text-h6 mb-1">
                    {{ finance!.fin_prdt_nm }}
                  </div>
                  <div class="text-caption">
                    <p>{{ finance!.etc_note }}</p>
                    <p>- 가입 대상 : {{ finance!.join_member }}</p>
                    <p>- 가입 방법 : {{ finance!.join_way }}</p>
                    <p>- 특이 사항 : {{ finance!.spcl_cnd }}</p>
                  </div>
                </v-card-item>

                <v-card-actions>
                  <RouterLink
                    :to="{ name: 'interestDetail', params: { id: finance!.fin_prdt_cd } }"
                  >
                    <v-chip class="detailbtn" @click="selectItem(finance)"
                      >상품 보기</v-chip
                    >
                  </RouterLink>
                  <InterestListItemDetail
                    :selectedItem="selectedItem"
                    v-show="false"
                  />
                </v-card-actions>
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
import InterestListItemDetail from "./InterestListItemDetail.vue";

const tab = ref(null);
const store = useCounterStore();
const selectedItem = ref(null);

const selectItem = (finance) => {
  console.log(finance);
  selectedItem.value = finance;
};
</script>

<script lang="ts">
export default {
  data: () => ({
    tab: null,
  }),
  components: { InterestListItemDetail },
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
}

.detailbtn {
  color: white;
}
</style>
