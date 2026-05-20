<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'number';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: '',
  label: '',
  required: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputClasses = computed(() => {
  const classes = [
    'neo-input',
    'w-full',
    'text-body-md',
    'transition-colors'
  ];

  if (props.error) {
    classes.push('border-error bg-error-container');
  }

  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed');
  }

  return classes.join(' ');
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      class="block text-label-lg uppercase"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>

    <!-- Input -->
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="handleInput"
    />

    <!-- Error Message -->
    <p
      v-if="error"
      class="text-label-md text-error flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-base">error</span>
      {{ error }}
    </p>
  </div>
</template>