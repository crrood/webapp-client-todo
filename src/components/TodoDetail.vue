<template>
  <div class="grid justify-center mt-4 text-white">
    {{ state.data }}
  </div>
</template>

<script setup lang="ts">
import { type AxiosInstance } from 'axios';
import { inject, reactive } from 'vue';
import { useRoute } from 'vue-router';
import type { Todo } from './Interfaces';

const route = useRoute();

// reactive state
interface State {
  editing: boolean,
  data?: Todo,
}
const state: State = reactive({
  editing: false,
  data: undefined,
});

// initialize
const axios = inject('axios') as AxiosInstance;
if (route.params.todo && typeof(route.params.todo) === 'string') {
  state.data = JSON.parse(route.params.todo);
}
else if (route.params.id && typeof(route.params.id) === 'string') {
  getTodo(route.params.id);
}
else {
  console.error('No id or todo data provided');
}

// methods
function getTodo(id: string) {
  const path = '/todo/' + id;
  axios.get(path)
    .then(res => {
      state.data = res.data;
    })
    .catch(error => {
      console.error(error);
    })
}

function editBtnClicked() {
  if (state.editing) {
    saveData();
  }
  toggleInputs();
  state.editing = !state.editing;
}

function toggleInputs() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.disabled = !input.disabled;
  });
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.disabled = !textarea.disabled;
  });
}

function saveData() {
  const path = '/todo/' + state.data?._id?.$oid;
  axios.put(path, state.data)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    })
}

</script>