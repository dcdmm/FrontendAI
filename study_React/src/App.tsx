import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import base from './quick_start/a_base'
import props0 from './quick_start/b_props0'
import props1 from './quick_start/b_props1'
import conditionalRendering from './quick_start/c_conditional-rendering'
import renderingLists from './quick_start/c_rendering_lists'
import respondingToEvents from './quick_start/d_responding-to-events'

// import updatingTheScreen from './quick_start/e_updating_the_screen'
// import hooks from './quick_start/f_hooks'

const demos = [
    { path: '/a', name: '基础', component: base },
    { path: '/b0', name: 'props学习0', component: props0 },
    { path: '/b1', name: 'props学习1', component: props1 },
    { path: '/c0', name: '条件渲染', component: conditionalRendering },
    { path: '/c1', name: '列表渲染', component: renderingLists },    
    { path: '/d', name: '响应事件', component: respondingToEvents },
    
    // { path: '/e', name: '更新屏幕', component: updatingTheScreen },
    // { path: '/f', name: 'Hooks入门', component: hooks },
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
