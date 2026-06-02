<script setup lang="ts">
import { computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import type { ProyekItem } from '@/types/portfolio';

const store = usePortfolioStore();

const proyek = computed(() => store.proyek);
const canAddMore = computed(() => proyek.value.length < 6);

const addProyek = () => {
  if (canAddMore.value) {
    store.addProyek();
  }
};

const removeProyek = (id: string) => {
  if (confirm('Hapus proyek ini?')) {
    store.removeProyek(id);
  }
};

const updateProyek = (id: string, field: keyof ProyekItem, value: string) => {
  store.updateProyek(id, { [field]: value });
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header Info -->
    <BaseCard variant="secondary">
      <div class="space-y-4">
        <h2 class="text-headline-md uppercase">Portfolio Proyek</h2>
        <p class="text-body-md">
          Tambahkan proyek terbaik yang pernah Anda kerjakan. <strong>Maksimal 6 proyek.</strong>
        </p>
        <div class="flex items-center gap-4">
          <div class="bg-on-surface text-surface px-4 py-2 neo-border text-headline-sm font-mono">
            {{ proyek.length }} / 6
          </div>
          <BaseButton 
            @click="addProyek" 
            :disabled="!canAddMore"
            variant="secondary"
          >
            <span class="material-symbols-outlined">add</span>
            Tambah Proyek
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Empty State -->
    <BaseCard v-if="proyek.length === 0" variant="default">
      <div class="text-center py-12">
        <span class="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
          work
        </span>
        <h3 class="text-headline-sm uppercase mb-2">Belum Ada Proyek</h3>
        <p class="text-body-md text-on-surface-variant mb-6">
          Klik tombol "Tambah Proyek" untuk menambahkan proyek pertama Anda.
        </p>
      </div>
    </BaseCard>

    <!-- Proyek List -->
    <div
      v-for="(item, index) in proyek"
      :key="item.id"
      class="bg-surface neo-border neo-shadow-lg p-6 space-y-4 relative"
    >
      <!-- Badge Number -->
      <div class="absolute -top-4 -left-4 bg-on-surface text-surface px-4 py-2 neo-border text-label-lg uppercase font-bold">
        {{ index + 1 }}
      </div>

      <!-- Delete Button -->
      <div class="flex justify-end">
        <BaseButton
          @click="removeProyek(item.id)"
          variant="danger"
          size="sm"
        >
          <span class="material-symbols-outlined">delete</span>
          Hapus
        </BaseButton>
      </div>

      <!-- Form Fields -->
      <BaseInput
        :model-value="item.nama"
        @update:model-value="(v) => updateProyek(item.id, 'nama', v)"
        label="Nama Proyek"
        placeholder="Contoh: Redesign E-commerce Mobile App"
        required
      />

      <BaseInput
        :model-value="item.kategori || ''"
        @update:model-value="(v) => updateProyek(item.id, 'kategori', v)"
        label="Kategori"
        placeholder="Contoh: Mobile App, Web Design, Branding"
      />

      <BaseTextarea
        :model-value="item.deskripsi || ''"
        @update:model-value="(v) => updateProyek(item.id, 'deskripsi', v)"
        label="Deskripsi"
        placeholder="Jelaskan tantangan, solusi, dan hasil dari proyek ini..."
        :rows="4"
        :maxlength="200"
      />
    </div>

    <!-- Add More Button (Bottom) -->
    <BaseButton
      v-if="canAddMore && proyek.length > 0"
      @click="addProyek"
      variant="ghost"
      full-width
    >
      <span class="material-symbols-outlined">add_circle</span>
      Tambah Proyek Lagi ({{ proyek.length }}/6)
    </BaseButton>
  </div>
</template>