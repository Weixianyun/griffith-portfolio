<script setup>
import { ARTICLES } from '../data/site'
</script>

<template>
  <div class="page">
    <h1 class="page-title">推文</h1>
    <p v-if="!ARTICLES.length" class="empty">推文正在筹备中</p>
    <div v-else class="feed">
      <router-link
        v-for="a in ARTICLES"
        :key="a.id"
        :to="`/posts/${a.id}`"
        class="post-link"
      >
        <article class="post glass">
          <div class="meta">
            <span class="date">{{ a.date }}</span>
            <span v-if="a.tags?.length" class="tag">{{ a.tags[0] }}</span>
            <span v-if="a.words" class="words">{{ a.words }} 字</span>
          </div>
          <h3 class="post-title">{{ a.title }}</h3>
          <p class="post-body">{{ a.excerpt }}</p>
        </article>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  min-height: 60vh;
}
.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}
.empty {
  padding: 80px 20px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
}
.feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.post-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
.post {
  padding: 18px 22px;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.post-link:hover .post {
  border-color: var(--color-primary);
  transform: translateY(-1px);
}
.meta {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
  align-items: center;
}
.tag {
  color: var(--color-primary);
}
.words {
  margin-left: auto;
  color: var(--color-text-muted);
}
.post-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
  margin-bottom: 6px;
}
.post-link:hover .post-title {
  color: var(--color-primary);
}
.post-body {
  font-size: 13.5px;
  color: var(--color-text-soft);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
