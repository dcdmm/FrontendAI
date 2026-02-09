import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 导入所有 demos
import Demo1_Counter from './demos/Demo1_Counter'
import Demo2_UseEffect from './demos/Demo2_UseEffect'

// Demo 列表配置 - 以后新增 demo 只需在这里添加一行
const demos = [
	{ path: '/demo1', name: 'useState 计数器', component: Demo1_Counter },
	{ path: '/demo2', name: 'useEffect 副作用', component: Demo2_UseEffect },
	// 以后新增 demo 在这里添加...
]

// 首页：展示所有 demo 列表
function Home() {
	return (
		<div>
			<h1>React 学习 Demo 合集</h1>
			<ul className="demo-list">
				{demos.map((demo) => (
					<li key={demo.path}>
						<Link to={demo.path}>{demo.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

function App() {
	return (
		<BrowserRouter>
			<nav className="nav">
				<Link to="/">首页</Link>
				{demos.map((demo) => (
					<Link key={demo.path} to={demo.path}>
						{demo.name}
					</Link>
				))}
			</nav>

			<main className="main">
				<Routes>
					<Route path="/" element={<Home />} />
					{demos.map((demo) => (
						<Route
							key={demo.path}
							path={demo.path}
							element={<demo.component />}
						/>
					))}
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
