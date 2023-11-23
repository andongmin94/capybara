<template>
  <div v-if="store.user_data" class="profile-container d-flex justify-center">
    <v-card
      class="profile-card d-flex flex-column justify-space-around mt-4"
      height="480px"
    >
      <v-container class="px-8">
        <v-row class="mt-5">
          <v-col>
            <v-card-title>
              <strong>{{ store.user_data.data.username }}님의 프로필</strong>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex justify-center">
              <RouterLink :to="{ name: 'modify' }">
                <v-chip class="text-black mx-3">회원정보 수정</v-chip>
              </RouterLink>
              <RouterLink :to="{ name: 'changepassword' }">
                <v-chip class="text-black mx-3">비밀번호 변경</v-chip>
              </RouterLink>
            </div>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-column align-center">
          <v-col>
            <v-card-text>
              <p class="mb-3"><strong>닉네임</strong>
                <div>{{ store.user_data.data.nickname }}</div>
              </p>
              <p class="mb-3"><strong>이메일</strong>
                <div>{{ store.user_data.data.email }}</div>
              </p>
              <p class="mb-3">
                <strong>가입일자</strong>
                <div>{{ store.user_data.data.date_joined.slice(0, 4) }}년
                {{ store.user_data.data.date_joined.slice(5, 7) }}월
                {{ store.user_data.data.date_joined.slice(8, 10) }}일
                {{ store.user_data.data.date_joined.slice(11, 13) }}시
                {{ store.user_data.data.date_joined.slice(14, 16) }}분
              </div>
              </p>
              <p class="mb-3">
                <strong>최근 접속일자</strong>
                <div>
                {{ store.user_data.data.last_login.slice(0, 4) }}년
                {{ store.user_data.data.last_login.slice(5, 7) }}월
                {{ store.user_data.data.last_login.slice(8, 10) }}일
                {{ store.user_data.data.last_login.slice(11, 13) }}시
                {{ store.user_data.data.last_login.slice(14, 16) }}분
              </div>
              </p>
            </v-card-text>
          </v-col>
        </v-row>

        <v-row class="pb-10">
          <v-col>
            <v-chip @click="store.logOut" class="mx-3" color="secondary"
              >로그아웃</v-chip
            >
            <v-chip @click="checkDelete" class="mx-3" color="red"
              >회원탈퇴</v-chip
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>

  <div v-else class="text-center">로딩중...</div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import { useCommunityStore } from "@/stores/community";

const route = useRoute();
const router = useRouter();
const store = useCommunityStore();

onMounted(() => {
  store.get_user_data(store.search_username, () => router.push("/"));
});

const checkDelete = () => {
  if (confirm("정말 탈퇴하시겠습니까?")) {
    alert("탈퇴가 완료되었습니다.");
    store.logOut();
  } else {
    alert("취소되었습니다.");
  }
};
</script>

<style>
.profile-container {
  text-align: center;
}
</style>
