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
    title: 'ToolJet：开源低代码平台，把内部工具开发效率拉满 10 倍',
    date: '2026-08-16',
    excerpt: 'ToolJet 是一款开源的企业级低代码 / AI 应用生成平台，React 18 + NestJS 全栈 TS，50+ 数据源直连，内置 LLM Agent 节点。本文从技术栈、核心功能、与同类项目对比、独立开发者变现路径等维度展开。',
    tags: ['低代码', 'TypeScript', 'React'],
    words: 1280,
    sourceFile: 'src/data/posts/2026-08-16-tooljet.md',
    repoUrl: 'https://github.com/ToolJet/ToolJet',
    content: `# ToolJet：开源低代码平台，把内部工具开发效率拉满 10 倍

ToolJet 是一款开源的企业级低代码 / AI 应用生成平台，让你像搭积木一样快速构建内部工具、运营后台、数据仪表盘、业务工作流甚至 AI Agent，而无需从零造前端。

## 一句话定位

拖拽式 UI 编辑器 + 多数据源直连 + 插件化业务逻辑 + 原生 AI Agent 能力。它是当前开源生态里，唯一同时满足"开源 + 原生 AI + 沙箱安全 + 中文友好"四要素的低代码平台。

## 技术栈

- 前端：React 18 + TypeScript + Tailwind + dnd-kit
- 后端：NestJS（Node.js + TypeScript）
- 数据库：Postgres / MySQL / MongoDB / MSSQL / MariaDB
- 插件体系：Node.js 子进程沙箱，每个插件独立运行，故障隔离
- AI 能力：内置 LLM 节点，支持 OpenAI / Anthropic / 自托管模型
- 许可：AGPL-3.0，社区版可商用，保留版权与网络服务条款即可

## 核心功能

**可视化拖拽式 UI 编辑器** 内置 40+ 组件（表格、表单、图表、地图、富文本等），画布所见即所得。

**多数据源直连** 支持 Postgres、MySQL、MongoDB、Redis、REST API、GraphQL、gRPC、S3、Stripe、Notion、Airtable 等 50+ 数据源，零胶水代码。

**插件化业务逻辑** 在 JS / Python 沙箱里写插件，处理数据转换、签名校验、API 编排。

**AI Agent 原生支持** 内置 LLM 节点 + Tool Calling，搭一个对话式查数据库的应用只需 10 分钟。

**自托管一键部署** Docker / Kubernetes / DigitalOcean / AWS AMI，30 分钟跑起来。

## 对比 Appsmith 与 Retool

| 维度 | ToolJet | Appsmith | Retool |
|---|---|---|---|
| 开源 | AGPL | AGPL | 闭源 + 自托管收费 |
| AI Agent | 原生支持 | 需自接 | 需自接 |
| 插件沙箱 | Node 子进程隔离 | 同进程 | 闭源 |
| 多租户 RBAC | 完善 | 较薄 | 完善 |
| 中文文档 | 官方译文 | 社区翻译 | 无 |
| 上手成本 | 中 | 较低 | 中 |

差异化看点在于，技术栈前后端统一用 TypeScript，对前端开发者特别友好；插件沙箱机制让二次开发的空间几乎无限。

## 客观短板

- AGPL 协议：对外提供 SaaS 必须开源，对纯自用或内网部署无影响。
- 学习曲线比 Appsmith 略陡：插件沙箱 + 多数据源模型需要花 1-2 天理解。
- 生态成熟度仍弱于 Retool：第三方组件和模板数量有差距。
- 国内访问偶有不稳：CDN 节点问题，自托管可解。
- 重型场景需自建性能监控：高并发下需要单独调优。

## 适合谁，不适合谁

适合：中小团队要快速搭内部工具或数据看板；独立开发者做 SaaS 原型 MVP；运维 / 数据 / 运营团队的提效工具；想用 AI Agent 改造企业流程的探索者。

不适合：强 ToC 复杂前端应用；必须用非 AGPL 协议的商业产品；追求极致性能的高频交易系统。

## 普通开发者能学到什么

- NestJS 模块化架构：一个中型企业级项目的工程范本
- 可视化编辑器实现：拖拽、撤销、重做、JSON Schema 驱动 UI
- 沙箱安全模型：子进程隔离 + 双向 IPC + 资源限制
- Postgres 高级特性：行级安全、视图、物化视图
- 插件化设计哲学：核心与扩展的边界划分

## 独立开发者价值

上手成本低，会 React 加一点 SQL，一周就能做出内部工具 MVP。二次开发空间大，插件机制加自定义组件几乎可以无限扩展。

变现路径有三条：一是给中小企业做内部工具定制外包，按项目收费 5-20 万；二是自托管 SaaS，保留版权加提供运维，做成订阅制；三是搭好 AI Agent 应用模板卖模板，做 AI Agent 应用商店。合规上，自部署版避开 AGPL 网络条款，最适合国内私有化场景。

## 中文友好度

官方中文文档翻译完成度 80% 以上。中文社区活跃，微信群和飞书群 2000+ 开发者。Issue 中英文均响应，平均 24 小时内。国内多家厂商基于 ToolJet 做二次发行。

## 总结

ToolJet 不是一个玩具级低代码，它是一个真正可以撑起中型企业内部工具链的生产级框架。如果你有内部工具重复造轮子的痛，强烈建议花一周试试。

GitHub: https://github.com/ToolJet/ToolJet`
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
