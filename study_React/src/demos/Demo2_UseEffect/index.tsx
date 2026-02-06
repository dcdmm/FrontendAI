import { useState, useEffect } from 'react'

// Demo 2: useEffect 基础用法
export default function UseEffectDemo() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		document.title = `点击了 ${count} 次`

		// 清理函数（可选）
		return () => {
			document.title = 'React 学习'
		}
	}, [count])

	return (
		<div>
			<h2>Demo 2: useEffect 副作用</h2>
			<p>查看浏览器标签页标题的变化</p>
			<p>当前计数: {count}</p>
			<button onClick={() => setCount(count + 1)}>+1</button>
		</div>
	)
}
