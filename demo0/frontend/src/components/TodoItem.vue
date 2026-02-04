<template>
	<div class="todo-item" :class="{ completed: todo.completed }">
		<div class="todo-content">
			<input
				type="checkbox"
				:checked="todo.completed"
				@change="handleToggle"
				class="todo-checkbox"
			/>
			<div class="todo-info">
				<h3 class="todo-title">{{ todo.title }}</h3>
				<p v-if="todo.description" class="todo-description">
					{{ todo.description }}
				</p>
				<span class="todo-date">
					{{ formattedDate }}
				</span>
			</div>
		</div>
		<button @click="handleDelete" class="btn-delete">
			🗑️ 删除
		</button>
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
4. 为 computed 添加返回值类型注解
5. 为函数添加返回值类型注解
-->
<script setup lang="ts">
// ============================================
// 导入依赖
// ============================================
import { computed } from 'vue'

// TS 新增：导入类型定义
import type { ComputedRef } from 'vue'
import type { Todo } from '../services/api'

// ============================================
// Props 定义（TS 新增）
// ============================================

/**
 * defineProps - 定义组件的 props
 *
 * 类型说明：
 * - todo: Todo - 待办事项对象（必填）
 * - formatDate: (dateString: string) => string - 日期格式化函数（必填）
 *
 * TypeScript 优势：
 * - 明确的类型定义
 * - IDE 自动补全
 * - 编译时类型检查
 */
const props = defineProps<{
	/**
	 * todo - 待办事项对象
	 * 类型：Todo（从 api.ts 导入的接口）
	 * 必填
	 */
	todo: Todo

	/**
	 * formatDate - 日期格式化函数
	 * 类型：(dateString: string) => string
	 * 接收 ISO 格式的日期字符串，返回格式化后的字符串
	 * 必填
	 */
	formatDate: (dateString: string) => string
}>()

// ============================================
// Emits 定义（TS 新增）
// ============================================

/**
 * defineEmits - 定义组件触发的事件
 *
 * 类型说明：
 * - toggle: 传递 Todo 对象，切换完成状态
 * - delete: 传递 number（todo ID），删除待办事项
 *
 * TypeScript 优势：
 * - 父组件监听这些事件时会自动推断参数类型
 * - 传递错误类型时会报编译错误
 */
const emit = defineEmits<{
	toggle: [todo: Todo]    // 传递 Todo 对象
	delete: [id: number]    // 传递 ID（数字）
}>()

// ============================================
// 计算属性
// ============================================

/**
 * formattedDate - 格式化的日期（计算属性）
 *
 * @returns ComputedRef<string> - 计算属性，返回格式化后的日期字符串（TS 新增类型注解）
 *
 * TS 说明：
 * - ComputedRef<string> 表示这是一个计算属性，值的类型是 string
 * - computed(() => ...) 自动推断返回值类型
 * - 访问时使用 formattedDate.value（在 JS 中）
 * - 在模板中直接使用 {{ formattedDate }}（不需要 .value）
 *
 * 计算属性的作用：
 * - 基于响应式数据计算得出的值
 * - 只有依赖的数据变化时才重新计算（有缓存）
 * - 这里依赖 props.todo.created_at 和 props.formatDate
 */
const formattedDate: ComputedRef<string> = computed(() => {
	// 调用父组件传递的 formatDate 函数
	// props.todo.created_at 是 ISO 格式的日期字符串
	return props.formatDate(props.todo.created_at)
})

// ============================================
// 事件处理函数
// ============================================

/**
 * 处理复选框切换
 *
 * @returns void - 无返回值（TS 新增类型注解）
 *
 * 执行流程：
 * 1. 用户点击复选框
 * 2. 触发 @change 事件
 * 3. 调用 handleToggle
 * 4. 触发 toggle 事件，传递整个 todo 对象给父组件
 */
const handleToggle = (): void => {
	// 触发 toggle 事件，传递 todo 对象
	// 父组件会接收到这个 todo，并调用 API 更新完成状态
	emit('toggle', props.todo)
}

/**
 * 处理删除
 *
 * @returns void - 无返回值（TS 新增类型注解）
 *
 * 执行流程：
 * 1. 用户点击删除按钮
 * 2. 显示确认对话框
 * 3. 用户确认后，触发 delete 事件，传递 todo ID 给父组件
 */
const handleDelete = (): void => {
	// 显示确认对话框
	// confirm() 返回 boolean：用户点击"确定"返回 true，点击"取消"返回 false
	if (confirm('确定要删除这个任务吗？')) {
		// 用户确认删除
		// 触发 delete 事件，传递 todo 的 ID（类型是 number）
		emit('delete', props.todo.id)
	}
	// 如果用户取消，什么也不做
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
 * 2. 不需要 return
 *    - formattedDate、handleToggle、handleDelete 自动暴露给模板
 *
 * 3. 使用 defineProps 和 defineEmits
 *    - 类型安全的 props 和事件定义
 *    - 自动推断类型
 *
 * 4. TypeScript 优势
 *    - 访问 props.todo.title 时有自动补全
 *    - 如果访问不存在的属性（如 props.todo.titl），会报错
 *    - emit 的参数类型也会被检查
 *
 * 5. 计算属性的类型
 *    - formattedDate 的类型是 ComputedRef<string>
 *    - TypeScript 知道它是一个字符串类型的计算属性
 */
</script>

<style scoped>
.todo-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border: 2px solid #f0f0f0;
	border-radius: 8px;
	transition: all 0.3s;
}

.todo-item:hover {
	border-color: #667eea;
	box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.todo-item.completed {
	opacity: 0.6;
	background: #f9f9f9;
}

.todo-content {
	display: flex;
	align-items: center;
	gap: 16px;
	flex: 1;
}

.todo-checkbox {
	width: 20px;
	height: 20px;
	cursor: pointer;
}

.todo-info {
	flex: 1;
}

.todo-title {
	font-size: 18px;
	color: #333;
	margin-bottom: 4px;
}

.todo-item.completed .todo-title {
	text-decoration: line-through;
	color: #999;
}

.todo-description {
	color: #666;
	font-size: 14px;
	margin-bottom: 8px;
}

.todo-date {
	color: #999;
	font-size: 12px;
}

.btn-delete {
	background: #ff6b6b;
	color: white;
	padding: 8px 16px;
	white-space: nowrap;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.3s;
}

.btn-delete:hover {
	background: #ff5252;
}
</style>
