<template>
  <div>
    <v-container>
      <v-row class="mb-6" align="center" justify="center">
        <h1>비교 상품 목록</h1>
      </v-row>
      <v-row align="center" justify="center">
        <UserChart :mom-products="momProducts" :cart-items="cartItems" />
      </v-row>

      <div v-if="cartItems">
        <div v-for="product in cartItems" :key="product.id">
          <v-card class="eachcard mb-5">
            <v-card-item>
              <div v-for="mom in momProducts">
                <div v-if="mom.fin_prdt_cd === product.fin_prdt_cd">
                  <v-container class="d-flex">
                    <v-row>
                      <v-col
                        class="d-flex flex-column justify-space-around"
                        cols="5"
                      >
                        <v-chip class="product-bank align-self-center">
                          {{ mom.kor_co_nm }}
                        </v-chip>
                        <div class="product-name align-self-center">
                          {{ mom.fin_prdt_nm }}
                        </div>
                      </v-col>

                      <v-col class="d-flex flex-column" cols="4">
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
                      <v-col class="align-self-center" cols="2">
                        <div>
                          <!-- <v-chip @click="goDetail(mom)">상세페이지로 이동</v-chip> -->
                          <v-chip class="px-1" @click="removeCart(product)"
                            >장바구니에서 삭제</v-chip
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

      <div v-else>
        <strong>장바구니에 담긴 상품이 없습니다.</strong>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserChart from "@/components/UserChart.vue";
import { useCounterStore } from "@/stores/counter.ts";

const router = useRouter();
const store = useCounterStore();
const moms = ref(store.finances);
const cartItems = ref([]);
const momProducts = ref([]);

cartItems.value = JSON.parse(localStorage.getItem("cart"));

// 옵션에 해당하는 상품 찾기
onMounted(() => {
  cartItems.value.map((iteminCart) => {
    const isDuplicate = momProducts.value.find((iteminMoms) => {
      return iteminMoms.fin_prdt_cd === iteminCart.fin_prdt_cd;
    });

    moms.value.forEach((mom) => {
      if (iteminCart.fin_prdt_cd === mom.fin_prdt_cd && !isDuplicate) {
        momProducts.value.push(mom);
      }
    });
  });
});

// 한 상품으로만 들어가는 문제. 반응형으로 받아와야 할듯 근데 어떻게하지
// const goDetail = (mom) => {
//   router.push(`interestDetail/${mom.fin_prdt_cd}`);
// };

const removeCart = (product) => {
  console.log(product.id);
  // localStoage 에서 삭제
  // 현재 cartItems.value 에서 삭제
  // 1. 현재 localStorage 에 저장된 데이터를 가져오기
  // 이 코드는 valid 하기 위해 한 단계 더 작성했다고 생각하시면 됩니다.
  // const existingCart = JSON.parse(localStorage.getItem('cart'))

  // 2. 삭제할 아이템 index 검색
  const itemIdx = cartItems.value.findIndex((item) => item.id === product.id);

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

.eachcard {
  background-color: map-get($map: $colors, $key: forth);
  color: map-get($map: $colors, $key: fifth);
}
.product-name {
  font-size: larger;
}
</style>
