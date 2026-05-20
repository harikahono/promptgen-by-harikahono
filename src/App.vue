<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import StepIndicator from './components/ui/StepIndicator.vue';
import ThemePicker from './components/ui/ThemePicker.vue';
import { themePresets } from './data/themes';

// State
const currentStep = ref(1);
const selectedTheme = ref('Midnight Tech');

// Navigation
const nextStep = () => {
  if (currentStep.value < 5) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const resetSteps = () => {
  currentStep.value = 1;
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-primary-container border-b-4 border-on-surface p-8">
      <div class="max-w-6xl mx-auto">
        <div class="inline-block bg-on-surface text-surface px-4 py-2 text-label-lg uppercase neo-border mb-4">
          WIZARD COMPONENTS
        </div>
        <h1 class="text-headline-lg uppercase mb-2">
          STEP INDICATOR + THEME PICKER
        </h1>
        <p class="text-body-md opacity-80">Wizard Navigation Components Test</p>
      </div>
    </header>

    <main class="max-w-6xl mx-auto p-8 space-y-8">
      <!-- Step Indicator Demo -->
      <BaseCard title="Step Indicator" badge="01" variant="default">
        <div class="space-y-6">
          <!-- Current Indicator -->
          <StepIndicator :current-step="currentStep" :total-steps="5" />

          <!-- Navigation Controls -->
          <div class="bg-surface-variant neo-border p-6 space-y-4">
            <h3 class="text-body-lg font-bold uppercase">Navigation Controls</h3>
            <div class="flex gap-4 items-center">
              <BaseButton @click="prevStep" :disabled="currentStep === 1">
                <span class="material-symbols-outlined">arrow_back</span>
                Previous
              </BaseButton>

              <div class="bg-on-surface text-surface px-4 py-2 neo-border text-headline-sm font-mono">
                {{ currentStep }} / 5
              </div>

              <BaseButton @click="nextStep" :disabled="currentStep === 5">
                Next
                <span class="material-symbols-outlined">arrow_forward</span>
              </BaseButton>

              <BaseButton @click="resetSteps" variant="ghost">
                <span class="material-symbols-outlined">refresh</span>
                Reset
              </BaseButton>
            </div>

            <!-- State Display -->
            <div class="grid grid-cols-5 gap-2 mt-4">
              <div
                v-for="step in 5"
                :key="step"
                class="text-center p-3 neo-border text-label-md"
                :class="{
                  'bg-primary-container': step < currentStep,
                  'bg-on-surface text-surface': step === currentStep,
                  'bg-surface-variant opacity-50': step > currentStep
                }"
              >
                <div class="font-bold">STEP {{ step }}</div>
                <div class="text-xs mt-1">
                  {{ step < currentStep ? 'Done' : step === currentStep ? 'Active' : 'Pending' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Theme Picker Demo -->
      <BaseCard title="Theme Picker" badge="02" variant="secondary">
        <div class="space-y-6">
          <!-- Theme Picker -->
          <ThemePicker
            v-model="selectedTheme"
            :themes="themePresets"
          />

          <!-- Selected Theme Display -->
          <div class="bg-on-surface text-surface neo-border p-6">
            <h3 class="text-headline-sm uppercase mb-4">Selected Theme</h3>
            <div class="font-mono space-y-2">
              <div><strong>Name:</strong> {{ selectedTheme }}</div>
              <div><strong>Type:</strong> {{ themePresets.find(t => t.name === selectedTheme)?.type }}</div>
              <div class="flex gap-2 items-center">
                <strong>Colors:</strong>
                <div
                  v-for="(color, index) in themePresets.find(t => t.name === selectedTheme)?.colors"
                  :key="index"
                  class="w-8 h-8 neo-border"
                  :style="{ backgroundColor: color }"
                  :title="color"
                />
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Combined Demo -->
      <BaseCard title="Wizard Flow Preview" badge="LIVE" variant="tertiary">
        <div class="space-y-6">
          <StepIndicator :current-step="currentStep" :total-steps="5" />

          <!-- Mock Step Content -->
          <div class="bg-surface neo-border p-8 min-h-48 flex items-center justify-center">
            <div class="text-center">
              <h2 class="text-headline-md uppercase mb-4">
                {{ ['Identitas', 'Layanan', 'Proyek', 'Desain', 'Target'][currentStep - 1] }}
              </h2>
              <p class="text-body-md text-on-surface-variant mb-6">
                Step {{ currentStep }} content would appear here
              </p>

              <div class="flex gap-4 justify-center">
                <BaseButton 
                  v-if="currentStep > 1"
                  @click="prevStep" 
                  variant="ghost"
                >
                  <span class="material-symbols-outlined">arrow_back</span>
                  Back
                </BaseButton>

                <BaseButton 
                  v-if="currentStep < 5"
                  @click="nextStep"
                  variant="primary"
                >
                  Continue
                  <span class="material-symbols-outlined">arrow_forward</span>
                </BaseButton>

                <BaseButton
                  v-if="currentStep === 5"
                  variant="primary"
                >
                  <span class="material-symbols-outlined">check_circle</span>
                  Generate Prompt
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Selected Theme in Wizard -->
          <div class="bg-surface-variant neo-border p-4">
            <p class="text-label-md">
              <strong>Active Theme:</strong> {{ selectedTheme }}
            </p>
          </div>
        </div>
      </BaseCard>
    </main>

    <!-- Footer -->
    <footer class="border-t-4 border-on-surface p-8 mt-12">
      <div class="max-w-6xl mx-auto text-center text-body-sm text-on-surface-variant">
        <p class="uppercase font-bold">WIZARD COMPONENTS READY</p>
        <p class="mt-2">StepIndicator • ThemePicker • 10 Theme Presets</p>
      </div>
    </footer>
  </div>
</template>