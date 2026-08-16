<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGitHub } from '../composables/useGitHub'

const route = useRoute()
const router = useRouter()
const { repos, refreshRepos } = useGitHub()

const currentId = computed(() => {
  const id = Number(route.query.id)
  return Number.isFinite(id) ? id : null
})

const current = computed(() => {
  if (currentId.value == null) return null
  return repos.value.list.find(r => r.id === currentId.value) || null
})

const detailMode = computed(() => currentId.value != null && current.value != null)

onMounted(() => {
  refreshRepos()
})

watch(() => repos.value.list.length, (len) => {
  if (len === 0) refreshRepos(true)
})

function openProject(p) {
  router.push({ path: '/projects', query: { id: p.id } })
}

function backToList() {
  router.push({ path: '/projects' })
}

function retry() {
  refreshRepos(true)
}

function relTime(iso) {
  if (!iso) return ''
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return ''
  const diff = Date.now() - t
  const day = 24 * 60 * 60 * 1000
  if (diff < day) return '今天'
  if (diff < 7 * day) return `${Math.floor(diff / day)} 天前`
  if (diff < 30 * day) return `${Math.floor(diff / (7 * day))} 周前`
  if (diff < 365 * day) return `${Math.floor(diff / (30 * day))} 个月前`
  return `${Math.floor(diff / (365 * day))} 年前`
}

function langColor(lang) {
  const map = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Vue: '#41b883',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    Kotlin: '#A97BFF',
    Swift: '#F05138',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600'
  }
  return map[lang] || '#94a3b8'
}
</script>

<template>
  <div class="page">
    <header class="page-head">
      <h1 class="page-title">项目展示</h1>
      <button v-if="detailMode" class="back-btn" @click="backToList" type="button">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        返回列表
      </button>
    </header>

    <template v-if="!detailMode">
      <div v-if="repos.loading && !repos.list.length" class="state glass">
        <div class="spinner" />
        <span>正在从 GitHub 拉取项目…</span>
      </div>

      <div v-else-if="repos.error && !repos.list.length" class="state glass">
        <p>项目加载失败:{{ repos.error }}</p>
        <button class="retry" @click="retry" type="button">重试</button>
      </div>

      <p v-else-if="!repos.list.length" class="empty">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
        <span>暂无项目</span>
        <small>该账号下还没有公开仓库</small>
      </p>

      <div v-else class="grid">
        <article
          v-for="p in repos.list"
          :key="p.id"
          class="card glass"
          @click="openProject(p)"
          role="button"
          tabindex="0"
        >
          <div class="cover" :style="{ background: 'var(--gradient-hero)' }">
            <span class="cover-icon">{{ p.name.slice(0, 1).toUpperCase() }}</span>
          </div>
          <div class="body">
            <h3 class="title">
              {{ p.name }}
              <span v-if="p.fork" class="fork-tag">fork</span>
              <span v-if="p.archived" class="archive-tag">archived</span>
            </h3>
            <p class="desc">{{ p.desc || '该仓库暂无描述' }}</p>
            <div class="meta">
              <span v-if="p.language" class="meta-item">
                <span class="dot" :style="{ background: langColor(p.language) }" />
                {{ p.language }}
              </span>
              <span class="meta-item">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                {{ p.stars }}
              </span>
              <span class="meta-item">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="6" cy="6" r="2" />
                  <circle cx="6" cy="18" r="2" />
                  <circle cx="18" cy="6" r="2" />
                  <path d="M6 8v6" />
                  <path d="M18 8a6 6 0 0 1-6 6h-3" />
                </svg>
                {{ p.forks }}
              </span>
              <span v-if="p.updatedAt" class="meta-item updated">{{ relTime(p.updatedAt) }}</span>
            </div>
            <div v-if="p.topics.length" class="tags">
              <span v-for="t in p.topics.slice(0, 4)" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </article>
      </div>
    </template>

    <article v-else class="detail glass">
      <header class="detail-head">
        <div class="cover-lg" :style="{ background: 'var(--gradient-button)' }">
          <span>{{ current.name.slice(0, 1).toUpperCase() }}</span>
        </div>
        <div class="detail-info">
          <h1 class="detail-title">{{ current.name }}</h1>
          <div class="detail-sub">
            <a class="link" :href="current.url" target="_blank" rel="noopener noreferrer">
              {{ current.fullName }}
            </a>
            <span v-if="current.language" class="meta-item">
              <span class="dot" :style="{ background: langColor(current.language) }" />
              {{ current.language }}
            </span>
            <span v-if="current.updatedAt" class="meta-item">更新于 {{ relTime(current.updatedAt) }}</span>
          </div>
        </div>
      </header>

      <p v-if="current.desc" class="detail-desc">{{ current.desc }}</p>
      <p v-else class="detail-desc muted">该仓库暂无描述</p>

      <div class="stats-row">
        <div class="stat">
          <strong>{{ current.stars }}</strong>
          <span>Stars</span>
        </div>
        <div class="stat">
          <strong>{{ current.forks }}</strong>
          <span>Forks</span>
        </div>
        <div v-if="current.homepage" class="stat-link">
          <a :href="current.homepage" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            演示地址
          </a>
        </div>
        <div class="stat-link primary">
          <a :href="current.url" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub 仓库
          </a>
        </div>
      </div>

      <div v-if="current.topics.length" class="detail-tags">
        <span v-for="t in current.topics" :key="t" class="tag">{{ t }}</span>
      </div>

      <div class="detail-foot">
        <button class="back-btn" @click="backToList" type="button">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          返回项目列表
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  min-height: 60vh;
}
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
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
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}
.back-btn:hover {
  border-color: var(--color-primary);
  transform: translateX(-2px);
}

.state {
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--color-text-soft);
  font-size: 13px;
}
.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.retry {
  margin-top: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  border: none;
  font-size: 12px;
  cursor: pointer;
}
.retry:hover {
  opacity: 0.9;
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
.cover {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.cover-icon {
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 6px;
}
.fork-tag,
.archive-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-weight: 500;
}
.archive-tag {
  background: rgba(148, 163, 184, 0.2);
  color: var(--color-text-muted);
}
.desc {
  font-size: 12px;
  color: var(--color-text-soft);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--color-text-muted);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.meta-item.updated {
  margin-left: auto;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.detail {
  padding: 24px;
}
.detail-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.cover-lg {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  flex-shrink: 0;
}
.detail-info {
  flex: 1;
  min-width: 0;
}
.detail-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
  word-break: break-all;
}
.detail-sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--color-text-muted);
}
.link {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--color-primary);
}
.link:hover {
  opacity: 0.7;
}
.detail-desc {
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.7;
  background: var(--color-primary-bg);
  padding: 12px 16px;
  border-left: 3px solid var(--color-primary);
  border-radius: 4px;
  margin-bottom: 20px;
  white-space: pre-wrap;
}
.detail-desc.muted {
  color: var(--color-text-muted);
}
.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-soft);
  min-width: 80px;
}
.stat strong {
  font-size: 18px;
  color: var(--color-text);
}
.stat span {
  font-size: 11px;
  color: var(--color-text-muted);
}
.stat-link {
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-soft);
  font-size: 12px;
}
.stat-link a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-soft);
  text-decoration: none;
}
.stat-link a:hover {
  color: var(--color-primary);
}
.stat-link.primary {
  background: var(--gradient-button);
}
.stat-link.primary a {
  color: #fff;
  font-weight: 600;
}
.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}
.detail-foot {
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
}

@media (max-width: 640px) {
  .stats-row {
    gap: 10px;
  }
  .stat,
  .stat-link {
    flex: 1;
    min-width: 0;
  }
}
</style>
