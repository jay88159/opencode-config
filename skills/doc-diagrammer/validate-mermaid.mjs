#!/usr/bin/env node
/**
 * Mermaid 语法校验脚本
 * 使用 mermaid.parse() 做纯语法检查。通过 jsdom 提供 DOM 环境，避免 Puppeteer/Chromium。
 *
 * 用法: node validate-mermaid.mjs <file.mmd>
 *       node validate-mermaid.mjs -  （从 stdin 读取）
 *
 * 退出码: 0 语法正确, 1 语法错误, 2 用法错误
 */

import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import { JSDOM } from 'jsdom';

// 必须在加载 mermaid 之前提供 DOM 环境（mermaid 依赖 DOMPurify 等浏览器 API）
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

async function getStdin() {
  const rl = createInterface({ input: process.stdin });
  const lines = [];
  for await (const line of rl) lines.push(line);
  return lines.join('\n');
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node validate-mermaid.mjs <file.mmd>');
    console.error('       node validate-mermaid.mjs -  # read from stdin');
    process.exit(2);
  }

  let text;
  if (arg === '-') {
    text = await getStdin();
  } else {
    try {
      text = readFileSync(arg, 'utf8');
    } catch (e) {
      console.error(`Error: Cannot read file ${arg}`);
      process.exit(2);
    }
  }

  if (!text.trim()) {
    console.error('Error: Empty input');
    process.exit(1);
  }

  // 若输入含 ```mermaid ... ``` 围栏，提取纯 Mermaid 代码进行校验
  const fenceMatch = text.match(/^```mermaid\s*\n([\s\S]*?)```/m);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  try {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({ startOnLoad: false });
    const result = await mermaid.parse(text);
    if (result && result.diagramType) {
      process.exit(0);
    }
    process.exit(1);
  } catch (err) {
    console.error(err.message || String(err));
    process.exit(1);
  }
}

main();
