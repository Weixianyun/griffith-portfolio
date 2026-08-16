import { ref } from 'vue'

const STATS_CACHE_KEY = 'griffith-github-stats'
const REPOS_CACHE_KEY = 'griffith-github-repos'
const CACHE_TTL = 10 * 60 * 1000 // 10 分钟

const stats = ref({
  stars: 0,
  followers: 0,
  following: 0,
  repos: 0,
  loading: false,
  error: null,
  fetchedAt: 0
})

const repos = ref({
  list: [],
  loading: false,
  error: null,
  fetchedAt: 0
})

function readCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (Date.now() - data.fetchedAt > CACHE_TTL) return null
    return data
  } catch (e) {
    return null
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
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

async function fetchRepos(username) {
  const headers = { Accept: 'application/vnd.github+json' }
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  )
  if (!res.ok) throw new Error('GitHub API: ' + res.status)
  return res.json()
}

function mapRepo(r) {
  return {
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    desc: r.description || '',
    url: r.html_url,
    homepage: r.homepage || '',
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    language: r.language || '',
    topics: Array.isArray(r.topics) ? r.topics : [],
    updatedAt: r.updated_at || '',
    pushedAt: r.pushed_at || '',
    archived: !!r.archived,
    fork: !!r.fork,
    cover: r.owner?.avatar_url || ''
  }
}

export function useGitHub(username = 'Weixianyun') {
  async function refresh(force = false) {
    if (!force) {
      const cached = readCache(STATS_CACHE_KEY)
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
      writeCache(STATS_CACHE_KEY, stats.value)
    } catch (e) {
      stats.value.loading = false
      stats.value.error = e.message || 'Fetch failed'
    }
  }

  async function refreshRepos(force = false) {
    if (!force) {
      const cached = readCache(REPOS_CACHE_KEY)
      if (cached) {
        repos.value = { ...cached, loading: false, error: null }
        return
      }
    }
    repos.value.loading = true
    repos.value.error = null
    try {
      const data = await fetchRepos(username)
      const list = (Array.isArray(data) ? data : [])
        .map(mapRepo)
        .sort((a, b) => b.stars - a.stars)
      repos.value = {
        list,
        loading: false,
        error: null,
        fetchedAt: Date.now()
      }
      writeCache(REPOS_CACHE_KEY, repos.value)
    } catch (e) {
      repos.value.loading = false
      repos.value.error = e.message || 'Fetch failed'
    }
  }

  return { stats, repos, refresh, refreshRepos }
}
