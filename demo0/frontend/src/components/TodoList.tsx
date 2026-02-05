import TodoItem from './TodoItem'
import type { Todo } from '../services/api'
import './TodoList.css'

interface TodoListProps {
    todos: Todo[]
    loading: boolean
    error: string | null
    formatDate: (dateString: string) => string
    onRefresh: () => void
    onToggle: (todo: Todo) => void
    onDelete: (id: number) => void
}

function TodoList({ todos, loading, error, formatDate, onRefresh, onToggle, onDelete }: TodoListProps) {
    let content: React.ReactNode

    if (loading) {
        content = <div className="loading">加载中...</div>
    } else if (error) {
        content = <div className="error-state"><p>{error}</p></div>
    } else if (todos.length === 0) {
        content = <div className="empty-state"><p>暂无任务，开始添加第一个吧！</p></div>
    } else {
        content = (
            <div className="todos-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        formatDate={formatDate}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="todos-container">
            <div className="todos-header">
                <h2>任务列表 ({todos.length})</h2>
                <button onClick={onRefresh} className="btn-refresh">
                    🔄 刷新
                </button>
            </div>
            {content}
        </div>
    )
}

export default TodoList
