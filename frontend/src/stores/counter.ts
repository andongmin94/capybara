import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // DRF에 fin 조회 요청을 보내는 action
  const API_URL = "http://127.0.0.1:8000";
  const finances = ref([]);
  const getFinances = function () {
    axios({
      method: "get",
      url: `${API_URL}/api/v1/articles/`,
    })
      .then((res) => {
        // console.log(res)
        finances.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////////////////////////////////////////////////////////////////////////////

  return { count, doubleCount, increment, finances, getFinances };
});
