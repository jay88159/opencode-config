# 编辑模式与技巧参考

本文档提供常见编辑场景的模式和解决方案。

---

## 目录

1. [定位模式](#定位模式)
2. [编辑模式](#编辑模式)
3. [边界情况处理](#边界情况处理)
4. [常见错误与解决方案](#常见错误与解决方案)

---

## 定位模式

### 1. 按行号定位

**场景**：用户明确指定行号

```
用户："改第 10 行"
用户："修改 25-30 行"
用户："删除第 5 行"
```

**操作**：
```
Read(path, offset: 行号-3, limit: 10)  # 读取目标行及上下文
```

**技巧**：
- 多读几行上下文，便于构造唯一的 old_string
- 行号是 1-based（第 1 行 = offset 0）

### 2. 按标题/章节定位

**场景**：用户指定章节名称

```
用户："修改第三章"
用户："改 '## 安装步骤' 这一节"
用户："把背景介绍部分重写一下"
```

**操作**：
```
# 方法 1: Grep 搜索标题
Grep(pattern: "## 安装步骤", path: file)

# 方法 2: 读取全文后手动定位
Read(path)  # 找到 "## 安装步骤" 到下一个 "##" 的范围
```

**章节边界判定**：
- Markdown 中，`##` 开头的行表示二级标题
- 一个章节从当前标题延续到下一个同级或更高级标题
- 例如：`## A` 的内容延续到下一个 `##` 或 `#` 之前

### 3. 按关键词/内容定位

**场景**：用户描述要修改的内容

```
用户："把那个 TODO 改掉"
用户："修改报错信息那一行"
用户："找到 handleClick 函数并修改"
```

**操作**：
```
Grep(pattern: "TODO", path: file)
Grep(pattern: "handleClick", path: file)
Grep(pattern: "Error:", path: file)
```

**技巧**：
- 使用正则表达式提高精确度：`Grep(pattern: "function handleClick\\(")`
- 如果匹配多个，向用户确认具体是哪一个

### 4. 按上下文定位

**场景**：用户提供周围内容作为参考

```
用户："在 import 语句下面加一行"
用户："把 return 之前的那个 console.log 删掉"
```

**操作**：
```
# 搜索上下文
Grep(pattern: "import.*from", path: file)
Grep(pattern: "console\\.log.*\\n.*return", path: file, multiline: true)
```

---

## 编辑模式

### 1. 替换模式

**简单替换**：
```
StrReplace(
  path: file,
  old_string: "原内容",
  new_string: "新内容"
)
```

**全局替换**：
```
StrReplace(
  path: file,
  old_string: "旧术语",
  new_string: "新术语",
  replace_all: true
)
```

### 2. 插入模式

**在某行之前插入**：
```
StrReplace(
  old_string: "目标行内容",
  new_string: "新插入的内容\n目标行内容"
)
```

**在某行之后插入**：
```
StrReplace(
  old_string: "目标行内容",
  new_string: "目标行内容\n新插入的内容"
)
```

**在文件开头插入**：
```
# 读取第一行，在其前面插入
StrReplace(
  old_string: "第一行的内容",
  new_string: "新的开头内容\n\n第一行的内容"
)
```

**在文件末尾追加**：
```
# 方法 1: 找到最后一行，在其后追加
StrReplace(
  old_string: "最后一行内容",
  new_string: "最后一行内容\n\n追加的内容"
)

# 方法 2: 如果追加大量内容，读取全文后用 Write 重写
```

### 3. 删除模式

**删除单行**：
```
StrReplace(
  old_string: "前一行\n要删除的行\n后一行",
  new_string: "前一行\n后一行"
)
```

**删除多行/段落**：
```
StrReplace(
  old_string: "\n## 要删除的章节\n\n内容...\n\n",
  new_string: "\n"
)
```

**删除空行**：
```
StrReplace(
  old_string: "\n\n\n",
  new_string: "\n\n",
  replace_all: true
)
```

### 4. 重写模式

**重写整个章节**：
```
# 先定位章节边界
old_string: "## 原章节标题\n\n原内容...\n\n## 下一章节"
new_string: "## 新章节标题\n\n全新的内容...\n\n## 下一章节"
```

**重写整个文件**（仅当必要时）：
```
Write(path: file, contents: "全新的文件内容...")
```

---

## 边界情况处理

### 1. old_string 不唯一

**问题**：文件中有多处匹配
**解决**：扩展上下文

```
# 错误：太短，可能匹配多处
old_string: "return true"

# 正确：包含更多上下文
old_string: "function validate() {\n  if (isValid) {\n    return true"
```

### 2. old_string 找不到

**可能原因**：
1. 空白字符不匹配（tab vs spaces）
2. 换行符不匹配（`\n` vs `\r\n`）
3. 不可见字符（零宽空格等）
4. 内容已被修改

**解决方案**：
```
# 1. 重新 Read 文件确认当前内容
Read(path)

# 2. 使用 Grep 搜索关键词
Grep(pattern: "部分关键词", path: file)

# 3. 减少 old_string 长度，只匹配核心部分
```

### 3. 跨段落编辑

**场景**：需要修改跨越多个段落的内容

```
# 确保 old_string 包含完整的段落结构
old_string: "第一段内容。\n\n第二段内容。\n\n第三段内容。"
new_string: "合并后的新段落内容。"
```

### 4. 处理代码块

**Markdown 中的代码块**：
```
old_string: "```python\nold_code()\n```"
new_string: "```python\nnew_code()\n```"
```

**注意**：
- 保持代码块的语言标记
- 保持代码块内的缩进

### 5. 处理列表

**有序列表**：
```
old_string: "1. 第一项\n2. 第二项\n3. 第三项"
new_string: "1. 第一项\n2. 修改后的第二项\n3. 第三项\n4. 新增的第四项"
```

**无序列表**：
```
old_string: "- 项目 A\n- 项目 B"
new_string: "- 项目 A\n- 项目 B\n- 项目 C"
```

---

## 常见错误与解决方案

### 错误 1: "old_string not found"

| 原因 | 解决方案 |
|------|----------|
| 文件已被修改 | 重新 Read 获取最新内容 |
| 空白字符差异 | 复制文件中的实际内容 |
| 编码问题 | 检查是否有特殊字符 |

### 错误 2: "old_string not unique"

| 原因 | 解决方案 |
|------|----------|
| 匹配串太短 | 扩展上下文到 3-5 行 |
| 重复的代码模式 | 包含变量名或注释来区分 |
| 模板化内容 | 使用 replace_all 或分次处理 |

### 错误 3: 格式错乱

| 原因 | 解决方案 |
|------|----------|
| 缩进不一致 | 检查 tab vs spaces |
| 换行符丢失 | 确保 new_string 包含正确的 \n |
| 空行过多/过少 | 调整段落间的空行数量 |

### 错误 4: 编辑范围过大

| 场景 | 建议 |
|------|------|
| 只需改一行却重写整段 | 缩小 old_string 范围 |
| 全局替换影响了不该改的地方 | 不用 replace_all，逐个处理 |
| 应该局部修改却重写全文 | 使用 StrReplace 而非 Write |

---

## 最佳实践清单

- [ ] 编辑前先 Read 文件
- [ ] old_string 包含足够上下文（3-5 行）
- [ ] 验证 old_string 在文件中唯一
- [ ] 保持原文的缩进和格式风格
- [ ] 复杂编辑后 Read 验证结果
- [ ] 涉及多处修改时，从后向前改（避免行号偏移）
