/**
 * useTodos Composable - Todo 业务逻辑复用函数
 *
 * 什么是 Composable？
 * 类比：就像 Python 中的工具函数库，可以在任何地方调用
 * - 封装可复用的响应式状态和业务逻辑
 * - 遵循 Vue 3 的组合式 API 最佳实践
 * - 函数名以 "use" 开头是 Vue 的命名约定
 *
 * 为什么需要 Composable？
 * - 避免在每个组件中重复写相同的业务逻辑
 * - 状态和操作集中管理，易于维护
 * - 可以在多个组件中共享相同的业务逻辑
 */

// ============================================
// TypeScript 转换说明
// ============================================
// 这个文件从 useTodos.js 转换而来
// 主要变化：
// 1. 文件扩展名从 .js 改为 .ts
// 2. 从 api.ts 中导入类型定义（Todo, CreateTodoData, UpdateTodoData）
// 3. 为函数参数添加类型注解
// 4. 为函数返回值添加类型注解
// 5. 为 ref 变量添加泛型类型参数

// ============================================
// 导入依赖
// ============================================

/**
 * 从 Vue 中导入 ref 和 Ref 类型
 *
 * ref 是什么？
 * - ref() 是 Vue 3 提供的函数，用于创建响应式数据
 * - 响应式：当数据变化时，UI 会自动更新
 *
 * Ref 是什么？（TS 新增）
 * - Ref<T> 是 TypeScript 类型，表示 ref 对象的类型
 * - T 是泛型参数，表示 ref 包裹的值的类型
 * - 例如：Ref<number> 表示一个包裹数字的 ref 对象
 *
 * 类比：就像一个带有观察者的变量
 * - 在算法中，你改变一个变量，需要手动重新绘图
 * - 在 Vue 中，ref 包裹的变量改变时，页面会自动更新
 *
 * 使用方式：
 * const count = ref(0)       // 创建响应式变量
 * count.value = 1            // 修改值（注意要用 .value）
 * console.log(count.value)   // 读取值
 */
import { ref, Ref } from 'vue'

/**
 * 从 api.ts 中导入 todoApi 和类型定义
 *
 * 导入说明：
 * - todoApi: API 调用方法对象
 * - Todo: Todo 数据结构的类型定义（TS 新增）
 * - CreateTodoData: 创建 Todo 的请求数据类型（TS 新增）
 * - UpdateTodoData: 更新 Todo 的请求数据类型（TS 新增）
 *
 * 导入语法：
 * - import { 具名导出 } from '文件路径'
 * - '../services/api' 表示上级目录的 services 文件夹下的 api.ts
 *
 * todoApi 包含了所有 Todo 相关的 API 调用方法
 */
import { todoApi, Todo, CreateTodoData, UpdateTodoData } from '../services/api'

// ============================================
// Composable 函数定义
// ============================================

/**
 * useTodos 返回值类型接口（TS 新增）
 *
 * 为什么要定义返回值类型？
 * - 明确函数返回的对象结构
 * - 提供更好的 IDE 自动补全
 * - 调用者可以清楚地知道有哪些属性和方法可用
 *
 * 这个接口定义了 useTodos() 函数返回的对象包含哪些属性和方法
 */
export interface UseTodosReturn {
  // ===== 响应式状态 =====

  /**
   * todos - 待办事项列表
   * 类型：Ref<Todo[]>
   * - Ref: Vue 的响应式引用类型
   * - Todo[]: Todo 对象的数组
   */
  todos: Ref<Todo[]>

  /**
   * loading - 加载状态
   * 类型：Ref<boolean>
   * - true: 正在加载
   * - false: 加载完成或未开始
   */
  loading: Ref<boolean>

  /**
   * error - 错误信息
   * 类型：Ref<string | null>
   * - string: 错误消息
   * - null: 没有错误
   */
  error: Ref<string | null>

  // ===== 方法 =====

  /**
   * fetchTodos - 获取所有待办事项
   * 返回类型：Promise<void>
   * - Promise: 异步操作
   * - void: 没有返回值（数据直接更新到 todos 状态中）
   */
  fetchTodos: () => Promise<void>

  /**
   * createTodo - 创建新待办事项
   * 参数：todoData - 待办事项数据（类型：CreateTodoData）
   * 返回类型：Promise<void>
   */
  createTodo: (todoData: CreateTodoData) => Promise<void>

  /**
   * updateTodo - 更新待办事项
   * 参数：
   * - id: 待办事项 ID（类型：number）
   * - updateData: 要更新的数据（类型：UpdateTodoData）
   * 返回类型：Promise<void>
   */
  updateTodo: (id: number, updateData: UpdateTodoData) => Promise<void>

  /**
   * toggleTodo - 切换待办事项的完成状态
   * 参数：todo - 待办事项对象（类型：Todo）
   * 返回类型：Promise<void>
   */
  toggleTodo: (todo: Todo) => Promise<void>

  /**
   * deleteTodo - 删除待办事项
   * 参数：id - 待办事项 ID（类型：number）
   * 返回类型：Promise<void>
   */
  deleteTodo: (id: number) => Promise<void>

  /**
   * formatDate - 格式化日期字符串
   * 参数：dateString - ISO 格式的日期字符串（类型：string）
   * 返回类型：string - 格式化后的日期字符串
   */
  formatDate: (dateString: string) => string
}

/**
 * useTodos - Todo 业务逻辑主函数
 *
 * 这是一个工厂函数，每次调用都会返回一套新的状态和方法
 * 类比：就像每次调用都创建一个新的实例对象
 *
 * @returns {UseTodosReturn} 包含状态和方法的对象（TS 新增类型注解）
 */
export function useTodos(): UseTodosReturn {
  // ==========================================
  // 响应式状态定义
  // ==========================================

  /**
   * todos - 存储待办事项列表
   *
   * ref<Todo[]>([]) 创建一个响应式数组（TS 新增泛型参数）
   * - ref<Todo[]>: 指定 ref 包裹的值的类型是 Todo[]（Todo 对象数组）
   * - []: 初始值是空数组
   * - 当 todos.value 改变时，使用它的组件会自动更新
   *
   * 类比：就像一个被观察的列表，列表变化时 UI 自动刷新
   */
  const todos = ref<Todo[]>([])

  /**
   * loading - 加载状态标志
   *
   * ref<boolean>(false) 创建一个响应式布尔值（TS 新增泛型参数）
   * - ref<boolean>: 指定类型为布尔值
   * - false: 初始值为 false
   * - true: 正在加载数据（显示加载动画）
   * - false: 加载完成或未开始加载
   *
   * 为什么需要 loading？
   * - 网络请求是异步的，需要时间
   * - 在等待期间显示 "加载中..." 提升用户体验
   */
  const loading = ref<boolean>(false)

  /**
   * error - 错误信息
   *
   * ref<string | null>(null) 创建一个响应式变量（TS 新增泛型参数）
   * - ref<string | null>: 类型可以是 string 或 null
   * - null: 初始值为 null（没有错误）
   * - 当有错误时，设置为错误消息字符串
   *
   * 用途：统一管理错误状态，在 UI 上显示错误提示
   */
  const error = ref<string | null>(null)

  // ==========================================
  // 业务方法定义
  // ==========================================

  /**
   * fetchTodos - 获取所有待办事项
   *
   * async 函数：
   * - async 标记这是一个异步函数
   * - 可以在函数内使用 await 等待异步操作完成
   * - 返回值自动包装成 Promise
   *
   * TS 新增：添加返回类型注解 Promise<void>
   * - Promise: 异步操作
   * - void: 函数没有返回值（数据直接更新到状态中）
   *
   * 类比：就像在等待模型训练完成，期间可以做其他事情
   */
  const fetchTodos = async (): Promise<void> => {
    // 开始加载：设置 loading 为 true
    // .value 是访问 ref 内部值的方式
    loading.value = true

    // 清空之前的错误信息
    error.value = null

    /**
     * try-catch 块：异常处理
     * - try: 尝试执行可能出错的代码
     * - catch: 如果出错，执行这里的代码
     * - finally: 无论成功或失败，最后都执行这里的代码
     */
    try {
      // 调用 API 获取所有待办事项，直接返回 Todo[] 数组
      todos.value = await todoApi.getAll()
    } catch (err) {
      /**
       * 捕获错误
       * - 如果 API 调用失败（网络错误、服务器错误等），会进入这里
       * - err 是错误对象，包含错误信息
       */

      // 设置用户友好的错误提示
      error.value = '获取待办失败，请确保后端服务已启动'

      // 在控制台打印详细错误（方便开发调试）
      console.error('获取待办失败:', err)

      // 重新抛出错误，让调用者可以处理
      throw err
    } finally {
      /**
       * finally 块：无论成功或失败都会执行
       * - 用于清理工作，如关闭 loading 状态
       */
      loading.value = false
    }
  }

  /**
   * createTodo - 创建新的待办事项
   *
   * @param {CreateTodoData} todoData - 待办事项数据（TS 新增类型注解）
   * @returns {Promise<void>} - 返回 Promise（TS 新增类型注解）
   *
   * 执行流程：
   * 1. 调用 API 创建待办事项
   * 2. 创建成功后，重新获取列表（刷新页面数据）
   */
  const createTodo = async (todoData: CreateTodoData): Promise<void> => {
    // 清空错误信息
    error.value = null

    try {
      /**
       * 调用 API 创建待办事项
       * - todoData 是一个对象，类型是 CreateTodoData
       * - 例如：{ title: '学习 Vue', description: '完成教程' }
       * - 服务器会返回创建的待办事项（包含 id 和 created_at）
       */
      await todoApi.create(todoData)

      /**
       * 创建成功后，刷新列表
       * - 为什么要刷新？因为服务器返回的数据包含 id 和时间戳
       * - 重新获取确保前端数据与后端同步
       */
      await fetchTodos()
    } catch (err) {
      // 设置错误信息
      error.value = '添加待办失败'
      console.error('添加待办失败:', err)
      // 抛出错误，让调用者知道操作失败
      throw err
    }
  }

  /**
   * updateTodo - 更新待办事项
   *
   * @param {number} id - 待办事项的 ID（TS 新增类型注解）
   * @param {UpdateTodoData} updateData - 要更新的数据（TS 新增类型注解）
   * @returns {Promise<void>} - 返回 Promise（TS 新增类型注解）
   *
   * 部分更新：
   * - 只需要传递要修改的字段
   * - 例如：{ completed: true } 只更新完成状态
   */
  const updateTodo = async (id: number, updateData: UpdateTodoData): Promise<void> => {
    error.value = null

    try {
      // 调用 API 更新
      await todoApi.update(id, updateData)

      // 更新成功后刷新列表
      await fetchTodos()
    } catch (err) {
      error.value = '更新待办失败'
      console.error('更新待办失败:', err)
      throw err
    }
  }

  /**
   * toggleTodo - 切换待办事项的完成状态
   *
   * @param {Todo} todo - 待办事项对象（TS 新增类型注解）
   * @returns {Promise<void>} - 返回 Promise（TS 新增类型注解）
   *
   * 这是一个便捷方法：
   * - 封装了 updateTodo 的调用
   * - 自动计算新的完成状态（取反）
   *
   * 使用场景：用户点击复选框时调用
   */
  const toggleTodo = async (todo: Todo): Promise<void> => {
    /**
     * 调用 updateTodo 更新完成状态
     * - todo.id: 待办事项的 ID
     * - { completed: !todo.completed }: 完成状态取反
     *   - 如果原来是 true（已完成），变成 false（未完成）
     *   - 如果原来是 false（未完成），变成 true（已完成）
     */
    await updateTodo(todo.id, { completed: !todo.completed })
  }

  /**
   * deleteTodo - 删除待办事项
   *
   * @param {number} id - 待办事项的 ID（TS 新增类型注解）
   * @returns {Promise<void>} - 返回 Promise（TS 新增类型注解）
   */
  const deleteTodo = async (id: number): Promise<void> => {
    error.value = null

    try {
      // 调用 API 删除
      await todoApi.delete(id)

      // 删除成功后刷新列表
      await fetchTodos()
    } catch (err) {
      error.value = '删除待办失败'
      console.error('删除待办失败:', err)
      throw err
    }
  }

  // ==========================================
  // 工具方法
  // ==========================================

  /**
   * formatDate - 格式化日期字符串
   *
   * @param {string} dateString - ISO 格式的日期字符串（TS 新增类型注解）
   * @returns {string} - 格式化后的日期字符串（TS 新增类型注解）
   *
   * 为什么需要格式化？
   * - 服务器返回的日期格式不友好（ISO 8601 格式）
   * - 需要转换成用户易读的格式
   *
   * 示例：
   * - 输入："2024-01-15T10:30:00"
   * - 输出："2024/01/15 10:30"
   */
  const formatDate = (dateString: string): string => {
    /**
     * new Date(dateString) 创建日期对象
     * - dateString 是字符串，如 "2024-01-15T10:30:00"
     * - Date 对象可以进行日期计算和格式化
     */
    const date = new Date(dateString)

    /**
     * toLocaleString() 将日期格式化为本地化字符串
     *
     * 参数：
     * - 'zh-CN': 中文环境
     * - 配置对象：指定要显示的日期部分
     *   - year: 'numeric' → 四位数年份（2024）
     *   - month: '2-digit' → 两位数月份（01）
     *   - day: '2-digit' → 两位数日期（15）
     *   - hour: '2-digit' → 两位数小时（10）
     *   - minute: '2-digit' → 两位数分钟（30）
     *
     * 结果示例：2024/01/15 10:30
     */
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // ==========================================
  // 返回值
  // ==========================================

  /**
   * 返回一个对象，包含所有状态和方法
   *
   * 为什么要返回？
   * - 让调用 useTodos() 的组件可以访问这些状态和方法
   * - 这是 Composable 模式的核心
   *
   * TS 新增：返回值类型自动推断为 UseTodosReturn
   *
   * 使用示例：
   * const { todos, loading, fetchTodos } = useTodos()
   * onMounted(() => fetchTodos())  // 组件挂载时获取数据
   */
  return {
    // ===== 状态 =====
    /**
     * todos - 待办事项列表（响应式数组）
     * 组件可以直接在模板中使用：{{ todos }}
     */
    todos,

    /**
     * loading - 加载状态（响应式布尔值）
     * 用于控制 "加载中..." 的显示
     */
    loading,

    /**
     * error - 错误信息（响应式字符串或 null）
     * 用于显示错误提示
     */
    error,

    // ===== 方法 =====
    /**
     * fetchTodos - 获取所有待办事项
     * 组件可以调用：fetchTodos()
     */
    fetchTodos,

    /**
     * createTodo - 创建新待办事项
     * 组件可以调用：createTodo({ title: '...', description: '...' })
     */
    createTodo,

    /**
     * updateTodo - 更新待办事项
     * 组件可以调用：updateTodo(id, { completed: true })
     */
    updateTodo,

    /**
     * toggleTodo - 切换完成状态
     * 组件可以调用：toggleTodo(todo)
     */
    toggleTodo,

    /**
     * deleteTodo - 删除待办事项
     * 组件可以调用：deleteTodo(id)
     */
    deleteTodo,

    /**
     * formatDate - 格式化日期
     * 组件可以调用：formatDate(todo.created_at)
     */
    formatDate,
  }
}

// ============================================
// 总结
// ============================================

/**
 * 这个文件做了什么？
 *
 * 1. 定义了 Todo 相关的响应式状态（todos, loading, error）
 * 2. 封装了所有 Todo 相关的业务操作（增删改查）
 * 3. 提供了工具方法（日期格式化）
 * 4. 返回状态和方法供组件使用
 *
 * 为什么这样设计？
 * - 代码复用：多个组件可以共享相同的业务逻辑
 * - 关注点分离：组件只关心 UI，业务逻辑在这里
 * - 易于测试：可以单独测试这个函数，不需要渲染组件
 * - 易于维护：业务逻辑修改只需改这一个文件
 *
 * TypeScript 带来的额外好处：
 * - 类型安全：参数类型错误会在编译时被发现
 * - IDE 支持：自动补全和类型提示
 * - 重构更安全：修改接口时，所有使用的地方都会报错提示
 *
 * 如何使用？
 * 在任何组件中：
 * import { useTodos } from '@/composables/useTodos'
 * const { todos, loading, fetchTodos } = useTodos()
 * onMounted(() => fetchTodos())
 */
