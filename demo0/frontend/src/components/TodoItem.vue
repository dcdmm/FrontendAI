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

<script>
import { computed } from 'vue'

export default {
	name: 'TodoItem',
	props: {
		// 接收待办事项对象
		todo: {
			type: Object,
			required: true,
		},
		// 接收日期格式化函数
		formatDate: {
			type: Function,
			required: true,
		},
	},
	emits: ['toggle', 'delete'], // 声明事件
	setup(props, { emit }) {
		/**
		 * 计算属性：格式化的日期
		 */
		const formattedDate = computed(() => {
			return props.formatDate(props.todo.created_at)
		})

		/**
		 * 处理复选框切换
		 */
		const handleToggle = () => {
			emit('toggle', props.todo)
		}

		/**
		 * 处理删除
		 */
		const handleDelete = () => {
			if (confirm('确定要删除这个任务吗？')) {
				emit('delete', props.todo.id)
			}
		}

		return {
			formattedDate,
			handleToggle,
			handleDelete,
		}
	},
}
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
