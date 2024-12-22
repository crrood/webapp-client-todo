<template>
  <!-- Filters and sorting -->
  <div class="flex flex-col px-4 py-2 text-white">
    <div class="flex gap-2">
      <label>
        Show Done
      </label>
      <CheckboxRoot
        v-model:checked="state.showDone"
        @update:checked="getTodoList"
        class="flex h-5 w-5 items-center justify-center rounded-md bg-white"
      >
        <CheckboxIndicator 
          class="bg-white h-full w-full rounded flex items-center justify-center">
          <!-- <Icon
            icon="radix-icons:check"
            class="h-3.5 w-3.5 text-grass11"
          /> -->
          <svg v-if="state.showDone" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506" style="enable-background:new 0 0 507.506 507.506;" xml:space="preserve" width="512" height="512">
            <g>
              <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
            </g>
          </svg>
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
  <!-- Previous / next page buttons -->
  <!-- Icons from https://www.flaticon.com/uicons/get-started -->
  <!-- Need to be attributed if I end up releasing this -->
  <div class="flex grow justify-center gap-10">
    <button @click="state.pageNumber = 0">
      <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M24,11H4.324l4.3-4.3L7.213,5.282l-4.95,4.95A2.578,2.578,0,0,0,2,10.553V5H0V19H2V13.447a2.578,2.578,0,0,0,.263.321l4.95,4.95L8.627,17.3,4.324,13H24Z"/></svg>
    </button>
    <button @click="state.pageNumber = state.pageNumber - 1">
      <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#FFFFFF" id="_01_align_center" data-name="01 align center"><path d="M24,13l0-2-21.445.031L6.877,6.707,5.463,5.293.877,9.879a3,3,0,0,0,0,4.242l4.586,4.586,1.414-1.414L2.615,13.031Z"/></g></svg>
    </button>
    <button @click="state.pageNumber = state.pageNumber + 1">
      <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#FFFFFF" id="_01_align_center" data-name="01 align center"><path d="M23.124,9.879,18.538,5.293,17.124,6.707l4.262,4.263L0,11l0,2,21.446-.03-4.323,4.323,1.414,1.414,4.587-4.586A3.007,3.007,0,0,0,23.124,9.879Z"/></g></svg>
    </button>
    <button @click="state.pageNumber = 0">
      <svg class="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M22,10.553a2.578,2.578,0,0,0-.263-.321l-4.95-4.95L15.373,6.7l4.3,4.3H0v2H19.676l-4.3,4.3,1.414,1.414,4.95-4.95A2.578,2.578,0,0,0,22,13.447V19h2V5H22Z"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AxiosInstance } from 'axios';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import { inject, reactive, watch } from 'vue';
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
  pageNumber: 0,
  showDone: false
})

watch(() => state.pageNumber, () => {
  if (state.pageNumber < 0) {
    state.pageNumber = 0;
  }
  getTodoList();
});

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