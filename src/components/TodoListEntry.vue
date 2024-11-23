<template>
  <div class="grid grid-cols-8 space-x-4 m-4 p-4 text-white border-2 border-white" 
      @click="router.push({ 
      name: 'Todo',
      params: { id: todo._id.$oid, todo: JSON.stringify(todo) }})">
    <div class="col-span-2">{{ todo.name }}</div>
    <div class="text-center">{{ todo.status }}</div>
    <div class="text-center">{{ todo.urgency }}</div>
    <div class="text-center">{{ todo.impact }}</div>
    <div class="text-center">{{ todo.effort }}</div>
    <div class="col-span-2">{{ todo.notes }}</div>
  </div>
</template>

<script setup>
import router from '../router';

defineProps(['todo']);
</script>