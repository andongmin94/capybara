<template>
  <div>
    <v-container align="center">
      <v-row class="mt-4 mb-5" align="center" justify="center">
        <h1>찜한 상품 모아보기</h1>
      </v-row>

      <div v-if="cartItems.length !== 0">
        <v-row align="center" justify="center" class="mb-5">
          <UserChart :mom-products="momProducts" :cart-items="cartItems" />
        </v-row>

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

                      <v-col class="align-self-center custom5" cols="2">
                        <div>
                          <!-- <v-chip @click="goDetail(mom)">상세페이지로 이동</v-chip> -->
                          <v-chip
                            class="px-1 custom5"
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
        <div><img class="emptyimg" src="@/assets/empty.png" alt="" /></div>
        <div><strong class="content">찜한 상품이 없습니다.</strong></div>
        <div class="mt-5">
          <RouterLink :to="{ name: 'interest' }" class="nav-item mx-2">
            <v-chip elevation="2" class="text-black"
              >모든 상품 보러가기</v-chip
            ></RouterLink
          >
        </div>
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
  background-color: map-get($map: $colors, $key: first);
  color: map-get($map: $colors, $key: fifth);
  max-width: 1100px;
}
.product-name {
  font-size: larger;
}

.content {
  font-family: Pretendard-Regular;
  font-size: larger;
}

.custom5 {
  transform: scale(1.2);
}

.emptyimg {
  width: 300px;
}
</style>
