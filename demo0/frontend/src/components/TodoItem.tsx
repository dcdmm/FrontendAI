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
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelect(todo.id)}
                    className="select-checkbox"
                />
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="todo-checkbox"
                />
                <div className="todo-info">
                    <h3 className="todo-title">{todo.title}</h3>
                    {todo.description && (
                        <p className="todo-description">{todo.description}</p>
                    )}
                    <span className="todo-date">
                        {formatDate(todo.created_at)}
                    </span>
                </div>
            </div>
            <button onClick={handleDelete} className="btn-delete">
                🗑️ 删除
            </button>
        </div>
    )
}

export default TodoItem
