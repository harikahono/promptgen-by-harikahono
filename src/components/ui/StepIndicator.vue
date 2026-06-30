<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentStep: number;
  totalSteps?: number;
  stepVariants?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  totalSteps: 5,
  stepVariants: () => [
    'bg-primary-container',
    'bg-secondary-container',
    'bg-tertiary-container',
    'bg-surface',
    'bg-primary-container'
  ]
});

const steps = computed(() => {
  return Array.from({ length: props.totalSteps }, (_, i) => i + 1);
});

const getStepState = (step: number): 'completed' | 'active' | 'inactive' => {
  if (step < props.currentStep) return 'completed';
  if (step === props.currentStep) return 'active';
  return 'inactive';
};

const getStepClasses = (step: number) => {
  const state = getStepState(step);
  const classes = [
    'flex',
    'items-center',
    'justify-center',
    'w-12',
    'h-12',
    'neo-border',
    'font-bold',
    'text-label-lg',
    'transition-all',
    'text-sm'
  ];

  if (state === 'completed') {
    const variantClass = props.stepVariants[step - 1] || 'bg-primary-container';
    classes.push(variantClass, 'text-on-surface');
  } else if (state === 'active') {
    classes.push('bg-on-surface', 'text-surface', 'neo-shadow');
  } else {
    classes.push('bg-surface-variant', 'text-on-surface-variant', 'opacity-50');
  }

  return classes.join(' ');
};
</script>

<template>
  <nav class="bg-surface neo-border neo-shadow-lg p-6" aria-label="Wizard progress">
    <div class="flex items-center justify-center gap-2">
      <template v-for="(step, index) in steps" :key="step">
        <!-- Step Square -->
        <div
          :class="getStepClasses(step)"
          :aria-current="step === currentStep ? 'step' : undefined"
        >
          <span v-if="getStepState(step) === 'completed'" class="material-symbols-outlined text-xl">
            check
          </span>
          <span v-else class="font-black text-lg">{{ step }}</span>
        </div>

        <!-- Connector (dashed line) -->
        <div
          v-if="index < steps.length - 1"
          class="w-8 border-t-2 border-dashed border-on-surface transition-all duration-300"
          :class="step <= currentStep ? 'opacity-100' : 'opacity-20'"
        />
      </template>
    </div>

    <!-- Step Label -->
    <p class="text-center text-label-md text-on-surface-variant mt-4 uppercase tracking-widest">
      Step {{ currentStep }} of {{ totalSteps }}
    </p>
  </nav>
</template>