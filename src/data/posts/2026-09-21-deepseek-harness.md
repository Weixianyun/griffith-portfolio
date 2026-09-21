# DeepSeek Harness：把 Everything-is-a-Plugin 落到工程的开源 Agent Harness

当 Cursor、Claude Code、Codex、Gemini CLI 把 AI 编码助手做成了终端工具，下一步拼的不是 CLI 本身，而是 Agent 怎么跟模型、工具、内存、权限、UI 这些「横切关注点」共存。DeepSeek AI 在 2026 年 8 月开出的答案是 deepseek-harness（CLI 简写 dsh），一个以「Everything is a Plugin」为口号的 Agent Harness，把 23 万 star 体量的工程注意力压进同一个 monorepo。

## 一句话定位

它是当前 GitHub 上少有的、由大模型厂商开源的 Agent Harness，把模型适配、工具注册、会话日志、Agent 循环本身都做成 Cordis 插件，运行时按 profile 装配，让你既能用 npx 起 Web UI，也能 fork 一份做自己的代码 Agent。

## 技术栈

- 核心：TypeScript（Node.js 20+）+ pnpm monorepo
- 插件框架：Cordis（@cordis/core），所有可替换部件均为插件
- 运行时：Cordis Context 装在多 profile 模板下：web / headless / sdk / sdk-minimal / acp
- 模型适配：DeepSeek 自家模型 + OpenAI / Anthropic 兼容协议
- UI：自研 Web UI（默认 127.0.0.1:3080）+ 桌面端（Electron，由 @deepseek-electron 插件承载）+ TUI
- 文档：Docusaurus（中文 README.zh.md + 全站 i18n）
- 协议：MCP、ACP、OpenAI 兼容、Anthropic 兼容
- 许可：MIT

## 核心功能

**Everything-is-a-Plugin 架构** 模型适配、工具注册、会话日志、Agent 循环本身都是 Cordis 插件，运行时通过 ctx 注册 service、event、effect，无特权核心可补丁。

**Profile 装配机制** dsh-base / dsh-headless / dsh-sdk / dsh-acp 模板任意组合，用户级 cordis.patch.yml 在装配时叠加，决定能力面。

**dsh web 本地 Web UI** 一行 npx @deepseek-ai/dsh web 起 http://127.0.0.1:3080，侧栏可打开 Subagent 会话、Office 文件预览、浏览器 URL、提交计划审阅。

**dsh acp 桌面 + 插件生态** 桌面端跑同一套 Cordis 插件，配合 dsh-plugin 主题仓库即装即用，是这个项目最具辨识度的工程动作。

**Cordis 论文级抽象** 基于论文《A Programming Paradigm for Spatiotemporal Composability》的 spatiotemporal composability 模型，事件、effect 都有 reversal 语义。

**完整 SDK 入口** 提供 Python SDK + Node SDK 与 REST / WebSocket 接口，可直接嵌入第三方 Agent 产品做 Harness 后端。

## 对比 Claude Code、OpenCode 与 Gemini CLI

| 维度 | DeepSeek Harness | Claude Code | OpenCode | Gemini CLI |
|---|---|---|---|---|
| 开源 | MIT | 闭源（仅 CLI 开源） | MIT | Apache-2.0 |
| 架构 | Everything-is-a-Plugin（Cordis） | 单体 CLI + 私有 Harness | 终端代理 + 多模型 | 终端代理 + Gemini |
| 可嵌入 | 提供 Node / Python SDK | 不可 | 一般 | 不可 |
| 桌面端 | 官方 Electron dsh-acp | 无 | 无 | 无 |
| MCP / ACP | MCP + ACP 双栈 | MCP | MCP | MCP |
| 中文文档 | 官方完整 i18n | 无 | 一般 | 无 |
| 上手成本 | 中 | 低 | 低 | 低 |

差异化在于：Harness 把模型、工具、UI、权限都做成可替换插件，对外提供 SDK 让你把整套 Agent 引擎塞进自己的产品，这是当前 GitHub 上少见的「可被集成的 Harness」。

## 客观短板

- 处于 developer preview，官方明确写明 THERE WILL BE COMPATIBILITY-BREAKING CHANGES，插件 API 仍会变。
- 当前最新 release 仍为 v0.1.6-alpha.2（2026-09-17），还未发布稳定 1.0，生产部署需要跟踪每次升级。
- 文档明确包含 SAFETY.md 与工具安全提示，部分工具默认需审批，新手配置容易踩权限坑。
- 桌面端 dsh-acp 在 issue 历史中曾被回滚（fix: revert desktop），Electron 化路径仍在调整。
- 仅 0 open issue 是因为团队把反馈统一导入了 GitHub Discussions，搜索 crash / data loss 时需去 Discussions 才能看清真实问题。
- 生态规模仍以 DeepSeek 自家模型为最优路径，对 Anthropic / OpenAI 的工具调用兼容性仍在追赶。

## 适合谁，不适合谁

适合：要做自有代码 Agent / Coding Agent 产品的团队；想把模型适配、工具注册、UI 解耦重写的研究者与大厂架构组；评估 Agent 嵌入生产系统替代闭源 CLI 的架构负责人；对 Cordis 编程范式感兴趣的工程师；要在产品里直接调 dsh SDK 的 SaaS / IDE 团队。

不适合：只想 5 分钟跑通一个 ChatBot 的非技术用户；要求稳定 SLA 的金融 / 医疗生产（仍在 alpha）；不愿读英文与中文双份文档只看 C 商业模型评估的甲方；只想要单机端到端截图、不关心插件机制的轻量用户。

## 普通开发者能学到什么

- 插件上下文与 effect reversal：理解 Cordis 如何用 ctx 表达可逆变更
- Profile 装配模式：用多层 patch 文件叠加配置的设计取舍
- 多模型抽象层：OpenAI 兼容、Anthropic 兼容、自托管协议的统一 Provider 接口
- 桌面 + CLI + SDK 三端同源：Electron、TUI、Python / Node SDK 共享同一 Cordis 插件树
- spatiotemporal composability 模型：跨时间、跨空间的可组合编程范式
- GitHub Discussions 替代 Issue 的社区分流策略及配套搜索体验设计

## 独立开发者价值

上手成本中等，会 Node.js + TypeScript 一周可搭出 dsh web + 自定义 plugin；会 Python 直接接 dsh SDK 把 Harness 当后端。MIT 全开源让独立开发者不必养模型适配团队即可商用。

二次开发空间充足。dsh-plugin 主题机制让新工具一键发布；profile 让你 fork 一份就能组装垂直变体，比如「电商选品 Harness」「学术写作 Harness」；UI 浅改主题即可换皮。

变现路径有三条：中小企业内部 Agent 私有化部署，按工程项报价 5-20 万；行业模板 Marketplace 售卖，单套 200-2000 元；把 dsh SDK 接入自有 SaaS，按月订阅 99-999 元。

合规上，MIT 允许商用、修改、闭源再分发；模型调用可全部走国内推理服务，规避跨境数据合规风险；插件 sandbox 与审批模型提供基础安全护栏，团队按场景自配策略即可。

## 中文开发者友好度

- 文档：官方 README.zh.md + 全站 Docusaurus 中文版同步维护，架构、安全、SDK 章节均有中文入口
- 社区：Discord、GitHub Discussions 中英文混合回复，国内微信 / 飞书群有第三方维护者参与答疑
- 响应：核心维护者 imccyu、CreatixChu、LegGasai、turtle2099 在 Discussions 高频回复，平均 1-3 天首次响应
- 访问：GitHub 仓库、Docusaurus 站点、npm 包 @deepseek-ai/dsh 国内直连稳定

## 总结

DeepSeek Harness 不是又一个终端 CLI，它把 Agent 引擎的所有横切关注点都做成可替换插件，是少数能给大厂与独立开发者同时复用的开源 Harness。

如果你正面对「如何把 AI Agent 嵌入自家产品」这个问题，强烈建议花一个周末 clone 仓库跑通 dsh web，并读一遍 Cordis primer。

GitHub: https://github.com/deepseek-ai/deepseek-harness