import { useRef, useState } from 'react';

// Like state, refs let you retain information between re-renders of a component.
// Unlike state, setting the ref’s current value does not trigger a re-render.

export default function Counter() {
    return (
        <>
            <h2>示例1: 计数器useState实现</h2>
            <Counter_state0 />
            <hr />
            <h2>示例2: 计数器useState实现</h2>
            <Counter_state1 />
            <h2>示例3: 计数器useRef实现</h2>
            <Counter_ref />
        </>
    );
}

function Counter_state0() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1); // 重新渲染组件,并且count的值会更新
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
        setCount(count + 1);
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
        countRef.current = countRef.current + 1; // 不会重新渲染组件,但countRef.current的值会更新
    }

    return (
        <button onClick={handleClick}>
            ref:你点击了{countRef.current}次
        </button>
    );
}