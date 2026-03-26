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
        content = (
            <div className="state-empty">
                <div className="state-icon">...</div>
                <p>加载中</p>
            </div>
        )
    } else if (error) {
        content = (
            <div className="state-empty state-error">
                <div className="state-icon">!</div>
                <p>{error}</p>
            </div>
        )
    } else if (todos.length === 0) {
        content = (
            <div className="state-empty">
                <div className="state-icon">+</div>
                <p>暂无任务</p>
                <span className="state-hint">在上方输入框中添加第一个任务</span>
            </div>
        )
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
    const completedCount = todos.filter(t => t.completed).length

    return (
        <div className="todos-container">
            <div className="todos-header">
                <div className="todos-header-left">
                    <h2 className="todos-title">
                        任务
                        <span className="todos-count">{todos.length}</span>
                    </h2>
                    {todos.length > 0 && (
                        <span className="todos-stats">
                            {completedCount} / {todos.length} 已完成
                        </span>
                    )}
                </div>
                <div className="todos-header-actions">
                    {todos.length > 0 && (
                        <label className="select-all-label">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={onToggleSelectAll}
                            />
                            <span>全选</span>
                        </label>
                    )}
                    {selectedIds.size > 0 && (
                        <button onClick={onBatchDelete} className="btn-batch-delete">
                            删除所选 ({selectedIds.size})
                        </button>
                    )}
                    <button onClick={onRefresh} className="btn-refresh" title="刷新列表">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {todos.length > 0 && (
                <div className="todos-progress">
                    <div className="todos-progress-bar" style={{ width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%` }} />
                </div>
            )}

            {content}
        </div>
    )
}

export default TodoList
