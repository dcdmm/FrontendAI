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
        <div className={`group flex items-center gap-3 px-5 py-3.5 border-b border-[#f3f4f6] last:border-b-0 transition-[background] duration-150 ease-in-out hover:bg-[#fafbfc] ${todo.completed ? 'opacity-[0.65]' : ''} ${selected ? 'bg-[#eef2ff]' : ''}`}>
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggleSelect(todo.id)}
                className="w-4 h-4 cursor-pointer accent-[#6366f1] shrink-0"
            />

            <button
                className={`w-5.5 h-5.5 rounded-full border-2 p-0 flex items-center justify-center shrink-0 transition-all duration-200 ease-in-out ${todo.completed ? 'bg-[#6366f1] border-[#6366f1] text-white' : 'border-[#d1d5db] bg-transparent hover:border-[#6366f1]'}`}
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
                    <span className={`text-[15px] font-medium leading-[1.4] ${todo.completed ? 'line-through text-[#9ca3af]' : 'text-[#1a1a2e]'}`}>
                        {todo.title}
                    </span>
                    {todo.description && (
                        <p className="text-[13px] text-[#6b7280] mt-0.5 leading-[1.4] overflow-hidden text-ellipsis whitespace-nowrap">{todo.description}</p>
                    )}
                </div>
                <span className="text-xs text-[#9ca3af] whitespace-nowrap shrink-0">{formatDate(todo.created_at)}</span>
            </div>

            <button onClick={handleDelete} className="flex items-center justify-center w-8 h-8 p-0 bg-transparent text-[#d1d5db] rounded-md shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out hover:bg-[#fef2f2] hover:text-[#dc2626]" aria-label="删除任务">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    )
}

export default TodoItem
