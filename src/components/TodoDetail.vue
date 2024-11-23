<template>
  <div class="grid justify-center mt-4 text-white">
    {{ state.data }}
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// reactive state
const state = reactive({
  editing: false,
  data: {},
});

// initialize
const axios = inject('axios');
if (route.params.todo) {
  state.data = JSON.parse(route.params.todo);
}
else {
  getTodo(route.params.id);
}

// methods
function getTodo(id) {
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
  const path = '/todo/' + state.data._id.$oid;
  axios.put(path, state.data)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    })
}

</script>