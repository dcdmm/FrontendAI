<template>
	<div class="todos-container">
		<div class="todos-header">
			<h2>任务列表 ({{ todos.length }})</h2>
			<button @click="handleRefresh" class="btn-refresh">
				🔄 刷新
			</button>
		</div>

		<!-- 加载状态 -->
		<div v-if="loading" class="loading">加载中...</div>

		<!-- 错误状态 -->
		<div v-else-if="error" class="error-state">
			<p>{{ error }}</p>
		</div>

		<!-- 空状态 -->
		<div v-else-if="todos.length === 0" class="empty-state">
			<p>暂无任务，开始添加第一个吧！</p>
		</div>

		<!-- 列表 -->
		<div v-else class="todos-list">
			<TodoItem
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
				:format-date="formatDate"
				@toggle="handleToggle"
				@delete="handleDelete"
			/>
		</div>
	</div>
</template>

<!--
============================================
TypeScript 转换说明
============================================
主要变化：
1. <script> 改为 <script setup lang="ts">
2. 使用 defineProps 定义类型安全的 props
3. 使用 defineEmits 定义类型安全的 emits
4. 为函数参数添加类型注解
-->
<script setup lang="ts">
// ============================================
// 导入依赖
// ============================================
import TodoItem from './TodoItem.vue'

// TS 新增：导入类型定义
import type { Ref } from 'vue'
import type { Todo } from '../services/api'

// ============================================
// Props 定义（TS 新增）
// ============================================

/**
 * defineProps - 定义组件的 props（Vue 3.3+ 新语法）
 *
 * 这是 <script setup> 中定义 props 的方式
 *
 * 类型说明：
 * - todos: Todo[] - 待办事项列表（必填）
 * - loading: boolean - 加载状态（可选，默认 false）
 * - error: string | null - 错误信息（可选，默认 null）
 * - formatDate: (dateString: string) => string - 日期格式化函数（必填）
 *
 * TypeScript 优势：
 * - 明确的类型定义，避免传入错误类型的数据
 * - IDE 自动补全，知道有哪些 props 可用
 * - 如果父组件传入错误类型，编译时就会报错
 *
 * withDefaults：
 * - 用于为可选 props 设置默认值
 * - 第一个参数是 props 定义
 * - 第二个参数是默认值对象
 */
const props = withDefaults(
	defineProps<{
		/**
		 * todos - 待办事项列表
		 * 类型：Todo[]（Todo 对象的数组）
		 * 必填
		 */
		todos: Todo[]

		/**
		 * loading - 加载状态
		 * 类型：boolean
		 * 可选，默认值为 false
		 */
		loading?: boolean

		/**
		 * error - 错误信息
		 * 类型：string | null
		 * 可选，默认值为 null
		 */
		error?: string | null

		/**
		 * formatDate - 日期格式化函数
		 * 类型：(dateString: string) => string
		 * 接收一个日期字符串，返回格式化后的字符串
		 * 必填
		 */
		formatDate: (dateString: string) => string
	}>(),
	{
		// 为可选 props 设置默认值
		loading: false,  // loading 默认为 false
		error: null,     // error 默认为 null
	}
)

// ============================================
// Emits 定义（TS 新增）
// ============================================

/**
 * defineEmits - 定义组件触发的事件
 *
 * 类型说明：
 * - refresh: 无参数，刷新列表
 * - toggle: 传递一个 Todo 对象，切换完成状态
 * - delete: 传递一个 number（todo ID），删除待办事项
 *
 * TypeScript 优势：
 * - 父组件监听这些事件时，TypeScript 会自动推断参数类型
 * - 如果传递了错误类型的数据，编译时就会报错
 */
const emit = defineEmits<{
	refresh: []                // 无参数
	toggle: [todo: Todo]       // 传递 Todo 对象
	delete: [id: number]       // 传递 ID（数字）
}>()

// ============================================
// 事件处理函数
// ============================================

/**
 * 处理刷新按钮点击
 *
 * @returns void - 无返回值（TS 新增类型注解）
 */
const handleRefresh = (): void => {
	// 触发 refresh 事件，不传递参数
	emit('refresh')
}

/**
 * 处理待办事项切换
 *
 * @param todo - 待办事项对象（TS 新增类型注解）
 * @returns void - 无返回值（TS 新增类型注解）
 *
 * TS 说明：
 * - 参数 todo 的类型是 Todo
 * - TypeScript 会检查 todo 对象是否包含所有必需的属性
 */
const handleToggle = (todo: Todo): void => {
	// 触发 toggle 事件，传递 todo 对象
	emit('toggle', todo)
}

/**
 * 处理待办事项删除
 *
 * @param id - 待办事项的 ID（TS 新增类型注解）
 * @returns void - 无返回值（TS 新增类型注解）
 *
 * TS 说明：
 * - 参数 id 的类型是 number
 * - 如果传入字符串或其他类型，TypeScript 会报错
 */
const handleDelete = (id: number): void => {
	// 触发 delete 事件，传递 ID
	emit('delete', id)
}

// ============================================
// setup 语法糖说明
// ============================================
/**
 * 使用 <script setup> 后：
 *
 * 1. 不需要 export default
 *    - 组件自动导出
 *
 * 2. 不需要 components 配置
 *    - 导入的组件（如 TodoItem）自动注册
 *
 * 3. 不需要 return
 *    - props 通过 defineProps 定义，自动可用
 *    - 事件处理函数自动暴露给模板
 *
 * 4. 使用 defineProps 和 defineEmits
 *    - 类型安全的 props 和事件定义
 *    - 更好的 TypeScript 支持
 *
 * 5. TypeScript 优势
 *    - 编译时类型检查
 *    - IDE 智能提示
 *    - 重构更安全
 */
</script>

<style scoped>
.todos-container {
	background: white;
	padding: 24px;
	border-radius: 12px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.todos-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.todos-header h2 {
	color: #333;
	margin: 0;
}

.btn-refresh {
	background: #f0f0f0;
	color: #666;
	padding: 8px 16px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.3s;
}

.btn-refresh:hover {
	background: #e0e0e0;
}

.loading,
.empty-state,
.error-state {
	text-align: center;
	padding: 40px;
	color: #999;
	font-size: 18px;
}

.error-state {
	color: #ff6b6b;
}

.todos-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>
