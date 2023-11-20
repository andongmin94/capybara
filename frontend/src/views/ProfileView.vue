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
  <v-btn>회원정보 수정</v-btn>
  <v-btn>비밀번호 변경</v-btn>
  <v-btn>회원탈퇴</v-btn>
</div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useArticleStore } from "@/stores/article";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useArticleStore();
const isCurrentUser = computed(() => {
  return (
    store.search_user &&
    store.my_username &&
    store.search_user.username === store.my_username
  );
});

onMounted(() => {
  // console.log(route.params.search_username.value);
  store.get_user_data(store.search_username, () => router.push("/"));
});

// watch(() => route.params.search_username, (newSearch_username) => {
//   store.get_user_data(newSearch_username, () => router.push('/'));
// });

const editProfile = () => {
  // 프로필 수정 로직
};

const followUser = () => {
  store.followUser(store.my_id, store.search_user.id);
  // 팔로우 로직
};

const showDeleteConfirmation = () => {
  while (true) {
    const userConfirmation = prompt(
      "정말로 탈퇴하시겠어요? '탈퇴합니다'라고 입력하세요."
    );

    // 사용자가 취소 버튼을 누르거나 창을 닫으면 프롬프트가 null을 반환합니다.
    if (userConfirmation === null) {
      alert("회원 탈퇴가 취소되었습니다.");
      break; // 루프를 종료합니다.
    }

    if (userConfirmation === "탈퇴합니다") {
      store.account_delete();
      break; // 올바른 입력을 한 경우 루프를 종료합니다.
    } else {
      alert("문구가 틀립니다. 똑바로 입력하세요.");
    }
  }
};

const deleteUserAccount = () => {
  // 회원 탈퇴 로직을 구현합니다. 예를 들어, API 호출을 통해 백엔드에 탈퇴 요청을 보낼 수 있습니다.
  // store.deleteUserAccount()와 같은 함수를 호출할 수도 있습니다.
};
</script>

<style>
/* 스타일은 여기에 추가 */
.container {
  text-align: center;
}
</style>
