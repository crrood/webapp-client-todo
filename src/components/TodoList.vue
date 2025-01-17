<template>
  <!-- Header -->
  <!-- Column titles -->
  <div class="grid grid-cols-11 space-x-4 mx-4 my-3 px-4">
    <span
      v-for="column in state.columns"
      :key="column.field"
      class="text-center font-semibold"
      :class="'col-span-' + column.width"
    >
      {{ column.field.charAt(0).toUpperCase() + column.field.slice(1) }}
    </span>
  </div>
  <!-- Todo items -->
  <div
    v-if="!state.isFetchingColumns"
    class="bg-primary"
  >
    <TodoListEntry
      v-for="todo in state.todos"
      :key="todo._id?.$oid"
      :todo="todo"
      :columns="state.columns"
      @refresh="getTodoList"
    />
  </div>
  <div class="flex gap-4 justify-center items-center pt-2">
    <!-- Create new -->
    <button
      class="flex h-8 w-8 rounded-full justify-center bg-green-700"
      @click="createNewTodo"
    >
      <Icon
        icon="iconamoon:sign-plus-bold"
        class="w-5"
        width="unset"
      />
    </button>
    <!-- Filters -->
    <div class="flex gap-2 px-4 py-2 items-center">
      <label class="">
        Show Done
      </label>
      <CheckboxRoot
        v-model:checked="state.showDone"
        class="flex h-5 w-5 items-center justify-center rounded-md bg-white"
        @update:checked="getTodoList"
      >
        <CheckboxIndicator class="bg-white h-full w-full rounded-md flex items-center justify-center">
          <Icon
            icon="iconamoon:check-bold"
            class="w-6 text-black"
            width="unset"
          />
        </CheckboxIndicator>
      </CheckboxRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column, Todo } from '@/Types';
import * as API from "@/api.ts";
import TodoListEntry from '@components/TodoListEntry/TodoListEntry.vue';
import { Icon } from "@iconify/vue";
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import { reactive } from 'vue';

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
  API.getTodoList(state.showDone, state.pageNumber)
    .then((res) => {
      state.todos = res;
    })
    .catch((error) => {
      console.error(error);
    });
}

getTodoList();

API.getColumns()
  .then(res => {
    state.columns = res as Column[];
    state.isFetchingColumns = false;
  })
  .catch(error => {
    console.error(error);
  });

function createNewTodo() {
  const newTodoData: Todo = {
    data: {
      name: "New Todo",
      done: "false",
      status: "Todo",
      urgency: "Medium",
      impact: "Medium",
      effort: "Medium",
      snoozeUntil: "",
      notes: "",
    }
  }

  API.createTodo(newTodoData)
    .then(() => {
      getTodoList();
    })
    .catch(error => {
      console.error(error);
    });
}

</script>