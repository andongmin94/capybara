<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { dataApi, dataSourceMeta } from "@/api";

const router = useRouter();
const title = ref("");
const content = ref("");
const submitting = ref(false);
const errorMessage = ref("");

async function submit(): Promise<void> {
  if (!title.value.trim() || !content.value.trim()) return;
  submitting.value = true;
  errorMessage.value = "";
  try {
    const article = await dataApi.createArticle({ title: title.value.trim(), content: content.value.trim() });
    router.push({ name: "articleDetail", params: { id: article.id } });
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "이야기를 저장하지 못했습니다.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section class="page-section write-page">
    <div class="page-width write-layout">
      <aside>
        <span class="eyebrow">Write a note</span>
        <h1>나만의 비교 기준을<br />기록해 보세요.</h1>
        <p>{{ dataSourceMeta.communityWriteNotice }}</p>
        <RouterLink class="text-link" :to="{ name: 'article' }">← 이야기 목록</RouterLink>
      </aside>
      <form class="write-form surface-card" @submit.prevent="submit">
        <div class="form-control"><label for="article-title">제목</label><input id="article-title" v-model="title" maxlength="100" placeholder="어떤 기준을 나누고 싶나요?" required /></div>
        <div class="form-control"><label for="article-content">내용</label><textarea id="article-content" v-model="content" maxlength="2000" placeholder="상품을 비교하며 확인한 점을 적어보세요." required></textarea></div>
        <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
        <div class="write-form__actions"><RouterLink class="button-secondary" :to="{ name: 'article' }">취소</RouterLink><button class="button" type="submit" :disabled="submitting || !title.trim() || !content.trim()">{{ submitting ? "저장 중…" : "이야기 올리기" }}</button></div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.write-page { background: linear-gradient(115deg, var(--sand-100) 0 38%, transparent 38%); }
.write-layout { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 70px; }
.write-layout aside h1 { margin-bottom: 20px; color: var(--brown-900); font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.18; letter-spacing: -0.05em; }
.write-layout aside p { color: var(--ink-soft); line-height: 1.8; }
.write-form { display: grid; gap: 26px; padding: clamp(24px, 5vw, 46px); }
.write-form__actions { display: flex; justify-content: flex-end; gap: 10px; }
@media (max-width: 760px) { .write-page { background: var(--sand-100); } .write-layout { grid-template-columns: 1fr; gap: 34px; } }
</style>
