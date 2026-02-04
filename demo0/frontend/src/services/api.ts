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


import axios, { AxiosResponse } from 'axios'


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})


apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
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
    }
    else if (error.request) {
      console.error('网络错误，请检查后端服务是否启动')
    }
    else {
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export const todoApi = {
  getAll(): Promise<AxiosResponse<Todo[]>> {
    return apiClient.get<Todo[]>('/todos')
  },
  getById(id: number): Promise<AxiosResponse<Todo>> {
    return apiClient.get<Todo>(`/todos/${id}`)
  },
  create(data: CreateTodoData): Promise<AxiosResponse<Todo>> {
    return apiClient.post<Todo>('/todos', data)
  },

  update(id: number, data: UpdateTodoData): Promise<AxiosResponse<Todo>> {
    return apiClient.put<Todo>(`/todos/${id}`, data)
  },
  delete(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete<void>(`/todos/${id}`)
  },
}

export default apiClient
