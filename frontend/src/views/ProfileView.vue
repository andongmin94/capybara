<template>
  <div>프로필 페이지</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useArticleStore } from "@/stores/article";

const store = useArticleStore();

const profileGet = function () {
  axios({
    method: "get",
    url: `${store.API_URL}/api/user/profile/`,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then((res) => {
      console.log(res)
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  profileGet();
  console.log("프로필 페이지 마운트");
  
});
</script>

<style scoped>
* {
  font-family: Pretendard-regular;
}
</style>
