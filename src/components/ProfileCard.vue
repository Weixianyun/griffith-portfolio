<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useGitHub } from '../composables/useGitHub'
import { SITE } from '../data/site'
import { AVATAR_DATA_URL } from '../data/avatar'

const { theme } = useTheme()
const { stats } = useGitHub('Weixianyun')

const username = 'Weixianyun'
const profileUrl = computed(() => `https://github.com/${username}`)
const githubAvatarUrl = computed(
  () => `https://avatars.githubusercontent.com/${username}?v=4`
)

// 优先级：内嵌 dataURL → 失败回退 GitHub 头像
const avatarSrc = computed(() => AVATAR_DATA_URL || githubAvatarUrl.value)

const socialIcons = {
  github: 'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5 0-.24-.01-.88-.01-1.74-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.12-1.5-1.12-1.5-.91-.64.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.41 9.41 0 0 1 12 7.07c.85.01 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.5C19.13 20.6 22 16.77 22 12.25 22 6.58 17.52 2 12 2z',
  bilibili: 'M17.81 4.47c.39.39.39 1.03 0 1.42l-1.7 1.7h2.39c1.66 0 3 1.34 3 3v8.82c0 1.66-1.34 3-3 3H5.5c-1.66 0-3-1.34-3-3V10.59c0-1.66 1.34-3 3-3h2.39l-1.7-1.7a.996.996 0 1 1 1.41-1.42L12 8.36l4.4-4.42a.996.996 0 0 1 1.41 0zM7.5 13.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
  email: 'M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11zm2.5-.5l6.5 5 6.5-5h-13zm13 2.7l-6.5 5 -6.5-5v8.3h13V8.7z'
}

const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <div class="profile-card glass">
    <div class="avatar-wrap">
      <div class="avatar-ring" :class="{ dark: isDark }">
        <img :src="avatarSrc" alt="avatar" class="avatar" @error="(e) => (e.target.src = githubAvatarUrl)" />
      </div>
    </div>

    <div class="profile-name">{{ SITE.nickname }}</div>
    <div class="profile-title">{{ SITE.title }}</div>

    <div class="socials">
      <a
        v-for="s in SITE.socials"
        :key="s.key"
        :href="s.url"
        target="_blank"
        rel="noopener"
        :title="s.label"
        class="social-btn"
        :style="{ '--sc': s.color }"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path :d="socialIcons[s.key]" />
        </svg>
      </a>
    </div>

    <div class="stats">
      <a class="stat" :href="profileUrl" target="_blank" rel="noopener">
        <div class="num">{{ stats.stars || 0 }}</div>
        <div class="label">Stars</div>
      </a>
      <a class="stat" :href="`${profileUrl}?tab=followers`" target="_blank" rel="noopener">
        <div class="num">{{ stats.followers || 0 }}</div>
        <div class="label">Followers</div>
      </a>
      <a class="stat" :href="`${profileUrl}?tab=following`" target="_blank" rel="noopener">
        <div class="num">{{ stats.following || 0 }}</div>
        <div class="label">Following</div>
      </a>
      <a class="stat" :href="`${profileUrl}?tab=repositories`" target="_blank" rel="noopener">
        <div class="num">{{ stats.repos || 0 }}</div>
        <div class="label">Repos</div>
      </a>
    </div>

    <a :href="profileUrl" target="_blank" rel="noopener" class="btn btn-primary visit-btn">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5 0-.24-.01-.88-.01-1.74-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.12-1.5-1.12-1.5-.91-.64.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.41 9.41 0 0 1 12 7.07c.85.01 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.5C19.13 20.6 22 16.77 22 12.25 22 6.58 17.52 2 12 2z" />
      </svg>
      访问 GitHub
    </a>
  </div>
</template>

<style scoped>
.profile-card {
  padding: 24px 16px;
  text-align: center;
}
.avatar-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.avatar-ring {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
  transition: all 0.3s ease;
}
.avatar-ring.dark {
  background: linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35);
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-bg);
  display: block;
}
.profile-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}
.profile-title {
  font-size: 12px;
  color: var(--color-text-soft);
  margin-bottom: 16px;
}
.socials {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}
.social-btn {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-primary-bg);
  color: var(--sc, var(--color-primary));
  transition: transform 0.2s ease;
}
.social-btn:hover {
  transform: translateY(-2px) scale(1.05);
  color: var(--sc, var(--color-primary));
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px dashed var(--color-border);
  border-bottom: 1px dashed var(--color-border);
}
.stat {
  text-align: center;
  color: var(--color-text-soft);
  transition: color 0.2s ease;
}
.stat:hover {
  color: var(--color-primary);
}
.stat .num {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}
.stat .label {
  font-size: 10px;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.visit-btn {
  width: 100%;
  justify-content: center;
}
</style>
