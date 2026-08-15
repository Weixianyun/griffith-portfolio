<script setup>
import { ARTICLES } from '../data/site'
</script>

<template>
  <div class="page glass">
    <h1 class="page-title">日记</h1>
    <p v-if="!ARTICLES.length" class="empty">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
        <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
      <span>日记正在筹备中</span>
      <small>分享思考、技术与生活的角落</small>
    </p>
    <div v-else class="list">
      <article v-for="a in ARTICLES" :key="a.id" class="article">
        <div class="date">{{ a.date }}</div>
        <h3>{{ a.title }}</h3>
        <p>{{ a.excerpt }}</p>
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
.article {
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}
.date {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}
.article h3 {
  font-size: 16px;
  color: var(--color-text);
  margin-bottom: 6px;
}
.article p {
  font-size: 13px;
  color: var(--color-text-soft);
  line-height: 1.6;
}
</style>
