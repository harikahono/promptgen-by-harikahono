<script setup lang="ts">
import { ref } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import WizardLayout from './components/WizardLayout.vue';
import PromptOutput from './components/PromptOutput.vue';
import DecoShape from './components/ui/DecoShape.vue';
import ThemeToggle from './components/ui/ThemeToggle.vue';
import BaseModal from './components/ui/BaseModal.vue';
import type { GeneratorOutput } from './types/portfolio';

const showOutput = ref(false);
const generatedOutput = ref<GeneratorOutput | null>(null);
const store = usePortfolioStore();
const showResetModal = ref(false);
const resetKey = ref(0);

const handlePromptGenerated = (output: GeneratorOutput) => {
  generatedOutput.value = output;
  showOutput.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const backToWizard = () => {
  showOutput.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleReset = () => {
  showResetModal.value = true;
};

const confirmReset = () => {
  store.reset();
  resetKey.value++;
  if (showOutput.value) {
    showOutput.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-background bg-dot-grid relative overflow-x-clip">
    
    <!-- Decorative shapes -->
    <div class="fixed inset-0 pointer-events-none" aria-hidden="true">
      <DecoShape type="square" color="bg-primary-container" size="w-48 h-48" rotation="rotate-12" opacity="opacity-[0.2]" position="top-[5%] right-[5%]" :border="true" hidden-class="animate-float-slow" />
      <DecoShape type="circle" color="bg-secondary-container" size="w-36 h-36" rotation="" opacity="opacity-[0.18]" position="bottom-[8%] left-[3%]" hidden-class="animate-float-slower-circle" />
      <DecoShape type="square" color="bg-tertiary-container" size="w-28 h-28" rotation="-rotate-[30deg]" opacity="opacity-[0.15]" position="top-[35%] left-[2%]" :border="true" hidden-class="hidden md:block animate-float-slow" />
      <DecoShape type="circle" color="bg-tertiary-container" size="w-20 h-20" rotation="" opacity="opacity-[0.12]" position="bottom-[30%] right-[8%]" hidden-class="animate-float-slower-circle" />
      <DecoShape type="square" color="bg-secondary-container" size="w-16 h-16" rotation="rotate-45" opacity="opacity-[0.15]" position="top-[15%] left-[8%]" :border="true" hidden-class="hidden lg:block animate-float-slower" />
      <DecoShape type="circle" color="bg-primary-container" size="w-24 h-24" rotation="" opacity="opacity-[0.1]" position="bottom-[50%] right-[15%]" hidden-class="animate-float-slow-circle" />
    </div>
    <!-- Header -->
    <header class="bg-primary-container border-b-4 border-on-surface sticky top-0 z-50 overflow-hidden">
      <div class="max-w-6xl mx-auto px-6 py-5 md:py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-display-lg uppercase text-outline leading-none">
              PromptGen
            </h1>
            <div class="flex items-center gap-3 mt-2">
              <span class="w-8 h-1 bg-on-surface inline-block" />
              <p class="text-body-sm md:text-body-md opacity-80 font-semibold">by <span class="underline decoration-2 underline-offset-2">Harikahono</span></p>
            </div>
          </div>
          
          <!-- Quick Badge + Theme -->
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <button
              @click="handleReset"
              class="flex items-center gap-2 px-4 py-2 neo-border neo-shadow neo-button-hover bg-error text-on-error text-label-md uppercase"
              aria-label="Reset semua data"
            >
              <span class="material-symbols-outlined text-xl">delete</span>
              <span class="hidden md:inline">Reset</span>
            </button>
            <div class="hidden md:flex items-center gap-2">
              <div class="bg-surface neo-border px-4 py-2 text-label-md">
                <span class="material-symbols-outlined text-base align-middle mr-1">auto_awesome</span>
                AI Portfolio Generator
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Accent stripe -->
      <div class="h-1 bg-on-surface w-full" />
    </header>

    <main class="max-w-6xl mx-auto p-6 md:p-8">
      <Transition name="reset-fade" mode="out-in">
        <!-- Wizard View -->
        <div v-if="!showOutput" key="wizard">
          <WizardLayout :key="resetKey" @prompt-generated="handlePromptGenerated" />
        </div>

        <!-- Output View -->
        <div v-else key="output">
          <!-- Back Button -->
          <div class="mb-8">
            <button
              @click="backToWizard"
              class="flex items-center gap-2 text-body-md hover:underline"
            >
              <span class="material-symbols-outlined">arrow_back</span>
              Back to Editor
            </button>
          </div>

          <PromptOutput v-if="generatedOutput" :output="generatedOutput" />
        </div>
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="border-t-4 border-on-surface mt-16 p-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Left: Project Info -->
          <div>
            <p class="text-headline-sm uppercase font-bold">
              PromptGen
            </p>
            <p class="text-body-sm text-on-surface-variant mt-1">
              AI-powered portfolio prompt generator
            </p>
          </div>

          <!-- Right: Contact Links -->
          <div class="flex items-center gap-6">
            <a
              href="https://github.com/harikahono"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-body-md hover:underline"
            >
              <span class="material-symbols-outlined">code</span>
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/kahonokun777/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-body-md hover:underline"
            >
              <span class="material-symbols-outlined">work</span>
              LinkedIn
            </a>

            <a
              href="mailto:kahonokun@gmail.com"
              class="flex items-center gap-2 text-body-md hover:underline"
            >
              <span class="material-symbols-outlined">mail</span>
              Email
            </a>
          </div>
        </div>

        <!-- Bottom: Copyright -->
        <div class="text-center mt-6 pt-6 border-t-2 border-on-surface">
          <p class="text-label-sm text-on-surface-variant">
            © 2026 Harikahono • Built with Vue 3 + Tailwind v4
          </p>
        </div>
      </div>
    </footer>

    <!-- Reset Confirmation Modal -->
    <BaseModal
      v-model="showResetModal"
      variant="warning"
      title="Reset Data"
      @confirm="confirmReset"
    >
      <p class="text-body-md">Semua data yang sudah diisi akan hilang. Yakin mau reset?</p>
    </BaseModal>
  </div>
</template>