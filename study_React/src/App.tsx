import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import base from './base/a_base'
import props0 from './base/b_props0'
import props1 from './base/b_props1'
import context from './hooks/c_useContext0'
import conditionalRendering from './base/c_conditional-rendering'
import renderingLists from './base/c_rendering_lists'
import eventHandler from './base/d_event-handler'

import useState0 from './hooks/a_useState0'
import useState1 from './hooks/a_useState1'
import useState2 from './hooks/a_useState2'
import useState3 from './hooks/a_useState3'
import useState4 from './hooks/a_useState4'
import useReducer from './hooks/b_useReducer0'
import demo0_useReduce_useContext from './hooks/d_demo0_useReduce-useContext'
import useRef0 from './hooks/e_useRef0'
import useRef1 from './hooks/e_useRef1'
import useRef2 from './hooks/e_useRef2'
import useEffect0 from './hooks/f_useEffect0'
import useEffect1 from './hooks/f_useEffect1'
import useEffect2 from './hooks/f_useEffect2'
import useCallback0 from './hooks/g_useCallback0'
import useCallback1 from './hooks/g_useCallback1'


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
    { path: '/e3', name: "Hooks: useState组件之间共享状态", component: useState3 },
    { path: '/e4', name: "Hooks: useState保存和重置状态", component: useState4 },
    { path: '/f0', name: "Hooks: useReducer vs useState", component: useReducer },
    { path: '/g0', name: 'Hooks: useContext(通过Context深层传递数据)', component: context },
    { path: '/h0', name: 'Hooks: Context和useReducer结合demo0', component: demo0_useReduce_useContext },
    { path: '/i0', name: 'Hooks: useRef基础', component: useRef0 },
    { path: '/i1', name: 'Hooks: useRef操作DOM0', component: useRef1 },
    { path: '/i2', name: 'Hooks: useRef操作DOM1', component: useRef2 },
    { path: '/j0', name: 'Hooks: useEffect基础', component: useEffect0 },
    { path: '/j1', name: 'Hooks: useEffect清理函数', component: useEffect1 },
    { path: '/j2', name: 'Hooks: useEffect不被滥用', component: useEffect2 },
    { path: '/k0', name: 'Hooks: useCallback+memo', component: useCallback0 },
    { path: '/k1', name: 'Hooks: useCallback+useEffect', component: useCallback1 }
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
