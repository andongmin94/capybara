<template>
  <div>
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
                <v-chip class="detailbtn">상품 보기</v-chip>
              </RouterLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <hr />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
</script>

<style lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.card {
  background-color: map-get($colors, first);
  color: map-get($colors, fifth);
}

.detailbtn {
  color: white;
}
</style>
