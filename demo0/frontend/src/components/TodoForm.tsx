import React, { useState } from 'react'
import type { CreateTodoData } from '../services/api'

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
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="mb-4 text-gray-800">添加新任务</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="任务标题 (按Enter快速添加)"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:border-[#667eea] focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="任务描述 (可选)"
                        rows={3}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:border-[#667eea] focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-3 px-6 text-base font-semibold w-full border-none rounded-lg cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                >
                    ➕ 添加任务
                </button>
            </form>
        </div>
    )
}

export default TodoForm
