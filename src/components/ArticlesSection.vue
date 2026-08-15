<script setup>
import { computed } from 'vue'
import { ARTICLES } from '../data/site'

const list = computed(() => ARTICLES.slice(0, 5))
</script>

<template>
  <section class="articles">
    <h2 class="section-title">
      <span>最新文章</span>
      <router-link to="/diary" class="more">
        查看全部
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </router-link>
    </h2>

    <div v-if="list.length" class="list glass">
      <a v-for="a in list" :key="a.id" href="#" class="item" @click.prevent>
        <div class="meta">
          <span class="date">{{ a.date }}</span>
          <span class="cat">{{ a.tags?.[0] || '随笔' }}</span>
        </div>
        <div class="title">{{ a.title }}</div>
        <div class="excerpt">{{ a.excerpt }}</div>
      </a>
    </div>

    <div v-else class="empty glass">
      <p>最新文章即将更新</p>
      <span class="hint">正在筹备中，敬请期待</span>
    </div>
  </section>
</template>

<style scoped>
.articles {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.list {
  display: flex;
  flex-direction: column;
  padding: 8px;
}
.item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: var(--radius-sm);
  transition: background 0.2s ease;
  color: var(--color-text);
}
.item:hover {
  background: var(--color-primary-bg);
}
.meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-muted);
}
.cat {
  color: var(--color-primary);
}
.title {
  font-size: 14px;
  font-weight: 600;
}
.excerpt {
  font-size: 12px;
  color: var(--color-text-soft);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.empty {
  padding: 32px 20px;
  text-align: center;
  color: var(--color-text-muted);
}
.empty p {
  font-size: 14px;
  color: var(--color-text-soft);
}
.empty .hint {
  font-size: 12px;
  color: var(--color-text-muted);
  display: block;
  margin-top: 4px;
}
</style>
