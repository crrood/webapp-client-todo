<template>
  <div class="grid grid-cols-10 space-x-4 m-4 p-4 text-white border-2 border-white">
    <component 
      v-for="(column, index) in columns"
      :is="column.component"
      :key="index"
      :startingValue="todo[column.field]"
      :columnData="column"
      :uniqueId="column.field + todo._id.$oid"
      @update:data="updateTodoValue"
    />
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