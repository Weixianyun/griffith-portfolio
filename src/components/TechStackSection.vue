<script setup>
import { TECH_STACK } from '../data/site'

const icons = {
  vue: 'M2 4l10 16L22 4h-4l-6 10-6-10z M12 14l-6-10h4l2 4 2-4h4z',
  rust: 'M12 2L4 7v10l8 5 8-5V7l-8-5z M12 7l4 2.5v5L12 17l-4-2.5v-5z',
  go: 'M2 12h4v-2H2zm0 4h4v-2H2zm0-8h4V6H2zm6 4h4v-2H8zm0 4h4v-2H8zm0-8h4V6H8zm6 0h4V6h-4zm0 8h4v-2h-4z',
  ts: 'M3 3h18v18H3V3zm10 14h2v-7h2V8h-6v2h2v7z',
  py: 'M12 2c-3 0-5 1-5 4v3h5v1H4c-2 0-3 2-3 5s1 5 3 5h3v-3c0-2 1-3 3-3h5c2 0 3-1 3-3V6c0-3-2-4-5-4z M9.5 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z M12 22c3 0 5-1 5-4v-3h-5v-1h8c2 0 3-2 3-5s-1-5-3-5h-3v3c0 2-1 3-3 3h-5c-2 0-3 1-3 3v6c0 3 2 4 5 4z M14.5 18.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  react: 'M12 2C7 2 3 6 3 12s4 10 9 10 9-4 9-10-4-10-9-10z M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z',
  wails: 'M3 12l4-8 4 8-4 8-4-8z M13 12l4-8 4 8-4 8-4-8z',
  webgl: 'M12 2C7 2 3 6 3 12s4 10 9 10 9-4 9-10-4-10-9-10z M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z M9 10h6v4H9z'
}
</script>

<template>
  <section class="tech">
    <h2 class="section-title"><span>技术栈</span></h2>
    <div class="grid">
      <div v-for="t in TECH_STACK" :key="t.name" class="card glass" :style="{ '--c': t.color }">
        <div class="logo" :style="{ background: t.color + '22' }">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" :style="{ color: t.color }">
            <path :d="icons[t.icon]" />
          </svg>
        </div>
        <div class="name">{{ t.name }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 10px;
}
.card {
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: transform 0.25s ease;
  cursor: default;
}
.card:hover {
  transform: translateY(-3px);
}
.logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.name {
  font-size: 12px;
  color: var(--color-text-soft);
  font-weight: 500;
}
</style>
