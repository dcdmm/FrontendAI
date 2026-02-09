import { useState, useEffect, useRef } from 'react'

// ============================================
// 什么是 Hook？
// Hook 是以 "use" 开头的特殊函数，让你在函数组件中"钩入" React 的功能
// 最常用的三个：useState、useEffect、useRef
// ============================================

// ---------- 示例1: useState ----------
// useState 让组件"记住"数据，数据变了界面自动更新
function Counter() {
    // useState(0) 的意思：创建一个状态，初始值是 0
    // count      → 当前的值
    // setCount   → 用来修改值的函数
    const [count, setCount] = useState(0)

    return (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
            <h3>🔢 useState - 计数器</h3>
            <p>你点击了 <strong>{count}</strong> 次</p>
            <button onClick={() => setCount(count + 1)}>+1</button>{' '}
            <button onClick={() => setCount(count - 1)}>-1</button>{' '}
            <button onClick={() => setCount(0)}>归零</button>
        </div>
    )
}

// ---------- 示例2: useState 管理多种类型 ----------
// useState 不只能存数字，字符串、布尔值、对象、数组都可以
function UserForm() {
    const [name, setName] = useState('')           // 字符串状态
    const [age, setAge] = useState(18)             // 数字状态
    const [hobbies, setHobbies] = useState<string[]>([])  // 数组状态

    function addHobby() {
        const hobby = prompt('输入一个爱好：')
        if (hobby) {
            // 更新数组时，用展开运算符创建新数组（不能直接 push）
            setHobbies([...hobbies, hobby])
        }
    }

    return (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
            <h3>📝 useState - 表单数据</h3>
            <div style={{ marginBottom: 8 }}>
                <label>姓名：</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ marginBottom: 8 }}>
                <label>年龄：</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div style={{ marginBottom: 8 }}>
                <button onClick={addHobby}>添加爱好</button>
                {hobbies.length > 0 && <span> 爱好：{hobbies.join('、')}</span>}
            </div>
            <p style={{ color: '#666' }}>
                你好，{name || '???'}！你今年 {age} 岁。
            </p>
        </div>
    )
}

// ---------- 示例3: useEffect ----------
// useEffect 用来执行"副作用"：比如请求数据、操作 DOM、设置定时器等
// 可以理解为：组件渲染完成后，自动执行的代码
function Timer() {
    const [seconds, setSeconds] = useState(0)
    const [running, setRunning] = useState(false)

    // useEffect 接收两个参数：
    //   第1个：要执行的函数
    //   第2个：依赖数组 → 里面的值变化时，重新执行函数
    useEffect(() => {
        if (!running) return  // 没在运行就什么都不做

        // 每秒 +1
        const timer = setInterval(() => {
            setSeconds((s) => s + 1)  // 用函数式更新，确保拿到最新的 s
        }, 1000)

        // 返回一个"清理函数"，组件卸载或依赖变化时会自动调用
        // 这里用来清除定时器，防止内存泄漏
        return () => clearInterval(timer)
    }, [running])  // ← 只有 running 变化时，才重新执行

    return (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
            <h3>⏱️ useEffect - 秒表</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>{seconds} 秒</p>
            <button onClick={() => setRunning(!running)}>
                {running ? '暂停' : '开始'}
            </button>{' '}
            <button onClick={() => { setRunning(false); setSeconds(0) }}>
                重置
            </button>
        </div>
    )
}

// ---------- 示例4: useRef ----------
// useRef 创建一个"引用"，它有两个常见用途：
//   1. 获取 DOM 元素（类似 document.getElementById）
//   2. 保存一个不触发重新渲染的值
function FocusInput() {
    // 创建一个 ref，绑定到 input 元素上
    const inputRef = useRef<HTMLInputElement>(null)
    const renderCount = useRef(0)  // 用 ref 记录渲染次数（改变它不会触发重渲染）

    const [text, setText] = useState('')

    // 每次组件渲染时，renderCount +1
    renderCount.current += 1

    function handleFocus() {
        // 通过 ref 直接操作 DOM
        inputRef.current?.focus()
    }

    return (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
            <h3>🎯 useRef - 操作 DOM</h3>
            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="试试点下面的按钮"
            />{' '}
            <button onClick={handleFocus}>聚焦输入框</button>
            <p style={{ color: '#999', fontSize: 12 }}>
                组件已渲染 {renderCount.current} 次（用 useRef 记录，不会触发额外渲染）
            </p>
        </div>
    )
}

// ---------- 示例5: 自定义 Hook ----------
// 你可以把逻辑抽成自己的 Hook，名字必须以 "use" 开头
// 这样可以在多个组件之间复用逻辑
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])  // ← 空数组：只在组件挂载时执行一次

    return width
}

function WindowInfo() {
    // 使用我们自定义的 Hook，就像使用内置的一样简单
    const width = useWindowWidth()

    return (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
            <h3>🪟 自定义 Hook - 窗口宽度</h3>
            <p>当前窗口宽度：<strong>{width}px</strong></p>
            <p style={{ color: '#999', fontSize: 12 }}>试试拖动浏览器窗口大小，数值会实时变化</p>
        </div>
    )
}

// ---------- 主组件 ----------
export default function MyApp() {
    return (
        <div>
            <h2>React Hooks 入门</h2>
            <p style={{ color: '#666', marginBottom: 16 }}>
                Hook 的规则：只能在<strong>组件顶层</strong>调用，不能放在 if / for / 嵌套函数里
            </p>
            <Counter />
            <UserForm />
            <Timer />
            <FocusInput />
            <WindowInfo />
        </div>
    )
}
