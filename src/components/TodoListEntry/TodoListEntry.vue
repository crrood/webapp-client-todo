<template>
  <div class="grid grid-cols-10 space-x-4 mx-4 my-2 px-4 bg-primary-light text-white">
    <component 
      v-for="(column, index) in columns"
      class="flex justify-center my-auto grow"
      :is="column.component"
      :key="index"
      :startingValue="todo[column.field]"
      :columnData="column"
      :uniqueId="column.field + todo._id.$oid"
      @update:data="updateTodoValue"
    />
    <div class="my-auto">
      <button 
        class="btn-primary"
        @click="router.push({ 
        name: 'Todo',
        params: { id: todo._id.$oid, todo: JSON.stringify(todo) }})">
          Edit
      </button>
      </div>
    </div>
  </template>

<script setup lang="ts">
import type { AxiosInstance } from 'axios';
import { defineProps, inject } from 'vue';
import router from "../../router";

const axios = inject('axios') as AxiosInstance;
const props = defineProps(["todo", "columns"]);

/*
Render item
*/

/*
Input editing
*/
function updateTodoValue(field: string, value: string) {
  props.todo[field] = value;
  saveTodoData();
}

function saveTodoData() {
  const path = "/todo";
  axios.put(path, props.todo)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
}

</script>