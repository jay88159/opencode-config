# OpenCode 全局规则

## 网页搜索

当需要进行网页搜索时，**直接使用 `websearch_web_search_exa` 工具**。

该工具由 `opencode-websearch-cited` 插件提供，会返回带**内联引用**和**来源列表**的搜索结果。

**示例输出**：
```
搜索结果显示 React 19 引入了新的编译器[1]，支持自动记忆化[2]。

Sources:
[1] React 19 Release Notes (https://react.dev/blog/react-19)
[2] React Compiler Overview (https://react.dev/learn/react-compiler)
```

### 使用场景

- 用户要求 **搜索 / 查一下 / 找资料 / search the web**
- 需要 **最新信息**：文档、版本号、发布说明、新闻、价格
- 需要 **官网 / 官方文档**、第三方库用法、报错信息
- 需要 **事实查证**：日期、数据、当前政策、实时状态
- 模型知识截止日期之后发生的事
