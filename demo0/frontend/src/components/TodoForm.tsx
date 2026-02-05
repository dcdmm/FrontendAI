import React, { useState } from 'react'
import type { CreateTodoData } from '../services/api'
import './TodoForm.css'

interface TodoFormProps {
    onSubmit: (data: CreateTodoData) => void
}

function TodoForm({ onSubmit }: TodoFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (!title.trim()) {
            alert('请输入任务标题')
            return
        }

        onSubmit({ title, description })

        setTitle('')
        setDescription('')
    }

    return (
        <div className="add-todo-card">
            <h2>添加新任务</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="任务标题 (按Enter快速添加)"
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="任务描述 (可选)"
                        rows={3}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="btn-primary">
                    ➕ 添加任务
                </button>
            </form>
        </div>
    )
}

export default TodoForm
