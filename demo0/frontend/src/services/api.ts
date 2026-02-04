import axios from 'axios'

export interface Todo {
  id: number
  title: string
  description?: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export interface CreateTodoData {
  title: string
  description?: string
  completed?: boolean
}

export type UpdateTodoData = Partial<Omit<Todo, 'id' | 'created_at' | 'updated_at'>>

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('请求失败:', error.response.data)
      }
    } else if (error.request) {
      console.error('网络错误，请检查后端服务是否启动')
    } else {
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const { data } = await apiClient.get<Todo[]>('/todos')
    return data
  },

  async getById(id: number): Promise<Todo> {
    const { data } = await apiClient.get<Todo>(`/todos/${id}`)
    return data
  },

  async create(todoData: CreateTodoData): Promise<Todo> {
    const { data } = await apiClient.post<Todo>('/todos', todoData)
    return data
  },

  async update(id: number, updateData: UpdateTodoData): Promise<Todo> {
    const { data } = await apiClient.put<Todo>(`/todos/${id}`, updateData)
    return data
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/todos/${id}`)
  },
}
