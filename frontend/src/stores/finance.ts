import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useFinanceStore = defineStore("finance", () => {
  const API_URL = "http://127.0.0.1:8000";
  const selectedItem = ref({});
  
  // 금융 데이터를 저장하는 반응형 배열
  const finances = ref([]);

  // DRF에 fin 조회 요청을 보내는 action

    // 금융 데이터 초기 세팅하는 메서드
    const setFinances = function () {
      axios({
        method: "get",
        url: `${API_URL}/finlife/save-deposit-products/`,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };


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
    API_URL,
    finances,
    setFinances,
    getFinances,
    selectedItem,
  };
});