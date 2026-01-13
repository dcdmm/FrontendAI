<!--
  TodoForm.vue - 添加待办事项的表单组件

  这个组件的职责：
  - 提供输入框让用户输入标题和描述
  - 验证用户输入（标题不能为空）
  - 将用户输入的数据通过事件传递给父组件

  类比：就像一个数据收集器，收集好数据后交给上级处理
-->

<!--
  ============================================
  模板部分 (Template) - 定义 UI 结构
  ============================================

  这部分类似于 HTML，定义了页面的结构和布局
  但它是 "响应式" 的，可以绑定数据和事件

  Vue 特殊语法：
  - v-model: 双向数据绑定
  - @事件名: 监听事件（如 @submit, @click, @keyup）
  - : 或 v-bind: 绑定属性
-->
<template>
	<div class="add-todo-card">
		<!-- 卡片标题 -->
		<h2>添加新任务</h2>

		<!--
		  form 表单元素

		  @submit.prevent="handleSubmit"：
		  - @submit: 监听表单提交事件（用户按 Enter 或点击提交按钮）
		  - .prevent: 事件修饰符，阻止默认行为（防止页面刷新）
		  - ="handleSubmit": 提交时调用 handleSubmit 方法

		  类比：.prevent 就像在 Python 中捕获异常后不抛出
		-->
		<form @submit.prevent="handleSubmit">
			<!-- 标题输入框容器 -->
			<div class="form-group">
				<!--
				  input 输入框

				  v-model="formData.title"：
				  - 这是双向数据绑定
				  - 用户在输入框输入时，formData.title 会自动更新
				  - formData.title 改变时，输入框的值也会自动更新
				  - 类比：就像两个变量实时同步，改一个另一个也跟着变

				  @keyup.enter="handleSubmit"：
				  - @keyup: 监听键盘抬起事件
				  - .enter: 只监听回车键
				  - 用户按回车键时，调用 handleSubmit 提交表单
				  - 这提供了快捷操作：不用点按钮，按回车就能提交

				  placeholder="...":
				  - 输入框为空时显示的提示文字

				  class="input-field":
				  - CSS 类名，用于样式设置
				-->
				<input
					v-model="formData.title"
					@keyup.enter="handleSubmit"
					placeholder="任务标题 (按Enter快速添加)"
					class="input-field"
				/>
			</div>

			<!-- 描述输入框容器 -->
			<div class="form-group">
				<!--
				  textarea 多行文本输入框

				  v-model="formData.description":
				  - 双向绑定描述字段

				  placeholder="任务描述 (可选)":
				  - 提示用户这是可选字段

				  rows="3":
				  - 显示 3 行文本（可以通过拖拽调整大小）
				-->
				<textarea
					v-model="formData.description"
					placeholder="任务描述 (可选)"
					rows="3"
					class="input-field"
				></textarea>
			</div>

			<!--
			  提交按钮

			  type="submit":
			  - 按钮类型为提交
			  - 点击时会触发 form 的 @submit 事件

			  class="btn-primary":
			  - 主要按钮样式
			-->
			<button type="submit" class="btn-primary">
				➕ 添加任务
			</button>
		</form>
	</div>
</template>

<!--
  ============================================
  脚本部分 (Script) - 定义组件逻辑
  ============================================

  这部分用 JavaScript 编写，定义组件的行为
  Vue 3 使用 "组合式 API" (Composition API)
-->
<script>
// ============================================
// 导入依赖
// ============================================

/**
 * 从 Vue 中导入 ref
 *
 * ref 用于创建响应式数据
 * - 数据变化时，UI 自动更新
 * - 这是 Vue 3 的核心特性
 */
import { ref } from 'vue'

// ============================================
// 组件定义
// ============================================

/**
 * export default - 默认导出组件对象
 *
 * 这个对象包含组件的配置
 */
export default {
	/**
	 * name - 组件名称
	 *
	 * 用途：
	 * - 调试时显示的名称
	 * - 递归组件（组件调用自己）时使用
	 * - Vue DevTools 中显示的名称
	 */
	name: 'TodoForm',

	/**
	 * emits - 声明组件会触发的事件
	 *
	 * 为什么要声明？
	 * - 让父组件知道这个组件会触发哪些事件
	 * - Vue 会在开发环境检查，如果触发了未声明的事件会警告
	 * - 类似于 API 文档，告诉使用者有哪些可用事件
	 *
	 * 这里声明了 'submit' 事件
	 * - 父组件可以通过 @submit="handler" 监听
	 */
	emits: ['submit'],

	/**
	 * setup - 组合式 API 的入口函数
	 *
	 * 这是 Vue 3 最重要的函数！
	 * - 组件创建时执行
	 * - 在这里定义响应式数据、方法、生命周期等
	 * - 返回的内容可以在模板中使用
	 *
	 * @param {Object} props - 父组件传递的属性（本组件没有 props）
	 * @param {Object} context - 上下文对象
	 * @param {Function} context.emit - 触发事件的函数
	 *
	 * 解构赋值：
	 * - { emit } 从 context 对象中提取 emit 函数
	 * - 等价于 const emit = context.emit
	 */
	setup(props, { emit }) {
		// ==========================================
		// 响应式数据定义
		// ==========================================

		/**
		 * formData - 表单数据
		 *
		 * ref({...}) 创建一个响应式对象
		 * - 包含 title（标题）和 description（描述）两个字段
		 * - 初始值都是空字符串
		 * - 通过 v-model 与输入框双向绑定
		 *
		 * 类比：就像一个会自动通知变化的字典
		 * - formData.value.title 获取标题
		 * - formData.value.title = '新标题' 设置标题
		 */
		const formData = ref({
			title: '',       // 任务标题
			description: '', // 任务描述
		})

		// ==========================================
		// 方法定义
		// ==========================================

		/**
		 * handleSubmit - 处理表单提交
		 *
		 * 执行流程：
		 * 1. 验证输入（标题不能为空）
		 * 2. 触发 submit 事件，将数据传递给父组件
		 * 3. 清空表单（准备下次输入）
		 */
		const handleSubmit = () => {
			/**
			 * 验证：标题不能为空
			 *
			 * formData.value.title.trim()：
			 * - formData.value: 获取 ref 的值（一个对象）
			 * - .title: 获取标题字段
			 * - .trim(): 去除首尾空格（防止用户只输入空格）
			 *
			 * if (!...): 如果去除空格后是空字符串
			 */
			if (!formData.value.title.trim()) {
				// 显示警告对话框
				alert('请输入任务标题')
				// return: 终止函数执行，不提交表单
				return
			}

			/**
			 * 触发 submit 事件，将表单数据传递给父组件
			 *
			 * emit('submit', data)：
			 * - emit: 触发事件的函数（从 setup 参数中获取）
			 * - 'submit': 事件名称（必须在 emits 中声明）
			 * - { ...formData.value }: 传递的数据
			 *
			 * { ...formData.value } 是展开运算符：
			 * - 创建一个新对象，包含 formData.value 的所有属性
			 * - 类比：深拷贝，避免外部修改影响组件内部数据
			 * - 原对象：{ title: 'xxx', description: 'yyy' }
			 * - 新对象：{ title: 'xxx', description: 'yyy' }（独立的副本）
			 *
			 * 父组件接收：
			 * <TodoForm @submit="handleAddTodo" />
			 * handleAddTodo(data) { console.log(data) }
			 */
			emit('submit', { ...formData.value })

			/**
			 * 清空表单
			 *
			 * 为什么要清空？
			 * - 提交成功后，准备下次输入
			 * - 用户体验更好（不需要手动删除旧内容）
			 *
			 * 重新赋值为空对象
			 */
			formData.value = {
				title: '',
				description: '',
			}
		}

		// ==========================================
		// 返回值
		// ==========================================

		/**
		 * 返回需要在模板中使用的数据和方法
		 *
		 * 只有返回的内容才能在模板中访问
		 * - formData: 用于 v-model 绑定
		 * - handleSubmit: 用于 @submit 事件处理
		 */
		return {
			formData,      // 表单数据（用于 v-model）
			handleSubmit,  // 提交处理函数（用于 @submit）
		}
	},
}
</script>

<!--
  ============================================
  样式部分 (Style) - 定义组件样式
  ============================================

  scoped 属性：
  - 样式只作用于当前组件
  - 不会影响其他组件
  - Vue 会自动添加唯一的属性标识
-->
<style scoped>
/**
 * .add-todo-card - 卡片容器样式
 */
.add-todo-card {
	background: white;                        /* 白色背景 */
	padding: 24px;                            /* 内边距 24 像素 */
	border-radius: 12px;                      /* 圆角 12 像素 */
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);/* 阴影效果 */
	margin-bottom: 24px;                      /* 下边距 24 像素 */
}

/**
 * .add-todo-card h2 - 卡片标题样式
 */
.add-todo-card h2 {
	margin-bottom: 16px;  /* 标题下方留 16 像素间距 */
	color: #333;          /* 深灰色文字 */
}

/**
 * .form-group - 表单项容器
 */
.form-group {
	margin-bottom: 16px;  /* 每个表单项之间留 16 像素间距 */
}

/**
 * .input-field - 输入框样式
 *
 * 适用于：
 * - <input> 输入框
 * - <textarea> 多行文本框
 */
.input-field {
	width: 100%;                             /* 宽度 100%（填满容器） */
	padding: 12px;                           /* 内边距 12 像素 */
	border: 2px solid #e0e0e0;              /* 边框：2 像素，浅灰色 */
	border-radius: 8px;                      /* 圆角 8 像素 */
	font-size: 16px;                         /* 字体大小 16 像素 */
	transition: border-color 0.3s;           /* 边框颜色变化动画，0.3 秒 */
	box-sizing: border-box;                  /* 边框和内边距包含在宽度内 */
}

/**
 * .input-field:focus - 输入框获得焦点时的样式
 *
 * :focus 伪类：
 * - 当用户点击输入框时触发
 */
.input-field:focus {
	border-color: #667eea;  /* 边框变为蓝紫色 */
	outline: none;          /* 去除浏览器默认的外边框 */
}

/**
 * .btn-primary - 主要按钮样式
 */
.btn-primary {
	/**
	 * background: 渐变背景
	 * - linear-gradient: 线性渐变
	 * - 135deg: 渐变角度（从左下到右上）
	 * - #667eea 0%: 起始颜色（蓝紫色）
	 * - #764ba2 100%: 结束颜色（紫色）
	 */
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;                  /* 白色文字 */
	padding: 12px 24px;            /* 上下 12px，左右 24px */
	font-size: 16px;               /* 字体大小 */
	font-weight: 600;              /* 字体粗细（加粗） */
	width: 100%;                   /* 宽度 100% */
	border: none;                  /* 无边框 */
	border-radius: 8px;            /* 圆角 */
	cursor: pointer;               /* 鼠标悬停时显示手指光标 */
	transition: transform 0.2s;    /* 变换动画，0.2 秒 */
}

/**
 * .btn-primary:hover - 鼠标悬停时的样式
 *
 * :hover 伪类：
 * - 当鼠标移到按钮上时触发
 *
 * transform: translateY(-2px)：
 * - 沿 Y 轴向上移动 2 像素
 * - 产生 "悬浮" 效果
 */
.btn-primary:hover {
	transform: translateY(-2px);
}
</style>

<!--
  ============================================
  总结
  ============================================

  这个组件做了什么？
  1. 提供了两个输入框（标题和描述）
  2. 使用 v-model 双向绑定数据
  3. 验证用户输入（标题不能为空）
  4. 通过 emit 触发事件，将数据传递给父组件
  5. 提交后清空表单

  Vue 核心概念：
  - template: 定义 UI 结构
  - script: 定义组件逻辑
  - style scoped: 定义组件样式（局部作用域）
  - v-model: 双向数据绑定
  - ref(): 创建响应式数据
  - emit(): 触发事件

  数据流：
  用户输入 → v-model → formData → 点击提交 → emit('submit') → 父组件接收

  使用示例（父组件）：
  <TodoForm @submit="handleAddTodo" />

  function handleAddTodo(data) {
    // data 是 { title: '...', description: '...' }
    console.log(data)
  }
-->
