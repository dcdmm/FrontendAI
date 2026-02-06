import { useState } from 'react'

// Demo 1: useState 基础用法
export default function Counter() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<h2>Demo 1: useState 计数器</h2>
			<p>当前计数: {count}</p>
			<button onClick={() => setCount(count + 1)}>+1</button>
			<button onClick={() => setCount(count - 1)}>-1</button>
			<button onClick={() => setCount(0)}>重置</button>
		</div>
	)
}
