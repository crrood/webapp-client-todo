<template>
  <!-- Filters and sorting -->
  <div class="flex flex-col px-4 py-2 text-white">
    <div class="flex gap-2">
      <label class="my-auto">
        Show Done
      </label>
      <CheckboxRoot
        v-model:checked="state.showDone"
        @update:checked="getTodoList"
        class="flex h-5 w-5 my-auto items-center justify-center rounded-md bg-white"
      >
        <CheckboxIndicator 
          class="bg-white h-full w-full rounded-md flex items-center justify-center">
          <Icon
            icon="iconamoon:check-bold"
            class="text-black"
          />
        </CheckboxIndicator>
      </CheckboxRoot>
    </div>
  </div>
  <!-- Actual list of Todo items -->
  <div class="bg-primary">
    <TodoListEntry 
      v-if="!state.isFetchingColumns" 
      v-for="todo in state.todos" 
      :key="todo._id?.$oid"
      :todo="todo" 
      :columns="state.columns"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { AxiosInstance } from 'axios';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import { inject, reactive } from 'vue';
import type { Column, Todo } from './Interfaces';
import TodoListEntry from './TodoListEntry/TodoListEntry.vue';

const axios = inject('axios') as AxiosInstance;
interface State {
  isFetchingColumns: boolean
  todos: Todo[]
  columns: Column[]
  pageNumber: number
  showDone: boolean
}
const state: State = reactive({
  isFetchingColumns: true,
  todos: [],
  columns: [],
  pageNumber: 0, // Currently unused
  showDone: false
})

function getTodoList() {
  const path = "/todo";
  const config = {
    params: {
      page: state.pageNumber,
      done: state.showDone.toString()
    }
  }
  axios.get(path, config)
    .then(res => {
      state.todos = res.data;
    })
    .catch(error => {
      console.error(error);
    })
}

getTodoList();

const columnsPath = "/columns";
axios.get(columnsPath)
  .then(res => {
    state.columns = res.data;
    state.isFetchingColumns = false;
  })
  .catch(error => {
    console.error(error);
  });

</script>