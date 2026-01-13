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

<script>
import TodoItem from './TodoItem.vue'

export default {
	name: 'TodoList',
	components: {
		TodoItem,
	},
	props: {
		// 待办事项列表
		todos: {
			type: Array,
			required: true,
		},
		// 加载状态
		loading: {
			type: Boolean,
			default: false,
		},
		// 错误信息
		error: {
			type: String,
			default: null,
		},
		// 日期格式化函数
		formatDate: {
			type: Function,
			required: true,
		},
	},
	emits: ['refresh', 'toggle', 'delete'], // 声明事件
	setup(props, { emit }) {
		/**
		 * 处理刷新按钮点击
		 */
		const handleRefresh = () => {
			emit('refresh')
		}

		/**
		 * 处理待办事项切换
		 */
		const handleToggle = (todo) => {
			emit('toggle', todo)
		}

		/**
		 * 处理待办事项删除
		 */
		const handleDelete = (id) => {
			emit('delete', id)
		}

		return {
			handleRefresh,
			handleToggle,
			handleDelete,
		}
	},
}
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
