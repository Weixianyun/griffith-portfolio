<script setup>
import { TAGS } from '../data/site'
import { computed } from 'vue'

const max = computed(() => Math.max(...TAGS.map((t) => t.count), 1))

function size(count) {
  return 11 + (count / max.value) * 5
}
</script>

<template>
  <div class="tag-card glass">
    <div class="header">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
      </svg>
      <span>标签</span>
    </div>
    <div class="cloud">
      <a
        v-for="t in TAGS"
        :key="t.name"
        href="#"
        class="tag"
        :style="{ color: t.color, fontSize: size(t.count) + 'px' }"
        @click.prevent
      >
        {{ t.name }}
        <span class="count">{{ t.count }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.tag-card {
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
.cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  align-items: baseline;
}
.tag {
  display: inline-flex;
  align-items: baseline;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}
.tag:hover {
  background: var(--color-primary-bg);
  transform: scale(1.05);
}
.count {
  font-size: 9px;
  color: var(--color-text-muted);
  font-weight: 400;
}
</style>
