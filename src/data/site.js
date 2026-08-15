// 站点全局数据 / 配置
export const SITE = {
  name: '鷹の団',
  nickname: 'Gr1ff1th',
  title: '计算机科学与技术本科生',
  email: 'weixianyun55@gmail.com',
  location: '济南',
  startDate: '2026-08-15',
  copyright: '© 2026 鹰の团 · Gr1ff1th. All Rights Reserved.',
  socials: [
    {
      key: 'github',
      label: 'GitHub',
      url: 'https://github.com/Weixianyun',
      color: '#0f172a'
    },
    {
      key: 'bilibili',
      label: 'Bilibili',
      url: 'https://space.bilibili.com/',
      color: '#fb7299'
    },
    {
      key: 'email',
      label: 'Email',
      url: 'mailto:weixianyun55@gmail.com',
      color: '#3b82f6'
    }
  ]
}

export const NOTICES = {
  light: {
    jp: '光の鷹は翔ぶ。白銀の翼、蒼き眼。',
    zh: '光之鹰展翅翱翔。白银之翼，蔚蓝之瞳。'
  },
  dark: {
    jp: '闇の翼は降りる。血と闇の彼方より。',
    zh: '暗之翼降临。自血与暗之彼方。'
  }
}

export const SKILLS = [
  '软件设计',
  '应用开发',
  '插件开发',
  '艺术创作',
  '前沿科技'
]

export const TAGS = [
  { name: 'Vue', count: 8, color: '#42b883' },
  { name: 'React', count: 5, color: '#61dafb' },
  { name: 'TypeScript', count: 6, color: '#3178c6' },
  { name: 'Flutter', count: 4, color: '#02569b' },
  { name: 'Rust', count: 3, color: '#dea584' },
  { name: 'WebGL', count: 2, color: '#990000' },
  { name: 'Python', count: 7, color: '#3776ab' },
  { name: 'Go', count: 2, color: '#00add8' },
  { name: 'Wails', count: 1, color: '#f5a623' },
  { name: '随笔', count: 9, color: '#94a3b8' }
]

export const TECH_STACK = [
  { name: 'Vue 3', color: '#42b883', icon: 'vue' },
  { name: 'Rust', color: '#dea584', icon: 'rust' },
  { name: 'Go', color: '#00add8', icon: 'go' },
  { name: 'TypeScript', color: '#3178c6', icon: 'ts' },
  { name: 'Python', color: '#3776ab', icon: 'py' },
  { name: 'React', color: '#61dafb', icon: 'react' },
  { name: 'Wails', color: '#f5a623', icon: 'wails' },
  { name: 'WebGL', color: '#990000', icon: 'webgl' }
]

// 示例数据（可空 — 留接口便于以后接入）
export const PROJECTS = []

export const ARTICLES = []

export const ALBUMS = []

// 站点统计数据（可空时为 0）
export const SITE_STATS = {
  articleCount: ARTICLES.length,
  categoryCount: 3,
  tagCount: TAGS.length,
  totalWords: 0
}
