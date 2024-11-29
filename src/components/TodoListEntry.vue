<template>
  <div @click="handleClick" class="grid grid-cols-9 space-x-4 m-4 p-4 text-white border-2 border-white">
    <div class="col-span-2" id="name">
      <input :id="todo._id.$oid + '-name'" v-model="todo.name" readonly
        @focusout="nameUnfocused"/>
    </div>
    <div class="text-center">{{ todo.status }}</div>
    <div class="text-center">{{ todo.urgency }}</div>
    <div class="text-center">{{ todo.impact }}</div>
    <div class="text-center">{{ todo.effort }}</div>
    <div class="col-span-2">{{ todo.notes }}</div>
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
import { ref } from "vue";
import router from "../router";

const props = defineProps(["todo"]);

// Create reactive object for keeping track of which field is being edited
const editingProto = {};
for (const key in props.todo) {
  editingProto[key] = false;
}
const editing = ref(editingProto);

function handleClick(event) {
  // TODO: make the clickable area for each element bigger
  const parent = event.target.parentElement;
  if (parent) {
    if (!editing.value[parent.id]) {
      resetEditing();
      editing.value[parent.id] = true;

      if (parent.id === "name") {
        const inputEl = parent.querySelector("input");
        inputEl.readOnly = false;
        inputEl.focus();
        inputEl.select();
      }
    }
  }
};

function resetEditing() {
  for (const key in editing.value) {
    editing.value[key] = false;
  }
}

function nameUnfocused(event) {
  // TODO: save on active field losing focus
  event.target.readOnly = true;
}

</script>