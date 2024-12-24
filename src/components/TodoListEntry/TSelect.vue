<template>
  <div class="flex justify-center">
    <SelectRoot v-model="selected">
      <SelectTrigger
        class="bg-primary text-white p-2 m-2 grow rounded-sm"
        :class="'bg-' + selectedColor + '-sl'"
      >
        <SelectValue 
          :placeholder="startingValue" 
          class=""
      />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent>
          <SelectViewport class="p-[5px]">
            <SelectItem
              class="p-2" :class="'bg-' + option.color + '-sl'"
              v-for="option in props.columnData.options"
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
  </div>
</template>

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
import type { Column, SelectOptions } from '../../Interfaces';

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