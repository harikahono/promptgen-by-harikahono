<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue';
import type { GeneratorOutput, TargetTool } from '@/types/portfolio';

interface Props {
  output: GeneratorOutput;
}

const props = defineProps<Props>();
const store = usePortfolioStore();

const copied = ref<Record<TargetTool, boolean>>({
  claude: false,
  lovable: false,
  v0: false
});

const activeTab = ref<TargetTool>('claude');

const promptLines = computed(() => {
  const output = activeTab.value === (props.output.targetName.toLowerCase() as TargetTool)
    ? props.output 
    : store.getCachedOutput(activeTab.value as TargetTool);
  return output?.prompt.split('\n').length || 0;
});

const currentOutput = computed(() => {
  if (activeTab.value === (props.output.targetName.toLowerCase() as TargetTool)) {
    return props.output;
  }
  return store.getCachedOutput(activeTab.value as TargetTool);
});

const estimatedTokens = computed(() => {
  return currentOutput.value?.estimatedTokens || props.output.estimatedTokens;
});

const tabIcon = (target: TargetTool): string => {
  const icons: Record<TargetTool, string> = {
    claude: 'smart_toy',
    lovable: 'favorite',
    v0: 'terminal'
  };
  return icons[target];
};

const tabColors: Record<TargetTool, string> = {
  claude: 'primary',
  lovable: 'tertiary',
  v0: 'secondary'
} as const;

const copyToClipboard = async (target: TargetTool) => {
  try {
    const output = target === (props.output.targetName.toLowerCase() as TargetTool)
      ? props.output 
      : store.getCachedOutput(target);
    
    if (!output) { console.error('No output to copy for target:', target); return; }
    
    await navigator.clipboard.writeText(output.prompt);
    copied.value[target] = true;
    setTimeout(() => { copied.value[target] = false; }, 2000);
  } catch (error) {
    console.error('Copy failed:', error);
    alert('Failed to copy to clipboard');
  }
};

const downloadAsText = (target?: TargetTool) => {
  const output = target 
    ? store.getCachedOutput(target) || props.output
    : props.output;
  
  const targetName = target || props.output.targetName;
  const blob = new Blob([output.prompt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-prompt-${targetName}-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const copyAllToClipboard = async () => {
  try {
    const allPrompts: TargetTool[] = ['claude', 'lovable', 'v0'];
    const promptsText = allPrompts.map(target => {
      const output = store.getCachedOutput(target);
      return output 
        ? `=== ${target.toUpperCase()} PROMPT ===\n${output.prompt}\n\n`
        : '';
    }).join('\n');
    
    if (!promptsText.trim()) { console.error('No prompts to copy'); return; }
    
    await navigator.clipboard.writeText(promptsText);
    allPrompts.forEach(target => {
      copied.value[target] = true;
      setTimeout(() => { copied.value[target] = false; }, 2000);
    });
  } catch (error) {
    console.error('Copy all failed:', error);
    alert('Failed to copy all prompts to clipboard');
  }
};

const ensureAllPromptsCached = () => {
  store.generateAndCacheAllPrompts();
};
</script>

<template>
<div class="space-y-8">
  <!-- Header: Success Banner -->
  <BaseCard variant="primary" no-padding>
    <div class="flex items-center gap-4 p-8">
      <div class="w-16 h-16 flex items-center justify-center bg-on-surface text-surface neo-border shrink-0">
        <span class="material-symbols-outlined text-4xl">check_circle</span>
      </div>
      <div>
        <h2 class="text-headline-lg uppercase leading-none">Prompt Generated!</h2>
        <p class="text-body-sm md:text-body-md opacity-80 mt-1">Ready to paste into your AI tool of choice</p>
      </div>
    </div>
  </BaseCard>

  <!-- AI Tabs + Stats (combined layout) -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Tabs: span 3 cols on desktop -->
    <BaseCard variant="default" no-padding class="md:col-span-3">
      <div class="grid grid-cols-3">
        <button
          v-for="target in (['claude', 'lovable', 'v0'] as TargetTool[])"
          :key="target"
          @click="activeTab = target"
          class="flex flex-col items-center justify-center gap-2 p-6 neo-border transition-all duration-150"
          :class="activeTab === target 
            ? 'bg-primary-container text-on-primary-container neo-shadow-lg -translate-x-1 -translate-y-1'
            : 'bg-surface text-on-surface hover:bg-surface-container'"
        >
          <span class="material-symbols-outlined text-3xl">{{ tabIcon(target) }}</span>
          <span class="text-label-lg uppercase font-black tracking-wider">{{ target }}</span>
          <span v-if="activeTab === target" class="text-label-sm uppercase">Active</span>
        </button>
      </div>
    </BaseCard>

    <!-- Token count: takes 1 col -->
    <BaseCard variant="secondary" no-padding>
      <div class="p-6 text-center h-full flex flex-col items-center justify-center">
        <div class="text-3xl font-black font-mono tracking-tighter">
          <AnimatedCounter :value="estimatedTokens" suffix="" :duration="300" />
        </div>
        <div class="text-label-md uppercase mt-1 flex items-center gap-1">
          <span class="material-symbols-outlined text-base">data_array</span>
          Estimated Tokens
        </div>
      </div>
    </BaseCard>
  </div>

  <!-- Prompt Display -->
  <BaseCard variant="default" no-padding>
    <!-- Code header -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 border-b-4 border-on-surface bg-surface-container">
      <div class="flex items-center gap-3">
        <div class="flex gap-1.5">
          <span class="w-3 h-3 bg-error" />
          <span class="w-3 h-3 bg-primary-container" />
          <span class="w-3 h-3 bg-secondary-container" />
        </div>
        <span class="text-label-md font-mono uppercase opacity-70">{{ activeTab }}.prompt</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-label-md opacity-50">{{ promptLines }} lines</span>
        <BaseButton
          @click="ensureAllPromptsCached(); copyToClipboard(activeTab)"
          :variant="copied[activeTab] ? 'primary' : 'ghost'"
          size="sm"
        >
          <span class="material-symbols-outlined">{{ copied[activeTab] ? 'check' : 'content_copy' }}</span>
          {{ copied[activeTab] ? 'Copied!' : 'Copy' }}
        </BaseButton>
      </div>
    </div>

    <!-- Code content -->
    <div class="bg-on-surface text-surface max-h-96 overflow-auto">
      <pre class="font-mono text-sm whitespace-pre-wrap p-6 leading-relaxed">{{ currentOutput?.prompt || output.prompt }}</pre>
    </div>
  </BaseCard>

  <!-- Action Bar -->
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex flex-wrap gap-3">
      <BaseButton
        v-for="target in (['claude', 'lovable', 'v0'] as TargetTool[])"
        :key="target"
        @click="ensureAllPromptsCached(); copyToClipboard(target)"
        :variant="activeTab === target ? 'primary' : 'outline'"
        size="sm"
      >
        <span class="material-symbols-outlined">{{ copied[target] ? 'check' : 'content_copy' }}</span>
        {{ copied[target] ? 'Copied!' : `Copy ${target}` }}
      </BaseButton>
    </div>
    <div class="flex gap-3">
      <BaseButton @click="ensureAllPromptsCached(); copyAllToClipboard()" variant="secondary" size="sm">
        <span class="material-symbols-outlined">copy_all</span>
        Copy All
      </BaseButton>
      <BaseButton @click="downloadAsText()" variant="outline" size="sm">
        <span class="material-symbols-outlined">download</span>
        Download .txt
      </BaseButton>
    </div>
  </div>

  <!-- Tips -->
  <BaseCard v-if="currentOutput?.tips?.length" variant="tertiary" no-padding>
    <div class="p-6 space-y-4">
      <h3 class="text-headline-sm uppercase flex items-center gap-2">
        <span class="material-symbols-outlined">lightbulb</span>
        Tips for {{ currentOutput?.targetName || output.targetName }}
      </h3>
      <ul class="space-y-3">
        <li
          v-for="(tip, index) in currentOutput?.tips"
          :key="index"
          class="flex items-start gap-3 text-body-md"
        >
          <span class="w-6 h-6 flex items-center justify-center bg-on-surface text-surface neo-border text-xs font-black shrink-0 mt-0.5">{{ index + 1 }}</span>
          <span>{{ tip }}</span>
        </li>
      </ul>
    </div>
  </BaseCard>

  <BaseCard v-else-if="output.tips?.length" variant="tertiary" no-padding>
    <div class="p-6 space-y-4">
      <h3 class="text-headline-sm uppercase flex items-center gap-2">
        <span class="material-symbols-outlined">lightbulb</span>
        Tips for {{ output.targetName }}
      </h3>
      <ul class="space-y-3">
        <li
          v-for="(tip, index) in output.tips"
          :key="index"
          class="flex items-start gap-3 text-body-md"
        >
          <span class="w-6 h-6 flex items-center justify-center bg-on-surface text-surface neo-border text-xs font-black shrink-0 mt-0.5">{{ index + 1 }}</span>
          <span>{{ tip }}</span>
        </li>
      </ul>
    </div>
  </BaseCard>
</div>
</template>
