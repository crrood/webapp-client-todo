<template>
  <div class="grid grid-cols-9 space-x-4 m-4 p-4 text-white border-2 border-white">
    <component 
      v-for="(column, index) in columns"
      :is="column.component"
      :key="index"
      :startingValue="todo[column.field]"
      :columnData="column"
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

<script setup>
import { defineProps, inject } from 'vue';
import router from "../router";

const axios = inject('axios');
const props = defineProps(["todo", "columns"]);

/*
Render item
*/
// console.log(props.columns);
// console.log(props.columns.value);
// console.log(props.columns.value[1].options)
// console.log(props.columns.value[1].options[0].value)
// props.columns.value[1].options[0].color = "yellow";

/*
Input editing
*/
function updateTodoValue(field, value) {
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