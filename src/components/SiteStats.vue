<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { SITE_STATS } from '../data/site'
import { useSiteStats } from '../composables/useSiteStats'

const { theme } = useTheme()
const { days } = useSiteStats()
const isDark = computed(() => theme.value === 'dark')

const items = computed(() => [
  { key: 'articles', label: '文章', value: SITE_STATS.articleCount, color: '#3b82f6', icon: 'doc' },
  { key: 'categories', label: '分类', value: SITE_STATS.categoryCount, color: '#94a3b8', icon: 'folder' },
  { key: 'tags', label: '标签', value: SITE_STATS.tagCount, color: '#10b981', icon: 'tag' },
  { key: 'words', label: '总字数', value: SITE_STATS.totalWords, color: '#f59e0b', icon: 'edit' },
  { key: 'days', label: '运行天数', value: days.value, color: '#06b6d4', icon: 'clock' },
  {
    key: 'last',
    label: '最后活动',
    value: '刚刚',
    color: '#8b5cf6',
    icon: 'bolt'
  }
])

const icons = {
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M8 13h8M8 17h5',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
  edit: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
  clock: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM12 6v6l4 2',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z'
}
</script>

<template>
  <div class="site-stats glass">
    <div class="header">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </svg>
      <span>站点统计</span>
    </div>
    <div class="grid">
      <div v-for="it in items" :key="it.key" class="item">
        <div class="icon" :style="{ background: it.color + '22', color: it.color }">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path :d="icons[it.icon]" />
          </svg>
        </div>
        <div class="meta">
          <div class="value">{{ it.value }}</div>
          <div class="label">{{ it.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-stats {
  padding: 16px;
}
.header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-soft);
  transition: transform 0.2s ease;
}
.item:hover {
  transform: translateY(-1px);
}
.icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.value {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}
.label {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
</style>
