import TodoItem from './TodoItem'
import type { Todo } from '../services/api'
import './TodoList.css'

interface TodoListProps {
    todos: Todo[]
    loading: boolean
    error: string | null
    selectedIds: Set<number>
    formatDate: (dateString: string) => string
    onRefresh: () => void
    onToggle: (todo: Todo) => void
    onDelete: (id: number) => void
    onToggleSelect: (id: number) => void
    onToggleSelectAll: () => void
    onBatchDelete: () => void
}

function TodoList({ todos, loading, error, selectedIds, formatDate, onRefresh, onToggle, onDelete, onToggleSelect, onToggleSelectAll, onBatchDelete }: TodoListProps) {
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
                        selected={selectedIds.has(todo.id)}
                        formatDate={formatDate}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onToggleSelect={onToggleSelect}
                    />
                ))}
            </div>
        )
    }

    const allSelected = todos.length > 0 && selectedIds.size === todos.length

    return (
        <div className="todos-container">
            <div className="todos-header">
                <h2>任务列表 ({todos.length})</h2>
                <div className="todos-header-actions">
                    {todos.length > 0 && (
                        <label className="select-all-label">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={onToggleSelectAll}
                            />
                            全选
                        </label>
                    )}
                    {selectedIds.size > 0 && (
                        <button onClick={onBatchDelete} className="btn-batch-delete">
                            🗑️ 批量删除 ({selectedIds.size})
                        </button>
                    )}
                    <button onClick={onRefresh} className="btn-refresh">
                        🔄 刷新
                    </button>
                </div>
            </div>
            {content}
        </div>
    )
}

export default TodoList
