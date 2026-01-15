### 项目结构

```
demo0/                                    
├── 📁 backend/                    
│   └── 📄 main.py                        # 后端主程序(python + fastapi)
└── 📁 frontend/                
    ├── 📄 package.json                   # Node.js配置文件
    ├── 📄 vite.config.js                 # Vite构建工具配置文件
    ├── 📄 index.html                     # HTML入口(提供空容器 + 引入启动脚本),浏览器加载的第一个文件
    ├── 📄 .env                           # 环境变量配置
    ├── 📁 public/                        # 静态资源目录
    │   └── 📄 vite.svg                     # 标签页图标文件
    └── 📁 src/                           
        ├── 📄 main.js                    # 应用程序入口
        ├── 📄 style.css                  # 全局CSS样式文件
        
        ├── 📄 App.vue                    # 根组件（应用主入口）
        ├── 📁 components/                # UI 组件目录
        │   ├── 📄 TodoForm.vue           # 添加待办表单组件
        │   ├── 📄 TodoItem.vue           # 单个待办项组件
        │   └── 📄 TodoList.vue           # 待办列表容器组件
        ├── 📁 services/                  # API 服务层
        │   └── 📄 api.js                 # HTTP 请求封装
        └── 📁 composables/               # 组合式函数（业务逻辑复用）
            └── 📄 useTodos.js            # Todo 业务逻辑
```





## 快速开始

### 1. 启动后端

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 启动服务 (默认端口: 8000)
python main.py
```

后端服务将运行在: http://localhost:8000
API文档: http://localhost:8000/docs

### 2. 启动前端

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器 (默认端口: 5173)
npm run dev
```

前端应用将运行在: http://localhost:5173

## 功能特性

- ✅ 添加待办事项
- ✅ 查看待办列表
- ✅ 标记完成状态
- ✅ 删除待办事项
- ✅ 实时数据同步
- ✅ 响应式界面设计

## API 端点

| 方法   | 端点              | 说明         |
| ------ | ----------------- | ------------ |
| GET    | `/api/todos`      | 获取所有待办 |
| GET    | `/api/todos/{id}` | 获取单个待办 |
| POST   | `/api/todos`      | 创建待办     |
| PUT    | `/api/todos/{id}` | 更新待办     |
| DELETE | `/api/todos/{id}` | 删除待办     |

## 学习要点

### 后端 (FastAPI)
1. **路由定义**: 使用装饰器定义 API 端点
2. **数据验证**: Pydantic 模型自动验证请求数据
3. **CORS 配置**: 允许前端跨域访问
4. **RESTful API**: 标准的增删改查操作

### 前端 (Vue 3)
1. **组合式 API**: 使用 `setup()` 函数
2. **响应式数据**: `ref()` 创建响应式变量
3. **生命周期**: `onMounted()` 钩子
4. **HTTP 请求**: Axios 调用后端 API
5. **模板语法**: `v-for`, `v-if`, `v-model` 等指令
6. **事件处理**: `@click`, `@change` 等事件绑定

## 开发建议

1. **先熟悉后端**: 查看 FastAPI 自动生成的文档
2. **理解数据流**: 前端如何通过 API 与后端交互
3. **逐步修改**: 尝试添加新功能（如搜索、筛选）
4. **查看控制台**: 使用浏览器开发者工具调试

## 常见问题

**Q: 前端无法连接后端？**
A: 确保后端服务已启动在 8000 端口，检查 CORS 配置

**Q: 数据刷新后丢失？**
A: 当前使用内存存储，重启后端会清空数据。可以升级为数据库存储

**Q: 如何添加新功能？**
A: 先在后端添加 API 端点，再在前端添加对应的 UI 和调用逻辑

## 后续改进方向

- 📦 添加数据库持久化 (SQLite/PostgreSQL)
- 🔐 添加用户认证和授权
- 🎨 优化 UI/UX 设计
- 🔍 添加搜索和筛选功能
- 📱 实现响应式移动端适配