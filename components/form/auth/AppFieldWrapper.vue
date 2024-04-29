<template>
  <div class="field-wrapper mb-4">
    <label v-if="label" class="block text-sm font-bold mb-2 text-white">{{ label }}</label>
    <div class="relative">
      <slot name="icon" />
      <input
        :type="type"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        class="shadow-inner appearance-none border-2 border-blue-500 bg-blue-100 rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-white"
      />
      <div
        v-if="modelValue && !error"
        class="absolute right-3 top-2 text-gray-500 cursor-pointer"
        @click="clearInput"
      >
        ×
      </div>
    </div>
    <p v-if="helperText && !error" class="text-xs italic text-blue-400 mt-4">{{ helperText }}</p>
    <p v-if="error" class="text-xs italic mt-2 text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props are now reactive refs
const props = defineProps({
  modelValue: String,
  label: String,
  helperText: String,
  error: String,
  type: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits(['update:modelValue']);

const inputClass = computed(() => {
  let baseClass = 'shadow-inner appearance-none border-2 rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  baseClass += props.error ? ' border-red-500 bg-red-100 focus:bg-white' : ' border-blue-500 bg-blue-100 focus:bg-white';
  return baseClass;
});

const updateValue = (value) => {
  emit('update:modelValue', value);
};

const clearInput = () => {
  emit('update:modelValue', '');
};

</script>

<style scoped>

</style>
