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

// **xxx** → <strong>xxx</strong>，简单字符串替换（不解析链接）
function renderMd(text) {
  if (!text) return ''
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

// 轻量 markdown 解析
const blocks = computed(() => {
  if (!article.value?.content) return []
  const lines = article.value.content.split('\n')
  const result = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) { i++; continue }

    // 表格
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
      const headers = trimmed.slice(1, -1).split('|').map(s => s.trim())
      i += 2
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        rows.push(lines[i].trim().slice(1, -1).split('|').map(s => s.trim()))
        i++
      }
      result.push({ type: 'table', headers, rows })
      continue
    }

    if (trimmed.startsWith('### ')) { result.push({ type: 'h3', text: trimmed.slice(4) }); i++; continue }
    if (trimmed.startsWith('## ')) { result.push({ type: 'h2', text: trimmed.slice(3) }); i++; continue }
    if (trimmed.startsWith('# ')) { result.push({ type: 'h1', text: trimmed.slice(2) }); i++; continue }

    if (trimmed.startsWith('> ')) {
      const quoteLines = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2))
        i++
      }
      result.push({ type: 'quote', text: quoteLines.join(' ') })
      continue
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items = []
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      result.push({ type: 'ol', items })
      continue
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*]\s/, ''))
        i++
      }
      result.push({ type: 'ul', items })
      continue
    }

    // 普通段落
    const para = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('#') && !lines[i].trim().startsWith('- ') && !lines[i].trim().startsWith('* ') && !lines[i].trim().startsWith('> ') && !/^\d+\.\s/.test(lines[i].trim()) && !lines[i].trim().startsWith('|')) {
      para.push(lines[i].trim())
      i++
    }
    if (para.length) result.push({ type: 'p', text: para.join(' ') })
  }
  return result
})
</script>

<template>
  <div class="page">
    <button class="back" @click="router.push('/posts')">← 返回推文</button>

    <article v-if="article" class="post glass">
      <header class="post-head">
        <h1 class="post-title">{{ article.title }}</h1>
        <div class="post-meta">
          <span>{{ article.date }}</span>
          <span v-if="article.tags?.length">{{ article.tags.join(' · ') }}</span>
          <span v-if="article.words">约 {{ article.words }} 字</span>
        </div>
        <p class="post-excerpt">{{ article.excerpt }}</p>
      </header>

      <div v-if="article.content" class="post-body">
        <template v-for="(b, idx) in blocks" :key="idx">
          <h2 v-if="b.type === 'h1'" class="md-h1" v-html="renderMd(b.text)" />
          <h2 v-else-if="b.type === 'h2'" class="md-h2" v-html="renderMd(b.text)" />
          <h3 v-else-if="b.type === 'h3'" class="md-h3" v-html="renderMd(b.text)" />
          <p v-else-if="b.type === 'p'" class="md-p" v-html="renderMd(b.text)" />
          <blockquote v-else-if="b.type === 'quote'" class="md-quote" v-html="renderMd(b.text)" />
          <ol v-else-if="b.type === 'ol'" class="md-ol">
            <li v-for="(item, ii) in b.items" :key="ii" v-html="renderMd(item)" />
          </ol>
          <ul v-else-if="b.type === 'ul'" class="md-ul">
            <li v-for="(item, ii) in b.items" :key="ii" v-html="renderMd(item)" />
          </ul>
          <div v-else-if="b.type === 'table'" class="md-table">
            <table>
              <thead>
                <tr><th v-for="(h, hi) in b.headers" :key="hi">{{ h }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in b.rows" :key="ri">
                  <td v-for="(cell, ci) in row" :key="ci" v-html="renderMd(cell)" />
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>

      <div v-else class="post-empty">
        <p>详细推文源文件：<code>{{ article.sourceFile || 'src/data/posts/' + article.id + '.md' }}</code></p>
        <a v-if="article.repoUrl" :href="article.repoUrl" target="_blank" rel="noopener" class="repo-link">查看 GitHub 项目</a>
      </div>

      <footer class="post-foot">
        <a v-if="article.repoUrl" :href="article.repoUrl" target="_blank" rel="noopener" class="repo-btn">GitHub 项目</a>
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
      <h2>找不到这篇推文</h2>
      <p>ID <code>{{ route.params.id }}</code> 不存在。</p>
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
  display: inline-block;
  padding: 4px 0;
  margin-bottom: 16px;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.back:hover {
  color: var(--color-primary);
}
.post {
  padding: 32px 36px;
  max-width: 720px;
  margin: 0 auto;
}
.post-head {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}
.post-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}
.post-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}
.post-excerpt {
  font-size: 14px;
  color: var(--color-text-soft);
  line-height: 1.75;
  font-style: italic;
}

.post-body {
  font-size: 14.5px;
  color: var(--color-text);
  line-height: 1.85;
}

.md-h1 {
  font-size: 19px;
  font-weight: 700;
  color: var(--color-text);
  margin: 32px 0 16px;
  line-height: 1.4;
}
.md-h2 {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 28px 0 12px;
  line-height: 1.4;
}
.md-h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin: 20px 0 8px;
  line-height: 1.4;
}
.md-p {
  margin: 0 0 14px;
  line-height: 1.85;
}
.md-p:last-child {
  margin-bottom: 0;
}
.md-quote {
  margin: 16px 0;
  padding: 10px 16px;
  border-left: 3px solid var(--color-primary);
  background: var(--color-surface-soft, var(--color-surface));
  color: var(--color-text-soft);
  font-size: 14px;
  border-radius: 0 4px 4px 0;
}
.md-ul, .md-ol {
  margin: 0 0 14px;
  padding-left: 22px;
}
.md-ul li, .md-ol li {
  margin-bottom: 6px;
  line-height: 1.8;
}
.md-ul li::marker {
  color: var(--color-text-muted);
}
.md-ol li::marker {
  color: var(--color-text-muted);
  font-weight: 500;
}

.md-table {
  margin: 16px 0;
  overflow-x: auto;
}
.md-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.md-table th, .md-table td {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  text-align: left;
  line-height: 1.5;
}
.md-table th {
  background: var(--color-surface-soft, var(--color-surface));
  font-weight: 600;
  color: var(--color-text);
}
.md-table td {
  color: var(--color-text-soft);
}

.post-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
.repo-btn {
  display: inline-block;
  padding: 6px 14px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;
}
.repo-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.nav-pager {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.pager {
  font-size: 13px;
  color: var(--color-text-soft);
  text-decoration: none;
  transition: color 0.2s ease;
}
.pager:hover {
  color: var(--color-primary);
}
.pager.disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
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
.repo-link {
  display: inline-block;
  margin-top: 16px;
  padding: 8px 18px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 13px;
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
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

strong {
  color: var(--color-text);
  font-weight: 600;
}
</style>
