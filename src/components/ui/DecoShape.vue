<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'square' | 'circle';
  color?: string;
  size?: string;
  rotation?: string;
  opacity?: string;
  position?: string;
  border?: boolean;
  hiddenClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'square',
  color: 'bg-primary-container',
  size: 'w-80 h-80',
  rotation: 'rotate-12',
  opacity: 'opacity-[0.07]',
  position: 'top-[-120px] right-[-60px]',
  border: false,
  hiddenClass: ''
});

const shapeClasses = computed(() => `absolute ${props.size} ${props.rotation} ${props.color} ${props.opacity} ${props.position} ${props.hiddenClass} ${props.border ? 'neo-border' : ''}`);
</script>

<template>
  <div
    aria-hidden="true"
    :class="[shapeClasses]" :style="type === 'circle' ? { borderRadius: '9999px' } : undefined"
  />
</template>
