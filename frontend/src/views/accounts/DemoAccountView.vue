<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { dataSourceMeta } from "@/api";
import type { AccountExperienceSection } from "@/api";
import { useDemoStore } from "@/stores/demo";

type AccountSection = AccountExperienceSection;

const props = defineProps<{ section: AccountSection }>();
const router = useRouter();
const store = useDemoStore();
const saved = ref(false);

const copy = computed(() => {
  const labels: Record<AccountSection, { eyebrow: string; title: string }> = {
    profile: {
      eyebrow: "My account",
      title: "내 계정",
    },
    login: {
      eyebrow: "Welcome back",
      title: "로그인",
    },
    signup: {
      eyebrow: "Create account",
      title: "회원가입",
    },
    findpassword: {
      eyebrow: "Account help",
      title: "비밀번호 찾기",
    },
    modify: {
      eyebrow: "Edit account",
      title: "프로필 수정",
    },
    changepassword: {
      eyebrow: "Security",
      title: "비밀번호 변경",
    },
  };
  return {
    ...labels[props.section],
    description: dataSourceMeta.account.descriptions[props.section],
  };
});

const isProfile = computed(() => props.section === "profile");
const isPassword = computed(() => props.section === "changepassword");
const isHelp = computed(() => props.section === "findpassword");

function complete(): void {
  saved.value = true;
  setTimeout(() => router.push({ name: "profile", params: { search_username: store.currentUser.username } }), 500);
}
</script>

<template>
  <section class="page-section account-page">
    <div class="page-width account-layout">
      <aside class="account-copy">
        <span class="eyebrow">{{ copy.eyebrow }}</span>
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.description }}</p>
        <div class="account-character" aria-hidden="true">C</div>
      </aside>

      <div v-if="isProfile" class="profile-panel surface-card">
        <div class="profile-panel__header">
          <span class="profile-avatar">{{ store.currentUser.nickname.slice(0, 1) }}</span>
          <div><span>{{ dataSourceMeta.account.label }}</span><h2>{{ store.currentUser.nickname }}</h2><p>@{{ store.currentUser.username }}</p></div>
        </div>
        <dl class="profile-details">
          <div><dt>이메일</dt><dd>{{ store.currentUser.email }}</dd></div>
          <div><dt>찜한 옵션</dt><dd>{{ store.wishlistCount }}개</dd></div>
          <div><dt>데이터 소스</dt><dd>{{ dataSourceMeta.sourceLabel }}</dd></div>
        </dl>
        <div class="profile-actions"><RouterLink class="button" :to="{ name: 'cart' }">찜 목록 보기</RouterLink><RouterLink class="button-secondary" :to="{ name: 'modify' }">프로필 수정</RouterLink></div>
      </div>

      <form v-else class="account-form surface-card" @submit.prevent="complete">
        <template v-if="isPassword">
          <div class="form-control"><label for="old-password">현재 비밀번호</label><input id="old-password" type="password" value="demo-password" autocomplete="current-password" /></div>
          <div class="form-control"><label for="new-password">새 비밀번호</label><input id="new-password" type="password" value="demo-password-new" autocomplete="new-password" /></div>
        </template>
        <template v-else-if="isHelp">
          <div class="form-control"><label for="help-username">아이디</label><input id="help-username" :value="store.currentUser.username" readonly /></div>
          <div class="form-control"><label for="help-email">이메일</label><input id="help-email" :value="store.currentUser.email" readonly /></div>
        </template>
        <template v-else>
          <div class="form-control"><label for="account-username">아이디</label><input id="account-username" :value="store.currentUser.username" readonly /></div>
          <div class="form-control"><label for="account-nickname">닉네임</label><input id="account-nickname" :value="store.currentUser.nickname" :readonly="section !== 'modify'" /></div>
          <div class="form-control"><label for="account-email">이메일</label><input id="account-email" type="email" :value="store.currentUser.email" :readonly="section !== 'modify'" /></div>
          <div v-if="section === 'login' || section === 'signup'" class="form-control"><label for="account-password">비밀번호</label><input id="account-password" type="password" value="demo-password" readonly /></div>
        </template>
        <p class="account-form__notice">{{ dataSourceMeta.account.notice }}</p>
        <p v-if="saved" class="account-form__success" role="status">처리했습니다. 계정 화면으로 이동할게요.</p>
        <button class="button" type="submit">{{ section === "login" || section === "signup" ? dataSourceMeta.account.actionLabel : section === "findpassword" ? "계정 화면으로" : "확인" }}</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.account-page { background: linear-gradient(120deg, var(--sand-100) 0 42%, transparent 42%); }
.account-layout { display: grid; max-width: 950px; grid-template-columns: .85fr 1.15fr; align-items: center; gap: 70px; min-height: 540px; }
.account-copy h1 { margin-bottom: 18px; color: var(--brown-900); font-size: clamp(2.4rem, 5vw, 4rem); letter-spacing: -.05em; }
.account-copy p { color: var(--ink-soft); line-height: 1.8; }
.account-character { display: grid; width: 80px; height: 80px; margin-top: 36px; place-items: center; border-radius: 48% 52% 45% 55%; background: var(--brown-900); box-shadow: 14px 14px 0 var(--sand-500); color: white; font-size: 1.7rem; font-weight: 900; }
.account-form, .profile-panel { padding: clamp(24px, 5vw, 44px); box-shadow: var(--shadow); }
.account-form { display: grid; gap: 20px; }
.account-form__notice { margin: 0; color: var(--ink-soft); font-size: .72rem; line-height: 1.6; }
.account-form__success { margin: 0; color: var(--green); font-size: .78rem; font-weight: 900; }
.profile-panel__header { display: flex; align-items: center; gap: 18px; border-bottom: 1px solid var(--border); padding-bottom: 24px; }
.profile-avatar { display: grid; width: 68px; height: 68px; place-items: center; border-radius: 50%; background: var(--sand-500); color: var(--brown-900); font-size: 1.4rem; font-weight: 900; }
.profile-panel__header div > span { color: var(--green); font-size: .7rem; font-weight: 900; }
.profile-panel__header h2 { margin: 4px 0; color: var(--brown-900); }
.profile-panel__header p { margin: 0; color: var(--ink-soft); font-size: .76rem; }
.profile-details { display: grid; gap: 0; margin: 22px 0; }
.profile-details div { display: flex; justify-content: space-between; gap: 20px; border-bottom: 1px solid var(--border); padding: 15px 0; font-size: .83rem; }
.profile-details dt { color: var(--ink-soft); }
.profile-details dd { margin: 0; font-weight: 900; }
.profile-actions { display: flex; flex-wrap: wrap; gap: 10px; }
@media (max-width: 760px) { .account-page { background: var(--sand-100); } .account-layout { grid-template-columns: 1fr; gap: 32px; } .account-character { display: none; } }
</style>
