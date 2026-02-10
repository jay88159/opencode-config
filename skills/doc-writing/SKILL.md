---
name: doc-writing
description: Write and edit product/technical documentation with a 4-phase workflow (clarify → web search → outline → draft → figures/tables → merge → final rewrite). Enforces mixed pacing (paragraphs + lists + figures/tables), hard placeholder IDs, and real rewriting in the final check.
---

# 文档写作 (Documentation Writing)

用于撰写与修订高质量产品/技术文档。定位是"流程编排器"：只保留硬规则与阶段产物；细则、示例与模板下沉到 `references/` / `examples/` / `templates/`。

## 何时使用

- 写作：PRD、需求规格、技术方案、设计文档、API 文档、教程/手册
- 修订：改某段、改第 X 行、润色某节、补齐结构/图表/分点

## 核心依赖

| Skill / 工具 | 用途 |
|---|---|
| `file-writer` | 所有文件创建/读取/编辑（定位→确认→改写） |
| `draw-io` | 生成所有图（`.drawio` + 导出 PNG） |
| `websearch_cited` | Phase 1 的检索与引用 |
| `question` | **中断会话并等待用户确认**（Phase 1 的两次确认必须调用此工具） |

## 强制规则（Non-negotiables）

1. **必须用 to-do list 推进四阶段**：每步开始 `in_progress`，完成立即 `completed`
2. **输出路径固定**：文档保存 `~/Documents`；图表资源保存 `~/Documents/assets/`
3. **不得跳过 Phase 1**：先澄清 → 再检索 → 再大纲确认；其中 **Step 1.1 的确认是"写作方向/表达目的"的澄清**，**Step 1.3 的确认是"结构与章节安排"的大纲确认**，两者不可合并、不可跳过
4. **先检索再大纲**：大纲与正文必须基于 `websearch_cited` 的要点与引用
5. **大纲必须规划"表达形态"**：每章明确段落/分点/表/图的组合；涉及列表时在大纲里先写 3-7 条"分点草案"，正文必须兑现（见 `references/outline-examples.md`）
6. **占位符必须唯一 ID**：`【FIG-001：...】`、`【TBL-001：...】`（规范见 `references/placeholder-spec.md`）
7. **Phase 2 串行**：先写文字（含占位符）→ 再画图 → 再画表（避免正文与图表脱节）
8. **图必须 draw-io**：不得用"文字描述"代替图；不得跳过 `draw-io`
9. **修订必须走 file-writer**：任何编辑都先定位再改写；只改必要部分，不重写无关内容
10. **最终检查必须重写**：发现碎段/空转/单调/缺少休息点时必须回到原文改写/合并/拆分；交付时必须附"修订记录"（见 Phase 4）
11. **两次确认必须调用 `question` 工具**：Step 1.1（方向澄清）和 Step 1.3（大纲确认）都必须通过 `question` 工具中断会话、等待用户明确回复后才能继续下一步；不得"默认通过"或"自动跳过"

## 四阶段流程

### Phase 1: 串行准备

> **关键提示**：Phase 1 包含两次独立的用户确认，分别发生在 Step 1.1 和 Step 1.3。每次确认必须调用 `question` 工具，中断会话等待用户回复。

#### Step 1.1 澄清（≤ 3 个核心问题）— 第一次确认

**目标**：确认**写作方向与表达目的**（读者是谁、文档用途、范围边界、表达重点）

- 围绕：读者/用途、范围边界、优先级、已有材料/约束
- 若关键缺口未补齐，不得直接写正文

**必须调用 `question` 工具**：在整理好澄清问题后，必须通过 `question` 工具向用户提问，中断会话等待用户选择或输入回答。**在得到用户明确回应之前，不得进入 Step 1.2。**

> **示例**（澄清阶段 question 调用）：
> ```json
> {
>   "header": "写作方向澄清",
>   "question": "请确认以下关于文档的基本信息：\n- 读者：...\n- 用途：...\n- 范围：...\n- 重点：...",
>   "options": [
>     { "label": "确认无误", "description": "以上理解正确，可以继续检索和构建大纲" },
>     { "label": "需要修改", "description": "部分内容需要调整，我会补充说明" }
>   ]
> }
> ```

#### Step 1.2 Web 搜索（必须）

- 调用 `websearch_cited`：中英检索、中文总结
- 产物：一组可引用要点（带来源），供大纲与正文使用

#### Step 1.3 大纲确认（含图表清单）— 第二次确认

**目标**：确认**章节结构与表达形态**（在已锁定写作方向/目的的前提下，与用户共同确认章节结构、叙述顺序以及每一章的表达形态）

- 章节数：4-6 章
- 每章：标题层级 + 要回答的问题 + "表达形态规划" + FIG/TBL 占位符
- 产物：大纲 + 图表清单（ID/名称/类型/所属章节）
- 示例与格式：见 `references/outline-examples.md`

**必须调用 `question` 工具**：在展示完整大纲（含图表清单）后，必须通过 `question` 工具向用户确认，中断会话等待用户选择或输入回答。**在得到用户明确确认之前，不得进入 Phase 2。**

> **示例**（大纲确认阶段 question 调用）：
> ```json
> {
>   "header": "大纲结构确认",
>   "question": "以上是根据检索结果构建的文档大纲，包含 X 章和 Y 个图表占位符。请确认是否可以开始正文写作？",
>   "options": [
>     { "label": "确认，开始写作", "description": "大纲结构合理，可以进入正文写作阶段" },
>     { "label": "需要调整", "description": "章节安排或表达形态需要修改，我会补充意见" }
>   ]
> }
> ```

> ⚠️ **禁止**：不得用 Step 1.1 的"方向澄清确认"来替代此处的大纲确认；不得在同一次 question 调用中混合两种确认。

### Phase 2: 内容生成（串行：文字 → 图 → 表）

#### Step 2.1 文字写作（含详细占位符）

- 段落：每段 3-8 句（主旨句 + 发展）
- 列表：必须有完整引导句；列表项风格统一
- 必须兑现 Step 1.3 的表达形态与分点草案：不得缩水成纯文字墙
- 占位符写法与替换模板：见 `references/placeholder-spec.md`
- 命名：`PRD-<主题>.md` / `tech-design-<主题>.md` / `api-<服务>.md`

#### Step 2.2 画图（根据 FIG 占位符）

- 读取文档里的 `【FIG-xxx】` 描述，调用 `draw-io` 产出 `.drawio`
- 文件命名：`FIG-001-<名称>.drawio`；保存到 `~/Documents/assets/`

#### Step 2.3 画表（根据 TBL 占位符）

- 将 `【TBL-xxx】` 替换为 Markdown 表格
- 表题格式：`*表 X TBL-xxx <表格名称>*`（表题在表上方）

### Phase 3: 融合

- 逐个替换 FIG/TBL 占位符，插入图片与表格
- 替换模板：见 `references/placeholder-spec.md`
- 校验：文档中不得残留 `【FIG-` / `【TBL-` 占位符

### Phase 4: 最终检查（必须重写）

- 使用 `references/writing-checklist.md` 全量自检并修复
- 若发现碎段/空转/单调/缺少休息点：必须改写/合并/拆分原段落，再回归检查

交付时必须附带"修订记录"（证明进行了真实改写，而非只补图表描述）：

```markdown
### 修订记录（节选）
- 重写：2.1 背景与目标 - 第 1 段（原因：碎段 + 空转，补充数据/因果链）
- 重写：3.2 方案对比 - 段落改为"引导句 + 列表"（原因：文字墙，缺少可扫读结构）
- 调整：4. 实施计划 - 新增风险分点列表（原因：缺少休息点，关键信息不易扫读）
```

## 资源索引

- templates:
  - `templates/prd.md`
  - `templates/tech-design.md`
- references:
  - `references/writing-checklist.md`
  - `references/outline-examples.md`
  - `references/placeholder-spec.md`
  - `references/style-guide.md`
- examples:
  - `examples/good-vs-bad-paragraphs.md`
