<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" class="align-self-center">
          {{ article.id }}
        </v-col>
        <v-col cols="10">
          <div>
            <div class="title">
              <RouterLink
                :to="{ name: 'articleDetail', params: { id: article!.id } }"
                class="title"
              >
                {{ article!.title }}
              </RouterLink>
            </div>
            <div>작성자 : {{ article!.user.username }}</div>
            <div>게시일 : {{ article!.created_at.substr(0, 10) }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps({
  article: Object,
});
</script>

<style scoped lang="scss">
.title {
  font-family: Pretendard-Regular;
  font-weight: 900;
  font-size: x-large;
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
}
</style>
