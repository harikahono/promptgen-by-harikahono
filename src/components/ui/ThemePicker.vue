<script setup lang="ts">
import { computed } from 'vue';
import type { ThemePreset } from '@/types/portfolio';

interface Props {
  modelValue: string; // Selected theme name
  themes: ThemePreset[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const darkThemes = computed(() => 
  props.themes.filter(t => t.type === 'Gelap')
);

const lightThemes = computed(() => 
  props.themes.filter(t => t.type === 'Terang')
);

const isSelected = (themeName: string) => {
  return props.modelValue === themeName;
};

const selectTheme = (themeName: string) => {
  emit('update:modelValue', themeName);
};

const getThemeClasses = (themeName: string) => {
  const classes = [
    'neo-border',
    'cursor-pointer',
    'transition-all',
    'hover:translate-x-1',
    'hover:translate-y-1',
    'p-4'
  ];

  if (isSelected(themeName)) {
    classes.push('neo-shadow-lg', 'bg-primary-container');
  } else {
    classes.push('neo-shadow', 'bg-surface', 'hover:neo-shadow');
  }

  return classes.join(' ');
};
</script>

<template>
  <div class="space-y-6">
    <!-- Dark Themes -->
    <div>
      <h3 class="text-headline-sm uppercase mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined">dark_mode</span>
        Dark Themes
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="theme in darkThemes"
          :key="theme.name"
          :class="getThemeClasses(theme.name)"
          @click="selectTheme(theme.name)"
          type="button"
        >
          <!-- Color Preview -->
          <div class="flex gap-1 mb-3">
            <div
              v-for="(color, index) in theme.colors"
              :key="index"
              class="h-8 flex-1 neo-border"
              :style="{ backgroundColor: color }"
            />
          </div>

          <!-- Theme Name -->
          <p class="text-label-lg font-bold uppercase">
            {{ theme.name }}
          </p>

          <!-- Selected Indicator -->
          <div
            v-if="isSelected(theme.name)"
            class="mt-2 flex items-center gap-1 text-label-md"
          >
            <span class="material-symbols-outlined text-base">check_circle</span>
            SELECTED
          </div>
        </button>
      </div>
    </div>

    <!-- Light Themes -->
    <div>
      <h3 class="text-headline-sm uppercase mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined">light_mode</span>
        Light Themes
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="theme in lightThemes"
          :key="theme.name"
          :class="getThemeClasses(theme.name)"
          @click="selectTheme(theme.name)"
          type="button"
        >
          <!-- Color Preview -->
          <div class="flex gap-1 mb-3">
            <div
              v-for="(color, index) in theme.colors"
              :key="index"
              class="h-8 flex-1 neo-border"
              :style="{ backgroundColor: color }"
            />
          </div>

          <!-- Theme Name -->
          <p class="text-label-lg font-bold uppercase">
            {{ theme.name }}
          </p>

          <!-- Selected Indicator -->
          <div
            v-if="isSelected(theme.name)"
            class="mt-2 flex items-center gap-1 text-label-md"
          >
            <span class="material-symbols-outlined text-base">check_circle</span>
            SELECTED
          </div>
        </button>
      </div>
    </div>
  </div>
</template>