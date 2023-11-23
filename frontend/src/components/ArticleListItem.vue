<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" class="d-flex justify-center align-center">
          {{ article.id }}
        </v-col>
        <v-col cols="10">
          <div>
            <div class="article-list-title">
              <RouterLink
                :to="{ name: 'articleDetail', params: { id: article!.id } }"
                class="article-list-title"
              >
                {{ article!.title }}
              </RouterLink>
            </div>
            <div class="d-flex">
              <div class="mr-2">{{ article!.user.nickname }}</div>
              <div>|</div>
              <div class="ml-2">{{ article!.created_at.substr(0, 10) }}</div>
            </div>
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
* {
  font-family: Pretendard-regular;
}
.article-list-title {
  font-family: Pretendard-Regular;
  font-weight: 900;
  font-size: large;
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
}
</style>
