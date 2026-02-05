# Todo App — React + FastAPI

全栈 Todo 应用，前端 React 19 + TypeScript，后端 Python FastAPI。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | React 19 |
| 语言 | TypeScript 5 |
| 构建工具 | Vite 7 |
| HTTP 客户端 | Axios |
| 代码检查 | ESLint 9 + eslint-plugin-react-hooks |
| 后端框架 | Python FastAPI |

## 项目结构

```
demo0/
├── backend/
│   └── main.py                          # 后端主程序 (Python + FastAPI)
│
├── frontend/
│   ├── index.html                       # HTML 入口
│   ├── package.json                     # 依赖配置
│   ├── vite.config.ts                   # Vite 构建配置 + API 代理
│   ├── tsconfig.json                    # TypeScript 配置
│   ├── eslint.config.js                 # ESLint 配置
│   │
│   └── src/
│       ├── main.tsx                     # 应用入口 (StrictMode)
│       ├── style.css                    # 全局样式
│       │
│       ├── App.tsx                      # 根组件
│       ├── App.css                      # 根组件样式
│       │
│       ├── components/                  # UI 组件
│       │   ├── TodoForm.tsx / .css      # 添加任务表单
│       │   ├── TodoList.tsx / .css      # 任务列表容器
│       │   └── TodoItem.tsx / .css      # 单个任务项
│       │
│       ├── hooks/                       # 自定义 Hook
│       │   └── useTodos.ts             # Todo 增删改查逻辑
│       │
│       ├── services/                    # API 服务层
│       │   └── api.ts                  # Axios 封装 + 类型定义
│       │
│       └── utils/                       # 工具函数
│           └── format.ts               # 日期格式化
│
└── README.md
```

## 架构说明

```
用户操作
  ↓
组件层 (components/)        ← UI 渲染 + 事件处理
  ↓
App.tsx                     ← 状态分发 + 事件协调
  ↓
Hook 层 (hooks/useTodos)    ← 业务逻辑 + 状态管理 (useState/useCallback)
  ↓
服务层 (services/api)       ← HTTP 请求 (Axios)
  ↓
Vite Dev Server (proxy)     ← /api → localhost:8000
  ↓
FastAPI 后端                ← 数据持久化
```

## 启动项目

### 1. 后端

```bash
cd backend
python main.py
# 运行在 http://localhost:8000
```

### 2. 前端

```bash
cd frontend
npm install
npm run dev
# 运行在 http://localhost:5173
```

### 可用脚本

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run type-check` | TypeScript 类型检查 |
| `npm run lint` | ESLint 代码检查 |
