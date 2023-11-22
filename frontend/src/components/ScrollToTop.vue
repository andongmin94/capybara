<template>
  <div>
    <v-chip
      v-show="scrollPosition > 100"
      size="x-large"
      elevation="3"
      class="scroll-btn"
      @click="scrollToTop"
    >
      <div>↑</div>
    </v-chip>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrollPosition = ref(0);

// Update scroll position when scrolling
const updateScrollPosition = () => {
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Attach and detach scroll event listeners
onMounted(() => {
  window.addEventListener("scroll", updateScrollPosition);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollPosition);
});
</script>
<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.scroll-btn {
  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
