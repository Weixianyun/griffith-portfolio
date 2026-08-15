<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <div class="eagle-deco" aria-hidden="true">
    <svg v-if="!isDark" viewBox="0 0 200 200" class="eagle-svg light-eagle">
      <defs>
        <linearGradient id="lgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#60a5fa" />
          <stop offset="1" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <g fill="url(#lgrad)" opacity="0.9">
        <path d="M100 60 C 60 40, 30 70, 40 110 C 70 100, 90 90, 100 80 Z" />
        <path d="M100 60 C 140 40, 170 70, 160 110 C 130 100, 110 90, 100 80 Z" />
        <ellipse cx="100" cy="100" rx="18" ry="26" />
        <circle cx="100" cy="70" r="14" />
        <circle cx="95" cy="68" r="2" fill="#fff" />
        <circle cx="105" cy="68" r="2" fill="#fff" />
        <path d="M100 76 L96 80 L100 82 L104 80 Z" fill="#f59e0b" />
        <path d="M100 126 L92 150 L100 144 L108 150 Z" />
      </g>
    </svg>

    <svg v-else viewBox="0 0 200 200" class="eagle-svg dark-eagle">
      <defs>
        <linearGradient id="dgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7f1d1d" />
          <stop offset="1" stop-color="#1a0509" />
        </linearGradient>
      </defs>
      <g fill="url(#dgrad)" opacity="0.95">
        <path d="M100 60 C 60 40, 30 70, 40 110 C 70 100, 90 90, 100 80 Z" />
        <path d="M100 60 C 140 40, 170 70, 160 110 C 130 100, 110 90, 100 80 Z" />
        <ellipse cx="100" cy="100" rx="18" ry="26" />
        <circle cx="100" cy="70" r="14" />
        <circle cx="95" cy="68" r="2" fill="#ef4444" />
        <circle cx="105" cy="68" r="2" fill="#ef4444" />
        <path d="M100 76 L96 80 L100 82 L104 80 Z" fill="#fca5a5" />
        <path d="M100 126 L92 150 L100 144 L108 150 Z" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.eagle-deco {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 8px;
}
.eagle-svg {
  width: 64px;
  height: 64px;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px var(--color-primary-bg));
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
