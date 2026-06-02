<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  badge?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
  noPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  badge: '',
  variant: 'default',
  noPadding: false
});

const cardClasses = computed(() => {
  const classes = [
    'neo-border',
    'neo-shadow-lg',
    'relative'
  ];

  if (!props.noPadding) {
    classes.push('p-8');
  }

  // Variant backgrounds
  const variantClasses = {
    default: 'bg-surface',
    primary: 'bg-primary-container',
    secondary: 'bg-secondary-fixed',
    tertiary: 'bg-tertiary-container'
  };
  classes.push(variantClasses[props.variant]);

  return classes.join(' ');
});
</script>

<template>
  <section :class="cardClasses">
    <!-- Badge (numbered label di pojok) -->
    <div
      v-if="badge"
      class="absolute -top-4 -left-4 bg-on-surface text-surface px-4 py-2 text-label-lg uppercase neo-border"
    >
      {{ badge }}
    </div>

    <!-- Title -->
    <h2
      v-if="title"
      class="text-headline-sm uppercase mb-6 border-b-4 border-on-surface pb-4"
    >
      {{ title }}
    </h2>

    <!-- Content Slot -->
    <slot />
  </section>
</template>