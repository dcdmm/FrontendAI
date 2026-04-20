### 执行脚本

#### 后端

```shell
cd backend

uv lock
uv sync  
uv run uvicorn main:app --reload 
```

#### 前端

```shell
cd frontend

npm install  # 安装依赖

npm run dev  # 启动本地开发服务器(热更新)

npm run type-check  # TypeScript类型检查
npm run lint  # 代码规范检查

npm run build  # 打包构建生产版本(代码压缩、优化到dist文件夹)
npm run preview  # 本地预览build产物
```

#### 本地部署

```shell
cd deploy

bash deploy.sh
```

#### Docker+Nginx生产环境

```shell
docker compose build   
docker compose up -d  
docker compose down  
```
