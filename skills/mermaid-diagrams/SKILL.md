---
name: mermaid-diagrams
description: Create documentation diagrams using Mermaid—flowcharts, relationship diagrams, swimlane maps, sequence diagrams, class/ER/state diagrams, Gantt, user journey, quadrant charts, timelines, and more. Use when the user asks to draw 流程图, 关系图, 泳道图, 时序图, 架构图, 类图, 状态图, 甘特图, ER图, 用户旅程, 四象限图, 时间线, 组织架构, 用例图, 产品模块图, or any diagram for product/technical docs, README, or design.
license: MIT
metadata:
  audience: developers,architects,product-managers,technical-writers
  workflow: documentation,design
---

# Mermaid 文档图表 (Mermaid Diagrams)

用 **Mermaid** 文本语法生成**产品文档、技术文档**中的各类图表。Mermaid 可在 GitHub、GitLab、Notion、VS Code、Confluence 等环境中直接渲染，适合放在 Markdown、README、PRD、设计文档中。

## 何时使用

- 用户要求画 **流程图 / 关系图 / 泳道图 / 时序图 / 架构图 / 类图 / 状态图 / ER 图 / 甘特图 / 用户旅程 / 四象限图 / 时间线 / 组织架构 / 用例图**
- 为 **产品文档、技术文档、设计文档、README** 配图
- 需要 **可版本管理、可复制的图表**（文本即图，无需贴图片文件）

---

## 产品 / 技术文档与图表选择

| 文档需求 | 推荐图表类型 | 本节编号 |
|----------|--------------|----------|
| 流程、步骤、分支判断 | 流程图 | 1 |
| 概念/模块/角色之间的关系、依赖、归属 | 关系图（flowchart） | 2 |
| 跨角色、跨部门的流程（谁在什么时候做什么） | 泳道图（flowchart + subgraph） | 3 |
| 系统/组件/人之间的调用、交互顺序 | 时序图 | 4 |
| 类、接口、对象结构 | 类图 | 5 |
| 数据实体及关系 | ER 图 | 6 |
| 状态机、生命周期、工作流状态 | 状态图 | 7 |
| 项目排期、里程碑 | 甘特图 | 8 |
| 用户旅程、体验阶段、任务与体验分数 | 用户旅程图 | 9 |
| 优先级矩阵、四象限分析（如 价值–成本） | 四象限图 | 10 |
| 产品/版本路线图、大事记、时间顺序 | 时间线 | 11 |
| 组织架构、汇报关系 | flowchart 自上而下 | 12（其他） |
| 用例、角色–系统–功能 | flowchart 模拟 | 12（其他） |

---

## 图表类型与语法要点

### 1. 流程图 (flowchart)

```mermaid
flowchart LR
  A[开始] --> B{判断}
  B -->|是| C[步骤1]
  B -->|否| D[步骤2]
  C --> E[结束]
  D --> E
```

- 方向：`TB`(上下)、`LR`(左右)、`BT`、`RL`
- 节点：`[矩形]`、`(圆角)`、`{菱形}`、`([体育场])`、`[(圆柱)]`
- 连线：`-->`、`---`、`-.->`、`==>`；`|文案|` 为连线标注

### 2. 关系图（概念 / 模块 / 角色关系）

用 **flowchart** 表示产品模块、概念、角色之间的**依赖、归属、关联**（非数据实体用 ER 图）。

```mermaid
flowchart TB
  用户 --> 前端
  用户 --> 管理台
  前端 --> 网关
  管理台 --> 网关
  网关 --> 服务A
  网关 --> 服务B
  服务A --> 数据库
  服务B --> 数据库
```

- 节点：模块名、概念名、角色名；连线表示依赖、调用、归属等，可用 `|标注|` 说明关系类型。
- 方向：`TB` 适合层级/归属，`LR` 适合从左到右的依赖链。

### 3. 泳道图（跨角色 / 跨部门流程）

用 **flowchart + subgraph**：每个 `subgraph` 为一个**泳道**（角色或部门），其内为该泳道的步骤；跨 subgraph 的箭头表示跨角色交接。

```mermaid
flowchart TB
  subgraph 产品
    A1[需求] --> A2[评审]
  end
  subgraph 开发
    B1[开发] --> B2[自测]
  end
  subgraph 测试
    C1[测试] --> C2[发布]
  end
  A2 --> B1
  B2 --> C1
```

- `subgraph 泳道名` … `end`；泳道内节点按流程连，跨泳道用 `A2 --> B1` 等。

### 4. 时序图 (sequenceDiagram)

```mermaid
sequenceDiagram
  participant A as 用户
  participant B as 服务
  A->>B: 请求
  B-->>A: 响应
  Note over A,B: 说明
```

- `->>` 实线箭头，`-->>` 虚线箭头；`Note over A,B: 文本`、`alt/else/end`、`loop/end`、`opt/end`

### 5. 类图 (classDiagram)

```mermaid
classDiagram
  class 类名 {
    +公有()
    -私有
    #保护
  }
  类A <|-- 类B
  类A --* 类C
```

- 关系：`<|--` 继承、`*--` 组合、`o--` 聚合、`-->` 关联、`--` 链接

### 6. ER 图 (erDiagram)

```mermaid
erDiagram
  用户 ||--o{ 订单 : 下单
  订单 }o--|| 商品 : 包含
  用户 {
    string id
    string name
  }
```

### 7. 状态图 (stateDiagram-v2)

```mermaid
stateDiagram-v2
  [*] --> 待处理
  待处理 --> 进行中 : 开始
  进行中 --> 已完成 : 完成
  进行中 --> 待处理 : 回退
  已完成 --> [*]
```

### 8. 甘特图 (gantt)

```mermaid
gantt
  title 项目计划
  dateFormat YYYY-MM-DD
  section 需求
  需求调研 :a1, 2025-01-01, 7d
  section 开发
  开发 :a2, after a1, 14d
```

### 9. 用户旅程图 (journey)

用于**产品文档**中的用户旅程、体验阶段、任务与满意度；`section` 为阶段，`任务: 分数: 角色`，分数 1–5 表示体验程度。

```mermaid
journey
  title 用户注册旅程
  section 访问
    进入首页: 5: 用户
    点击注册: 4: 用户
  section 注册
    填写信息: 3: 用户
    提交: 4: 用户
  section 完成
    收到确认: 5: 用户
```

- 语法：`journey`、可选 `title 标题`、`section 阶段名`、`任务名: 分数: 角色1, 角色2`（分数 1–5）

### 10. 四象限图 (quadrantChart)

用于**优先级矩阵、四象限分析**（如 价值–成本、重要性–紧急度）。`x-axis`、`y-axis` 为两轴标签；`quadrant-1`～`quadrant-4` 为四块文案；`名称: [x, y]` 为点的坐标（0–1）。

```mermaid
quadrantChart
  title 需求优先级矩阵
  x-axis 低价值 --> 高价值
  y-axis 低成本 --> 高成本
  quadrant-1 优先做
  quadrant-2 择机做
  quadrant-3 少做
  quadrant-4 评估后做
  需求A: [0.8, 0.3]
  需求B: [0.2, 0.7]
```

### 11. 时间线 (timeline)

用于**产品/版本路线图、大事记、按时间顺序的事件**。`timeline`、可选 `title`；`时期 : 事件` 或 `时期 : 事件1 : 事件2`；`section 分组名` 可把时期归组。

```mermaid
timeline
  title 产品路线图
  section 2025 Q1
    v1.0 发布 : 核心功能
    v1.1 规划 : 扩展能力
  section 2025 Q2
    v2.0 预研 : 架构升级
```

- 注意：`timeline` 为实验性语法，部分渲染环境可能不支持；若不支持，可用 **gantt** 或 **flowchart** 做简化时间线。

### 12. 其他

- **饼图**：`pie title 标题` + `"标签" : 数值`
- **组织架构图**：用 **flowchart TB**，自上而下用 `-->` 或 `---` 表示汇报/层级关系。
- **用例图**：Mermaid 无专用语法，用 **flowchart** 模拟：节点为 角色、用例、系统，连线表示「参与」或「包含」。
- **C4 / 架构层级**：用 `flowchart` 或 `C4Context`（视渲染环境）；`flowchart` 的 subgraph 可表达层级。
- **思维导图**：`mindmap`（部分环境支持）。

---

## 使用与输出约定

1. **语法**：严格按 [Mermaid 官方语法](https://mermaid.js.org/syntax/flowchart.html)，避免不支持的写法；`journey`、`quadrantChart`、`timeline` 等在部分环境可能不支持，可说明或改用 flowchart/gantt 替代。
2. **代码块**：产出时用 Markdown 代码块包裹，注明 `mermaid`。
3. **位置**：若用户指定文件则写入；否则在回复中给出可复制的 Mermaid 块，并提示可插入 `README.md`、`docs/xxx.md` 等。
4. **中文**：节点、连线、Note、section、标题等尽量支持中文；遇渲染问题时改用英文或拼音。
5. **复杂度**：图过大时拆成多张子图，或说明「可进一步按模块/阶段拆分」。

## 与 `doc-writing` 的配合

画架构图、关系图、流程图、泳道图、状态图等辅助 **技术方案** 或 **PRD** 时，可同时使用 `doc-writing` 与 `mermaid-diagrams`：本 skill 负责产出 Mermaid 代码，嵌入由 `doc-writing` 生成的文档；**图题、编号、正文引用**按 `doc-writing` 的图表规范执行。
