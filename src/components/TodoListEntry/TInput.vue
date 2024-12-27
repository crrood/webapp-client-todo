<template>
  <div class="col-span-2">
    <input
      v-model="data"
      :id="uniqueId"
      @focusin="inputFocused"
      @focusout="inputUnfocused"
      @keydown="keyPressed"
      readonly
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps(['columnData', 'startingValue', 'uniqueId']);
const data = ref(props.startingValue);
const emit = defineEmits(['update:data']);
var inputEl: HTMLInputElement;

onMounted(() => {
  inputEl = document.querySelector(`#${props.uniqueId}`)!;
});

function inputFocused(event: FocusEvent) {
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