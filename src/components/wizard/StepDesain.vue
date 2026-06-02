<script setup lang="ts">
import { computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import ThemePicker from '@/components/ui/ThemePicker.vue';
import { 
  themePresets, 
  fontPairs, 
  heroLayouts, 
  suasanaOptions, 
  borderStyles, 
  efekVisualOptions 
} from '@/data/themes';
import type { SelectOption } from '@/components/ui/BaseSelect.vue';

const store = usePortfolioStore();
const desain = computed(() => store.desain);

// Convert arrays to SelectOption format
const fontPairOptions: SelectOption[] = fontPairs.map(f => ({ value: f, label: f }));
const suasanaOptionsList: SelectOption[] = suasanaOptions.map(s => ({ value: s, label: s }));
const borderStyleOptions: SelectOption[] = borderStyles.map(b => ({ value: b, label: b }));
const efekVisualOptionsList: SelectOption[] = efekVisualOptions.map(e => ({ value: e, label: e }));

const updateTheme = (themeName: string) => {
  desain.value.theme = themeName;
};

const updateField = (field: keyof typeof desain.value, value: string) => {
  (desain.value[field] as any) = value;
};
</script>

<template>
  <div class="space-y-8">
    <!-- Theme Selection -->
    <BaseCard title="Color Theme" badge="A" variant="tertiary">
      <div class="space-y-4">
        <p class="text-body-md">
          Pilih tema warna untuk portfolio Anda. Tema ini akan menentukan skema warna utama.
        </p>
        <ThemePicker 
          :model-value="desain.theme || 'Midnight Tech'" 
          @update:model-value="updateTheme"
          :themes="themePresets"
        />
      </div>
    </BaseCard>

    <!-- Typography -->
    <BaseCard title="Typography" badge="B" variant="primary">
      <BaseSelect
        :model-value="desain.fontPair || ''"
        @update:model-value="(v) => updateField('fontPair', v)"
        label="Font Pairing"
        :options="fontPairOptions"
        placeholder="Pilih kombinasi font..."
      />
    </BaseCard>

    <!-- Layout & Style -->
    <BaseCard title="Layout & Style" badge="C" variant="secondary">
      <div class="space-y-4">
        <BaseSelect
          :model-value="desain.heroLayout || ''"
          @update:model-value="(v) => updateField('heroLayout', v)"
          label="Hero Layout"
          :options="heroLayouts"
          placeholder="Pilih layout hero section..."
        />

        <BaseSelect
          :model-value="desain.suasana || ''"
          @update:model-value="(v) => updateField('suasana', v)"
          label="Suasana Visual"
          :options="suasanaOptionsList"
          placeholder="Pilih suasana desain..."
        />

        <BaseSelect
          :model-value="desain.borderStyle || ''"
          @update:model-value="(v) => updateField('borderStyle', v)"
          label="Border Style"
          :options="borderStyleOptions"
          placeholder="Pilih style border..."
        />
      </div>
    </BaseCard>

    <!-- Visual Effects -->
    <BaseCard title="Visual Effects" badge="D" variant="default">
      <BaseSelect
        :model-value="desain.efekVisual || ''"
        @update:model-value="(v) => updateField('efekVisual', v)"
        label="Background Effect"
        :options="efekVisualOptionsList"
        placeholder="Pilih efek visual..."
      />
    </BaseCard>

    <!-- Preview Card -->
    <BaseCard title="Design Summary" variant="tertiary">
      <div class="bg-on-surface text-surface neo-border p-6 space-y-3 font-mono text-sm">
        <div><strong>Theme:</strong> {{ desain.theme }}</div>
        <div><strong>Font:</strong> {{ desain.fontPair || '(not selected)' }}</div>
        <div><strong>Hero:</strong> {{ desain.heroLayout || '(not selected)' }}</div>
        <div><strong>Suasana:</strong> {{ desain.suasana || '(not selected)' }}</div>
        <div><strong>Border:</strong> {{ desain.borderStyle || '(not selected)' }}</div>
        <div><strong>Effect:</strong> {{ desain.efekVisual || '(not selected)' }}</div>
      </div>
    </BaseCard>
  </div>
</template>