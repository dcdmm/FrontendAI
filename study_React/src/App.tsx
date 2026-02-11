import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import base from './quick_start/a_base'
import props0 from './quick_start/b_props0'
import props1 from './quick_start/b_props1'
import conditionalRendering from './quick_start/c_conditional-rendering'
import renderingLists from './quick_start/c_rendering_lists'
import eventHandler from './quick_start/d_event-handler'
import useState0 from './quick_start/e_hooks_useState0'
import useState1 from './quick_start/e_hooks_useState1'
import useState2 from './quick_start/e_hooks_useState2'

const demos = [
    { path: '/a', name: '基础', component: base },
    { path: '/b0', name: 'props0', component: props0 },
    { path: '/b1', name: 'props1', component: props1 },
    { path: '/c0', name: '条件渲染', component: conditionalRendering },
    { path: '/c1', name: '列表渲染', component: renderingLists },
    { path: '/d', name: '事件处理', component: eventHandler },
    { path: '/e0', name: "Hooks: useState基础", component: useState0 },
    { path: '/e1', name: "Hooks: useState更新对象", component: useState1 },
    { path: '/e2', name: "Hooks: useState更新数组", component: useState2 },
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
