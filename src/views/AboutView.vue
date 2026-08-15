<script setup>
import { SITE } from '../data/site'
import { useSiteStats } from '../composables/useSiteStats'

const { days } = useSiteStats()

const startDate = new Date(SITE.startDate)
const startStr = `${startDate.getFullYear()} 年 ${startDate.getMonth() + 1} 月 ${startDate.getDate()} 日`

const skills = [
  { name: '软件设计', icon: '✦' },
  { name: '应用开发', icon: '◆' },
  { name: '插件开发', icon: '◉' },
  { name: '艺术创作', icon: '✿' },
  { name: '前沿科技', icon: '✧' }
]
</script>

<template>
  <div class="about">
    <section class="card glass">
      <h2>关于我</h2>
      <p>
        这里是 <strong>{{ SITE.nickname }}</strong>，一名
        <strong>{{ SITE.title }}</strong>。
        热爱软件设计、应用开发、插件开发，也喜欢艺术创作和前沿科技。
        本站是个人作品集与博客，记录我的学习与思考。
      </p>
      <p>
        站点始于 <strong>{{ startStr }}</strong>，至今已运行
        <strong>{{ days }}</strong> 天。
      </p>
    </section>

    <section class="card glass">
      <h2>技能方向</h2>
      <div class="skills">
        <div v-for="s in skills" :key="s.name" class="skill">
          <span class="icon">{{ s.icon }}</span>
          <span>{{ s.name }}</span>
        </div>
      </div>
    </section>

    <section class="card glass">
      <h2>联系方式</h2>
      <ul class="contacts">
        <li v-for="s in SITE.socials" :key="s.key">
          <strong>{{ s.label }}：</strong>
          <a :href="s.url" target="_blank" rel="noopener">{{ s.url }}</a>
        </li>
        <li v-if="SITE.email">
          <strong>邮箱：</strong>
          <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card {
  padding: 20px;
}
.card h2 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.card h2::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 14px;
  background: var(--color-primary);
  border-radius: 2px;
}
.card p {
  font-size: 14px;
  color: var(--color-text-soft);
  line-height: 1.8;
  margin-bottom: 8px;
}
.card p:last-child {
  margin-bottom: 0;
}
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: 13px;
}
.skill .icon {
  color: var(--color-primary);
  font-size: 14px;
}
.contacts {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.contacts li {
  font-size: 13px;
  color: var(--color-text-soft);
}
.contacts strong {
  color: var(--color-text);
  margin-right: 4px;
}
</style>
