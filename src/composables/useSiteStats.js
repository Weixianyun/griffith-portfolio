import { ref, onMounted, onUnmounted } from 'vue'

// 运行天数：从 SITE_START（2026-08-15）起，0 天即表示今天就是启动日
const SITE_START = new Date('2026-08-15T00:00:00')

function calcDays() {
  const now = new Date()
  const start = new Date(
    SITE_START.getFullYear(),
    SITE_START.getMonth(),
    SITE_START.getDate()
  )
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.floor((today - start) / 86400000)
  return Math.max(0, diff)
}

export function useSiteStats() {
  const days = ref(calcDays())
  let timer = null

  function refresh() {
    days.value = calcDays()
  }

  onMounted(() => {
    timer = setInterval(refresh, 60 * 1000)
  })
  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { days }
}
