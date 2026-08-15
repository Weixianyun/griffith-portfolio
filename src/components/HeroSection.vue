<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { SKILLS } from '../data/site'

const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <div class="hero glass">
    <div class="hero-content">
      <div class="greeting">
        <span class="jp">ようこそ</span>
        <h1 class="title">
          鹰の团 · <span class="nick">Gr1ff1th</span>的个人博客
        </h1>
        <p class="subtitle">
          独立开发者 · 永远的白月光
          <span class="sep">·</span>
          软件设计 · 应用开发 · 插件开发 · 艺术创作 · 前沿科技
        </p>
      </div>

      <div class="actions">
        <router-link to="/projects" class="btn btn-primary">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          查看项目
        </router-link>
        <router-link to="/posts" class="btn btn-outline">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
          阅读推文
        </router-link>
      </div>
    </div>

    <div class="hero-decoration" aria-hidden="true">
      <svg viewBox="0 0 200 200" class="feather-svg" :class="{ dark: isDark }">
        <defs>
          <linearGradient :id="isDark ? 'hgd' : 'hgl'" x1="0" y1="0" x2="1" y2="1">
            <stop v-if="!isDark" offset="0" stop-color="#60a5fa" />
            <stop v-if="!isDark" offset="1" stop-color="#2563eb" />
            <stop v-if="isDark" offset="0" stop-color="#7f1d1d" />
            <stop v-if="isDark" offset="1" stop-color="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M50 30 Q80 100, 50 170" fill="none" stroke="url(#hgl)" stroke-width="3" stroke-linecap="round" />
        <path d="M150 30 Q120 100, 150 170" fill="none" stroke="url(#hgl)" stroke-width="3" stroke-linecap="round" />
        <g class="floating-feather" opacity="0.8">
          <path d="M100 60 Q110 100, 100 140 Q90 100, 100 60 Z" fill="url(#hgl)" />
        </g>
        <circle cx="160" cy="100" r="6" fill="url(#hgl)" class="pulse-circle" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 32px;
  min-height: 220px;
  background: var(--gradient-hero);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 20%, var(--color-primary-bg) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, var(--color-primary-bg) 0%, transparent 40%);
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}
.greeting .jp {
  font-family: var(--font-jp);
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 500;
  letter-spacing: 1px;
}
.greeting .title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin: 6px 0 8px;
  line-height: 1.3;
}
.greeting .nick {
  color: var(--color-primary);
  font-family: 'Courier New', monospace;
}
.greeting .subtitle {
  font-size: 13px;
  color: var(--color-text-soft);
  line-height: 1.7;
  margin-bottom: 16px;
}
.greeting .sep {
  color: var(--color-primary);
  margin: 0 4px;
}
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.hero-decoration {
  position: relative;
  z-index: 0;
  flex-shrink: 0;
  margin-left: 16px;
}
.feather-svg {
  width: 120px;
  height: 120px;
  animation: float 6s ease-in-out infinite;
}
.feather-svg.dark circle {
  filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.6));
}
.pulse-circle {
  transform-origin: 160px 100px;
  animation: pulse 2.5s ease-in-out infinite;
}
.floating-feather {
  animation: float 4s ease-in-out infinite;
  transform-origin: center;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
}
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  .hero-decoration {
    display: none;
  }
  .greeting .title {
    font-size: 18px;
  }
}
</style>
