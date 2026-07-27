<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import BaseButton from './BaseButton.vue';

interface Props {
  modelValue: boolean;
  title?: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  variant: 'info',
  closable: true
});

const emit = defineEmits<{ 
  'update:modelValue': [value: boolean];
  close: [];
  confirm: [];
}>();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const confirm = () => {
  emit('confirm');
  emit('update:modelValue', false);
};

const handleBackdropClick = () => {
  if (props.closable) {
    close();
  }
};

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closable) {
    close();
  }
};

onMounted(() => {
  if (props.modelValue) {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});

const variantConfig = {
  info: {
    icon: 'info',
    bgColor: 'bg-secondary-fixed',
    iconColor: 'text-on-surface'
  },
  warning: {
    icon: 'warning',
    bgColor: 'bg-primary-container',
    iconColor: 'text-on-surface'
  },
  error: {
    icon: 'error',
    bgColor: 'bg-error-container',
    iconColor: 'text-error'
  },
  success: {
    icon: 'check_circle',
    bgColor: 'bg-primary-container',
    iconColor: 'text-on-surface'
  }
};

const config = variantConfig[props.variant];
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-on-surface opacity-50" />

        <!-- Modal Content -->
        <div
          class="relative bg-surface neo-border neo-shadow-lg max-w-md w-full"
          @click.stop
        >
          <!-- Header -->
          <div :class="['p-6 border-b-4 border-on-surface', config.bgColor]">
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <span
                  class="material-symbols-outlined text-5xl"
                  :class="config.iconColor"
                >
                  {{ config.icon }}
                </span>
              </div>

              <!-- Title -->
              <div class="flex-1 pt-1">
                <h2 v-if="title" class="text-headline-sm uppercase">
                  {{ title }}
                </h2>
                <h2 v-else class="text-headline-sm uppercase">
                  {{ variant === 'error' ? 'Error' : variant === 'warning' ? 'Warning' : variant === 'success' ? 'Success' : 'Info' }}
                </h2>
              </div>

              <!-- Close Button -->
              <button
                v-if="closable"
                @click="close"
                class="flex-shrink-0 p-2 hover:bg-on-surface hover:text-surface transition-colors neo-border"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer (optional) -->
          <div v-if="$slots.footer" class="p-6 border-t-4 border-on-surface bg-surface-variant">
            <slot name="footer" />
          </div>

<!-- Default Footer (if no slot provided) -->
<div v-else class="p-6 border-t-4 border-on-surface bg-surface-variant">
  <div class="flex gap-4">
    <BaseButton @click="close" variant="ghost" full-width>
      <span class="material-symbols-outlined">close</span>
      Cancel
    </BaseButton>
    <BaseButton 
      @click="confirm"
      variant="primary" 
      full-width
    >
      <span class="material-symbols-outlined">check</span>
      OK
    </BaseButton>
  </div>
</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: scale(0.9) translateY(-20px);
}

.modal-leave-to .relative {
  transform: scale(0.9) translateY(-20px);
}
</style>