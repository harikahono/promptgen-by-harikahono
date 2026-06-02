<script setup lang="ts">
import { ref } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import type { SelectOption } from '@/components/ui/BaseSelect.vue';

const store = usePortfolioStore();
const selectedDemo = ref('');
const isLoading = ref(false);

const demoOptions: SelectOption[] = [
  { value: 'uiux', label: 'Sarah Wijaya - UI/UX Designer' },
  { value: 'web', label: 'Ahmad Rizky - Web Developer' },
  { value: 'writer', label: 'Dina Pratiwi - Content Writer' },
  { value: 'sales', label: 'Budi Santoso - Sales Professional' },
  { value: 'marketer', label: 'Rina Marlina - Digital Marketer' }
];

const loadDemo = async () => {
  if (!selectedDemo.value) {
    alert('Pilih profesi demo terlebih dahulu');
    return;
  }

  if (!confirm(`Load demo data untuk ${demoOptions.find(d => d.value === selectedDemo.value)?.label}?\n\nIni akan menimpa data yang ada sekarang.`)) {
    return;
  }

  isLoading.value = true;
  
  try {
    await store.loadDemoData(selectedDemo.value);
    alert('Demo data berhasil dimuat!');
  } catch (error) {
    console.error('Load demo error:', error);
    alert('Gagal memuat demo data');
  } finally {
    isLoading.value = false;
  }
};

const clearData = () => {
  if (!confirm('Hapus semua data?\n\nIni akan mereset semua form ke kondisi awal.')) {
    return;
  }
  
  // Reset store to initial state
  store.$reset();
  selectedDemo.value = '';
  alert('Data berhasil dihapus');
};
</script>

<template>
  <div class="bg-tertiary-container neo-border neo-shadow-lg p-6">
    <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
      <!-- Info -->
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="material-symbols-outlined text-2xl">science</span>
          <h3 class="text-headline-sm uppercase">Demo Data</h3>
        </div>
        <p class="text-body-sm">
          Load data contoh untuk melihat cara kerja generator
        </p>
      </div>

      <!-- Controls -->
      <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div class="md:min-w-64">
          <BaseSelect
            v-model="selectedDemo"
            :options="demoOptions"
            placeholder="Pilih profesi demo..."
          />
        </div>

        <BaseButton
          @click="loadDemo"
          :disabled="!selectedDemo || isLoading"
          variant="primary"
        >
          <span class="material-symbols-outlined">download</span>
          {{ isLoading ? 'Loading...' : 'Load Demo' }}
        </BaseButton>

        <BaseButton
          @click="clearData"
          variant="danger"
        >
          <span class="material-symbols-outlined">delete_sweep</span>
          Clear All
        </BaseButton>
      </div>
    </div>
  </div>
</template>