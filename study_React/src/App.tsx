import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import base0 from './quick_start/a_base'

const demos = [
    { path: '/demo1', name: 'useState 计数器', component: base0 }
]

function Home() {
    return (
        <div>
            <h1>React学习</h1>
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
