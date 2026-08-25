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

export const QUICK_LINKS = [
  {
    key: 'github',
    label: 'GitHub',
    url: 'https://github.com/Weixianyun',
    color: '#0f172a'
  },
  {
    key: 'bing',
    label: 'Bing',
    url: 'https://www.bing.com/',
    color: '#008373'
  },
  {
    key: 'bilibili',
    label: 'Bilibili',
    url: 'https://space.bilibili.com/',
    color: '#fb7299'
  },
  {
    key: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/',
    color: '#ff0000'
  }
]

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
  { name: 'Vue', count: 9, color: '#42b883' },
  { name: 'React', count: 6, color: '#61dafb' },
  { name: 'TypeScript', count: 9, color: '#3178c6' },
  { name: 'Flutter', count: 4, color: '#02569b' },
  { name: 'Rust', count: 3, color: '#dea584' },
  { name: 'WebGL', count: 2, color: '#990000' },
  { name: 'Python', count: 8, color: '#3776ab' },
  { name: 'Go', count: 2, color: '#00add8' },
  { name: 'Wails', count: 1, color: '#f5a623' },
  { name: '随笔', count: 9, color: '#94a3b8' },
  { name: '低代码', count: 1, color: '#8b5cf6' },
  { name: 'AI Agent', count: 3, color: '#06b6d4' }
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
    words: 1180,
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
  },
  {
    id: 2,
    title: '深入理解 AI Agent：把 LLM 装上双手，10 章吃透工程',
    date: '2026-08-17',
    excerpt: 'bojieli/ai-agent-book 是李博杰主笔的中文 AI Agent 教材，10 章 + 95 个 uv 锁定实验，覆盖上下文工程、MCP 工具、Coding Agent、评估、SFT/RL 与多 Agent 协作，正文、PDF、代码全部 Apache-2.0 开源。本文从技术栈、对比、独立开发者变现角度深度测评。',
    tags: ['AI Agent', 'Python', '随笔'],
    words: 1443,
    sourceFile: 'src/data/posts/2026-08-17-ai-agent-book.md',
    repoUrl: 'https://github.com/bojieli/ai-agent-book',
    content: `# 深入理解 AI Agent：把 LLM 装上双手，10 章吃透 Agent 工程

当所有人都在堆 Agent Demo 时，李博杰（bojieli）把 10 章、95 个实验、13 种语言写成一本完全开源的工程书，把「Agent = LLM + 上下文 + 工具」这个公式从原理讲到生产。

## 一句话定位

它是当前 GitHub 上少有的、系统覆盖「上下文工程 / MCP 工具 / Coding Agent / 评估 / 后训练 / 多 Agent 协作」六大主题的中文 AI Agent 教材；正文、配图、代码、PDF 全部 Apache-2.0 开源，且配套实验可一键 uv 复现。

## 技术栈

- 语言：Python 3.11-3.13
- 依赖管理：uv（提交 uv.lock，可锁定复现）
- 文档工具链：pandoc + xelatex + ElegantBook（LaTeX 文档类）
- 评测与训练：verl、TRL、Unsloth、vLLM、LiteLLM、Ollama、Playwright
- 协议：MCP、Claude API、OpenAI 兼容、国产 Kimi / GLM / DeepSeek / Qwen
- 许可：Apache-2.0，可商用、可改、可闭源分发

## 核心功能

**Agent 基础知识（Ch.1）** 给出 Agent 三件套的最小心智模型，并指出 Harness 工程才是真正的护城河。

**上下文工程（Ch.2）** 系统讲 KV Cache、提示工程、Agent Skills、上下文压缩，把「上下文决定能力上限」落到可复现的实验。

**用户记忆与知识库（Ch.3）** 覆盖跨会话记忆、RAG、结构化索引、知识图谱，给出在 LLM 上做长期记忆的工程范式。

**工具与 MCP（Ch.4）** 拆解感知 / 执行 / 协作三类工具，引入事件驱动异步 Agent 与主动工具发现，紧贴 2026 年 MCP 协议落地节奏。

**Coding Agent 与评估（Ch.5/Ch.7）** 13 个实验铺出生产级 Coding Agent 全景，并给出评测环境、指标、统计显著性方法。

**后训练与持续进化（Ch.8/Ch.9）** 拆解 SFT / RL 何时选、工具调用如何内化、Agent 如何从运行轨迹自我迭代。

**多 Agent 协作（Ch.10）** 给出协作框架、上下文共享与隔离策略，并配套 TalkAct 与斯坦福生成式 Agent 复现。

## 对比 shareAI-lab/learn-claude-code 与 Lilian Weng 博客

| 维度 | 本项目 | shareAI-lab/learn-claude-code | Lilian Weng 博客 |
|---|---|---|---|
| 开源 | Apache-2.0，正文+代码全开 | 仅代码，缺系统文档 | 仅博客，无实验 |
| AI 支持 | 通用 Agent 六主题全覆盖 | 聚焦 Claude Code 子集 | 综述型，无代码 |
| 配套实验 | 95 个 uv 锁定 | 单仓小型 demo | 0 |
| 多语言 | 13 种（含中英西俄日韩） | 中英为主 | 英文 |
| 系统性 | 教材级、10 章递进 | 工程笔记 | 单篇长文 |
| 中文友好 | 原生中文 + 繁中 | 中文注释 | 翻译滞后 |

差异化在于：把综述类长文升级为「可复现的教材」，并以 uv.lock 锁版本；多语言译本对国内独立开发者最直接可用。

## 客观短板

- 章节深度不均：Ch.8 后训练偏重实验演示，模型对齐理论只点到为止。
- 配套实验需 GPU：第 8 章 SFT/RL 实验必须本地有 CUDA 环境，纯 CPU 跑不动。
- 知识更新慢于主线：13 种语言译本同步靠社区，英文版偶有滞后。
- 不提供 SaaS：只给源码与 PDF，没有托管 Playground。
- 印刷版缺失：仅 PDF / EPUB / 在线阅读，无纸书渠道。

## 适合谁，不适合谁

适合：要把 LLM 真正落到生产系统的独立开发者；想从零搭 Agent 的全栈工程师；做 AI Agent 培训与教学的讲师；正在评估 Agent 选型与自研路径的架构师；研究生阶段想补 Agent 工程实践的高年级学生。

不适合：只想 5 分钟跑通 Demo 的纯应用层用户；没有 Python 基础、只想看科普结论的非技术读者；要求完整印刷版的传统出版读者。

## 普通开发者能学到什么

- LLM 推理时 KV Cache 的工作机制与提示工程代价
- 用 MCP 协议把工具抽象为可发现的服务
- 上下文压缩与摘要策略在长任务里的工程取舍
- 评测驱动的 Agent 选型与统计显著性检验
- 简单 RL 配方在工具调用任务上的样本效率边界

## 独立开发者价值

上手成本低，会 Python 加 LLM 基础调用就能跑 Ch.1-4 的全部实验，Ch.5-7 跟着 uv 同步即可，Ch.8-10 视硬件选做。

二次开发空间很大，正文是 Markdown，代码是 uv 锁定包，改一段就能 fork 出自己的内部培训材料；甚至可以直接接 LLM API 改写为「公司内部的 Agent 工程手册」。

变现路径有三条：一是把 10 章拆成公众号 / 知乎 / B 站付费专栏，单价 99-299 元；二是基于配套实验做线下 AI Agent 训练营，1-2 天课程定价 1500-3000 元；三是把第 6 章 Computer Use 改造为「门店巡检 / 报表生成」垂直 SaaS，按月订阅 99-499 元。

合规友好度极高，Apache-2.0 允许商用、修改、闭源再分发，仅需保留版权声明，对国内独立开发者做商业产品零法律摩擦。

## 中文友好度

- 文档：中文为原版，繁中、英文、西班牙、俄、日、韩等 13 种语言已上线
- 社区：作者长期在 GitHub Issue、知乎、即刻与读者互动，PR 接受勘误
- 响应：Issue 平均 1-3 天首次回复，作者本人高频维护
- 访问：仓库、PDF、EPUB、在线阅读站点全程可直连 GitHub，国内访问稳定

## 总结

《深入理解 AI Agent》不是又一本「用 ChatGPT 写个客服」的速成读物，它把 Harness、上下文、MCP、评估、SFT/RL、多 Agent 这些工程关键词压进 10 章、95 个实验。

如果你准备做 Agent 相关产品或系统升级，这一本可以顶过去三本英文综述的工程量。

GitHub: https://github.com/bojieli/ai-agent-book`
  },
  {
    id: 3,
    title: 'n8n：把 AI Agent 装进画布的开源工作流引擎',
    date: '2026-08-17',
    excerpt: 'n8n 是面向工程师的可视化工作流与 AI Agent 编排平台，1500+ 集成、LangChain 节点、MCP Client/Server 双栈、Vue 3 + TypeScript 全栈。本文从技术栈、核心功能、与 Zapier / Make / Activepieces 对比、独立开发者二次封装路径展开。',
    tags: ['AI Agent', 'Vue', 'TypeScript'],
    words: 1420,
    sourceFile: 'src/data/posts/2026-08-17-n8n.md',
    repoUrl: 'https://github.com/n8n-io/n8n',
    content: `# n8n：把 AI Agent 装进画布的开源工作流引擎

当所有人都在卷 LLM API 调用的代码量时，n8n 已经在 GitHub 上成为连接 AI 与企业既有系统的「事实级」自动化底座，并在最新 2.34 系列里把 AI Agent 直接搬进了可视化画布。

## 一句话定位

它是面向工程师的可视化工作流引擎，把 1500+ 集成、AI Agent 节点、HTTP / 代码节点同框编排，既能 npx 跑本地也能 Docker / Kubernetes 自托管，从原型到生产一条链路走完。

## 技术栈

- 前端：Vue 3 + TypeScript + Vite + Pinia
- 后端：Node.js 20 LTS + TypeScript + Express
- 队列：BullMQ（Redis 后端）
- 数据库：PostgreSQL 13+（生产推荐）/ SQLite（demo）
- AI：原生 OpenAI、Anthropic、Google Gemini、Ollama 节点 + LangChain 模板
- 协议：MCP Client / Server、REST、Webhook
- 许可：Sustainable Use License（自托管可商用，托管 SaaS 受限）

## 核心功能

**可视化画布 + 1500+ 集成** 拖拽节点连边即可搭流程，节点覆盖 Slack、Notion、Salesforce、Postgres、Hugging Face 等 1500+ 系统。

**AI Agent 原生支持** LangChain 节点、AI Tool、记忆、MCP Server 一应俱全，配合 OpenAI / Anthropic / Ollama 任意切换模型。

**JavaScript / Python 代码节点** 任意节点可内嵌代码片段，可直接 import npm 包，对程序员友好。

**Sub-workflow 与 Human-in-the-loop** 子流程可复用、暂停 / 恢复 / 审批节点支持，把流程拆到粒度合适。

**企业级观测与权限** 执行历史、调试器、审计日志、RBAC、SSO / SAML、变量加密，AI 流程有完整可追溯性。

**npx 起步 / Docker 自托管** 一行 npx n8n 起 demo，docker run 起生产，企业版支持 Kubernetes 与多实例。

## 对比 Zapier、Make 与 Activepieces

| 维度 | n8n | Zapier | Make | Activepieces |
|---|---|---|---|---|
| 开源 | Sustainable Use（可自托管） | 闭源 | 闭源 | MIT |
| AI Agent | 原生 LangChain 节点 + MCP | 需 OpenAI 插件 | 原生 AI 节点 | 原生 AI + MCP |
| 集成数量 | 1500+ | 7000+ | 1500+ | 500+ |
| 节点代码 | JS / Python + npm import | 仅简单 JS | 仅简单 JS | TS / npm import |
| 多租户 RBAC | 完善 | 完善 | 完善 | 中等 |
| 中文文档 | 社区翻译活跃 | 完整 | 完整 | 一般 |
| 上手成本 | 中 | 低 | 中 | 中 |

差异化在于「可自托管 + 可写代码 + AI 原生 + MCP 双向」的组合，让它在 ToB 工程团队里替代 Zapier 的同时承担 AI Agent 编排层的职责。

## 客观短板

- 协议为 Sustainable Use License：直接用 n8n 提供对外托管 SaaS 受限，企业级 SaaS 需谈商业授权。
- 内置 AI 节点偏 LangChain 视角：要做复杂 Agent 拓扑仍需自写 Python 节点。
- 自托管需要运维 Redis + Postgres + 队列监控，单机故障需自行兜底。
- 高频任务（>1000 exec/min）需多实例 + 队列调优，文档相对零散。
- 节点生态虽然 1500+，但部分国产 SaaS（飞书、钉钉深度集成）仍依赖社区节点。
- 调试器虽强，但复杂分支排错仍要靠执行历史，门槛高于纯代码。

## 适合谁，不适合谁

适合：要把 AI 能力塞进企业既有 SaaS 链路的全栈 / 后端工程师；自托管偏好强的中型团队技术中台；做 AI Agent PoC 又不想写胶水代码的产品 / 解决方案架构师；运维、数据、内容运营团队的提效工具建设者；想用 MCP 把外部工具接给 Claude / Cursor / 自研 Agent 的 AI 工程师。

不适合：纯运营 / 行政的非技术用户（Power Automate / Zapier 更轻）；以消费级高并发出号为商业模式（直接用 Temporal / 自研更划算）；强 ToC 前端交互产品（画布偏向工具链，不是面向终端用户的 UI）；需要 7×24 商业 SLA 又不愿付费企业版的关键业务。

## 普通开发者能学到什么

- 可视化编辑器的状态机建模：节点 / 连边 / 数据流的 JSON Schema 表达
- 队列驱动的异步执行模型：BullMQ + Redis 在长任务场景的标准用法
- AI Agent 与外部工具的协议抽象：MCP Client / Server 设计
- TypeScript 单体仓的多包管理：前后端共享类型、构建、测试的工程范本
- 节点即包：每个集成是独立 npm 包，动态加载、热更新、版本隔离
- 表达式引擎与表达式沙箱：可视化场景下 $json / $now 等上下文的安全求值

## 独立开发者价值

上手成本中等，会 JavaScript + 一点 API 概念，一周可以搭出 MVP。两点显著优势：第一，1500+ 集成大幅减少对接多家 SaaS 的胶水代码，独立开发者一个人就能撑起一个 SaaS 业务的中后台；第二，AI Agent + MCP 双向支持，意味着可以基于 n8n 包一层「行业 AI 自动化模板」做垂直 SaaS，比如电商选品自动化、本地服务线索清洗等。

二次开发空间大，节点可自定义、表达式可扩展、UI 主题可改，可以做出完全属于自己品牌的自动化产品。

变现路径有三条：一是做行业自动化模板售卖，单套 200-2000 元，复购率高于纯课程；二是给中小企业做集成实施外包，按流程节点数报价 3-15 万；三是自托管版套一层品牌做 SaaS 订阅，月费 99-999 元。

合规上，自托管 + 自用 + 不直接对外转售 n8n 本身属于协议允许范围；做实施服务、模板销售、二次封装产品都可走通，只要不直接与官方 n8n Cloud 抢同质市场。

## 中文友好度

- 文档：官方中文翻译覆盖核心模块，AI、表达式、MCP 章节有专门中文入口
- 社区：国内用户论坛、飞书 / 微信群数千人，腾讯云、阿里云、华为云均有镜像
- Issue：中英文均响应，企业版工单 1 工作日内，社区 Issue 1-3 天
- 访问：GitHub 仓库、官方文档、模板站国内均可直连，npx 与 Docker 镜像国内拉取稳定

## 总结

n8n 不是又一个 Zapier 平替，它把可视化工作流、AI Agent、可写代码、自托管这四件事压进了同一张画布。

如果你正面对「AI 能力如何嵌入企业既有系统」这个问题，n8n 值得花一个周末跑一遍 demo，而不是从零造一个调度器。

GitHub: https://github.com/n8n-io/n8n`
  },
  {
    id: 4,
    title: 'Firecrawl：把整个 Web 变成 LLM 可读上下文的开源引擎',
    date: '2026-08-25',
    excerpt: 'Firecrawl 是 GitHub 上 star 增速最快的 Web 上下文 API，Scrape / Crawl / Search / Map / Interact / Agent 七大端点，9 套官方 SDK、MCP Server 与 Skills 一应俱全，把整张互联网变成 LLM 可直接调用的数据底座。本文从技术栈、对比、独立开发者变现路径等维度深度测评。',
    tags: ['TypeScript', 'AI Agent'],
    words: 1420,
    sourceFile: 'src/data/posts/2026-08-25-firecrawl.md',
    repoUrl: 'https://github.com/firecrawl/firecrawl',
    content: `# Firecrawl：把整个 Web 变成 LLM 可读上下文的开源引擎

当所有人都在讨论 RAG 和 Agent 时，真正卡脖子的其实是「数据源」。Firecrawl 把搜索、抓取、整站爬取、结构化提取、AI 操作网页这五件事压进同一套 API，再配齐 9 套官方 SDK、MCP Server、Agent Skill 和 CLI，让 LLM 可以像调用数据库一样调用整张互联网。

## 一句话定位

它是当前 GitHub 上 star 增速最快的「Web 上下文 API」开源项目，定位是给 AI Agent 与 RAG 系统提供一站式网页数据底座，从 URL 到 Markdown / JSON / 结构化数据，免去自建抓取、代理、渲染、反爬这一整套工程。

## 技术栈

- 前端 / API：Node.js 20+ + TypeScript + Express + Zod
- 抓取引擎：Playwright + Chromium（自研 fire-engine）+ Headless Chrome 集群
- 队列：BullMQ + Redis，处理 Crawl / Batch Scrape 等长任务
- 数据库：Postgres + Redis（生产），SQLite（自托管 demo）
- 代理：自研代理池（自托管可对接 SPuR / Oxylabs / Bright Data）
- AI 能力：内置 LLM 提取（GPT / Claude / 自托管模型）+ Agent 节点 + PII 自动脱敏
- 多语言 SDK：Python、Node.js、Go、Java、Rust、Ruby、Elixir、PHP、.NET 全官方覆盖
- 集成：MCP Server、Firecrawl Skills Catalog、CLI、Lovable / Zapier / n8n 平台节点
- 许可：核心 AGPL-3.0，9 套 SDK 与 Skills 目录 MIT

## 核心功能

**Scrape 单页抓取** 单 URL 转 Markdown / HTML / 结构化 JSON / 截图，支持 JS 渲染与 PII 脱敏，P95 延迟约 3.4 秒。

**Crawl 整站爬取** 一次请求把整个网站拉成 Markdown，自动限速、失败重试、断点续传，结果按页面返回。

**Search + Map** 关键词搜索直接返回正文，Map 端点秒级列出整站 URL 清单，搭配可对子集做精确爬取。

**Interact 浏览器交互** 抓取后用自然语言驱动点击 / 滚动 / 输入 / 等待，再拿结构化结果，对单页应用天然友好。

**Agent 端点** 不给 URL 也能拿数据：只描述「我想要什么」，由 spark-1-mini / spark-1-pro 自主搜索、浏览、抽取，Pydantic Schema 直接落结构化 JSON。

**Skills 与 MCP** 一行 npx skills add firecrawl/skills 接入 Claude Code / Cursor / OpenCode，Claude / MCP 客户端可直接 firecrawl-mcp 拉数据。

## 对比 Scrapy、Apify 与 Tavily

| 维度 | Firecrawl | Scrapy | Apify | Tavily |
|---|---|---|---|---|
| 开源 | AGPL-3.0 核心 | BSD | 闭源 + 自托管收费 | 闭源 SaaS |
| JS 渲染 | 内置 | 需 Splash / Playwright 中间件 | 需配置 | 仅服务端渲染 |
| AI 输出 | Markdown / JSON / 摘要 | 纯 HTML | 需自接 LLM | 摘要级 |
| 多语言 SDK | 9 套官方 | Python 为主 | 通用 API | Python / JS |
| 协议 | MCP + Skills | 无 | MCP | MCP |
| 中文文档 | 官方译文 | 完整 | 一般 | 较薄 |
| 上手成本 | 低 | 中 | 中 | 低 |

差异化在于：把「抓取 + 渲染 + 代理 + 结构化 + AI 提取」做成端到端 API，省掉自研工程里最脏最累的部分；同时用 MCP 和 Skills 协议主动适配 Agent 生态，不是被动等用户接入。

## 客观短板

- 协议为 AGPL-3.0：直接用 Firecrawl 提供对外 SaaS 必须开源，自托管内部用无影响。
- 自托管需要 Chromium 集群 + Redis + Postgres + 代理池，运维成本不低。
- 部分高阶能力（Agent 节点、Research Index、自动 PII 脱敏）需要云端 Key，自托管版能力有差距。
- 9 套 SDK 偶有同步滞后，Issue #4393 等就指出新选项未及时进入 SDK 强类型面。
- 对 robots.txt 严格遵守，合规抓取是设计前提，灰黑产场景不适用。
- 单次 Crawl 上限受套餐约束，超大站点需自建分片策略。

## 适合谁，不适合谁

适合：要做 RAG / 知识库的 AI 工程师；要把网页数据喂给 LLM 的 Agent 开发者；做电商比价、舆情监控、SEO 审计、学术调研的独立开发者；需要 PDF / DOCX 解析入库的 ETL 团队；正在评估 Scrape 工具栈的技术负责人。

不适合：要完全自研可控底层、不接受 AGPL 协议的中大型 SaaS；以网络爬虫灰色业务为商业模式的团队；纯离线桌面端单机用户；只需一次性抓几十个页面的低频脚本场景。

## 普通开发者能学到什么

- 大规模抓取系统的工程化：代理池、指纹轮换、限速、失败重试的工业级实现
- LLM 友好输出设计：Markdown 清洗、JSON Schema 驱动结构化、token 预算控制
- Monorepo + 多语言 SDK 同步发布：pnpm workspace + 自动 bump + CI 校验
- MCP 与 Skills 协议落地：把能力包装成 Agent 可发现的服务
- PDF 解析管线：pageMarkers、pages、blocks 三个维度的取舍与缓存变体
- 自托管产品的 license 双轨：核心 AGPL + 周边 MIT 的合规分界线

## 独立开发者价值

上手成本低，会 JavaScript 或 Python 半小时就能跑通 Scrape / Crawl 第一条数据流。二次开发空间大，自托管版允许接入私有代理、自定义 LLM、改造提取模板，可以做行业垂直抓取工具，例如律师案件库、跨境电商竞品监控、研报聚合。

变现路径有三条：一是套一层 UI 做细分领域 SaaS，例如「学术论文聚合 / 行业报告订阅」，按月收费 99-499 元；二是给中小企业做一次性数据采集外包，按百万 Token / 千万 Token 计费；三是把 Skills 与 MCP 打包卖给 Agent 平台，做 Agent 工具商店的供需两侧。

合规友好度上，AGPL 适用于自托管内部用与改造分发；要做对外 SaaS 必须开源或走 Firecrawl 云按量计费，开发者按能力分两条腿走，对国内独立开发者做内部工具零法律摩擦，做 SaaS 则有明确边界。

## 中文友好度

- 文档：官方中文翻译覆盖核心模块，Quick Start、API Reference、Agent、Skills 章节都有中文入口
- 社区：Discord 万人社区，国内有「Firecrawl 中文交流」微信 / 飞书群数十个
- Issue：中英文均响应，平均 1-3 天首次回复，PR 接受中文描述
- 访问：GitHub 仓库、文档站、CLI / Skills 直连国内均稳定，API 端点对国内 IP 偶有限速但配代理可解

## 总结

Firecrawl 不是又一个 Scrapy 套壳，它把抓取、AI 提取、Agent 操作、协议适配做成一条龙，是 2026 年做 Web 上下文产品绕不开的底座。

如果你正面对「LLM 怎么吃到全网数据」这个问题，强烈建议先花一个晚上跑通 v2 文档里的 Agent 端点，再决定要不要自研。

GitHub: https://github.com/firecrawl/firecrawl`
  }
]

export const ALBUMS = []

// 站点统计数据（可空时为 0）
export const SITE_STATS = {
  articleCount: ARTICLES.length,
  categoryCount: 3,
  tagCount: TAGS.length,
  totalWords: ARTICLES.reduce((s, a) => s + (a.words || 0), 0),
  lastUpdated: '2026-08-25'
}
