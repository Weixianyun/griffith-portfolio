<script setup>
import { ref, computed } from 'vue'

const today = new Date()
const cursor = ref({ year: today.getFullYear(), month: today.getMonth() })

const markedDays = ref({})

const monthLabel = computed(() => {
  return `${cursor.value.year} 年 ${cursor.value.month + 1} 月`
})
const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const cells = computed(() => {
  const first = new Date(cursor.value.year, cursor.value.month, 1)
  const offset = first.getDay()
  const daysInMonth = new Date(cursor.value.year, cursor.value.month + 1, 0).getDate()
  const arr = []
  for (let i = 0; i < offset; i++) arr.push(null)
  for (let d = 1; d <= daysInMonth; d++) arr.push(d)
  while (arr.length % 7 !== 0) arr.push(null)
  return arr
})

function isToday(d) {
  return d === today.getDate() && cursor.value.month === today.getMonth() && cursor.value.year === today.getFullYear()
}

function hasMark(d) {
  if (!d) return false
  return markedDays.value[`${cursor.value.year}-${cursor.value.month}-${d}`]
}

function prev() {
  const d = new Date(cursor.value.year, cursor.value.month - 1, 1)
  cursor.value = { year: d.getFullYear(), month: d.getMonth() }
}
function next() {
  const d = new Date(cursor.value.year, cursor.value.month + 1, 1)
  cursor.value = { year: d.getFullYear(), month: d.getMonth() }
}
</script>

<template>
  <div class="calendar glass">
    <div class="header">
      <button class="nav-btn" @click="prev" aria-label="上个月">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span class="title">{{ monthLabel }}</span>
      <button class="nav-btn" @click="next" aria-label="下个月">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
    <div class="weekdays">
      <span v-for="(w, i) in weekdays" :key="i" :class="{ weekend: i === 0 || i === 6 }">{{ w }}</span>
    </div>
    <div class="grid">
      <div
        v-for="(d, i) in cells"
        :key="i"
        class="cell"
        :class="{
          empty: !d,
          today: isToday(d),
          marked: hasMark(d)
        }"
      >
        <span v-if="d" class="num">{{ d }}</span>
        <span v-if="d" class="dot" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  padding: 16px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}
.nav-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-soft);
  transition: all 0.2s ease;
}
.nav-btn:hover {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 6px;
}
.weekdays span {
  text-align: center;
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 4px 0;
}
.weekdays .weekend {
  color: var(--color-primary);
}
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.cell {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 12px;
  color: var(--color-text-soft);
  cursor: default;
  transition: background 0.2s ease;
}
.cell:hover {
  background: var(--color-primary-bg);
}
.cell.empty {
  cursor: default;
  pointer-events: none;
}
.cell .num {
  position: relative;
  z-index: 1;
}
.cell.today {
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
}
.cell.today .dot {
  background: #fff;
}
.cell .dot {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.cell.marked .dot {
  opacity: 1;
}
</style>
