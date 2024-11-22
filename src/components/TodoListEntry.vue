<template>
  <div class="flex place-items-center space-x-6 m-4 p-4" 
      @click="router.push({ 
      name: 'Todo',
      params: { id: todo._id.$oid, todo: JSON.stringify(todo) }})">
      <div class="text-white">
        <div class="text-bold">TodoListEntry:</div>
        {{ todo }}
      </div>
  </div>
</template>

<script setup>
import router from '../router';

defineProps(['todo']);
</script>