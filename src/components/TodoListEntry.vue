<template>
  <div class="grid grid-cols-9 space-x-4 m-4 p-4 text-white border-2 border-white">
    <div class="col-span-2">
      <input v-model="todo.name" readonly
        @click="inputClicked" @focusout="inputUnfocused"/>
    </div>
    <div class="text-center">{{ todo.status }}</div>
    <div class="text-center">{{ todo.urgency }}</div>
    <div class="text-center">{{ todo.impact }}</div>
    <div class="text-center">{{ todo.effort }}</div>
    <div class="col-span-2" readonly>
      <input v-model="todo.notes" readonly
        @click="inputClicked" @focusout="inputUnfocused"/>
    </div>
    <div>
      <button class="btn-primary"
        @click="router.push({ 
        name: 'Todo',
        params: { id: todo._id.$oid, todo: JSON.stringify(todo) }})">
          Edit
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue';
import router from "../router";

const props = defineProps(["todo"]);

function inputClicked(event) {
  // TODO: make the clickable area for each element bigger
  event.target.readOnly = false;
  event.target.focus();
  event.target.select();
};

function inputUnfocused(event) {
  // TODO: save on active field losing focus
  event.target.readOnly = true;
  saveData();
}

function saveData() {
  const path = "/todo";
  axios.put(path, props.todo)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
}

const axios = inject('axios');
</script>