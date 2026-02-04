<template>
	<div class="app-container">
		<h1 class="app-title">📝 Todo 应用</h1>
		<p class="app-subtitle">Vue 3 + FastAPI 全栈示例</p>

		<!-- 使用 TodoForm 组件 -->
		<TodoForm @submit="handleAddTodo" />

		<!-- 使用 TodoList 组件 -->
		<TodoList
			:todos="todos"
			:loading="loading"
			:error="error"
			:format-date="formatDate"
			@refresh="fetchTodos"
			@toggle="handleToggleTodo"
			@delete="handleDeleteTodo"
		/>
	</div>
</template>

<!--
============================================
TypeScript 转换说明
============================================
这个文件已从 JavaScript 转换为 TypeScript
主要变化：
1. <script> 改为 <script setup lang="ts">
   - lang="ts" 表示使用 TypeScript
   - setup 是 Vue 3 的语法糖，代码更简洁

2. 使用 <script setup> 语法：
   - 不需要 export default
   - 不需要 return，顶层变量自动暴露给模板
   - 导入的组件自动注册，不需要 components 配置

3. 添加类型注解：
   - 为函数参数添加类型（如 todoData: CreateTodoData）
   - 为函数返回值添加类型（如 Promise<void>）

4. 导入类型定义：
   - 使用 type 关键字导入类型（如 import type { Todo }）
   - 类型只在编译时存在，不会出现在运行时代码中
-->
<script setup lang="ts">
// ============================================
// 导入依赖
// ============================================
import { onMounted } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'

// TS 新增：导入类型定义
// type 关键字表示只导入类型，不导入值
import type { Todo, CreateTodoData } from './services/api'

// ============================================
// 使用 Composable
// ============================================

// 使用 composable 获取状态和方法
// TS 说明：useTodos() 的返回值类型已在 useTodos.ts 中定义（UseTodosReturn）
// TypeScript 会自动推断这些变量的类型
const {
	todos,        // 类型：Ref<Todo[]>
	loading,      // 类型：Ref<boolean>
	error,        // 类型：Ref<string | null>
	fetchTodos,   // 类型：() => Promise<void>
	createTodo,   // 类型：(todoData: CreateTodoData) => Promise<void>
	toggleTodo,   // 类型：(todo: Todo) => Promise<void>
	deleteTodo,   // 类型：(id: number) => Promise<void>
	formatDate,   // 类型：(dateString: string) => string
} = useTodos()

// ============================================
// 事件处理函数
// ============================================

/**
 * 处理添加待办事项
 *
 * @param todoData - 待办事项数据（TS 新增类型注解）
 * @returns Promise<void> - 异步操作，无返回值（TS 新增类型注解）
 *
 * TS 说明：
 * - 参数 todoData 的类型是 CreateTodoData（从 api.ts 导入）
 * - 返回值类型是 Promise<void>（async 函数自动返回 Promise）
 */
const handleAddTodo = async (todoData: CreateTodoData): Promise<void> => {
	try {
		await createTodo(todoData)
	} catch (err) {
		alert(error.value || '添加失败')
	}
}

/**
 * 处理切换待办状态
 *
 * @param todo - 待办事项对象（TS 新增类型注解）
 * @returns Promise<void> - 异步操作，无返回值（TS 新增类型注解）
 *
 * TS 说明：
 * - 参数 todo 的类型是 Todo（从 api.ts 导入）
 * - TypeScript 会检查 todo 对象是否包含所有必需的属性
 */
const handleToggleTodo = async (todo: Todo): Promise<void> => {
	try {
		await toggleTodo(todo)
	} catch (err) {
		alert(error.value || '更新失败')
	}
}

/**
 * 处理删除待办
 *
 * @param id - 待办事项的 ID（TS 新增类型注解）
 * @returns Promise<void> - 异步操作，无返回值（TS 新增类型注解）
 *
 * TS 说明：
 * - 参数 id 的类型是 number
 * - 如果传入字符串或其他类型，TypeScript 会报错
 */
const handleDeleteTodo = async (id: number): Promise<void> => {
	try {
		await deleteTodo(id)
	} catch (err) {
		alert(error.value || '删除失败')
	}
}

// ============================================
// 生命周期钩子
// ============================================

// 组件挂载时获取数据
// onMounted 接收一个回调函数，在组件挂载到 DOM 后执行
onMounted(() => {
	fetchTodos()
})

// ============================================
// setup 语法糖说明
// ============================================
/**
 * 使用 <script setup> 后的变化：
 *
 * 1. 不需要 export default
 *    - 之前：export default { setup() { ... } }
 *    - 现在：直接写逻辑代码
 *
 * 2. 不需要 return
 *    - 之前：return { todos, handleAddTodo, ... }
 *    - 现在：顶层定义的变量自动暴露给模板
 *
 * 3. 组件自动注册
 *    - 之前：components: { TodoForm, TodoList }
 *    - 现在：导入后直接在模板中使用
 *
 * 4. 更好的 TypeScript 支持
 *    - 类型推断更准确
 *    - IDE 提示更智能
 */
</script>

<style scoped>
.app-container {
	max-width: 800px;
	margin: 0 auto;
}

.app-title {
	color: white;
	font-size: 48px;
	text-align: center;
	margin-bottom: 10px;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-subtitle {
	color: rgba(255, 255, 255, 0.9);
	text-align: center;
	margin-bottom: 30px;
	font-size: 18px;
}
</style>
