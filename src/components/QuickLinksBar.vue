<script setup>
import { QUICK_LINKS } from '../data/site'

const icons = {
  github: 'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5 0-.24-.01-.88-.01-1.74-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.12-1.5-1.12-1.5-.91-.64.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.41 9.41 0 0 1 12 7.07c.85.01 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.5C19.13 20.6 22 16.77 22 12.25 22 6.58 17.52 2 12 2z',
  bing: 'M5.71 2.99C4.5 2.99 3.5 3.96 3.5 5.14v13.72c0 1.18 1 2.15 2.21 2.15h12.58c1.21 0 2.21-.97 2.21-2.15V5.14c0-1.18-1-2.15-2.21-2.15H5.71zm6.04 13.42c-1.84 0-3.34-1.5-3.34-3.34 0-1.85 1.5-3.34 3.34-3.34 1.85 0 3.34 1.5 3.34 3.34 0 1.84-1.5 3.34-3.34 3.34zm5.27-5.86h-2.05V7.5h2.05v3.05z',
  bilibili: 'M17.81 4.47c.39.39.39 1.03 0 1.42l-1.7 1.7h2.39c1.66 0 3 1.34 3 3v8.82c0 1.66-1.34 3-3 3H5.5c-1.66 0-3-1.34-3-3V10.59c0-1.66 1.34-3 3-3h2.39l-1.7-1.7a.996.996 0 1 1 1.41-1.42L12 8.36l4.4-4.42a.996.996 0 0 1 1.41 0zM7.5 13.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
  youtube: 'M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z'
}
</script>

<template>
  <div class="quick-bar glass">
    <div class="bar-label">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
      <span>快捷导航</span>
    </div>
    <div class="links">
      <a
        v-for="l in QUICK_LINKS"
        :key="l.key"
        :href="l.url"
        target="_blank"
        rel="noopener"
        :title="l.label"
        class="link"
        :style="{ '--lc': l.color }"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path :d="icons[l.key]" />
        </svg>
        <span class="name">{{ l.label }}</span>
        <svg class="ext" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.quick-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  margin-bottom: 16px;
  overflow-x: auto;
  scrollbar-width: none;
}
.quick-bar::-webkit-scrollbar {
  display: none;
}
.bar-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  flex-shrink: 0;
  padding-right: 12px;
  border-right: 1px solid var(--color-border);
}
.links {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--lc, var(--color-primary));
  font-size: 12px;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.2s ease, background 0.2s ease;
}
.link:hover {
  transform: translateY(-1px);
  background: var(--lc, var(--color-primary));
  color: #fff;
}
.link:hover .ext {
  opacity: 1;
}
.link .ext {
  opacity: 0.5;
  transition: opacity 0.2s ease;
}
@media (max-width: 768px) {
  .bar-label span {
    display: none;
  }
  .bar-label {
    border-right: none;
    padding-right: 0;
  }
}
</style>
