import { useState } from 'react';

function MyButton() {
    // count:状态变量
    // setCount:状态更新函数
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            点击了 {count} 次
        </button>
    );
}

function Counter0() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            {/* React waits until all code in the event handlers has run before processing your state updates.  */}
            <button onClick={() => {
                // A state variable’s value never changes within a render, even if its event handler’s code is asynchronous. 
                setNumber(number + 1); // 等价于setNumber(0 + 1),React prepares to change number to 1 on the next render.
                setNumber(number + 3); // 等价于setNumber(0 + 3),React prepares to change number to 3 on the next render.
                setNumber(number + 2); // 等价于setNumber(0 + 2),React prepares to change number to 2 on the next render.
            }}>点击(每次更新+2)</button>
        </>
    )
}

function Counter1() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                /*
                队列: 
                更新函数1. n => n + 1 / 上一步的结果n=0(初始状态) / 返回0 + 1 = 1
                更新函数2. n => n * 2 / 上一步的结果n=1 / 返回1 * 2 = 2
                更新函数3. n => n * 3 / 上一步的结果n=2 / 返回2 * 3 = 6 
                */
                setNumber(n => n + 1); // `n => n + 1`: 更新函数
                setNumber(n => n * 2);
                setNumber(n => n * 3);
            }}>点击(每次更新(+1)*2*3)</button>
        </>
    )
}

function Counter2() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                // 替换1. 0 + 5 / 状态变量number=0 / 返回0 + 5 = 5
                setNumber(number + 5);
                // 更新函数2. n => 5 + 1 / 上一步的结果n=5 / 返回5 + 1 = 6
                setNumber(n => n + 1);
                // 替换3. 0 + 2 / 状态变量number=0 / 返回0 + 2 = 2
                setNumber(number + 2);
                // 更新函数4. n => 2 * 3 / 上一步的结果n=2 / 返回2 * 3 = 6
                setNumber(n => n * 3);
            }}>点击(每次更新(+2)*3)</button>
        </>
    )
}

export default function MyApp() {
    return (
        <>
            <div>
                <h1>State is isolated and private</h1>
                {/* State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other. */}
                <MyButton />
                <MyButton />
            </div>
            <div>
                <h1>批量更新状态</h1>
                <Counter0 />
            </div>
            <div>
                <h1>updater function</h1>
                <Counter1 />
            </div>
            <div>
                <h1>混合更新</h1>
                <Counter2 />
            </div>
        </>
    );
}

