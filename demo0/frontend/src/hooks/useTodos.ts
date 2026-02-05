import { useState, useCallback } from 'react'
import { todoApi, Todo, CreateTodoData, UpdateTodoData } from '../services/api'

export interface UseTodosReturn {
    todos: Todo[]
    loading: boolean
    error: string | null
    fetchTodos: () => Promise<void>
    createTodo: (todoData: CreateTodoData) => Promise<void>
    updateTodo: (id: number, updateData: UpdateTodoData) => Promise<void>
    toggleTodo: (todo: Todo) => Promise<void>
    deleteTodo: (id: number) => Promise<void>
}

export function useTodos(): UseTodosReturn {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTodos = useCallback(async (): Promise<void> => {
        setLoading(true)
        setError(null)
        try {
            const data = await todoApi.getAll()
            setTodos(data)
        } catch (err) {
            setError('获取待办失败，请确保后端服务已启动')
            console.error('获取待办失败:', err)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const createTodo = useCallback(async (todoData: CreateTodoData): Promise<void> => {
        setError(null)
        try {
            const newTodo = await todoApi.create(todoData)
            setTodos(prev => [...prev, newTodo])
        } catch (err) {
            setError('添加待办失败')
            console.error('添加待办失败:', err)
            throw err
        }
    }, [])

    const updateTodo = useCallback(async (id: number, updateData: UpdateTodoData): Promise<void> => {
        setError(null)
        try {
            const updated = await todoApi.update(id, updateData)
            setTodos(prev => prev.map(t => t.id === id ? updated : t))
        } catch (err) {
            setError('更新待办失败')
            console.error('更新待办失败:', err)
            throw err
        }
    }, [])

    const toggleTodo = useCallback(async (todo: Todo): Promise<void> => {
        setError(null)
        try {
            const updated = await todoApi.update(todo.id, { completed: !todo.completed })
            setTodos(prev => prev.map(t => t.id === todo.id ? updated : t))
        } catch (err) {
            setError('更新待办失败')
            console.error('更新待办失败:', err)
            throw err
        }
    }, [])

    const deleteTodo = useCallback(async (id: number): Promise<void> => {
        setError(null)
        try {
            await todoApi.delete(id)
            setTodos(prev => prev.filter(t => t.id !== id))
        } catch (err) {
            setError('删除待办失败')
            console.error('删除待办失败:', err)
            throw err
        }
    }, [])

    return {
        todos,
        loading,
        error,
        fetchTodos,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
    }
}
