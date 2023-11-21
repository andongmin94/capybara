<template>
  <div v-if="store.user_data" class="container mx-auto mt-10">
    <p>아이디 : {{ store.user_data.data.username }}</p>
    <p>나이 : {{ store.user_data.data.age }}</p>
    <p>메일 : {{ store.user_data.data.email }}</p>
    <p>
      가입일 : {{ store.user_data.data.date_joined.slice(0, 4)
      }}년 {{ store.user_data.data.date_joined.slice(5, 7)
      }}월 {{ store.user_data.data.date_joined.slice(8, 10)
      }}일 {{ store.user_data.data.date_joined.slice(11, 13)
      }}시 {{ store.user_data.data.date_joined.slice(14, 16)
      }}분
    </p>
    <p>최근 접속일 : {{ store.user_data.data.last_login.slice(0, 4)
      }}년 {{ store.user_data.data.last_login.slice(5, 7)
      }}월 {{ store.user_data.data.last_login.slice(8, 10)
      }}일 {{ store.user_data.data.last_login.slice(11, 13)
      }}시 {{ store.user_data.data.last_login.slice(14, 16)
      }}분
    </p>
  </div>
  
  <div v-else class="text-center">로딩중...</div>
  <div style="text-align: center;">

  <RouterLink :to="{name:'modify'}">
  <v-btn>회원정보 수정</v-btn>
  </RouterLink>
  <RouterLink :to="{name:'changepassword'}">
    <v-btn>비밀번호 변경</v-btn>
  </RouterLink>
  <v-btn @click="checkDelete">회원탈퇴</v-btn>
  <v-btn @click="store.logOut">로그아웃</v-btn>
</div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useArticleStore } from "@/stores/article";
import { useRoute, useRouter } from "vue-router";
import { RouterLink } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useArticleStore();

onMounted(() => {
  store.get_user_data(store.search_username, () => router.push("/"));
});

const checkDelete = () => {
    if(confirm('정말 탈퇴하시겠습니까?')) {
      alert('탈퇴가 완료되었습니다.')
      store.logOut()
    }
    else {
      alert('취소되었습니다.')
    }
}

</script>

<style>
.container {
  text-align: center;
}
</style>
