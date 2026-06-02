<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { IdentitasSchema } from '@/types/portfolio';

const store = usePortfolioStore();

// Local state (binding to store)
const identitas = computed(() => store.identitas);

// Validation errors
const errors = ref<Record<string, string>>({});

// Validate single field
const validateField = (field: string, value: any) => {
  try {
    // Validate single field
    const fieldSchema = IdentitasSchema.shape[field as keyof typeof IdentitasSchema.shape];
    if (fieldSchema) {
      fieldSchema.parse(value);
      errors.value[field] = '';
    }
  } catch (error: any) {
    errors.value[field] = error.errors[0]?.message || 'Input tidak valid';
  }
};

// Update handlers
const updateField = (field: keyof typeof identitas.value, value: string) => {
  (identitas.value[field] as any) = value;
  validateField(field, value);
};

const updateKeunggulan = (index: number, field: 'judul' | 'deskripsi', value: string) => {
  if (!identitas.value.keunggulan) {
    identitas.value.keunggulan = [
      { judul: '', deskripsi: '' },
      { judul: '', deskripsi: '' },
      { judul: '', deskripsi: '' }
    ];
  }
  if (!identitas.value.keunggulan[index]) {
    identitas.value.keunggulan[index] = { judul: '', deskripsi: '' };
  }
  identitas.value.keunggulan[index][field] = value;
  validateField('keunggulan', identitas.value.keunggulan);
};
</script>

<template>
  <div class="space-y-8">
    <!-- Basic Info -->
    <BaseCard title="Informasi Dasar" badge="A" variant="primary">
      <div class="space-y-4">
        <BaseInput
          :model-value="identitas.nama || ''"
          @update:model-value="(v) => updateField('nama', v)"
          label="Nama Lengkap"
          placeholder="Contoh: Sarah Wijaya"
          required
          :error="errors.nama"
        />

        <BaseInput
          :model-value="identitas.profesi || ''"
          @update:model-value="(v) => updateField('profesi', v)"
          label="Profesi"
          placeholder="Contoh: UI/UX Designer"
          required
          :error="errors.profesi"
        />

        <BaseInput
          :model-value="identitas.tagline || ''"
          @update:model-value="(v) => updateField('tagline', v)"
          label="Tagline"
          placeholder="Contoh: Menciptakan pengalaman digital yang memukau"
          required
          :error="errors.tagline"
        />

        <BaseTextarea
          :model-value="identitas.deskripsi || ''"
          @update:model-value="(v) => updateField('deskripsi', v)"
          label="Deskripsi Singkat"
          placeholder="Ceritakan tentang diri Anda, pengalaman, dan passion Anda..."
          :rows="4"
          :maxlength="500"
          required
          :error="errors.deskripsi"
        />
      </div>
    </BaseCard>

    <!-- Location & Schedule -->
    <BaseCard title="Lokasi & Ketersediaan" badge="B" variant="secondary">
      <div class="space-y-4">
        <BaseInput
          :model-value="identitas.kota || ''"
          @update:model-value="(v) => updateField('kota', v)"
          label="Kota"
          placeholder="Contoh: Jakarta"
        />

        <BaseInput
          :model-value="identitas.jamKerja || ''"
          @update:model-value="(v) => updateField('jamKerja', v)"
          label="Jam Kerja"
          placeholder="Contoh: Senin-Jumat, 09:00-17:00 WIB"
        />
      </div>
    </BaseCard>

    <!-- Contact Info -->
    <BaseCard title="Kontak" badge="C" variant="tertiary">
      <div class="space-y-4">
        <BaseInput
          :model-value="identitas.email || ''"
          @update:model-value="(v) => updateField('email', v)"
          type="email"
          label="Email"
          placeholder="email@example.com"
          required
          :error="errors.email"
        />

        <BaseInput
          :model-value="identitas.whatsapp || ''"
          @update:model-value="(v) => updateField('whatsapp', v)"
          type="tel"
          label="WhatsApp"
          placeholder="+62812xxxxxxxx"
        />
      </div>
    </BaseCard>

    <!-- Social Links -->
    <BaseCard title="Social Media & Portfolio" badge="D" variant="default">
      <div class="space-y-4">
        <BaseInput
          :model-value="identitas.instagram || ''"
          @update:model-value="(v) => updateField('instagram', v)"
          label="Instagram"
          placeholder="@username atau URL lengkap"
        />

        <BaseInput
          :model-value="identitas.linkedin || ''"
          @update:model-value="(v) => updateField('linkedin', v)"
          label="LinkedIn"
          placeholder="URL profil LinkedIn"
        />

        <BaseInput
          :model-value="identitas.github || ''"
          @update:model-value="(v) => updateField('github', v)"
          label="GitHub"
          placeholder="URL profil GitHub"
        />

        <BaseInput
          :model-value="identitas.cvUrl || ''"
          @update:model-value="(v) => updateField('cvUrl', v)"
          type="url"
          label="Link CV/Portfolio"
          placeholder="https://..."
          :error="errors.cvUrl"
        />
      </div>
    </BaseCard>

    <!-- Keunggulan (3 items) -->
    <BaseCard title="3 Keunggulan Utama" badge="E" variant="primary">
      <div class="space-y-6">
        <p class="text-body-sm text-on-surface-variant">
          Jelaskan 3 keunggulan atau keahlian utama yang membedakan Anda dari kompetitor.
        </p>

        <div
          v-for="(keunggulan, index) in (identitas.keunggulan || [])"
          :key="index"
          class="bg-surface neo-border p-6 space-y-4"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="bg-on-surface text-surface w-8 h-8 flex items-center justify-center neo-border text-label-lg font-bold">
              {{ index + 1 }}
            </div>
            <h3 class="text-headline-sm uppercase">Keunggulan {{ index + 1 }}</h3>
          </div>

          <BaseInput
            :model-value="keunggulan?.judul || ''"
            @update:model-value="(v) => updateKeunggulan(index, 'judul', v)"
            label="Judul"
            placeholder="Contoh: Design Thinking Expert"
            required
            :error="errors[`keunggulan.${index}.judul`]"
          />

          <BaseTextarea
            :model-value="keunggulan?.deskripsi || ''"
            @update:model-value="(v) => updateKeunggulan(index, 'deskripsi', v)"
            label="Deskripsi"
            placeholder="Jelaskan keunggulan ini secara detail..."
            :rows="3"
            :maxlength="200"
            required
            :error="errors[`keunggulan.${index}.deskripsi`]"
          />
        </div>

        <p
          v-if="errors.keunggulan"
          class="text-label-md text-error flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-base">error</span>
          {{ errors.keunggulan }}
        </p>
      </div>
    </BaseCard>
  </div>
</template>