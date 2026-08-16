<script setup>
import { computed, onMounted } from 'vue'
import { useGitHub } from '../composables/useGitHub'

const props = defineProps({ limit: { type: Number, default: 4 } })
const { repos, refreshRepos } = useGitHub()

onMounted(() => {
  refreshRepos()
})

const list = computed(() => repos.value.list.slice(0, props.limit))

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c'
}

function langColor(lang) {
  return LANG_COLORS[lang] || '#94a3b8'
}
</script>

<template>
  <section class="projects">
    <h2 class="section-title">
      <span>精选项目</span>
      <router-link to="/projects" class="more">
        查看全部
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </router-link>
    </h2>

    <div v-if="repos.loading && !list.length" class="state">
      <div class="spinner" />
      <span>加载中…</span>
    </div>

    <div v-else-if="list.length" class="grid">
      <router-link
        v-for="p in list"
        :key="p.id"
        :to="{ path: '/projects', query: { id: p.id } }"
        class="card glass"
      >
        <div class="cover" :style="{ background: 'var(--gradient-hero)' }">
          <span class="cover-icon">{{ p.name.slice(0, 1).toUpperCase() }}</span>
        </div>
        <div class="body">
          <h3 class="title">{{ p.name }}</h3>
          <p class="desc">{{ p.desc || '该仓库暂无描述' }}</p>
          <div class="meta">
            <span v-if="p.language" class="meta-item">
              <span class="dot" :style="{ background: langColor(p.language) }" />
              {{ p.language }}
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              {{ p.stars }}
            </span>
          </div>
        </div>
      </router-link>
    </div>

    <div v-else class="empty glass">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      <p>精选项目即将上线</p>
      <span class="hint">正在筹备中，敬请期待</span>
    </div>
  </section>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}
.section-title span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.section-title span::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 14px;
  background: var(--color-primary);
  border-radius: 2px;
}
.more {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}
.more:hover {
  color: var(--color-primary);
}

.state {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  font-size: 12px;
}
.spinner {
  width: 22px;
  height: 22px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
.cover {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
}
.body {
  padding: 12px 14px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}
.desc {
  font-size: 12px;
  color: var(--color-text-soft);
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: var(--color-text-muted);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
}
.empty {
  padding: 40px 20px;
  text-align: center;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.empty p {
  font-size: 14px;
  color: var(--color-text-soft);
}
.empty .hint {
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
