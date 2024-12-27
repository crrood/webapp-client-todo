<template>
  <div class="grid grid-cols-10 space-x-4 mx-4 my-2 px-4 items-center bg-primary-light text-white">
    <component 
      v-for="(column, index) in columns"
      class="flex justify-center grow"
      :is="column.component"
      :key="index"
      :startingValue="todo[column.field]"
      :columnData="column"
      :uniqueId="column.field + todo._id.$oid"
      @update:data="updateTodoValue"
    />
    <div>
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
import router from "../../router";
import * as API from '@/api';

const props = defineProps(["todo", "columns"]);

function updateTodoValue(field: string, value: string) {
  props.todo[field] = value;
  saveTodoData();
}

function saveTodoData() {
  API.updateTodo(props.todo)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
}

</script>