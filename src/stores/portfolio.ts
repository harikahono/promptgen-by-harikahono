import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { nanoid } from 'nanoid';
import { getDemoData } from '../data/demoProfessions';
import { getGenerator } from '../adapters';
import type {
  PortfolioData,
  IdentitasData,
  LayananItem,
  ProyekItem,
  DesainData,
  TargetTool,
  GeneratorOutput,
  StoredPortfolioData
} from '../types/portfolio';
import {
  IdentitasSchema,
  LayananSchema,
  ProyekSchema,
  DesainSchema,
  PortfolioDataSchema
} from '../types/portfolio';

const STORAGE_KEY = 'jarvis-portfolio-v1';
const CURRENT_VERSION = 1;

export const usePortfolioStore = defineStore('portfolio', () => {
  // ===== STATE (semua pakai ref untuk consistency) =====
  const currentStep = ref(1);
  const maxStep = 5;

  // Step 1: Identitas
  const identitas = ref<Partial<IdentitasData>>({
    nama: '',
    profesi: '',
    tagline: '',
    deskripsi: '',
    kota: '',
    jamKerja: '',
    email: '',
    whatsapp: '',
    instagram: '',
    linkedin: '',
    github: '',
    cvUrl: '',
    keunggulan: [
      { judul: '', deskripsi: '' },
      { judul: '', deskripsi: '' },
      { judul: '', deskripsi: '' }
    ]
  });

  // Step 2: Layanan (max 4)
  const layanan = ref<LayananItem[]>([]);

  // Step 3: Proyek (max 6)
  const proyek = ref<ProyekItem[]>([]);

  // Step 4: Desain
  const desain = ref<Partial<DesainData>>({
    theme: 'custom',
    customColors: undefined,
    fontPair: '',
    heroLayout: '',
    suasana: '',
    borderStyle: '',
    efekVisual: ''
  });

  // Step 5: Target Tool
  const selectedTarget = ref<TargetTool | null>(null);

  // Generated output
  const generatedOutput = ref<GeneratorOutput | null>(null);

  // Validation errors
  const validationErrors = ref<Record<string, string[]>>({});

  // ===== COMPUTED =====
  const canProceedToNext = computed(() => {
    // Logic per step — implement nanti di composable atau di sini
    return true;
  });

  const isStepValid = computed(() => (step: number) => {
    // Validate specific step
    switch (step) {
      case 1:
        return IdentitasSchema.safeParse(identitas.value).success;
      case 2:
        return layanan.value.every(l => LayananSchema.safeParse(l).success);
      case 3:
        return proyek.value.every(p => ProyekSchema.safeParse(p).success);
      case 4:
        return DesainSchema.safeParse(desain.value).success;
      case 5:
        return selectedTarget.value !== null;
      default:
        return false;
    }
  });

  // ===== ACTIONS: Navigation =====
  function nextStep() {
    if (currentStep.value < maxStep) {
      currentStep.value++;
      saveToLocalStorage();
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= maxStep) {
      currentStep.value = step;
    }
  }

  // ===== ACTIONS: Layanan Management =====
  function addLayanan() {
    if (layanan.value.length >= 4) {
      console.warn('JARVIS: Maksimal 4 layanan. Quality over quantity.');
      return;
    }
    layanan.value.push({
      id: nanoid(),
      nama: '',
      deskripsi: '',
      fitur: ''
    });
    saveToLocalStorage();
  }

  function removeLayanan(id: string) {
    layanan.value = layanan.value.filter(l => l.id !== id);
    saveToLocalStorage();
  }

  function updateLayanan(id: string, data: Partial<LayananItem>) {
    const index = layanan.value.findIndex(l => l.id === id);
    if (index !== -1) {
      layanan.value[index] = { ...layanan.value[index], ...data };
      saveToLocalStorage();
    }
  }

  // ===== ACTIONS: Proyek Management =====
  function addProyek() {
    if (proyek.value.length >= 6) {
      console.warn('JARVIS: Maksimal 6 proyek. Pilih yang terbaik aja.');
      return;
    }
    proyek.value.push({
      id: nanoid(),
      nama: '',
      kategori: '',
      deskripsi: ''
    });
    saveToLocalStorage();
  }

  function removeProyek(id: string) {
    proyek.value = proyek.value.filter(p => p.id !== id);
    saveToLocalStorage();
  }

  function updateProyek(id: string, data: Partial<ProyekItem>) {
    const index = proyek.value.findIndex(p => p.id === id);
    if (index !== -1) {
      proyek.value[index] = { ...proyek.value[index], ...data };
      saveToLocalStorage();
    }
  }

  // ===== ACTIONS: Demo Data =====
  function loadDemoData(profesiId: string) {
    const demo = getDemoData(profesiId);

    if (!demo) {
      console.warn(`JARVIS: Demo data untuk "${profesiId}" tidak ditemukan.`);
      return;
    }

    // Load semua data dari demo
    identitas.value = demo.identitas;
    layanan.value = demo.layanan;
    proyek.value = demo.proyek;
    if (demo.desain) {
      desain.value = { ...desain.value, ...demo.desain };
    }

    console.log(`JARVIS: Demo data "${profesiId}" loaded successfully.`);
    saveToLocalStorage();
  }

  // ===== ACTIONS: Validation =====
  function validateAll(): boolean {
    const fullData: Partial<PortfolioData> = {
      identitas: identitas.value as IdentitasData,
      layanan: layanan.value,
      proyek: proyek.value,
      desain: desain.value as DesainData,
      selectedTarget: selectedTarget.value || undefined
    };

    const result = PortfolioDataSchema.safeParse(fullData);

    if (!result.success) {
      console.warn('JARVIS: Validasi gagal.', result.error.issues);
      // Parse errors ke format user-friendly
      validationErrors.value = result.error.issues.reduce((acc, issue) => {
        const path = issue.path.join('.');
        if (!acc[path]) acc[path] = [];
        acc[path].push(issue.message);
        return acc;
      }, {} as Record<string, string[]>);
      return false;
    }

    validationErrors.value = {};
    return true;
  }

  // ===== ACTIONS: Generate Prompt =====
  function generatePrompt() {
    if (!validateAll()) {
      console.error('JARVIS: Data belum valid. Fix errors dulu.');
      return;
    }

    if (!selectedTarget.value) {
      console.error('JARVIS: Pilih target tool dulu.');
      return;
    }

    try {
      const generator = getGenerator(selectedTarget.value);

      const fullData: PortfolioData = {
        identitas: identitas.value as IdentitasData,
        layanan: layanan.value,
        proyek: proyek.value,
        desain: desain.value as DesainData,
        selectedTarget: selectedTarget.value
      };

      generatedOutput.value = generator.generate(fullData);
      console.log(`JARVIS: Prompt generated untuk ${selectedTarget.value}.`);
    } catch (error) {
      console.error('JARVIS: Gagal generate prompt.', error);
    }
  }

  // ===== ACTIONS: Reset =====
  function reset() {
    currentStep.value = 1;
    identitas.value = {
      nama: '',
      profesi: '',
      tagline: '',
      deskripsi: '',
      keunggulan: [
        { judul: '', deskripsi: '' },
        { judul: '', deskripsi: '' },
        { judul: '', deskripsi: '' }
      ]
    };
    layanan.value = [];
    proyek.value = [];
    desain.value = { theme: 'custom' };
    selectedTarget.value = null;
    generatedOutput.value = null;
    validationErrors.value = {};
    localStorage.removeItem(STORAGE_KEY);
  }

  // ===== PERSISTENCE: LocalStorage dengan Versioning =====
  function saveToLocalStorage() {
    try {
      const stored: StoredPortfolioData = {
        version: CURRENT_VERSION,
        data: {
          identitas: identitas.value as IdentitasData,
          layanan: layanan.value,
          proyek: proyek.value,
          desain: desain.value as DesainData,
          selectedTarget: selectedTarget.value || undefined
        },
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (error) {
      console.error('JARVIS: Gagal save ke localStorage.', error);
    }
  }

  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const stored: StoredPortfolioData = JSON.parse(raw);

      // Migration logic (jika perlu)
      if (stored.version !== CURRENT_VERSION) {
        console.warn(`JARVIS: Schema version mismatch. Stored: v${stored.version}, Current: v${CURRENT_VERSION}. Migrating...`);
        // Implement migration nanti kalau ada breaking changes
        return;
      }

      // Load data
      if (stored.data.identitas) identitas.value = stored.data.identitas;
      if (stored.data.layanan) layanan.value = stored.data.layanan;
      if (stored.data.proyek) proyek.value = stored.data.proyek;
      if (stored.data.desain) desain.value = stored.data.desain;
      if (stored.data.selectedTarget) selectedTarget.value = stored.data.selectedTarget;

      console.log('JARVIS: Data restored from localStorage.');
    } catch (error) {
      console.error('JARVIS: Gagal load dari localStorage.', error);
    }
  }

  // Auto-load on init
  loadFromLocalStorage();

  return {
    // State
    currentStep,
    maxStep,
    identitas,
    layanan,
    proyek,
    desain,
    selectedTarget,
    generatedOutput,
    validationErrors,

    // Computed
    canProceedToNext,
    isStepValid,

    // Actions
    nextStep,
    prevStep,
    goToStep,
    addLayanan,
    removeLayanan,
    updateLayanan,
    addProyek,
    removeProyek,
    updateProyek,
    loadDemoData,
    validateAll,
    generatePrompt,
    reset,
    saveToLocalStorage
  };
});