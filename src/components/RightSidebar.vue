<script setup>
import SiteStats from './SiteStats.vue'
import CalendarWidget from './CalendarWidget.vue'
import { ARTICLES } from '../data/site'
import { computed } from 'vue'

const recentArticles = computed(() => ARTICLES.slice(0, 5))
const categories = [
  { name: '随笔', count: 0 },
  { name: '技术', count: 0 },
  { name: '生活', count: 0 }
]
</script>

<template>
  <div class="right-sidebar">
    <SiteStats />
    <CalendarWidget />

    <div class="widget glass">
      <div class="header">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>最近文章</span>
      </div>
      <ul v-if="recentArticles.length" class="recent-list">
        <li v-for="a in recentArticles" :key="a.id">
          <a :href="`#/diary`">{{ a.title }}</a>
        </li>
      </ul>
      <div v-else class="empty">暂无文章</div>
    </div>

    <div class="widget glass">
      <div class="header">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        <span>分类</span>
      </div>
      <ul class="cat-list">
        <li v-for="c in categories" :key="c.name">
          <a href="#" @click.prevent>
            <span class="dot"></span>
            <span class="name">{{ c.name }}</span>
            <span class="count">{{ c.count }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.widget {
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
.recent-list,
.cat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.recent-list a,
.cat-list a {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-soft);
  transition: color 0.2s ease;
  padding: 4px 0;
}
.recent-list a:hover,
.cat-list a:hover {
  color: var(--color-primary);
}
.cat-list .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}
.cat-list .name {
  flex: 1;
}
.cat-list .count {
  font-size: 11px;
  color: var(--color-text-muted);
  background: var(--color-bg-soft);
  padding: 1px 6px;
  border-radius: 8px;
}
.empty {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  padding: 8px 0;
}
</style>
