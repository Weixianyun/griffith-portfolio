<script setup>
import { PROJECTS } from '../data/site'
</script>

<template>
  <div class="page glass">
    <h1 class="page-title">项目展示</h1>
    <p v-if="!PROJECTS.length" class="empty">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
      <span>项目正在筹备中</span>
      <small>请稍后回来查看更多作品</small>
    </p>
    <div v-else class="grid">
      <article v-for="p in PROJECTS" :key="p.id" class="card">
        <h3>{{ p.title }}</h3>
        <p>{{ p.desc }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  min-height: 60vh;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.page-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background: var(--color-primary);
  border-radius: 2px;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 80px 20px;
  color: var(--color-text-soft);
  text-align: center;
}
.empty small {
  font-size: 12px;
  color: var(--color-text-muted);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.card {
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--color-bg-soft);
}
</style>
