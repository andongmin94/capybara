<template>
  <v-card class="interest-list-item-container">
    <v-tabs v-model="tab" color="black" align-tabs="center">
      <v-tab :value="1">예금</v-tab>
      <v-tab :value="2">적금</v-tab>
    </v-tabs>
    <v-window v-model="tab" align="center">
      <v-window-item v-for="n in 2" :key="n" :value="n">
        <div v-if="n === 1">
          <RouterLink :to="{ name: 'cart' }" class="cart-view-link"
            ><v-chip class="nav-item text-black mt-4 cart-view-chip"
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
                v-for="finance in finStore.finances"
                :key="finance"
              >
                <v-card
                  class="interest-list-item-card mx-auto mb-6"
                  height="380"
                  width="525"
                  elevation="16"
                >
                  <v-card-item
                    class="mx-2 mb-4 interest-list-item-card-content"
                  >
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

                  <RouterLink
                    :to="{ name: 'interestDetail', params: { id: finance!.fin_prdt_cd }}"
                    class="text-decoration-none"
                    ><v-btn
                      block
                      @click="selectItem(finance)"
                      class="interest-list-item-detail-text py-6"
                      >상품 보기</v-btn
                    >
                  </RouterLink>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div v-else class="interest-list-item-detail-wrapper-none">
          <div><img src="@/assets/workingon.png" alt="" /></div>
          <div class="interest-list-item-detail-wrapper-none-content">
            <strong>서비스 준비 중입니다. </strong>
          </div>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useFinanceStore } from "@/stores/finance";

const finStore = useFinanceStore();
const tab = ref(null);

const selectItem = (finance: any) => {
  finStore.selectedItem.value = finance;
};
</script>

<script lang="ts">
export default {
  data: () => ({
    tab: null,
  }),
};
</script>

<style lang="scss" scoped>
* {
  font-family: Pretendard-regular;
}
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.interest-list-item-container {
  background-color: map-get($map: $colors, $key: third);
}
.interest-list-item-card {
  background-color: map-get($colors, first);
  color: map-get($colors, fifth);
  display: flex;
  flex-direction: column;
}

.interest-list-item-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.interest-list-item-detail-text {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($colors, fifth);
}

.interest-list-item-detail-wrapper-none {
  height: 1000px;
  img {
    width: 300px;
  }
}

.interest-list-item-detail-wrapper-none-content {
  font-size: larger;
}

.cart-view-link {
  :hover {
    transform: scale(1.1);
  }
}

.cart-view-chip {
  :hover {
    transform: none;
  }
}
</style>
