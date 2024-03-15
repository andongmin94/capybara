<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { dataApi, dataSourceMeta } from "@/api";
import type { ArticleDetail } from "@/api";

const route = useRoute();
const detail = ref<ArticleDetail | null>(null);
const commentContent = ref("");
const loading = ref(true);
const submitting = ref(false);
const errorMessage = ref("");
const currentUser = dataApi.getCurrentUser();

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(value),
  );

async function loadArticle(id: number): Promise<void> {
  loading.value = true;
  errorMessage.value = "";
  try {
    detail.value = await dataApi.getArticle(id);
    if (!detail.value) errorMessage.value = "요청한 이야기를 찾을 수 없습니다.";
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "이야기를 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
}

async function addComment(): Promise<void> {
  const content = commentContent.value.trim();
  if (!content || !detail.value) return;
  submitting.value = true;
  try {
    const comment = await dataApi.createComment(detail.value.article.id, content);
    detail.value.comments.push(comment);
    commentContent.value = "";
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "댓글을 저장하지 못했습니다.";
  } finally {
    submitting.value = false;
  }
}

async function removeComment(commentId: number): Promise<void> {
  if (!detail.value) return;
  await dataApi.deleteComment(detail.value.article.id, commentId);
  detail.value.comments = detail.value.comments.filter((comment) => comment.id !== commentId);
}

watch(
  () => Number(route.params.id),
  (id) => loadArticle(id),
  { immediate: true },
);
</script>

<template>
  <section class="page-section">
    <div class="page-width article-detail-page">
      <RouterLink class="back-link" :to="{ name: 'article' }">← 이야기 목록</RouterLink>
      <div v-if="loading" class="surface-card article-loading"><div class="card-skeleton"></div></div>
      <div v-else-if="!detail" class="empty-state">
        <div><div class="empty-state__icon">!</div><h1>이야기를 찾을 수 없어요</h1><p>{{ errorMessage }}</p><RouterLink class="button" :to="{ name: 'article' }">목록으로</RouterLink></div>
      </div>
      <template v-else>
        <article class="article-content">
          <header>
            <div class="author-line"><span class="avatar">{{ detail.article.user.nickname.slice(0, 1) }}</span><div><strong>{{ detail.article.user.nickname }}</strong><time :datetime="detail.article.created_at">{{ formatDate(detail.article.created_at) }}</time></div></div>
            <h1>{{ detail.article.title }}</h1>
          </header>
          <p>{{ detail.article.content }}</p>
        </article>

        <section class="comments-section">
          <div class="comments-title"><h2>댓글 {{ detail.comments.length }}</h2><span>{{ dataSourceMeta.communityCommentLabel }}</span></div>
          <form class="comment-form surface-card" @submit.prevent="addComment">
            <span class="avatar">{{ currentUser.nickname.slice(0, 1) }}</span>
            <label class="sr-only" for="comment-content">댓글 내용</label>
            <textarea id="comment-content" v-model="commentContent" placeholder="비교 기준이나 경험을 남겨보세요." maxlength="300"></textarea>
            <button class="button" type="submit" :disabled="submitting || !commentContent.trim()">등록</button>
          </form>
          <p v-if="errorMessage" class="status-message">{{ errorMessage }}</p>
          <div class="comment-list">
            <article v-for="comment in detail.comments" :key="comment.id" class="comment-row">
              <span class="avatar avatar--small">{{ comment.user.nickname.slice(0, 1) }}</span>
              <div><div class="comment-row__meta"><strong>{{ comment.user.nickname }}</strong><time :datetime="comment.created_at">{{ formatDate(comment.created_at) }}</time></div><p>{{ comment.content }}</p></div>
              <button v-if="comment.user.id === currentUser.id" type="button" @click="removeComment(comment.id)">삭제</button>
            </article>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<style scoped>
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
.article-detail-page { max-width: 850px; }
.back-link { display: inline-block; margin-bottom: 34px; color: var(--ink-soft); font-weight: 800; }
.article-loading { min-height: 360px; padding: 30px; }
.article-content { border-bottom: 1px solid var(--border); padding-bottom: 58px; }
.article-content header { margin-bottom: 40px; }
.article-content h1 { margin: 34px 0 0; color: var(--brown-900); font-size: clamp(2rem, 5vw, 3.7rem); line-height: 1.2; letter-spacing: -0.045em; }
.article-content > p { white-space: pre-wrap; color: #4f4035; font-size: 1.06rem; line-height: 2; }
.author-line { display: flex; align-items: center; gap: 12px; }
.author-line div { display: grid; gap: 4px; }
.author-line strong { font-size: 0.86rem; }
.author-line time, .comment-row time { color: var(--ink-soft); font-size: 0.7rem; }
.avatar { display: grid; width: 42px; height: 42px; flex: 0 0 auto; place-items: center; border-radius: 50%; background: var(--sand-500); color: var(--brown-900); font-weight: 900; }
.avatar--small { width: 34px; height: 34px; font-size: 0.78rem; }
.comments-section { padding-top: 48px; }
.comments-title { display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px; }
.comments-title h2 { margin: 0; color: var(--brown-900); font-size: 1.35rem; }
.comments-title span { color: var(--ink-soft); font-size: 0.74rem; }
.comment-form { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 14px; padding: 16px; }
.comment-form textarea { min-height: 54px; resize: vertical; border: 0; outline: 0; background: transparent; padding: 10px; line-height: 1.6; }
.comment-list { display: grid; margin-top: 24px; }
.comment-row { display: grid; grid-template-columns: auto 1fr auto; gap: 13px; border-bottom: 1px solid var(--border); padding: 20px 4px; }
.comment-row__meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.comment-row p { margin: 0; color: var(--ink-soft); line-height: 1.7; }
.comment-row > button { align-self: start; border: 0; background: transparent; color: #98483d; font-size: 0.74rem; }
@media (max-width: 560px) {
  .comment-form { grid-template-columns: auto 1fr; }
  .comment-form .button { grid-column: 1 / -1; }
}
</style>
