# OpenCode 全局规则

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
