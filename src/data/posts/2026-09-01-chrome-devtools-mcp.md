# chrome-devtools-mcp：浏览器给 AI 操控

当 Cursor、Claude Code、Gemini CLI 这些 AI 编码助手开始能「看懂」浏览器时，背后真正把 Chrome DevTools 协议翻译成 MCP 工具的，是 Google Chrome 团队官方维护的 chrome-devtools-mcp。它把 57 个工具整齐摆到任何 MCP 客户端面前，把浏览器从「截图工具」升级为 Agent 可编程的运行时。

## 一句话定位

它是一个开源的 Model-Context-Protocol 服务器，把 Puppeteer + Chrome DevTools Protocol 能力暴露为标准化工具，让 AI 编码助手无需自研就能完成浏览器自动化、调试、性能分析。

## 技术栈

- 前端：纯 TypeScript（ESM 单体库），TypeScript 6.0 + Rollup 4 构建
- 浏览器自动化：Puppeteer 25.x + Chrome DevTools Protocol（CDP）+ Lighthouse 13
- MCP 实现：@modelcontextprotocol/sdk 1.30，stdio 传输
- 沙箱：Chrome for Testing 隔离实例，支持自定义 userDataDir 与 channel
- 部署：npm 一行安装，npx -y chrome-devtools-mcp@latest 启动
- 许可：Apache-2.0，可商用、可修改、可闭源再分发

## 核心功能

**输入自动化（10 个工具）** click、drag、fill、fill_form、hover、press_key、type_text、upload_file、handle_dialog、click_at，覆盖真实用户所有交互路径，fill_form 是批量填表的提速关键。

**导航与会话管理（6 个工具）** new_page、list_pages、navigate_page、close_page、select_page、wait_for，把多 Tab 工作流变成 Agent 可显式控制的资源。

**调试工具（8 个工具）** evaluate_script、take_snapshot、take_screenshot、list_console_messages、get_console_message、lighthouse_audit、screencast_start、screencast_stop，从「读 DOM」到「看 Lighthouse 报告」一条链路走完。

**性能分析（3 个工具）** performance_start_trace、performance_stop_trace、performance_analyze_insight，把 Chrome DevTools Performance 面板的 trace 转换为结构化洞察，配合 CrUX 现场数据给出真机视角的优化建议。

**网络与内存（2 + 13 个工具）** 网络层可列举请求并下钻详情；内存层提供完整 Heap Snapshot 查询 API，覆盖对象保留路径、支配树、重复字符串、对比快照，是排查内存泄漏的生产级工具。

**扩展与 PWA（5 + 4 个工具）** 直接驱动 Chrome 扩展与渐进式 Web 应用的安装、卸载、启动、状态查询，是扩展开发者做 e2e 测试的稀缺能力。

## 对比 Playwright MCP 与 Browser-Use

| 维度 | chrome-devtools-mcp | Playwright MCP | Browser-Use |
|---|---|---|---|
| 维护方 | Google Chrome 团队官方 | Microsoft Playwright 团队 | 社区 |
| 底层引擎 | Puppeteer + CDP | Playwright（自研多浏览器） | Playwright + LLM 决策 |
| 浏览器支持 | Chrome / Chrome for Testing | Chromium / Firefox / WebKit | Chromium 系 |
| 调试深度 | 57 工具含 Heap、Performance、Lighthouse | 通用自动化为主，调试工具较薄 | 高层封装，工具粒度粗 |
| 协议暴露 | 直接调 CDP，几乎无限 | 跨浏览器抽象，能力被收敛 | 由 LLM 选下一步 |
| 多租户 / RBAC | 由宿主页提供 | 由宿主页提供 | 闭源 SaaS 提供 |
| 中文文档 | 英文 README，社区翻译进行中 | 完整 | 一般 |
| 上手成本 | 极低 | 低 | 中 |

差异化在于，chrome-devtools-mcp 选择「把 Chrome DevTools 完整暴露出来」而不是「给 LLM 套一层高级封装」，让性能调优、内存分析、Lighthouse 审计这些真实生产场景成为 MCP 工具的一等公民。

## 客观短板

- 仅支持 Chrome 与 Chrome for Testing，Firefox / Safari 用户需另寻 Playwright MCP。
- 默认开启 Google 使用统计与 CrUX 网络请求，隐私敏感场景必须显式传 --no-usage-statistics 与 --no-performance-crux。
- 多 Tab / 多用户配置文件下偶现 puppeteer_dev_chrome_profile 进程残留，issue #2621 已记录，需手动清理。
- 工具数已达 57 个，对模型上下文窗口压力较大，slim 模式仅暴露约 20 个核心工具。
- 长生命周期服务器在客户端断开后仍持有活跃页面，issue #2599 已上报。
- 部分高级能力如 take_heapsnapshot 需要 --memoryDebugging 启动参数，初次配置容易遗漏。

## 适合谁，不适合谁

适合：要把 AI 编码助手接入真实浏览器做端到端验证的全栈工程师；做性能调优与内存泄漏排查的前端架构师；Chrome 扩展与 PWA 开发者与测试工程师；想用 Agent 自动化跑 Lighthouse 的可观测性建设者；做浏览器自动化测试平台的基础设施团队。

不适合：必须跨浏览器兼容的纯 e2e 测试场景（直接选 Playwright）；对 Google 数据收集零容忍的强隐私合规环境；只需做一次性截图的轻量用户（用 Puppeteer 脚本更直接）；MCP 客户端尚未稳定的纯研究项目。

## 普通开发者能学到什么

- MCP 服务器的工程范式：57 个工具的 schema 设计、参数命名、错误处理一致性
- TypeScript ESM 单体库 + Rollup 打包的现代 Node 库构建范式
- Chrome DevTools Protocol 域划分：DOM、Network、HeapProfiler、Tracing、Extensions 的能力边界
- Puppeteer 与 CDP 的双层抽象：高层 API 与底层协议如何配合
- 隐私合规的可配置化设计：用 flag 与环境变量把数据开关做到 zero-friction
- 多进程隔离与资源清理：userDataDir 复用、进程残留检测与关闭路径

## 独立开发者价值

上手成本极低，任何 MCP 客户端一行配置即可启用，npx -y chrome-devtools-mcp@latest 启动，npm install 不需要。

二次开发空间足够，Apache-2.0 协议下的 TypeScript 库，可直接 fork 增删工具，也可作为 SDK 嵌入自研 MCP 网关做权限与审计层；57 个工具按需裁剪成 10 个垂直工具是常见模式。

变现路径有三条：一是给企业前端团队做「AI 性能巡检 SaaS」，按项目计费 5-20 万；二是做 Chrome 扩展自动化测试云服务，按月订阅 99-499 元；三是把 Lighthouse 与 Performance Insight 包装成可订阅的性能监控中间件，面向中小 SaaS。

合规友好度极高，Apache-2.0 允许商用、修改、闭源再分发，隐私开关通过 flag 控制，不担心品牌绑定或专利问题。

## 中文友好度

- 文档：英文 README 为主，中文社区翻译在演进中，API 引用以英文原版为准
- 社区：Google Chrome Developers 中文社区、MCP 中文社群里都有专题讨论
- 响应：Google 团队对 Issue 响应 1-3 天，社区 PR 接受率高
- 访问：GitHub 仓库与 npm 包国内直连稳定，npx 拉取无障碍，仅 CrUX API 国内偶有限速

## 总结

chrome-devtools-mcp 不是又一个 Playwright 套壳，它是 Google 把自家 DevTools 协议以 MCP 形式开源出来的官方实现。

如果你正面对「AI 怎么看见浏览器真实状态」这个问题，强烈建议把它接进现有的 MCP 客户端，比从零搭一个浏览器代理稳得多。

GitHub: https://github.com/ChromeDevTools/chrome-devtools-mcp
