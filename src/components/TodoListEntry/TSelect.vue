<template>
  <div
    class="flex justify-center"
    :class="'col-span-' + props.columnData.width"
  >
    <SelectRoot v-model="selected">
      <SelectTrigger
        class="p-2 mt-1 mb-1 grow rounded-sm"
        :class="'bg-' + selectedColor + '-sl'"
      >
        <SelectValue :placeholder="startingValue" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          class="select-none"
        >
          <SelectViewport class="p-[5px]">
            <SelectItem
              v-for="option in props.columnData.options"
              :key="option.name"
              class="p-3"
              :class="'bg-' + option.color + '-sl'"
              :value="option.name"
            >
              <SelectItemText class="select-none">
                {{ option.name }}
              </SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script setup lang="ts">
import type { Column, SelectOptions } from '@/Types';
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

const props = defineProps<{
  startingValue: string,
  columnData: Column
}>();
const emit = defineEmits(['update:data']);

const selected = ref(props.startingValue);

watch(() => selected.value, () => {
  emit('update:data', props.columnData.field, selected.value);
});

const selectedColor = computed(() => {
  return props.columnData?.options?.find(
    (option: SelectOptions) =>
      option.name === selected.value)?.color;
})
</script>