import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Demo1_Counter from './demos/Demo1_Counter'
import Demo2_UseEffect from './demos/Demo2_UseEffect'

const demos = [
	{ path: '/demo1', name: 'useState 计数器', component: Demo1_Counter },
	{ path: '/demo2', name: 'useEffect 副作用', component: Demo2_UseEffect }
]

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
