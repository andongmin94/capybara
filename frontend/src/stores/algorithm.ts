import { ref } from "vue";
import { defineStore } from "pinia";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const M = ref("");
  const B = ref("");
  const T = ref("");
  const I = ref("");
  const pickNumber = ref(3);

  return {
    M, B, T, I, pickNumber
  };
});