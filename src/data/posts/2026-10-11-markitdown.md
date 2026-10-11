# MarkItDown：把 Office 与 PDF 喂给 LLM 的微软官方转换器

当 RAG 与 AI Agent 已经普及到每一个 Python 库演示页，真正卡住的反而是「把 PDF / Word / Excel 干净地变 Markdown」这件事。微软在 2024 年末把内部用了多年的代码以 MIT 协议开源成 `microsoft/markitdown`，让任何 LLM 都能直接消费 Office、PDF、图片、音频与 YouTube 字幕，且 v0.1.8 已稳态迭代了 9 个月。

## 一句话定位

MarkItDown 是微软官方出品的「文档到 Markdown」转换器，定位是把 Office、PDF、图片、音视频、YouTube、Outlook、EPUB 等十几种格式统一输出为 LLM 友好的 Markdown，并原生提供 Python API、CLI、Docker、Azure 云端推理与 MCP 服务器五种接入方式。

## 技术栈

- 语言：Python 3.10-3.14
- 核心包：markitdown（核心转换库）、markitdown-sample-plugin（插件样例）、markitdown-mcp（MCP 服务器）
- 文档解析：pdfminer.six、python-docx、python-pptx、openpyxl、BeautifulSoup4、pydub、SpeechRecognition
- LLM 能力：image description 走 OpenAI 兼容协议，可替换任意 base_url；markitdown-ocr 插件基于同一 llm_client 给 PDF / DOCX / PPTX / XLSX 补 OCR
- 云端推理：Azure Document Intelligence 与 Azure Content Understanding 二选一，后者支持视频
- 辅助：Docker、hatch 测试、pre-commit、uv / pip / conda 多环境
- 许可：MIT

## 核心功能

**多格式统一转 Markdown** 一行 `markitdown xxx.pdf > out.md` 处理 PDF / PPTX / DOCX / XLSX / 图片 / 音频 / HTML / CSV / JSON / XML / ZIP / EPUB / Outlook / YouTube 字幕，输出保留标题、列表、表格与链接等结构化语义。

**LLM 图像描述** 构造 `MarkItDown(llm_client=..., llm_model=...)` 后，PPTX 与 JPG 直接拿到模型生成的 alt-text，max_retries 控制 OpenAI SDK 的退避重试。

**Azure Document Intelligence** `-d` 启用云端 layout 抽取，处理复杂 PDF 与扫描件的质量显著高于本地 parser，输出仍为 Markdown。

**Azure Content Understanding** `--use-cu` 接入多模态 analyzer，可同时处理文档、图像、音频与视频；自带 YAML front matter 结构化字段，并支持自定义 analyzer（发票金额、合同条款）。

**markitdown-mcp** 把 15 个工具暴露给 MCP 客户端，使 Claude Code / Cursor / OpenCode 可以直接 `convert` 本地或远程文档。

**3rd-party 插件生态** `--list-plugins` 列举、`--use-plugins` 启用，仓库内提供 `markitdown-sample-plugin` 模板；社区已有 OCR、YouTube、Notion 等插件。

## 对比 textract、Docling 与 Pandoc

| 维度 | MarkItDown | textract | Docling | Pandoc |
|---|---|---|---|---|
| 开源 | MIT（微软官方） | MIT | MIT | GPL-2.0 |
| AI 输出 | Markdown + LLM 描述 + YAML 字段 | 纯文本 | 结构化 JSON + Markdown | 任意标记语言 |
| 插件沙箱 | entry_points 机制 | 无 | 无 | 过滤器 |
| 多租户 RBAC | 由宿主页提供 | 由宿主页提供 | 由宿主页提供 | 由宿主页提供 |
| 中文文档 | 官方翻译进行中 | 稀缺 | 官方中文 | 完整 |
| 上手成本 | 极低 | 中 | 中 | 低 |

差异化看点是「LLM 友好 + Microsoft 云端推理 + 插件生态 + MCP」这条组合，让它成为 RAG / Agent 上下文的天然入口；纯学术或版式保真需求则更适合 Pandoc 与 Docling。

## 客观短板

- 不输出 PDF 或 Word，本身是 LLM 预处理层，不是版式保真转换器。
- 自带 PDF 解析在扫描件、复杂表格、公式上精度有限，复杂场景必须接 Document Intelligence。
- 新格式合并节奏极慢，官方明确「新格式主要靠 3rd-party 插件」，主仓保持精简。
- markitdown-ocr 依赖外部 OpenAI 兼容服务，自带 OCR 仍要走云端。
- 对恶意输入尚未做完整沙箱，官方文档强调「按进程权限运行、限制 scheme 与路径」，服务化部署需自包装。
- CLA 由微软持有，给企业级 fork 增加一层法务评估成本。

## 适合谁，不适合谁

适合：要为 RAG / Agent 准备文档语料的 AI 工程师；做企业知识库要把 Office 与 PDF 全文索引的团队；做数据 ETL 把零散文件归一化为 Markdown 的数据工程师；需要可被 MCP 客户端直接调用的文档工具链开发者；用 uv 锁定依赖做内部 AI 工具集的个人与团队。

不适合：要求版式零损失的 PDF 出版流程；纯离线、无外部依赖的单机敏感环境；要批量做高保真 EPUB 出书的出版业务；只需做 CSV / JSON 这类纯文本处理的用户。

## 普通开发者能学到什么

- LLM 友好输出的设计原则：标题层级、表格管道符、链接保留如何折中 token 数与可读性
- Python 包按可选依赖拆分的工程范式：`[pdf]`、`[docx]`、`[pptx]` 让安装体量可控
- entry_points 模式实现的轻量插件机制：无需中心仓库，社区靠 hashtag `#markitdown-plugin` 自我组织
- Microsoft Azure Document Intelligence 与 Content Understanding 的差异：单模态 layout 抽取 vs 多模态结构化字段输出
- MCP 服务器从零起的最小工程：用 15 个工具覆盖 convert / search / metadata 的边界设计
- 用 hatch + pre-commit + uv 锁 Python 包的标准 LLM 时代工程化模板

## 独立开发者价值

上手成本极低，会 Python 加一行 pip install，半小时内把零散文件流式写入 RAG Pipeline。最大亮点是「开箱即用 + 微软背书 + MCP 入口」，一个独立开发者也能搭起企业级文档底座。

二次开发空间宽，按 entry_points 写一个 MyPlugin 即可发布为独立 PyPI 包，调用 `--use-plugins` 即生效；Azure 路径可换任意 OpenAI 兼容的国内模型，规避跨境数据合规风险。

变现路径有四条：一是做细分领域 SaaS 包装，例如法律卷宗 / 学术论文 / 财务票据的入库与查询，按月费 99-999 元；二是给中小企业做 Office 全文检索与 RAG 部署外包，按工程项报价 5-20 万；三是做付费插件 Marketplace，模板 + 主题按 50-500 元单价销售；四是把 markitdown-mcp 嵌入现有 AI 产品当文档工具，按调用次数计费。

合规友好度高，MIT 协议允许商用、修改、闭源再分发；数据走国内模型不传境外；唯一注意点是 CLA 条款，对纯应用层使用几乎无影响。

## 中文友好度

- 文档：英文 README 为主，微软 Learn 中文版与社区翻译覆盖安装、Azure 接入、MCP 章节
- 社区：GitHub Issue 与 Discussion 中英文混合，国内知乎、CSDN 教程密度高
- Issue 响应：核心维护者 Adam Fourney（afourney）每周均提 PR，社区贡献者 24 小时内首次响应
- 访问：GitHub 仓库、PyPI、hatch 镜像国内直连稳定；Azure 端点需自备国内替代或代理

## 总结

MarkItDown 不是又一个 PDF 转 Word 工具，它把 Office、PDF、媒体内容归一化为 LLM 可直接消费的 Markdown，并原生对接 Microsoft 云端推理与 MCP 协议。

如果你正为 RAG / Agent 准备文档上下文，花一个下午把 markitdown 跑通，再决定要不要接 Azure，是 2026 年最稳的入门路径。

GitHub: https://github.com/microsoft/markitdown