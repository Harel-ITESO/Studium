<script setup lang="ts">
import { ButtonTypeError } from './exceptions';

/** Local variables */
const baseClassNames =
  'border-none rounded-xl px-2 py-3 text-lg transition-all flex items-center gap-2';

/** Props from parent */
const props = defineProps<{
  appRole: 'primary' | 'secondary' | 'warning' | 'danger';
  type?: 'submit' | 'button' | 'reset';
  class?: string;
  id?: string;
  icon?: string;
}>();

/** Click emitter and handler */
const emit = defineEmits(['click']);

function handleButtonClick(event: Event) {
  emit('click', event);
}

/** Get the type specific class names of the button */
const buttonClassNamesOfType = (() => {
  switch (props.appRole) {
    case 'primary':
      return 'bg-blue-500 text-white hover:bg-blue-400';
    case 'secondary':
      return 'bg-red-500 text-white hover:bg-red-400';
    case 'warning':
    case 'danger':
    default:
      throw new ButtonTypeError('Invalid type assignment');
  }
})();
</script>

<template>
  <button
    :id="id"
    :type="type"
    @click="handleButtonClick"
    :class="`${buttonClassNamesOfType} ${baseClassNames}`"
  >
    <span v-if="icon" :class="icon"></span>
    <slot></slot>
  </button>
</template>
