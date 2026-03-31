import type { Todo } from '../services/api'

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
        <div className={`group flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 last:border-b-0 transition-colors duration-150 hover:bg-gray-50 ${selected ? 'bg-indigo-50' : ''} ${todo.completed ? 'opacity-65' : ''}`}>
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggleSelect(todo.id)}
                className="size-4 cursor-pointer accent-indigo-500 shrink-0"
            />

            <button
                className={`size-5.5 rounded-full border-2 p-0 flex items-center justify-center shrink-0 transition-all duration-200 ${todo.completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300 bg-transparent hover:border-indigo-500'}`}
                onClick={handleToggle}
                aria-label={todo.completed ? '标记为未完成' : '标记为完成'}
            >
                {todo.completed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                )}
            </button>

            <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <span className={`text-[15px] font-medium leading-relaxed ${todo.completed ? 'line-through text-gray-400' : 'text-[#1a1a2e]'}`}>
                        {todo.title}
                    </span>
                    {todo.description && (
                        <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap">{todo.description}</p>
                    )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{formatDate(todo.created_at)}</span>
            </div>

            <button onClick={handleDelete} className="flex items-center justify-center size-8 p-0 bg-transparent text-gray-300 rounded-md shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-red-50 hover:text-red-600" aria-label="删除任务">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    )
}

export default TodoItem
