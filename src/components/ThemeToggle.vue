<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <button
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    @click="toggle"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <span class="thumb">
      <svg v-if="!isDark" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  width: 56px;
  height: 28px;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  padding: 2px;
}
.theme-toggle .thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--gradient-button);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.theme-toggle.is-dark .thumb {
  transform: translateX(28px);
  background: linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%);
}
.theme-toggle:hover {
  border-color: var(--color-primary);
}
</style>
