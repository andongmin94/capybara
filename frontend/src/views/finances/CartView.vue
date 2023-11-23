<template>
  <div>
    <v-container align="center">
      <v-row class="mt-4 mb-5" align="center" justify="center">
        <h1>찜한 상품 모아보기</h1>
      </v-row>

      <div v-if="cartItems && cartItems.length !== 0">
        <v-row align="center" justify="center" class="mb-5">
          <UserChart :mom-products="momProducts" :cart-items="cartItems" />
        </v-row>

        <div v-for="product in cartItems" :key="product.id">
          <v-card class="cart-view-card mb-5">
            <v-card-item>
              <div v-for="mom in momProducts">
                <div v-if="mom.fin_prdt_cd === product.fin_prdt_cd">
                  <v-container class="d-flex">
                    <v-row>
                      <v-col
                        class="d-flex flex-column justify-space-around"
                        cols="5"
                      >
                        <v-chip class="align-self-center">
                          {{ mom.kor_co_nm }}
                        </v-chip>
                        <div class="cart-view-card-name align-self-center">
                          {{ mom.fin_prdt_nm }}
                        </div>
                      </v-col>

                      <v-col class="d-flex flex-column" cols="5">
                        <div>
                          <div>{{ product.intr_rate_type_nm }}</div>
                        </div>
                        <div>
                          <div>저축 금리 : {{ product.intr_rate }}%</div>
                        </div>
                        <div>
                          <div>최고 우대 금리: {{ product.intr_rate2 }}%</div>
                        </div>
                        <div>
                          <div>기간: {{ product.save_trm }}개월</div>
                        </div>
                      </v-col>

                      <v-col
                        class="align-self-center cart-view-delete"
                        cols="2"
                      >
                        <div>
                          <!-- <v-chip @click="goDetail(mom)">상세페이지로 이동</v-chip> -->
                          <v-chip
                            class="px-1 cart-view-delete"
                            color="red"
                            @click="removeCart(product)"
                            >　가입 상품 삭제　</v-chip
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </div>
      </div>

      <div v-else align="center">
        <div><img src="/empty.png" alt="" /></div>
        <div>
          <strong class="cart-no-content">찜한 상품이 없습니다.</strong>
        </div>
        <div class="mt-5">
          <RouterLink :to="{ name: 'interest' }" class="mx-2">
            <v-chip class="text-black" elevation="2"
              >모든 상품 보러가기</v-chip
            ></RouterLink
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<!-- <script lang="ts">
type localStorage = {
  getItem:string
}
</script> -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import UserChart from "@/components/UserChart.vue";
import { useFinanceStore } from "@/stores/finance";

const finStore = useFinanceStore();

const moms = ref(finStore.finances);
const cartItems: any = ref([]);
const momProducts: any = ref([]);

cartItems.value = JSON.parse(localStorage.getItem("cart") || "") || [];

// 옵션에 해당하는 상품 찾기
onMounted(() => {
  if (cartItems.value !== null) {
    cartItems.value.map((iteminCart: any) => {
      const isDuplicate = momProducts.value.find((iteminMoms: any) => {
        return iteminMoms.fin_prdt_cd === iteminCart.fin_prdt_cd;
      });

      moms.value.forEach((mom: any) => {
        if (iteminCart.fin_prdt_cd === mom.fin_prdt_cd && !isDuplicate) {
          momProducts.value.push(mom);
        }
      });
    });
  }
});

const removeCart = (product: any) => {
  console.log(product.id);
  // localStoage 에서 삭제
  // 현재 cartItems.value 에서 삭제
  // 1. 현재 localStorage 에 저장된 데이터를 가져오기
  // 이 코드는 valid 하기 위해 한 단계 더 작성했다고 생각하시면 됩니다.
  // const existingCart = JSON.parse(localStorage.getItem('cart'))

  // 2. 삭제할 아이템 index 검색
  const itemIdx = cartItems.value.findIndex(
    (item: any) => item.id === product.id
  );

  // 3. 데이터 삭제
  cartItems.value.splice(itemIdx, 1);

  // 4. 삭제된 데이터를 기준으로 데이터를 반영
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
};
</script>

<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);

.cart-view-card {
  background-color: map-get($map: $colors, $key: first);
  color: map-get($map: $colors, $key: fifth);
  max-width: 1100px;
  font-family: Pretendard-Regular;
  font-size: small;
}
.cart-view-card-name {
  font-size: larger;
}

.cart-no-content {
  font-family: Pretendard-Regular;
  font-size: larger;
}

.cart-view-delete {
  font-size: x-small;
  transform: scale(1.1);
}
</style>
