<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

const setTheme = (dark: boolean) => {
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('promptgen-theme', dark ? 'dark' : 'light');
};

const toggle = () => setTheme(!isDark.value);

onMounted(() => {
  const stored = localStorage.getItem('promptgen-theme');
  if (stored) {
    setTheme(stored === 'dark');
  } else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
});
</script>

<template>
  <button
    @click="toggle"
    class="flex items-center gap-2 px-4 py-2 neo-border neo-shadow neo-button-hover bg-surface text-on-surface text-label-md uppercase"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span class="material-symbols-outlined text-xl">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
    <span class="hidden md:inline">{{ isDark ? 'Light' : 'Dark' }}</span>
  </button>
</template>
