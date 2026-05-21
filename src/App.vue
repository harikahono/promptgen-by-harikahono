<script setup lang="ts">
import { ref } from 'vue';
import WizardLayout from './components/WizardLayout.vue';
import PromptOutput from './components/PromptOutput.vue';
import type { GeneratorOutput } from './types/portfolio';

const showOutput = ref(false);
const generatedOutput = ref<GeneratorOutput | null>(null);

const handlePromptGenerated = (output: GeneratorOutput) => {
  generatedOutput.value = output;
  showOutput.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const backToWizard = () => {
  showOutput.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-primary-container border-b-4 border-on-surface sticky top-0 z-50">
      <div class="max-w-6xl mx-auto p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-headline-lg uppercase">
              PromptGen
            </h1>
            <p class="text-body-sm opacity-80">by Harikahono</p>
          </div>
          
          <!-- Quick Badge -->
          <div class="hidden md:flex items-center gap-2">
            <div class="bg-surface neo-border px-4 py-2 text-label-md">
              <span class="material-symbols-outlined text-base align-middle mr-1">auto_awesome</span>
              AI Portfolio Generator
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto p-6 md:p-8">
      <!-- Wizard View -->
      <div v-if="!showOutput">
        <WizardLayout @prompt-generated="handlePromptGenerated" />
      </div>

      <!-- Output View -->
      <div v-else>
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
  </div>
</template>