<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import type { GeneratorOutput } from '@/types/portfolio';

interface Props {
  output: GeneratorOutput;
}

const props = defineProps<Props>();

const copied = ref(false);

const promptLines = computed(() => props.output.prompt.split('\n').length);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.output.prompt);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error('Copy failed:', error);
    alert('Failed to copy to clipboard');
  }
};

const downloadAsText = () => {
  const blob = new Blob([props.output.prompt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-prompt-${props.output.targetName}-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <BaseCard variant="primary">
      <div class="flex items-center gap-4">
        <span class="material-symbols-outlined text-6xl">check_circle</span>
        <div>
          <h2 class="text-headline-lg uppercase">Prompt Generated!</h2>
          <p class="text-body-md opacity-80">
            Ready to use in {{ output.targetName }}
          </p>
        </div>
      </div>
    </BaseCard>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BaseCard variant="secondary" no-padding>
        <div class="p-6 text-center">
          <div class="text-headline-lg font-bold font-mono">
            {{ output.targetName }}
          </div>
          <div class="text-label-md uppercase mt-2">Target Platform</div>
        </div>
      </BaseCard>

      <BaseCard variant="tertiary" no-padding>
        <div class="p-6 text-center">
          <div class="text-headline-lg font-bold font-mono">
            ~{{ output.estimatedTokens.toLocaleString() }}
          </div>
          <div class="text-label-md uppercase mt-2">Estimated Tokens</div>
        </div>
      </BaseCard>

      <BaseCard variant="default" no-padding>
        <div class="p-6 text-center">
          <div class="text-headline-lg font-bold font-mono">
            {{ promptLines }}
          </div>
          <div class="text-label-md uppercase mt-2">Lines</div>
        </div>
      </BaseCard>
    </div>

    <!-- Prompt Display -->
    <BaseCard title="Generated Prompt" variant="default">
      <div class="space-y-4">
        <!-- Actions -->
        <div class="flex gap-4 flex-wrap">
          <BaseButton @click="copyToClipboard" variant="primary">
            <span class="material-symbols-outlined">
              {{ copied ? 'check' : 'content_copy' }}
            </span>
            {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
          </BaseButton>

          <BaseButton @click="downloadAsText" variant="secondary">
            <span class="material-symbols-outlined">download</span>
            Download as .txt
          </BaseButton>
        </div>

        <!-- Prompt Content -->
        <div class="bg-on-surface text-surface neo-border p-6 overflow-auto max-h-96">
          <pre class="font-mono text-sm whitespace-pre-wrap">{{ output.prompt }}</pre>
        </div>
      </div>
    </BaseCard>

    <!-- Tips -->
    <BaseCard v-if="output.tips && output.tips.length > 0" title="Tips" variant="tertiary">
      <ul class="space-y-3">
        <li
          v-for="(tip, index) in output.tips"
          :key="index"
          class="flex items-start gap-3"
        >
          <span class="material-symbols-outlined text-primary-container">lightbulb</span>
          <span class="text-body-md">{{ tip }}</span>
        </li>
      </ul>
    </BaseCard>

    <!-- Next Steps -->
    <BaseCard variant="primary">
      <div class="space-y-4">
        <h3 class="text-headline-sm uppercase">Next Steps</h3>
        <ol class="space-y-3 list-decimal list-inside">
          <li class="text-body-md">
            Copy prompt di atas
          </li>
          <li class="text-body-md">
            Buka <strong>{{ output.targetName }}</strong>
          </li>
          <li class="text-body-md">
            Paste prompt ke chat/input field
          </li>
          <li class="text-body-md">
            Tunggu AI generate portfolio Anda
          </li>
          <li class="text-body-md">
            Review dan customize hasil sesuai kebutuhan
          </li>
        </ol>
      </div>
    </BaseCard>
  </div>
</template>