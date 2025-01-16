<template>
  <div class="col-span-2">
    <input
      :id="uniqueId"
      v-model="data"
      readonly
      @focusin="inputFocused"
      @focusout="inputUnfocused"
      @keydown="keyPressed"
    >
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/Types';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  columnData: Column,
  startingValue: string,
  uniqueId: string,
}>();

const data = ref(props.startingValue);
const emit = defineEmits(['update:data']);
let inputEl: HTMLInputElement;

onMounted(() => {
  inputEl = document.querySelector(`#${props.uniqueId}`)!;
});

function inputFocused() {
  inputEl.readOnly = false;
  inputEl.focus();
  inputEl.select();
};

function inputUnfocused() {
  inputEl.readOnly = true;
  emit('update:data', props.columnData.field, data.value);
}

function keyPressed(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    inputEl.blur();
  }
}
</script>