import { ref } from 'vue'

const CACHE_KEY = 'griffith-github-stats'
const CACHE_TTL = 5 * 60 * 1000 // 5 分钟

const stats = ref({
  stars: 0,
  followers: 0,
  following: 0,
  repos: 0,
  loading: false,
  error: null,
  fetchedAt: 0
})

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (Date.now() - data.fetchedAt > CACHE_TTL) return null
    return data
  } catch (e) {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch (e) {
    /* noop */
  }
}

async function fetchUser(username) {
  const headers = { Accept: 'application/vnd.github+json' }
  const res = await fetch(`https://api.github.com/users/${username}`, { headers })
  if (!res.ok) throw new Error('GitHub API: ' + res.status)
  return res.json()
}

export function useGitHub(username = 'Weixianyun') {
  async function refresh(force = false) {
    if (!force) {
      const cached = readCache()
      if (cached) {
        stats.value = { ...cached, loading: false, error: null }
        return
      }
    }
    stats.value.loading = true
    stats.value.error = null
    try {
      const data = await fetchUser(username)
      stats.value = {
        stars: data.public_repos || 0,
        followers: data.followers || 0,
        following: data.following || 0,
        repos: data.public_repos || 0,
        loading: false,
        error: null,
        fetchedAt: Date.now()
      }
      writeCache(stats.value)
    } catch (e) {
      stats.value.loading = false
      stats.value.error = e.message || 'Fetch failed'
    }
  }

  return { stats, refresh }
}
