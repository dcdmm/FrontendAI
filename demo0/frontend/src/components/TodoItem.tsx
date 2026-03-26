import type { Todo } from '../services/api'
import './TodoItem.css'

interface TodoItemProps {
    todo: Todo
    selected: boolean
    formatDate: (dateString: string) => string
    onToggle: (todo: Todo) => void
    onDelete: (id: number) => void
    onToggleSelect: (id: number) => void
}

function TodoItem({ todo, selected, formatDate, onToggle, onDelete, onToggleSelect }: TodoItemProps) {
    const handleToggle = (): void => {
        onToggle(todo)
    }

    const handleDelete = (): void => {
        if (confirm('确定要删除这个任务吗？')) {
            onDelete(todo.id)
        }
    }

    return (
        <div className={`todo-item${todo.completed ? ' completed' : ''}${selected ? ' selected' : ''}`}>
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggleSelect(todo.id)}
                className="select-checkbox"
            />

            <button
                className={`toggle-btn${todo.completed ? ' checked' : ''}`}
                onClick={handleToggle}
                aria-label={todo.completed ? '标记为未完成' : '标记为完成'}
            >
                {todo.completed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                )}
            </button>

            <div className="todo-body">
                <div className="todo-main">
                    <span className={`todo-title${todo.completed ? ' done' : ''}`}>
                        {todo.title}
                    </span>
                    {todo.description && (
                        <p className="todo-desc">{todo.description}</p>
                    )}
                </div>
                <span className="todo-date">{formatDate(todo.created_at)}</span>
            </div>

            <button onClick={handleDelete} className="btn-delete" aria-label="删除任务">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    )
}

export default TodoItem
