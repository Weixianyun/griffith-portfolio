# Firecrawl：把整个 Web 变成 LLM 可读上下文的开源引擎

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

GitHub: https://github.com/firecrawl/firecrawl
