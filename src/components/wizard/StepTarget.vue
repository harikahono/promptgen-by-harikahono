<script setup lang="ts">
import { computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseCard from '@/components/ui/BaseCard.vue';
import type { TargetTool } from '@/types/portfolio';

const store = usePortfolioStore();
const selectedTarget = computed(() => store.selectedTarget);

interface TargetOption {
  id: TargetTool;
  name: string;
  icon: string;
  description: string;
  features: string[];
  bestFor: string;
}

const targets: TargetOption[] = [
  {
    id: 'claude',
    name: 'Claude.ai',
    icon: 'smart_toy',
    description: 'Generate single HTML file portfolio dengan inline CSS/JS',
    features: [
      'Framework-agnostic',
      'Single file output',
      'Verbose specifications',
      'Full customization'
    ],
    bestFor: 'Portfolio statis, landing page sederhana'
  },
  {
    id: 'lovable',
    name: 'Lovable.dev',
    icon: 'favorite',
    description: 'Generate conversational app description untuk Lovable AI',
    features: [
      'React + Vite + Tailwind',
      'Design-forward approach',
      'Natural language prompt',
      'Modern stack'
    ],
    bestFor: 'Interactive portfolio, modern web app'
  },
  {
    id: 'v0',
    name: 'v0.dev',
    icon: 'code',
    description: 'Generate component-focused specification untuk v0',
    features: [
      'Next.js + shadcn/ui',
      'Component-based',
      'TypeScript ready',
      'Production-grade'
    ],
    bestFor: 'Professional portfolio, scalable architecture'
  }
];

const selectTarget = (target: TargetTool) => {
  store.selectedTarget = target;
};

const isSelected = (target: TargetTool) => {
  return selectedTarget.value === target;
};

const getCardClasses = (target: TargetTool) => {
  const classes = [
    'cursor-pointer',
    'transition-all',
    'hover:translate-x-1',
    'hover:translate-y-1'
  ];

  if (isSelected(target)) {
    classes.push('bg-primary-container');
  }

  return classes.join(' ');
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <BaseCard variant="primary">
      <div class="space-y-4">
        <h2 class="text-headline-md uppercase">Pilih Target Platform</h2>
        <p class="text-body-md">
          Pilih platform AI yang akan digunakan untuk generate portfolio Anda.
          Setiap platform memiliki karakteristik dan output yang berbeda.
        </p>
      </div>
    </BaseCard>

    <!-- Target Options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard
        v-for="target in targets"
        :key="target.id"
        :class="getCardClasses(target.id)"
        :variant="isSelected(target.id) ? 'primary' : 'default'"
        no-padding
        @click="selectTarget(target.id)"
      >
        <div class="p-6 space-y-4">
          <!-- Icon & Name -->
          <div class="flex items-center gap-3">
            <div class="bg-on-surface text-surface w-12 h-12 flex items-center justify-center neo-border">
              <span class="material-symbols-outlined text-2xl">{{ target.icon }}</span>
            </div>
            <h3 class="text-headline-sm uppercase">{{ target.name }}</h3>
          </div>

          <!-- Description -->
          <p class="text-body-sm">{{ target.description }}</p>

          <!-- Features -->
          <div class="space-y-2">
            <p class="text-label-lg uppercase">Features:</p>
            <ul class="space-y-1">
              <li
                v-for="(feature, index) in target.features"
                :key="index"
                class="text-body-sm flex items-start gap-2"
              >
                <span class="material-symbols-outlined text-base">check</span>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Best For -->
          <div class="bg-surface neo-border p-3">
            <p class="text-label-md uppercase mb-1">Best For:</p>
            <p class="text-body-sm">{{ target.bestFor }}</p>
          </div>

          <!-- Selected Indicator -->
          <div
            v-if="isSelected(target.id)"
            class="flex items-center gap-2 text-label-lg uppercase font-bold"
          >
            <span class="material-symbols-outlined">check_circle</span>
            SELECTED
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Selection Summary -->
    <BaseCard v-if="selectedTarget" variant="tertiary">
      <div class="space-y-4">
        <h3 class="text-headline-sm uppercase">Selected Platform</h3>
        <div class="bg-on-surface text-surface neo-border p-6">
          <p class="text-headline-md font-mono">
            {{ targets.find(t => t.id === selectedTarget)?.name }}
          </p>
          <p class="text-body-md mt-2 opacity-80">
            {{ targets.find(t => t.id === selectedTarget)?.description }}
          </p>
        </div>
      </div>
    </BaseCard>

    <!-- Warning if not selected -->
    <BaseCard v-else variant="default">
      <div class="flex items-center gap-3 text-on-surface-variant">
        <span class="material-symbols-outlined text-3xl">info</span>
        <p class="text-body-md">
          Pilih salah satu platform untuk melanjutkan ke generate prompt.
        </p>
      </div>
    </BaseCard>
  </div>
</template>