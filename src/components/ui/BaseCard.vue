<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  badge?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'outline';
  noPadding?: boolean;
  shadowColor?: string;
  badgeRotation?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  badge: '',
  variant: 'default',
  noPadding: false,
  shadowColor: '',
  badgeRotation: 'rotate-1'
});

const cardClasses = computed(() => {
  const classes = [
    'neo-border',
    'neo-shadow-lg',
    'relative',
    'min-h-[80px]'
  ];

  if (!props.noPadding) {
    classes.push('p-8');
  }

  if (props.variant === 'outline') {
    classes.push(
      'bg-transparent',
      'outline',
      'outline-2',
      'outline-offset-2',
      'outline-on-surface'
    );
  } else {
    const variantClasses: Record<string, string> = {
      default: 'bg-surface',
      primary: 'bg-primary-container',
      secondary: 'bg-secondary-fixed',
      tertiary: 'bg-tertiary-container'
    };
    classes.push(variantClasses[props.variant]);
  }

  return classes.join(' ');
});

const cardStyle = computed(() => {
  if (props.shadowColor) {
    return { boxShadow: `8px 8px 0px 0px ${props.shadowColor}` };
  }
  return {};
});
</script>

<template>
  <section :class="cardClasses" :style="cardStyle">
    <!-- Badge (numbered label di pojok) dengan rotation -->
    <div
      v-if="badge"
      :class="`absolute -top-4 -left-4 bg-on-surface text-surface px-4 py-2 text-label-lg uppercase neo-border ${badgeRotation}`"
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