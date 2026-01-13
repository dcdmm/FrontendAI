# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个使用 **Vue 3 + FastAPI** 构建的全栈 Todo 应用，采用前后端分离架构。后端使用 FastAPI 提供 RESTful API，前端使用 Vue 3 组合式 API 和 Vite 构建工具。

## 开发命令

### 后端 (FastAPI)

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 启动开发服务器 (http://localhost:8000)
python main.py

# 查看自动生成的 API 文档
# 访问 http://localhost:8000/docs
```

### 前端 (Vue 3 + Vite)

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器 (http://localhost:5173)
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 架构说明

### 数据流

1. **前端 → 后端**: 前端通过 Axios 向 `http://localhost:8000/api/*` 发送 HTTP 请求
2. **CORS 处理**: 后端 FastAPI 配置了 CORS 中间件，允许 `http://localhost:5173` 跨域访问
3. **数据存储**: 当前使用内存列表 (`todos_db`) 存储数据，重启后端会丢失数据
4. **数据验证**: 使用 Pydantic 模型进行请求/响应数据验证

### 后端架构 (backend/main.py)

- **数据模型层**:
  - `TodoBase`: 基础模型（title, description, completed）
  - `TodoCreate`: 创建时使用
  - `TodoUpdate`: 更新时使用（所有字段可选）
  - `Todo`: 完整模型（包含 id, created_at）

- **API 端点**:
  - `GET /api/todos`: 获取所有待办事项
  - `GET /api/todos/{id}`: 获取单个待办事项
  - `POST /api/todos`: 创建待办事项
  - `PUT /api/todos/{id}`: 更新待办事项（支持部分更新）
  - `DELETE /api/todos/{id}`: 删除待办事项

- **全局状态**:
  - `todos_db`: 内存中的待办事项列表
  - `next_id`: 自增 ID 计数器

### 前端架构（模块化架构）

前端采用了模块化设计，遵循关注点分离原则：

```
frontend/src/
├── services/         # API 服务层
│   └── api.js       # 统一管理所有 HTTP 请求
├── composables/     # 组合式函数（业务逻辑复用）
│   └── useTodos.js  # Todo 业务逻辑和状态管理
├── components/      # UI 组件
│   ├── TodoForm.vue    # 添加待办表单
│   ├── TodoItem.vue    # 单个待办事项展示
│   └── TodoList.vue    # 待办列表容器
├── App.vue          # 主应用（组合子组件）
├── main.js          # 应用入口
└── style.css        # 全局样式
```

#### API 服务层 (services/api.js)

- 使用 axios 实例，配置基础 URL 和超时
- 支持环境变量配置 (`VITE_API_URL`)
- 统一的请求/响应拦截器
- 导出 `todoApi` 对象，包含所有 CRUD 方法

#### 业务逻辑层 (composables/useTodos.js)

- **Composable 模式**: 封装可复用的响应式状态和方法
- **状态管理**: `todos`, `loading`, `error`
- **业务方法**: `fetchTodos()`, `createTodo()`, `updateTodo()`, `toggleTodo()`, `deleteTodo()`
- **工具方法**: `formatDate()`
- 可在任何组件中调用 `useTodos()` 复用逻辑

#### 组件层

- **TodoForm.vue**: 负责表单输入和验证，通过 `@submit` 事件向上传递数据
- **TodoItem.vue**: 展示单个待办事项，接收 `todo` prop，触发 `@toggle` 和 `@delete` 事件
- **TodoList.vue**: 列表容器，管理加载/错误/空状态，组合多个 `TodoItem`
- **App.vue**: 主应用组件，组合 `TodoForm` 和 `TodoList`，协调数据流

#### 数据流

1. **父 → 子**: 通过 Props 传递数据（`:todos`, `:loading`, `:error`）
2. **子 → 父**: 通过 Events 触发操作（`@submit`, `@toggle`, `@delete`）
3. **状态管理**: 使用 `useTodos()` composable 统一管理状态
4. **API 调用**: 所有请求通过 `services/api.js` 发送

### 配置文件

- **vite.config.js**: 配置了代理，将 `/api/*` 请求转发到 `http://localhost:8000`（可选使用，当前前端直接访问后端 URL）
- **CORS**: 后端明确允许 `http://localhost:5173` 访问，修改端口需同步更新 `backend/main.py` 的 CORS 配置

## 常见开发任务

### 添加新的 Todo 字段

1. 在 `backend/main.py` 的 Pydantic 模型中添加字段（TodoBase, TodoCreate, TodoUpdate, Todo）
2. 在前端 `App.vue` 的 `newTodo.value` 中添加对应字段
3. 更新前端模板添加输入控件和显示逻辑

### 切换到数据库存储

当前使用内存存储（`todos_db` 列表），需要改为数据库时：
1. 添加数据库依赖（如 SQLAlchemy）到 `requirements.txt`
2. 创建数据库模型和表结构
3. 修改 API 端点中的数据操作逻辑，从操作列表改为操作数据库

### 修改端口

- **后端端口**: 修改 `backend/main.py` 最后的 `uvicorn.run()` 的 `port` 参数，同时更新 CORS 配置中的前端 URL
- **前端端口**: 修改 `frontend/vite.config.js` 的 `server.port`，同时更新后端 CORS 配置和前端 `API_URL`

## 技术栈版本

- **后端**: FastAPI 0.109.0, Uvicorn 0.27.0, Pydantic 2.5.3
- **前端**: Vue 3.4.15, Vite 5.0.11, Axios 1.6.5
