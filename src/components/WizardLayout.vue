<script setup lang="ts">
import { ref, computed, type Component } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import StepIndicator from '@/components/ui/StepIndicator.vue';
import StepIdentitas from '@/components/wizard/StepIdentitas.vue';
import StepLayanan from '@/components/wizard/StepLayanan.vue';
import StepProyek from '@/components/wizard/StepProyek.vue';
import StepDesain from '@/components/wizard/StepDesain.vue';
import StepTarget from '@/components/wizard/StepTarget.vue';

const store = usePortfolioStore();
const currentStep = ref(1);
const isGenerating = ref(false);

// Modal state
const showModal = ref(false);
const modalVariant = ref<'error' | 'warning' | 'info' | 'success'>('error');
const modalMessage = ref('');

// Step components mapping
const stepComponents: Record<number, Component> = {
  1: StepIdentitas,
  2: StepLayanan,
  3: StepProyek,
  4: StepDesain,
  5: StepTarget
};

const currentComponent = computed(() => stepComponents[currentStep.value]);

// Step titles
const stepTitles: Record<number, string> = {
  1: 'Identitas',
  2: 'Layanan',
  3: 'Proyek',
  4: 'Desain',
  5: 'Target Platform'
};

const currentTitle = computed(() => stepTitles[currentStep.value]);

// Navigation logic
const canGoNext = computed(() => currentStep.value < 5);
const canGoPrev = computed(() => currentStep.value > 1);

const canGenerate = computed(() => {
  return currentStep.value === 5 && store.selectedTarget !== undefined;
});

// Validate current step before moving forward
const validateCurrentStep = (): { valid: boolean; message: string } => {
  switch (currentStep.value) {
    case 1: // Identitas
      if (!store.identitas.nama || store.identitas.nama.trim().length < 2) {
        return { valid: false, message: 'Nama harus diisi (minimal 2 karakter)' };
      }
      if (!store.identitas.profesi || store.identitas.profesi.trim().length < 2) {
        return { valid: false, message: 'Profesi harus diisi (minimal 2 karakter)' };
      }
      if (!store.identitas.tagline || store.identitas.tagline.trim().length < 10) {
        return { valid: false, message: 'Tagline harus diisi (minimal 10 karakter)' };
      }
      if (!store.identitas.deskripsi || store.identitas.deskripsi.trim().length < 20) {
        return { valid: false, message: 'Deskripsi harus diisi (minimal 20 karakter)' };
      }
      if (!store.identitas.email || !store.identitas.email.includes('@')) {
        return { valid: false, message: 'Email harus diisi dengan format yang valid' };
      }
      // Check keunggulan
      if (!store.identitas.keunggulan || store.identitas.keunggulan.length !== 3) {
        return { valid: false, message: 'Harus ada 3 keunggulan' };
      }
      for (let i = 0; i < 3; i++) {
        const k = store.identitas.keunggulan[i];
        if (!k || !k.judul || k.judul.trim().length < 3) {
          return { valid: false, message: `Keunggulan ${i + 1}: Judul harus diisi (minimal 3 karakter)` };
        }
        if (!k.deskripsi || k.deskripsi.trim().length < 10) {
          return { valid: false, message: `Keunggulan ${i + 1}: Deskripsi harus diisi (minimal 10 karakter)` };
        }
      }
      return { valid: true, message: '' };

    case 2: // Layanan
      if (store.layanan.length === 0) {
        return { valid: false, message: 'Minimal tambahkan 1 layanan' };
      }
      for (const layanan of store.layanan) {
        if (!layanan.nama || layanan.nama.trim().length < 3) {
          return { valid: false, message: 'Semua layanan harus memiliki nama (minimal 3 karakter)' };
        }
      }
      return { valid: true, message: '' };

    case 3: // Proyek
      if (store.proyek.length === 0) {
        return { valid: false, message: 'Minimal tambahkan 1 proyek' };
      }
      for (const proyek of store.proyek) {
        if (!proyek.nama || proyek.nama.trim().length < 3) {
          return { valid: false, message: 'Semua proyek harus memiliki nama (minimal 3 karakter)' };
        }
      }
      return { valid: true, message: '' };

    case 4: // Desain
      // Desain optional, always valid
      return { valid: true, message: '' };

    case 5: // Target
      if (!store.selectedTarget) {
        return { valid: false, message: 'Pilih target platform terlebih dahulu' };
      }
      return { valid: true, message: '' };

    default:
      return { valid: true, message: '' };
  }
};

const goNext = () => {
  if (!canGoNext.value) return;

  // Validate before moving
  const validation = validateCurrentStep();
  if (!validation.valid) {
    modalVariant.value = 'warning';
    modalMessage.value = validation.message;
    showModal.value = true;
    return;
  }

  currentStep.value++;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goPrev = () => {
  if (canGoPrev.value) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const generatePrompt = async () => {
  if (!canGenerate.value) {
    modalVariant.value = 'warning';
    modalMessage.value = 'Pilih target platform terlebih dahulu!';
    showModal.value = true;
    return;
  }

  isGenerating.value = true;
  
  try {
    // Validate all data
    const isValid = store.validateAll();
    
    if (!isValid) {
      modalVariant.value = 'error';
      modalMessage.value = 'Data tidak valid. Periksa kembali semua step.';
      showModal.value = true;
      currentStep.value = 1;
      return;
    }

    // Generate prompt
    store.generatePrompt();
    const result = store.generatedOutput;
    
    if (result) {
      // Emit event or navigate to output view
      emit('promptGenerated', result);
    }
  } catch (error) {
    console.error('Generate error:', error);
    modalVariant.value = 'error';
    modalMessage.value = 'Terjadi error saat generate prompt. Silakan coba lagi.';
    showModal.value = true;
  } finally {
    isGenerating.value = false;
  }
};

// Emit events
const emit = defineEmits<{
  promptGenerated: [result: any];
}>();
</script>

<template>
  <div class="space-y-8">
    <!-- Step Indicator -->
    <StepIndicator :current-step="currentStep" :total-steps="5" />

    <!-- Step Title Card -->
    <BaseCard variant="primary">
      <div class="flex items-center gap-4">
        <div class="bg-on-surface text-surface w-16 h-16 flex items-center justify-center neo-border text-headline-md font-bold">
          {{ currentStep }}
        </div>
        <div>
          <h2 class="text-headline-lg uppercase">{{ currentTitle }}</h2>
          <p class="text-body-md opacity-80">Step {{ currentStep }} of 5</p>
        </div>
      </div>
    </BaseCard>

    <!-- Dynamic Step Component -->
    <component :is="currentComponent" />

    <!-- Navigation -->
    <BaseCard variant="default">
      <div class="flex items-center justify-between gap-4">
        <!-- Previous Button -->
        <BaseButton
          @click="goPrev"
          :disabled="!canGoPrev"
          variant="ghost"
          size="lg"
        >
          <span class="material-symbols-outlined">arrow_back</span>
          Previous
        </BaseButton>

        <!-- Step Counter -->
        <div class="bg-on-surface text-surface px-6 py-3 neo-border text-headline-sm font-mono">
          {{ currentStep }} / 5
        </div>

        <!-- Next / Generate Button -->
        <BaseButton
          v-if="currentStep < 5"
          @click="goNext"
          :disabled="!canGoNext"
          variant="primary"
          size="lg"
        >
          Continue
          <span class="material-symbols-outlined">arrow_forward</span>
        </BaseButton>

        <BaseButton
          v-else
          @click="generatePrompt"
          :disabled="!canGenerate || isGenerating"
          variant="primary"
          size="lg"
        >
          <span class="material-symbols-outlined">auto_awesome</span>
          {{ isGenerating ? 'Generating...' : 'Generate Prompt' }}
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Progress Summary -->
    <BaseCard variant="tertiary">
      <div class="space-y-3">
        <h3 class="text-headline-sm uppercase">Progress Summary</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div
            v-for="step in 5"
            :key="step"
            class="text-center p-3 neo-border text-label-md transition-all"
            :class="{
              'bg-primary-container': step < currentStep,
              'bg-on-surface text-surface': step === currentStep,
              'bg-surface-variant opacity-50': step > currentStep
            }"
          >
            <div class="font-bold uppercase text-xs">{{ stepTitles[step] }}</div>
            <div class="text-xs mt-1">
              {{ step < currentStep ? '✓ Done' : step === currentStep ? 'Active' : 'Pending' }}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Validation Modal -->
    <BaseModal
      v-model="showModal"
      :variant="modalVariant"
      title="Validation"
    >
      <p class="text-body-md">{{ modalMessage }}</p>
    </BaseModal>
  </div>
</template>