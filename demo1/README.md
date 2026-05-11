# AI Chat Demo

学习项目：双后端 + 单前端，展示如何用 OpenAI 兼容 SDK 接入不同的大模型并做流式输出。

## 结构

```
demo1/
├── .env             # 两个后端共用，按前缀区分（OPENROUTER_* / DASHSCOPE_*）
├── backend-ts/      # Hono + OpenAI SDK → OpenRouter，端口 8787
├── backend-py/      # FastAPI + OpenAI SDK → 阿里 DashScope，端口 8000
└── frontend/        # React + Vite，端口 5173
```

两个后端对外暴露相同的接口：`POST /chat`，请求体 `{ messages: [{role, content}] }`，响应为 SSE 流（`data: {"delta": "..."}`，结束 `data: [DONE]`）。

## 启动

先准备环境变量（仓库根目录一份 `.env`，被两个后端共享）：

```bash
cp .env.example .env   # 填入 OPENROUTER_API_KEY、DASHSCOPE_API_KEY
```

### 1. backend-ts (OpenRouter)

```bash
cd backend-ts
npm install
npm run dev    # 通过 --env-file=../.env 加载根目录 .env
```

### 2. backend-py (阿里 DashScope)

用 [uv](https://docs.astral.sh/uv/) 管理依赖：

```bash
cd backend-py
uv sync                # 创建 .venv 并安装依赖
uv run uvicorn main:app --reload --port 8000
```

### 3. frontend

```bash
cd frontend
npm install
npm run dev
```

打开 http://localhost:5173 ，右上角下拉切换后端。
