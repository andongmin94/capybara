import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  const selectedItem = ref({});

  // DRF에 fin 조회 요청을 보내는 action
  const API_URL = "http://127.0.0.1:8000";

  // 금융 데이터를 저장하는 반응형 배열
  const finances = ref([]);

  // 금융 데이터를 조회하는 메서드
  const getFinances = function () {
    axios({
      method: "get",
      url: `${API_URL}/finlife/deposit-products/`,
    })
      .then((res) => {
        // console.log(res)
        finances.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    count,
    doubleCount,
    increment,
    API_URL,
    finances,
    getFinances,
    selectedItem,
  };
});
