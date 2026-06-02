<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  maxlength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  error: '',
  label: '',
  required: false,
  rows: 4,
  maxlength: undefined
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const textareaClasses = computed(() => {
  const classes = [
    'neo-input',
    'w-full',
    'text-body-md',
    'resize-none',
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
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const charCount = computed(() => {
  if (!props.maxlength) return null;
  return `${props.modelValue.length} / ${props.maxlength}`;
});
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <div v-if="label || charCount" class="flex items-center justify-between">
      <label class="block text-label-lg uppercase">
        {{ label }}
        <span v-if="required" class="text-error ml-1">*</span>
      </label>
      <span v-if="charCount" class="text-label-md text-on-surface-variant">
        {{ charCount }}
      </span>
    </div>

    <!-- Textarea -->
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :class="textareaClasses"
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