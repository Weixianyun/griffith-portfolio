import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'griffith-theme'

const theme = ref('light')
let initialized = false

function detectInitial() {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  if (!initialized) {
    theme.value = detectInitial()
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme.value)
    }
    initialized = true
  }

  watch(
    theme,
    (val) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', val)
      }
      try {
        localStorage.setItem(STORAGE_KEY, val)
      } catch (e) {
        /* noop */
      }
    },
    { immediate: false }
  )

  onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
  })

  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function set(t) {
    if (t === 'light' || t === 'dark') theme.value = t
  }

  return { theme, toggle, set }
}
