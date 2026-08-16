// 站点全局数据 / 配置
export const SITE = {
  name: '鷹の団',
  nickname: 'Gr1ff1th',
  title: '个人开发者',
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
    jp: '光の鷹は翔ぶ 白銀の翼、蒼き眼',
    zh: '光之鹰展翅翱翔 白银之翼，蔚蓝之瞳'
  },
  dark: {
    jp: '闇の翼は降り る血と闇の彼方より',
    zh: '暗之翼降临 来自血与暗之彼方。'
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
  { name: 'React', count: 6, color: '#61dafb' },
  { name: 'TypeScript', count: 7, color: '#3178c6' },
  { name: 'Flutter', count: 4, color: '#02569b' },
  { name: 'Rust', count: 3, color: '#dea584' },
  { name: 'WebGL', count: 2, color: '#990000' },
  { name: 'Python', count: 8, color: '#3776ab' },
  { name: 'Go', count: 2, color: '#00add8' },
  { name: 'Wails', count: 1, color: '#f5a623' },
  { name: '随笔', count: 9, color: '#94a3b8' },
  { name: '低代码', count: 1, color: '#8b5cf6' }
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
export const PROJECTS = [
  // {
  //   id: 1,
  //   title: '示例项目',
  //   desc: '项目描述',
  //   cover: '',
  //   tags: ['Vue', 'TS'],
  //   url: '#'
  // }
]

export const ARTICLES = [
  {
    id: 1,
    title: '一周一个 GitHub 神器 · 第 1 期：ToolJet——开源低代码神器，把内部工具开发效率拉满 10 倍',
    date: '2026-08-16',
    excerpt: 'ToolJet 是一款开源的企业级低代码 / AI 应用生成平台，React 18 + NestJS 全栈 TS，50+ 数据源直连，内置 LLM Agent 节点。本文从技术栈、核心功能、对比 Appsmith/Retool、独立开发者变现路径、中文友好度等维度做深度测评，附 3 个 AI Agent 新锐项目速览。',
    tags: ['低代码', 'TypeScript', 'React'],
    words: 1480,
    sourceFile: 'src/data/posts/2026-08-16-tooljet.md',
    repoUrl: 'https://github.com/ToolJet/ToolJet'
  }
]

export const ALBUMS = []

// 站点统计数据（可空时为 0）
export const SITE_STATS = {
  articleCount: ARTICLES.length,
  categoryCount: 3,
  tagCount: TAGS.length,
  totalWords: ARTICLES.reduce((s, a) => s + (a.words || 0), 0),
  lastUpdated: '2026-08-16'
}
