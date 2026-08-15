<script setup>
import { ARTICLES } from '../data/site'
</script>

<template>
  <div class="page">
    <h1 class="page-title">推文</h1>
    <p v-if="!ARTICLES.length" class="empty">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
        <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
      <span>推文正在筹备中</span>
      <small>随手记录所思、所想、所感</small>
    </p>
    <div v-else class="feed">
      <article v-for="a in ARTICLES" :key="a.id" class="post glass">
        <header class="post-head">
          <div class="avatar" aria-hidden="true">G</div>
          <div class="who">
            <div class="name">Gr1ff1th</div>
            <div class="meta">{{ a.date }}<span v-if="a.tags?.length"> · {{ a.tags[0] }}</span></div>
          </div>
        </header>
        <h3 class="post-title">{{ a.title }}</h3>
        <p class="post-body">{{ a.excerpt }}</p>
        <footer class="post-foot">
          <span class="action">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            点赞
          </span>
          <span class="action">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            回复
          </span>
          <span class="action">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            分享
          </span>
        </footer>
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
.feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.post {
  padding: 16px 18px;
}
.post-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-button);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}
.who .name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
}
.who .meta {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.post-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
}
.post-body {
  font-size: 13px;
  color: var(--color-text-soft);
  line-height: 1.6;
  white-space: pre-wrap;
}
.post-foot {
  display: flex;
  gap: 20px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed var(--color-border);
}
.action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.2s ease;
}
.action:hover {
  color: var(--color-primary);
}
</style>
