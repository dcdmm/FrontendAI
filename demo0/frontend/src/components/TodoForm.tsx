import React, { useState } from 'react'
import type { CreateTodoData } from '../services/api'
import './TodoForm.css'

interface TodoFormProps {
    onSubmit: (data: CreateTodoData) => void
}

function TodoForm({ onSubmit }: TodoFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expanded, setExpanded] = useState(false)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (!title.trim()) {
            alert('请输入任务标题')
            return
        }

        onSubmit({ title, description })

        setTitle('')
        setDescription('')
        setExpanded(false)
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="todo-form-row">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onFocus={() => setExpanded(true)}
                    placeholder="添加新任务..."
                    className="todo-form-input"
                />
                <button type="submit" className="todo-form-btn">
                    添加
                </button>
            </div>
            {expanded && (
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="添加描述 (可选)"
                    rows={2}
                    className="todo-form-textarea"
                />
            )}
        </form>
    )
}

export default TodoForm
