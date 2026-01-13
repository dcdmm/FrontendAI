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

<script>
import { onMounted } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'

export default {
	name: 'App',
	components: {
		TodoForm,
		TodoList,
	},
	setup() {
		// 使用 composable 获取状态和方法
		const {
			todos,
			loading,
			error,
			fetchTodos,
			createTodo,
			toggleTodo,
			deleteTodo,
			formatDate,
		} = useTodos()

		/**
		 * 处理添加待办事项
		 */
		const handleAddTodo = async (todoData) => {
			try {
				await createTodo(todoData)
			} catch (err) {
				alert(error.value || '添加失败')
			}
		}

		/**
		 * 处理切换待办状态
		 */
		const handleToggleTodo = async (todo) => {
			try {
				await toggleTodo(todo)
			} catch (err) {
				alert(error.value || '更新失败')
			}
		}

		/**
		 * 处理删除待办
		 */
		const handleDeleteTodo = async (id) => {
			try {
				await deleteTodo(id)
			} catch (err) {
				alert(error.value || '删除失败')
			}
		}

		// 组件挂载时获取数据
		onMounted(() => {
			fetchTodos()
		})

		return {
			todos,
			loading,
			error,
			fetchTodos,
			formatDate,
			handleAddTodo,
			handleToggleTodo,
			handleDeleteTodo,
		}
	},
}
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
