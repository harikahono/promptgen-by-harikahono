<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
  fullWidth: false
});

const buttonClasses = computed(() => {
  const classes = [
    'neo-border',
    'neo-shadow',
    'neo-button-hover',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'font-bold',
    'uppercase',
    'text-label-lg',
    'transition-all',
    'select-none'
  ];

  // Variant styles
  const variantClasses: Record<string, string> = {
    primary: 'bg-primary-container text-on-surface',
    secondary: 'bg-secondary-fixed-dim text-on-surface',
    tertiary: 'bg-tertiary-container text-on-surface',
    ghost: 'bg-surface text-on-surface',
    danger: 'bg-error text-on-error',
    outline: 'bg-transparent text-on-surface hover:bg-surface'
  };
  classes.push(variantClasses[props.variant]);

  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',      // 12px font
    md: 'px-6 py-3 text-sm',      // 14px font
    lg: 'px-8 py-4 text-base'     // 16px font
  };
  classes.push(sizeClasses[props.size]);

  // Full width
  if (props.fullWidth) {
    classes.push('w-full');
  }

  // Disabled state
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed pointer-events-none');
  }

  return classes.join(' ');
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>