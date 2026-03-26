# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

全栈 Todo 应用，前端 React 19 + TypeScript + Vite 7，后端 Python FastAPI。后端使用内存列表作为数据存储（无持久化数据库）。

## Commands

所有前端命令在 `frontend/` 目录下执行：

```bash
# 前端开发
cd frontend && npm run dev        # 启动开发服务器 (localhost:5173)
cd frontend && npm run build      # 生产构建
cd frontend && npm run type-check # TypeScript 类型检查 (tsc --noEmit)
cd frontend && npm run lint       # ESLint 检查 (eslint src)

# 后端
cd backend && python main.py      # 启动后端 (localhost:8000)
```

## Architecture

前端采用分层架构，数据流向单向：

- **组件层** (`src/components/`) — UI 渲染，通过 props 接收数据和回调
- **App.tsx** — 根组件，协调组件层与 Hook 层
- **Hook 层** (`src/hooks/useTodos.ts`) — 业务逻辑 + 状态管理 (useState/useCallback)，封装所有 CRUD 操作
- **服务层** (`src/services/api.ts`) — Axios 实例封装，baseURL 从 `VITE_API_URL` 环境变量读取，默认 `/api`
- **Vite 代理** — 开发模式下 `/api` 请求代理到 `localhost:8000`

后端为单文件 FastAPI 应用 (`backend/main.py`)，REST API 路径统一以 `/api/todos` 开头。CORS 仅允许 `localhost:5173` 和 `localhost:4173`。

## Tech Stack Details

- 样式：Tailwind CSS 4（通过 `@tailwindcss/vite` 插件集成）+ 组件级 CSS 文件
- ESLint 9 flat config，包含 typescript-eslint、react-hooks、react-refresh 插件
- TypeScript 严格模式，`noEmit: true`（Vite 负责编译，TS 仅类型检查）
- Todo 类型定义在 `src/services/api.ts` 中，被 Hook 和组件共享
