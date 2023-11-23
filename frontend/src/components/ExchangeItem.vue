<template>
  <div>
    <h5>{{ data.cur_nm }}</h5>
    <p>{{ data.ttb }}</p>
    <p>{{ data.tts }}</p>
    <p>{{ data.deal_bas_r }}</p>
  </div>
  <hr />
</template>

<script setup lang="ts">
defineProps({
  data: Object,
});
</script>
