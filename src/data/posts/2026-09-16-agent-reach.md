# Agent Reach：让 AI Agent 真正能上网的能力层

AI Agent 在 2026 年已经能写代码、改文档、管项目，但让它去网上读推特、刷 Reddit、看 YouTube 字幕，门槛依然很高：每个平台都有自己的 API 收费、反爬封锁、登录态维护。Panniantong/Agent-Reach 把这件事压成一句话——"帮我安装 Agent Reach: ..."——装完 Agent 自己会读网页、读 RSS、看字幕、搜 GitHub。

## 一句话定位

它是给 AI Agent 的「互联网能力层」，把十几个站点封装成统一 channel，按「首选 + 备选」多后端路由选当下最稳的接入方式，由 agent-reach doctor 持续体检，单条路失效自动切换，不需要用户写一行爬虫。

## 技术栈

- 核心：Python 3.10+，CLI 入口 agent-reach，每个站点一个 channel 模块
- 后端：yt-dlp（YouTube）、bili-cli（B 站）、twitter-cli（推特）、OpenCLI（小红书/Reddit/Facebook/Instagram 复用浏览器登录态）、gh CLI（GitHub）、feedparser（RSS）、Jina Reader（通用网页）、Exa via mcporter（语义搜索）、mcp-server-linkedin（LinkedIn）
- 协议：stdio / MCP，零网络监听
- 许可：MIT，代码全开源

## 核心功能

**多后端路由** 每个平台是一条有序候选列表（如 B 站 bili-cli ▸ OpenCLI ▸ 搜索 API），安装时实测体检，首个可用后端当选，失效无需重装。

**真体检而非体检报告** agent-reach doctor 真实执行命令探测，能识别「装了但坏了」，对每个多后端平台报告当前在用哪条路。

**SKILL.md 即装即用** 装好后 Agent 读 SKILL.md 就知道每个平台调什么命令，不需要用户记 CLI。

**默认安全** install 默认只检查环境不修改系统，需 --system 才落配置；cookie 仅存本地 ~/.agent-reach/config.yaml，文件权限 600；支持 --dry-run 预览所有动作。

**覆盖面** 16 个站点，含小红书、B 站、Reddit、Twitter、LinkedIn、Boss直聘、V2EX、雪球、小宇宙等中文原生平台。

## 对比 MCP 自建与 Firecrawl

| 维度 | Agent Reach | 自建 MCP Wrapper | Firecrawl |
|---|---|---|---|
| 开源 | MIT | 通常私有 | AGPL-3.0 |
| 多平台 | 16 个一站式 | 单点 | 主打网页 |
| 多后端路由 | 首选+备选自动切换 | 无，需手写 | 无 |
| 真体检 | doctor --json | 无 | 无 |
| 中文平台 | 小红书/雪球/V2EX/Boss直聘 | 需自写 | 无 |
| Cookie 风险隔离 | 文档强提示「用小号」 | 自行承担 | 走云端 |
| 上手成本 | 一句话给 Agent | 写 MCP server | 注册云 API |

差异化在于，Agent Reach 把「选型 + 安装 + 体检 + 路由」做成单一职责，Firecrawl 偏云端通用网页抓取，自建 MCP Wrapper 偏单点。它是三者中唯一把中文社区原生平台覆盖完整、又把「平台封了就换路」做成工程机制的开源项目。

## 客观短板

- 抓取依赖上游 CLI/服务，部分平台（如 Reddit 的 rdt-cli v0.4.2）仍会被 WAF 403，#642 已跟踪
- 部分渠道强依赖桌面浏览器登录态（Reddit/Facebook/Instagram），服务器无 GUI 时无法解锁
- LinkedIn 渠道在 greenlet 3.5.4 已知崩溃，#586 标记需锁定版本
- 依赖工具链较重：pip + Node.js + gh CLI + mcporter + yt-dlp，Windows 用户需 Git Bash
- 强反爬平台（小红书/Boss直聘）仍有周期性 security check，需人工介入
- 自身不存数据，渠道健康度受上游项目活跃度影响（yt-dlp 退出 B 站就是典型）

## 适合谁，不适合谁

适合：把 AI Agent 当主力工具的个人开发者；做内容研究、市场情报、竞品监控需要 Agent 自动上网的；想统一管理一堆 CLI 抓取工具又不想每次新机器重配的；中文社交平台重度研究者。

不适合：需要 SLA 保证的企业级抓取（应上 Firecrawl/Browser Use 云服务）；对反爬合规有严格审计要求的金融/医疗场景；不愿自己跑命令行的纯业务用户。

## 普通开发者能学到什么

- 能力层抽象：把选型、路由、体检从具体实现中剥离
- 多后端有序回退模式：列表 + 实测探测 + 首个可用当选
- 写给 Agent 的 SKILL.md 范式：让 LLM 读到就知道调什么命令
- doctor 体检模式：shutil.which 不是健康证明，要真跑命令探测
- 凭据隔离与最小权限：config 文件 600 权限、--system 显式升级
- 上游选型纪律：B 站封 yt-dlp 就换 bili-cli，不留死代码

## 独立开发者价值

上手成本极低，把 README 那行「帮我安装 Agent Reach: ...」复制给 Claude Code 或 OpenClaw，五分钟内 Agent 自己跑通 install。二次开发空间足够：每个 channel 是独立 Python 文件，加新站点只需新建一个文件并注册到 __init__.py，无需动 core。SKILL.md 也模板化，照抄即可接入新 Agent 框架。

变现路径有三条：一是给中小企业做「Agent 联网能力定制」，按平台组合报价 5-15 万；二是封装成自己 SaaS 的内置模块，对外提供 agent-reach 风格 API 收订阅费；三是做培训课教独立开发者把 Agent Reach 接进自己的 AI 产品。

合规友好度高，MIT 全开源、cookie 仅本地、默认安全模式不强改系统。但要注意它本身是抓取编排层，最终封号责任在使用者，建议按 README 提示用「专用小号」隔离账号风险。

## 中文开发者友好度

- 文档：README、SKILL.md、CHANGELOG、references/ 全部中英双语，作者是中文母语开发者
- 社区：GitHub Issue 中英文混合回复，常见问题作者亲自答
- Issue 响应：核心维护者 Panniantong 几乎逐条回复，平均 1-3 天首次响应
- 访问：GitHub raw 直连国内可用，所有依赖 CLI 均能从国内镜像拉取

## 总结

Agent Reach 不抢「读网页」这个最底层能力，而是把选型、路由、体检、安全升级做成一个独立产品层。

对独立开发者来说，它是把 Agent 真正变成「能上网的 Agent」的最短路径。

如果你正用 Claude Code、Cursor、OpenClaw 但每次都重复踩平台反爬的坑，强烈建议试一下。

GitHub: https://github.com/Panniantong/Agent-Reach
