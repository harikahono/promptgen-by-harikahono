<script setup lang="ts">
import { computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import type { LayananItem } from '@/types/portfolio';

const store = usePortfolioStore();

const layanan = computed(() => store.layanan);
const canAddMore = computed(() => layanan.value.length < 4);

const addLayanan = () => {
  if (canAddMore.value) {
    store.addLayanan();
  }
};

const removeLayanan = (id: string) => {
  if (confirm('Hapus layanan ini?')) {
    store.removeLayanan(id);
  }
};

const updateLayanan = (id: string, field: keyof LayananItem, value: string) => {
  store.updateLayanan(id, { [field]: value });
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header Info -->
    <BaseCard variant="primary">
      <div class="space-y-4">
        <h2 class="text-headline-md uppercase">Layanan / Services</h2>
        <p class="text-body-md">
          Tambahkan layanan atau jasa yang Anda tawarkan. <strong>Maksimal 4 layanan.</strong>
        </p>
        <div class="flex items-center gap-4">
          <div class="bg-on-surface text-surface px-4 py-2 neo-border text-headline-sm font-mono">
            {{ layanan.length }} / 4
          </div>
          <BaseButton 
            @click="addLayanan" 
            :disabled="!canAddMore"
            variant="primary"
          >
            <span class="material-symbols-outlined">add</span>
            Tambah Layanan
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Empty State -->
    <BaseCard v-if="layanan.length === 0" variant="default">
      <div class="text-center py-12">
        <span class="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
          business_center
        </span>
        <h3 class="text-headline-sm uppercase mb-2">Belum Ada Layanan</h3>
        <p class="text-body-md text-on-surface-variant mb-6">
          Klik tombol "Tambah Layanan" untuk menambahkan layanan pertama Anda.
        </p>
      </div>
    </BaseCard>

    <!-- Layanan List -->
    <div
      v-for="(item, index) in layanan"
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
          @click="removeLayanan(item.id)"
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
        @update:model-value="(v) => updateLayanan(item.id, 'nama', v)"
        label="Nama Layanan"
        placeholder="Contoh: UI/UX Design Consultation"
        required
      />

      <BaseTextarea
        :model-value="item.deskripsi || ''"
        @update:model-value="(v) => updateLayanan(item.id, 'deskripsi', v)"
        label="Deskripsi"
        placeholder="Jelaskan layanan ini secara detail..."
        :rows="3"
        :maxlength="200"
      />

      <BaseTextarea
        :model-value="item.fitur || ''"
        @update:model-value="(v) => updateLayanan(item.id, 'fitur', v)"
        label="Fitur / Benefit"
        placeholder="Contoh: Wireframing, Prototyping, User Testing"
        :rows="2"
        :maxlength="200"
      />
    </div>

    <!-- Add More Button (Bottom) -->
    <BaseButton
      v-if="canAddMore && layanan.length > 0"
      @click="addLayanan"
      variant="ghost"
      full-width
    >
      <span class="material-symbols-outlined">add_circle</span>
      Tambah Layanan Lagi ({{ layanan.length }}/4)
    </BaseButton>
  </div>
</template>