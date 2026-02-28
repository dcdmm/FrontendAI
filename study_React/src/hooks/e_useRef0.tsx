import { useRef, useState } from 'react';

// Like state, refs let you retain information between re-renders of a component.
// Unlike state, setting the ref’s current value does not trigger a re-render.

function Counter_state0() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1); // 更新count的值,触发组件Counter_state0重新渲染
    }
    return (
        <>
            <button onClick={handleClick}>
                state:你点击了{count}次
            </button>
        </>
    );
}

function Counter_state1() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1); // 更新count的值,触发组件Counter_state1重新渲染,(默认)子组件Counter_ref也重新渲染
    }
    return (
        <>
            <button onClick={handleClick}>
                state:你点击了{count}次
            </button>
            <Counter_ref />
        </>
    );
}

function Counter_ref() {
    let countRef = useRef(0);

    function handleClick() {
        countRef.current = countRef.current + 1; // 更新countRef.current的值,但不会重新渲染组件Counter_ref(其他原因导致渲染时将显示最新的countRef.current值)
    }

    return (
        <button onClick={handleClick}>
            ref:你点击了{countRef.current}次
        </button>
    );
}

export default function MyApp() {
    const [, forceRender] = useState(0);

    return (
        <>
            {/* 重新渲染MyApp,(默认)子组件也重新渲染 */}
            <button onClick={() => forceRender(n => n + 1)}>
                重新渲染所有
            </button>
            <h2>示例1: 计数器useState实现</h2>
            <Counter_state0 />
            <hr />
            <h2>示例2: useState + 内嵌useRef子组件</h2>
            <Counter_state1 />
            <hr />
            <h2>示例3: 计数器useRef实现</h2>
            <Counter_ref />
        </>
    );
}