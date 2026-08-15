<script setup>
import { computed } from 'vue'
import { PROJECTS } from '../data/site'
import { useTheme } from '../composables/useTheme'

const props = defineProps({ limit: { type: Number, default: 4 } })
const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
const list = computed(() => PROJECTS.slice(0, props.limit))
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

    <div v-if="list.length" class="grid">
      <article v-for="p in list" :key="p.id" class="card glass">
        <div class="cover" :style="{ background: p.color || 'var(--gradient-hero)' }">
          <span class="cover-icon">{{ p.title.slice(0, 1) }}</span>
        </div>
        <div class="body">
          <h3 class="title">{{ p.title }}</h3>
          <p class="desc">{{ p.desc }}</p>
          <div class="tags">
            <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="empty glass">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" :style="{ color: isDark ? '#7f1d1d' : '#94a3b8' }">
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
