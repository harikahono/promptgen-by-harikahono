<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  duration: 400,
  prefix: '',
  suffix: ''
});

const displayValue = ref(0);
let animationId: number | null = null;

const animate = (from: number, to: number) => {
  if (animationId) cancelAnimationFrame(animationId);
  if (from === to) { displayValue.value = to; return; }

  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / props.duration, 1);
    // ease-out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    displayValue.value = Math.round(from + (to - from) * eased);

    if (progress < 1) {
      animationId = requestAnimationFrame(tick);
    }
  };

  animationId = requestAnimationFrame(tick);
};

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
});

onMounted(() => animate(0, props.value));

watch(() => props.value, (newVal, oldVal) => {
  animate(oldVal || 0, newVal);
});
</script>

<template>
  <span>{{ prefix }}{{ displayValue }}{{ suffix }}</span>
</template>
