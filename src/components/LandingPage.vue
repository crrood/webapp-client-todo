<template>
  <div>
    <p class="p-6 text-white">{{ state.response }}</p>
  </div>
</template>

<script setup lang="ts">
import { type AxiosInstance } from 'axios';
import { inject, onMounted, reactive } from 'vue';

// reactive state
const state = reactive({
  response: "Loading..."
});

// methods
const axios = inject('axios') as AxiosInstance;
onMounted(() => {
  const path = '/';
  axios.get(path)
    .then(res => {
      state.response = res.data;
    })
    .catch(error => {
      console.error(error);
    })
})

// lifecycle hooks

</script>