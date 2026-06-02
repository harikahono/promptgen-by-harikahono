<script setup lang="ts">
import { computed } from 'vue';

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pilih opsi...',
  disabled: false,
  error: '',
  label: '',
  required: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectClasses = computed(() => {
  const classes = [
    'neo-input',
    'w-full',
    'text-body-md',
    'cursor-pointer',
    'transition-colors',
    'appearance-none',
    'pr-10' // Space for custom arrow
  ];

  if (props.error) {
    classes.push('border-error bg-error-container');
  }

  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed');
  }

  return classes.join(' ');
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
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

    <!-- Select Wrapper -->
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        @change="handleChange"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Custom Arrow Icon -->
      <span
        class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface"
      >
        expand_more
      </span>
    </div>

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