<script setup>
import { SITE } from '../data/site'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="app-header glass">
    <div class="header-inner">
      <router-link to="/" class="brand">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="brand-glyph">
            <defs>
              <linearGradient id="bm-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
                <stop offset="1" stop-color="#ffffff" stop-opacity="0.7" />
              </linearGradient>
            </defs>
            <!-- 中央矛杆 -->
            <path d="M16 2 L16 30" stroke="url(#bm-grad)" stroke-width="1.4" />
            <!-- 顶部矛尖（双刃） -->
            <path d="M16 2 L13 6 L16 7 L19 6 Z" fill="currentColor" stroke="none" />
            <!-- 上方交叉双刃（左上/右上） -->
            <path d="M16 8 C 11 6, 6 9, 7 14 C 11 13, 14 11, 16 10 Z" fill="currentColor" stroke="currentColor" stroke-width="0.4" />
            <path d="M16 8 C 21 6, 26 9, 25 14 C 21 13, 18 11, 16 10 Z" fill="currentColor" stroke="currentColor" stroke-width="0.4" />
            <!-- 中央菱形宝石 -->
            <path d="M16 13 L20 17 L16 21 L12 17 Z" fill="currentColor" stroke="url(#bm-grad)" stroke-width="0.6" />
            <!-- 下方交叉双刃（左下/右下） -->
            <path d="M16 19 C 11 20, 7 24, 9 28 C 12 26, 14 23, 16 22 Z" fill="currentColor" stroke="currentColor" stroke-width="0.4" />
            <path d="M16 19 C 21 20, 25 24, 23 28 C 20 26, 18 23, 16 22 Z" fill="currentColor" stroke="currentColor" stroke-width="0.4" />
            <!-- 底部血滴 -->
            <circle cx="16" cy="30.5" r="0.6" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span class="brand-text">{{ SITE.name }}</span>
      </router-link>

      <nav class="nav">
        <router-link to="/" class="nav-item" exact-active-class="active">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12l9-9 9 9" />
            <path d="M5 10v10h14V10" />
          </svg>
          <span class="nav-label">首页</span>
        </router-link>
        <router-link to="/projects" class="nav-item" active-class="active">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span class="nav-label">项目展示</span>
        </router-link>
        <router-link to="/diary" class="nav-item" active-class="active">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
          <span class="nav-label">日记</span>
        </router-link>
        <router-link to="/album" class="nav-item" active-class="active">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="11" r="2" />
            <path d="M21 17l-5-5-9 7" />
          </svg>
          <span class="nav-label">相册</span>
        </router-link>
        <router-link to="/about" class="nav-item" active-class="active">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
          </svg>
          <span class="nav-label">关于</span>
        </router-link>
      </nav>

      <div class="header-right">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  background: var(--color-surface-strong);
}
.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 16px;
  flex-shrink: 0;
}
.brand:hover {
  color: var(--color-primary);
}
.brand-mark {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-button);
  color: #fff;
  border-radius: 8px;
}
.brand-glyph {
  transition: transform 0.3s ease, filter 0.3s ease;
}
.brand:hover .brand-glyph {
  transform: rotate(-6deg) scale(1.08);
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
}
.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}
.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  color: var(--color-text-soft);
  font-size: 14px;
  transition: all 0.2s ease;
}
.nav-item:hover {
  color: var(--color-primary);
  background: var(--color-primary-bg);
}
.nav-item.active {
  color: var(--color-primary);
  background: var(--color-primary-bg);
  font-weight: 500;
}
.header-right {
  flex-shrink: 0;
}
@media (max-width: 768px) {
  .header-inner {
    gap: 12px;
  }
  .nav {
    gap: 2px;
  }
  .nav-item {
    padding: 6px 8px;
  }
  .nav-label {
    display: none;
  }
  .brand-text {
    font-size: 14px;
  }
}
</style>
