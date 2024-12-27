<template>
  <div>
    <p class="p-6 text-white">{{ state.response }}</p>
  </div>
</template>

<script setup lang="ts">
import * as API from '@/api';
import { onMounted, reactive } from 'vue';

// reactive state
const state = reactive({
  response: "Loading..."
});

// methods
const axiosInstance = API.axiosInstance;
onMounted(() => {
  axiosInstance.get('/')
    .then(res => {
      state.response = res.data;
    })
    .catch(error => {
      console.error(error);
    })
})

</script>