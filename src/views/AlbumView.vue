<script setup>
import { ALBUMS } from '../data/site'
</script>

<template>
  <div class="page glass">
    <h1 class="page-title">相册</h1>
    <p v-if="!ALBUMS.length" class="empty">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2" />
        <path d="M21 17l-5-5-9 7" />
      </svg>
      <span>相册正在筹备中</span>
      <small>用镜头记录生活的瞬间</small>
    </p>
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
</style>
