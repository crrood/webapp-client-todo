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
    <div class="flex justify-end gap-2">
      <!-- Snooze -->
      <TDatePicker
        v-model="props.todo.snooze"
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
import TDatePicker from '@components/TodoListEntry/TDatePicker.vue';
import { Icon } from "@iconify/vue";
import type { DateValue } from '@internationalized/date';
import { reactive } from 'vue';

const props = defineProps(["todo", "columns"]);
const state = reactive({
  pickingDate: false,
});
const emit = defineEmits(['refresh']);

function snoozeDatePicked(date: DateValue) {
  state.pickingDate = false;

  props.todo.snooze = date;
  // saveTodoData();
}

function updateTodoValue(field: string, value: string) {
  props.todo[field] = value;
  saveTodoData();
}

function saveTodoData() {
  API.updateTodo(props.todo)
    .then(() => {
      emit('refresh');
    })
    .catch(error => {
      console.error(error);
    });
}

function deleteTodo() {
  API.deleteTodo(props.todo)
    .then(() => {
      emit('refresh');
    })
    .catch(error => {
      console.error(error);
    });
}


</script>