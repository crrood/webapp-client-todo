<template>
  <div class="grid grid-cols-10 space-x-4 mx-4 my-2 px-4 items-center bg-primary-light text-white">
    <component
      :is="column.component"
      v-for="(column, index) in columns"
      :key="index"
      class="flex justify-center grow"
      :starting-value="state.todo.data[column.field]"
      :column-data="column"
      :unique-id="column.field + state.todo._id?.$oid"
      @update:data="updateTodoValue"
    />
    <div class="flex justify-end gap-2">
      <!-- Snooze -->
      <TDatePicker
        v-model="state.todo.snooze"
        :update:modelValue="snoozeDatePicked"
      />
      <!-- Delete -->
      <button
        class="p-1 rounded-full items-center bg-red-600"
        @click="deleteTodo"
      >
        <Icon
          icon="iconamoon:close-bold"
          class="w-4 text-white"
          width="unset"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as API from '@/api';
import type { Column, Todo } from '@/Interfaces';
import TDatePicker from '@components/TodoListEntry/TDatePicker.vue';
import { Icon } from "@iconify/vue";
import type { DateValue } from '@internationalized/date';
import { reactive } from 'vue';

const props = defineProps<{
  todo: Todo,
  columns: Column[],
}>();

const state = reactive({
  todo: props.todo,
  pickingDate: false,
});
const emit = defineEmits(['refresh']);

function snoozeDatePicked(date: DateValue) {
  state.pickingDate = false;

  state.todo.snooze = date;
  // saveTodoData();
}

function updateTodoValue(field: keyof Todo["data"], value: string) {
  state.todo.data[field] = value;
  saveTodoData();
}

function saveTodoData() {
  API.updateTodo(state.todo)
    .then(() => {
      emit('refresh');
    })
    .catch(error => {
      console.error(error);
    });
}

function deleteTodo() {
  API.deleteTodo(state.todo)
    .then(() => {
      emit('refresh');
    })
    .catch(error => {
      console.error(error);
    });
}


</script>