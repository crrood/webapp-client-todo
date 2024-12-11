<template>
  <div class="col-span-2">
    <input 
      v-model="data"
      :id="uniqueId"
      @click="inputClicked" 
      @focusout="inputUnfocused"
      readonly
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps(['columnData', 'startingValue', 'uniqueId']);
const data = ref(props.startingValue);
const emit = defineEmits(['update:data']);

function inputClicked(event: MouseEvent) {
  // TODO: make the clickable area for each element bigger
  const input = event.target as HTMLInputElement;
  input.readOnly = false;
  input.focus();
  input.select();
};

function inputUnfocused() {
  const inputEl: HTMLInputElement = document.querySelector(`#${props.uniqueId}`)!;
  inputEl.readOnly = true;
  emit('update:data', props.columnData.field, data.value);
}
</script>