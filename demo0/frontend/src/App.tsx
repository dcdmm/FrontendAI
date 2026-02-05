import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import { formatDate } from './utils/format'
import type { Todo, CreateTodoData } from './services/api'
import './App.css'

function App() {
    const {
        todos,
        loading,
        error,
        fetchTodos,
        createTodo,
        toggleTodo,
        deleteTodo,
    } = useTodos()

    const handleAddTodo = async (todoData: CreateTodoData): Promise<void> => {
        try {
            await createTodo(todoData)
        } catch (err) {
            console.error('添加失败:', err)
        }
    }

    const handleToggleTodo = async (todo: Todo): Promise<void> => {
        try {
            await toggleTodo(todo)
        } catch (err) {
            console.error('更新失败:', err)
        }
    }

    const handleDeleteTodo = async (id: number): Promise<void> => {
        try {
            await deleteTodo(id)
        } catch (err) {
            console.error('删除失败:', err)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    return (
        <div className="app-container">
            <h1 className="app-title">📝 Todo 应用</h1>
            <p className="app-subtitle">React + FastAPI 全栈示例</p>

            <TodoForm onSubmit={handleAddTodo} />

            <TodoList
                todos={todos}
                loading={loading}
                error={error}
                formatDate={formatDate}
                onRefresh={fetchTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
            />
        </div>
    )
}

export default App
