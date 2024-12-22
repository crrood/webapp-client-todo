<template>
  <CheckboxRoot
    v-model:checked="checked"
    class="flex h-[25px] w-[25px] items-center justify-center rounded-[4px] bg-white"
    @update:checked="emit('update:data', props.columnData.field, checked.toString())"
  >
    <CheckboxIndicator 
      class="bg-white h-full w-full rounded flex items-center justify-center"
    >
      <Icon 
        icon="iconamoon:check-circle-1-bold"
        class="size-full text-black"
        height="unset"
      />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import { ref } from 'vue';
import type { Column } from '../Interfaces';

const props = defineProps<{
  startingValue: string,
  columnData: Column
}>();
const emit = defineEmits(['update:data']);

const checked = ref(props.startingValue === "true");

</script>