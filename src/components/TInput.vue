<template>
  <input v-model="data" readonly
    @click="inputClicked" @focusout="inputUnfocused"/>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps(['columnData', 'startingValue']);
const data = ref(props.startingValue);
const emit = defineEmits(['update:data']);

function inputClicked(event) {
  // TODO: make the clickable area for each element bigger
  event.target.readOnly = false;
  event.target.focus();
  event.target.select();
};

function inputUnfocused(event) {
  event.target.readOnly = true;
  emit('update:data', props.columnData.title, data.value);
}
</script>