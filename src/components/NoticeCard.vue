<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { NOTICES } from '../data/site'

const { theme } = useTheme()
const notice = computed(() => NOTICES[theme.value] || NOTICES.light)
</script>

<template>
  <div class="notice-card glass">
    <div class="header">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
      <span>公告</span>
    </div>
    <div class="jp">{{ notice.jp }}</div>
    <div class="zh">{{ notice.zh }}</div>
  </div>
</template>

<style scoped>
.notice-card {
  padding: 16px;
}
.header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}
.jp {
  font-family: var(--font-jp);
  font-size: 13px;
  color: var(--color-text-soft);
  line-height: 1.7;
  margin-bottom: 6px;
  padding-left: 8px;
  border-left: 3px solid var(--color-primary);
  font-style: italic;
}
.zh {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
