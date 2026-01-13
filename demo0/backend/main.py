from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="Todo API", version="1.0.0")

# 配置CORS(跨域资源共享)中间件,解决前后端跨域问题
# 浏览器的同源策略会阻止不同端口间的请求,前端(5173)和后端(8000)端口不同需要配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4173", "http://localhost:5173"],  # 允许的前端地址,只有该地址可以访问API
    allow_credentials=True,  # 允许携带认证信息(cookies、Authorization头等)
    allow_methods=["*"],  # 允许所有HTTP方法(GET/POST/PUT/DELETE等)
    allow_headers=["*"],  # 允许所有请求头(Content-Type/Authorization等)
)


class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class Todo(TodoBase):
    id: int
    created_at: datetime


todos_db: List[Todo] = []  # 内存数据库
next_id = 1


@app.get("/api/todos", response_model=List[Todo])
async def get_todos():
    """获取所有待办事项"""
    return todos_db


@app.get("/api/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int):
    """获取单个待办事项"""
    for todo in todos_db:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.post("/api/todos", response_model=Todo, status_code=201)
async def create_todo(todo: TodoCreate):
    """创建新的待办事项"""
    global next_id
    new_todo = Todo(
        id=next_id,
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
        created_at=datetime.now()
    )
    todos_db.append(new_todo)
    next_id += 1
    return new_todo


@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo_update: TodoUpdate):
    """更新待办事项"""
    for todo in todos_db:
        if todo.id == todo_id:
            if todo_update.title is not None:
                todo.title = todo_update.title
            if todo_update.description is not None:
                todo.description = todo_update.description
            if todo_update.completed is not None:
                todo.completed = todo_update.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: int):
    """删除待办事项"""
    global todos_db
    for i, todo in enumerate(todos_db):
        if todo.id == todo_id:
            todos_db.pop(i)
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
