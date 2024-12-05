<script setup lang="ts">
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue';
import { computed, ref, watch } from 'vue';

const props = defineProps(['field', 'startingValue', 'options']);
const selected = ref(props.startingValue);
const emit = defineEmits(['update:selected']);

watch(() => selected.value, () => {
  emit('update:selected', props.field, selected.value);
});

const selectedColor = computed(() => {
  return props.options.find(option => option.name === selected.value).color;
})
</script>

<template>
  <SelectRoot v-model="selected">
    <SelectTrigger
      class="bg-primary text-white p-2 m-2 rounded-sm fill-current"
      :class="'bg-' + selectedColor + '-sl'"
    >
      <SelectValue :placeholder="startingValue" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent>
        <SelectViewport class="p-[5px]">
            <SelectItem
              class="p-2" :class="'bg-' + option.color + '-sl'"
              v-for="option in options"
              :key="option.name"
              :value="option.name"
            >
              <SelectItemText
                class="text-white select-none"
              >
                {{ option.name }}
              </SelectItemText>
            </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>