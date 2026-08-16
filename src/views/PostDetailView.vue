<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ARTICLES } from '../data/site'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  const id = Number(route.params.id)
  return ARTICLES.find(a => a.id === id) || null
})

const index = computed(() => ARTICLES.findIndex(a => a.id === Number(route.params.id)))
const prev = computed(() => (index.value > 0 ? ARTICLES[index.value - 1] : null))
const next = computed(() => (index.value >= 0 && index.value < ARTICLES.length - 1 ? ARTICLES[index.value + 1] : null))
</script>

<template>
  <div class="page">
    <button class="back" @click="router.push('/posts')">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      返回推文
    </button>

    <article v-if="article" class="post glass">
      <header class="post-head">
        <div class="avatar" aria-hidden="true">G</div>
        <div class="who">
          <div class="name">Gr1ff1th</div>
          <div class="meta">
            {{ article.date }}
            <span v-if="article.tags?.length"> · {{ article.tags.join(' · ') }}</span>
            <span v-if="article.words"> · 约 {{ article.words }} 字</span>
          </div>
        </div>
      </header>

      <h1 class="post-title">{{ article.title }}</h1>
      <p class="post-excerpt">{{ article.excerpt }}</p>

      <div v-if="article.content" class="post-content">
        <pre>{{ article.content }}</pre>
      </div>
      <div v-else class="post-empty">
        <p>📄 详细推文源文件：<code>{{ article.sourceFile || 'src/data/posts/' + article.id + '.md' }}</code></p>
        <p class="hint">提示：完整 Markdown 渲染器尚未接入，目前展示原始文本。可点击下方按钮直接跳转到 GitHub 查看完整版。</p>
        <a v-if="article.repoUrl" :href="article.repoUrl" target="_blank" rel="noopener" class="repo-link">
          🔗 查看 GitHub 项目 →
        </a>
      </div>

      <footer class="post-foot">
        <a v-if="article.repoUrl" :href="article.repoUrl" target="_blank" rel="noopener" class="repo-btn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          GitHub 项目
        </a>

        <div class="nav-pager">
          <router-link v-if="prev" :to="`/posts/${prev.id}`" class="pager">
            ← {{ prev.title.length > 18 ? prev.title.slice(0, 18) + '…' : prev.title }}
          </router-link>
          <span v-else class="pager disabled">已是第一篇</span>
          <router-link v-if="next" :to="`/posts/${next.id}`" class="pager">
            {{ next.title.length > 18 ? next.title.slice(0, 18) + '…' : next.title }} →
          </router-link>
          <span v-else class="pager disabled">已是最新一篇</span>
        </div>
      </footer>
    </article>

    <div v-else class="not-found glass">
      <h2>😢 找不到这篇推文</h2>
      <p>ID: <code>{{ route.params.id }}</code> 不存在。</p>
      <button @click="router.push('/posts')">返回推文列表</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  min-height: 60vh;
}
.back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  margin-bottom: 16px;
  background: var(--color-surface);
  color: var(--color-text-soft);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.back:hover {
  color: var(--color-primary);
  background: var(--color-primary-bg);
}
.post {
  padding: 24px 28px;
}
.post-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-button);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
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
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
  margin-bottom: 12px;
}
.post-excerpt {
  font-size: 14px;
  color: var(--color-text-soft);
  line-height: 1.7;
  padding: 12px 16px;
  background: var(--color-surface-soft, var(--color-surface));
  border-left: 3px solid var(--color-primary);
  border-radius: 4px;
  margin-bottom: 20px;
  white-space: pre-wrap;
}
.post-content pre {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  font-size: 13.5px;
  color: var(--color-text-soft);
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}
.post-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text-soft);
}
.post-empty p {
  font-size: 13px;
  margin-bottom: 8px;
}
.post-empty code {
  background: var(--color-surface-soft, var(--color-surface));
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--color-primary);
}
.post-empty .hint {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 8px;
}
.repo-link {
  display: inline-block;
  margin-top: 16px;
  padding: 8px 18px;
  background: var(--gradient-button);
  color: #fff;
  border-radius: 999px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.repo-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.post-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
}
.repo-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  text-decoration: none;
  font-size: 12px;
  transition: all 0.2s ease;
}
.repo-btn:hover {
  color: var(--color-primary);
  background: var(--color-primary-bg);
}
.nav-pager {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.pager {
  font-size: 12px;
  color: var(--color-text-soft);
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  transition: color 0.2s ease;
}
.pager:hover {
  color: var(--color-primary);
}
.pager.disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
}
.not-found {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-soft);
}
.not-found h2 {
  font-size: 18px;
  color: var(--color-text);
  margin-bottom: 12px;
}
.not-found p {
  font-size: 13px;
  margin-bottom: 16px;
}
.not-found code {
  background: var(--color-surface-soft, var(--color-surface));
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--color-primary);
}
.not-found button {
  padding: 8px 18px;
  background: var(--gradient-button);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
}
</style>
