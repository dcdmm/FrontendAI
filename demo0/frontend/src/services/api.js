/**
 * API 服务层 - 统一管理所有 HTTP 请求
 *
 * 这个文件的作用类似于：算法项目中的 "数据加载器"
 * 把所有与后端交互的代码集中在这里，避免在各个组件中重复写 HTTP 请求
 */

// ============================================
// 导入依赖
// ============================================

/**
 * 导入 axios：一个 HTTP 客户端库
 * 类比：就像 Python 中的 requests 库，用于发送 HTTP 请求
 * 安装命令：npm install axios
 */
import axios from 'axios'

// ============================================
// 创建 axios 实例
// ============================================

/**
 * 创建一个配置好的 axios 实例
 *
 * 为什么要创建实例而不是直接用 axios？
 * 类比：就像你创建一个预配置的模型对象，所有请求都复用这些配置
 * - 避免每次请求都要写一遍 baseURL
 * - 统一设置超时时间、请求头等
 * - 可以添加拦截器统一处理请求和响应
 */
const apiClient = axios.create({
  /**
   * baseURL: API 的基础地址
   * 类比：就像数据集的根目录路径
   *
   * import.meta.env.VITE_API_URL：
   * - import.meta.env 是 Vite 提供的环境变量对象
   * - VITE_API_URL 从 .env 文件中读取（开发环境和生产环境可以不同）
   * - || 'http://localhost:8000/api' 是默认值（如果环境变量未设置）
   *
   * 实际使用时，请求 '/todos' 会自动拼接成 'http://localhost:8000/api/todos'
   */
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',

  /**
   * timeout: 请求超时时间（毫秒）
   * 10000 毫秒 = 10 秒
   * 如果请求超过 10 秒没有响应，会自动取消并报错
   */
  timeout: 10000,

  /**
   * headers: 默认请求头
   * 告诉服务器我们发送的是 JSON 格式的数据
   */
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============================================
// 请求拦截器
// ============================================

/**
 * 请求拦截器：在每个请求发送前执行
 * 类比：就像数据预处理管道，在数据送入模型前进行标准化
 *
 * interceptors.request.use() 接收两个函数：
 * 1. 成功回调：请求发送前执行
 * 2. 失败回调：请求配置错误时执行
 */
apiClient.interceptors.request.use(
  /**
   * 成功回调函数
   * @param {Object} config - axios 请求配置对象（包含 url, method, headers 等）
   * @returns {Object} - 返回修改后的配置对象
   */
  (config) => {
    // 这里可以在请求头中添加认证 token
    // 类比：就像在每个数据样本上添加一个身份标识

    // 示例：从浏览器本地存储中获取 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   // 在请求头中添加 Authorization 字段
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // 返回配置对象（必须返回，否则请求无法发送）
    return config
  },

  /**
   * 失败回调函数
   * @param {Error} error - 错误对象
   * @returns {Promise} - 返回一个被拒绝的 Promise
   */
  (error) => {
    // 如果请求配置有问题，会进入这里
    // Promise.reject() 会将错误传递给调用者的 catch 块
    return Promise.reject(error)
  }
)

// ============================================
// 响应拦截器
// ============================================

/**
 * 响应拦截器：在收到响应后、传给调用者之前执行
 * 类比：就像模型输出后处理，统一处理结果格式或错误
 *
 * 为什么需要响应拦截器？
 * - 统一处理错误（比如 token 过期、服务器错误）
 * - 统一处理响应数据格式
 * - 避免在每个 API 调用处都写相同的错误处理代码
 */
apiClient.interceptors.response.use(
  /**
   * 成功回调：服务器返回 2xx 状态码时执行
   * @param {Object} response - axios 响应对象
   * @returns {Object} - 返回响应对象（传给调用者）
   */
  (response) => {
    // 请求成功，直接返回响应对象
    // response 包含：
    // - response.data: 服务器返回的数据
    // - response.status: HTTP 状态码（如 200, 201）
    // - response.headers: 响应头
    return response
  },

  /**
   * 失败回调：服务器返回非 2xx 状态码或网络错误时执行
   * @param {Error} error - 错误对象
   * @returns {Promise} - 返回被拒绝的 Promise
   */
  (error) => {
    // 统一错误处理

    // error.response: 如果服务器有响应（比如 404, 500），这个字段存在
    if (error.response) {
      // 服务器返回了错误状态码
      // 根据不同的状态码进行不同的处理
      switch (error.response.status) {
        case 404:
          // 资源不存在
          console.error('资源不存在')
          break
        case 500:
          // 服务器内部错误
          console.error('服务器错误')
          break
        default:
          // 其他错误
          console.error('请求失败:', error.response.data)
      }
    }
    // error.request: 请求已发出但没有收到响应（网络错误）
    else if (error.request) {
      // 请求发送了，但服务器没有响应
      // 可能是后端服务未启动、网络断开等
      console.error('网络错误，请检查后端服务是否启动')
    }
    // 其他错误：请求配置错误
    else {
      // 请求配置有问题（在发送请求前就出错了）
      console.error('请求配置错误:', error.message)
    }

    // 将错误继续抛出，让调用者可以在 catch 块中处理
    return Promise.reject(error)
  }
)

// ============================================
// Todo API 接口定义
// ============================================

/**
 * todoApi 对象：包含所有 Todo 相关的 API 调用方法
 *
 * 为什么要把 API 方法封装成对象？
 * 类比：就像把数据处理函数封装成一个工具类
 * - 代码更清晰，所有 Todo 相关的请求都在这里
 * - 调用时更语义化：todoApi.getAll() 比 axios.get('/todos') 更清楚
 * - 如果 API 地址变化，只需修改这里，不用改每个调用的地方
 */
export const todoApi = {
  /**
   * 获取所有待办事项
   *
   * HTTP 方法：GET
   * 请求地址：/todos (会自动拼接 baseURL，完整地址是 http://localhost:8000/api/todos)
   *
   * @returns {Promise<Object>} - Promise 对象，成功时 resolve 响应对象
   *
   * 使用示例：
   * const response = await todoApi.getAll()
   * console.log(response.data)  // 打印待办事项列表
   */
  getAll() {
    // apiClient.get() 发送 GET 请求
    // 返回一个 Promise（异步操作）
    return apiClient.get('/todos')
  },

  /**
   * 获取单个待办事项
   *
   * HTTP 方法：GET
   * 请求地址：/todos/{id}
   *
   * @param {number} id - 待办事项的 ID
   * @returns {Promise<Object>} - Promise 对象
   *
   * 使用示例：
   * const response = await todoApi.getById(1)
   * console.log(response.data)  // 打印 ID 为 1 的待办事项
   */
  getById(id) {
    // 使用模板字符串拼接 URL
    // 如果 id = 1，则请求 /todos/1
    return apiClient.get(`/todos/${id}`)
  },

  /**
   * 创建新的待办事项
   *
   * HTTP 方法：POST
   * 请求地址：/todos
   * 请求体：data 对象（会自动转为 JSON）
   *
   * @param {Object} data - 待办事项数据
   * @param {string} data.title - 标题（必填）
   * @param {string} [data.description] - 描述（可选）
   * @param {boolean} [data.completed] - 是否完成（可选）
   * @returns {Promise<Object>} - Promise 对象
   *
   * 使用示例：
   * const newTodo = { title: '学习 Vue', description: '完成教程' }
   * const response = await todoApi.create(newTodo)
   * console.log(response.data)  // 打印创建的待办事项（包含 id）
   */
  create(data) {
    // apiClient.post(url, data) 发送 POST 请求
    // data 会自动序列化为 JSON 并发送
    return apiClient.post('/todos', data)
  },

  /**
   * 更新待办事项
   *
   * HTTP 方法：PUT
   * 请求地址：/todos/{id}
   * 请求体：data 对象
   *
   * @param {number} id - 待办事项的 ID
   * @param {Object} data - 要更新的数据（支持部分更新）
   * @param {string} [data.title] - 新标题（可选）
   * @param {string} [data.description] - 新描述（可选）
   * @param {boolean} [data.completed] - 新完成状态（可选）
   * @returns {Promise<Object>} - Promise 对象
   *
   * 使用示例：
   * // 只更新完成状态
   * const response = await todoApi.update(1, { completed: true })
   */
  update(id, data) {
    // apiClient.put(url, data) 发送 PUT 请求
    return apiClient.put(`/todos/${id}`, data)
  },

  /**
   * 删除待办事项
   *
   * HTTP 方法：DELETE
   * 请求地址：/todos/{id}
   *
   * @param {number} id - 待办事项的 ID
   * @returns {Promise<Object>} - Promise 对象
   *
   * 使用示例：
   * await todoApi.delete(1)  // 删除 ID 为 1 的待办事项
   */
  delete(id) {
    // apiClient.delete(url) 发送 DELETE 请求
    return apiClient.delete(`/todos/${id}`)
  },
}

// ============================================
// 导出
// ============================================

/**
 * 默认导出 apiClient 实例
 * 这样其他文件可以导入它来发送自定义请求
 *
 * 导入方式：
 * import apiClient from './services/api'
 */
export default apiClient

/**
 * 总结：这个文件的作用
 *
 * 1. 创建配置好的 axios 实例（baseURL、timeout、headers）
 * 2. 添加请求拦截器（可以添加 token 等）
 * 3. 添加响应拦截器（统一错误处理）
 * 4. 封装所有 Todo 相关的 API 方法
 * 5. 导出 todoApi 供其他文件使用
 *
 * 使用这个文件的好处：
 * - 所有 HTTP 请求集中管理
 * - 统一的错误处理
 * - 代码更简洁、更易维护
 * - 易于测试（可以 mock 这个模块）
 */
