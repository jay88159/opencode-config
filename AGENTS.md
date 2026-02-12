# OpenCode 全局规则

## Skill 中的参考文档：先读后做

当某个 skill（如 SKILL.md 或其中的 references/examples）**明确要求参考某某文档**时：

1. **必须先用 `read` 工具完整阅读** skill 里提及的**所有**参考文档
2. **阅读完成后再执行**该 skill 所描述的动作（写作、审校、画图、调研等）

**目的**：充分了解上下文，避免在未读文档的情况下凭猜测执行，保证产出符合文档规范与示例标准。

**示例**：若 doc-reviewer 的 writing-checklist 要求参考 `style-guide.md` 和 `good-vs-bad-paragraphs.md`，则先对这两份文件执行 `read`，读完后再开始逐项审校与修改。

---

## 网页搜索

当需要进行网页搜索时，**直接使用 OpenCode 内置的 `websearch` 工具**。

> **激活前提**：`websearch` 需要设置环境变量 `OPENCODE_ENABLE_EXA=1`（或使用 OpenCode 官方 provider）。
> 启动命令：`OPENCODE_ENABLE_EXA=1 opencode`

该工具基于 Exa AI，无需额外 API Key。

### 使用场景

- 用户要求 **搜索 / 查一下 / 找资料 / search the web**
- 需要 **最新信息**：文档、版本号、发布说明、新闻、价格
- 需要 **官网 / 官方文档**、第三方库用法、报错信息
- 需要 **事实查证**：日期、数据、当前政策、实时状态
- 模型知识截止日期之后发生的事
