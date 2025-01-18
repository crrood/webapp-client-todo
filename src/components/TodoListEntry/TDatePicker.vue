<template>
  <div
    class="flex flex-col gap-2 mx-2"
    :class="'col-span-' + columnData.width"
  >
    <DatePickerRoot
      :id="props.uniqueId"
      :default-value="startingDate"
      :is-date-disabled="(date: DateValue) => date < today(getLocalTimeZone())"
      @update:model-value="date => dateUpdated(date)"
    >
      <div class="flex justify-end">
        <DatePickerTrigger class="flex justify-center p-1 w-20 rounded-full bg-secondary">
          <Icon
            icon="iconamoon:clock"
            class="w-6"
            width="unset"
          />
        </DatePickerTrigger>
      </div>

      <DatePickerContent
        :side-offset="4"
        class="rounded-xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <DatePickerArrow class="fill-white" />
        <DatePickerCalendar
          v-slot="{ weekDays, grid }"
          class="p-4"
        >
          <DatePickerHeader class="flex items-center justify-between">
            <DatePickerPrev
              class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon
                icon="radix-icons:chevron-left"
                class="w-6 h-6"
              />
            </DatePickerPrev>

            <DatePickerHeading class="text-black font-medium" />
            <DatePickerNext
              class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon
                icon="radix-icons:chevron-right"
                class="w-6 h-6"
              />
            </DatePickerNext>
          </DatePickerHeader>
          <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse select-none space-y-1"
            >
              <DatePickerGridHead>
                <DatePickerGridRow class="mb-1 flex w-full justify-between">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-8 rounded-md text-xs text-green-600"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="flex w-full"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-transparent text-sm font-normal text-black w-8 h-8 outline-none hover:border-secondary data-[selected]:bg-secondary data-[selected]:font-medium data-[disabled]:text-gray-400 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-gray-400 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[selected]:before:bg-white"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger
} from 'radix-vue';

import type { Column } from '@/Types';
import { getLocalTimeZone, parseDate, today, type DateValue } from '@internationalized/date';

const props = defineProps<{
  columnData: Column,
  startingValue: string,
  uniqueId: string,
}>();

const emit = defineEmits(['update:data']);
const startingDate: DateValue = props.startingValue === "" ? today(getLocalTimeZone()) : parseDate(props.startingValue);

function dateUpdated(date: DateValue | undefined) {
  if (date === undefined) {
    return;
  }
  emit('update:data', 'snoozeUntil', date.toString());
}
</script>