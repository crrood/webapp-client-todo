<template>
  <CheckboxRoot
    v-model:checked="checked"
    class="flex h-[25px] w-[25px] items-center justify-center rounded-[4px] bg-white"
    @update:checked="emit('update:data', props.columnData.field, checked.toString())"
  >
    <CheckboxIndicator 
      class="bg-white h-full w-full rounded flex items-center justify-center">
      <!-- <Icon
        icon="radix-icons:check"
        class="h-3.5 w-3.5 text-grass11"
      /> -->
      <svg v-if="checked" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506" style="enable-background:new 0 0 507.506 507.506;" xml:space="preserve" width="512" height="512">
        <g>
          <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
        </g>
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
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