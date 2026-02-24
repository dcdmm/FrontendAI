import { useState } from 'react';

export default function MyApp() {
    return (
        <>
            <h2>示例1：相同组件状态保留</h2>
            <CounterApp0 />
            <hr />
            <h2>示例2：条件渲染状态保留</h2>
            <CounterApp1 />
        </>
    );
}

function CounterApp0() {
    const [showB, setShowB] = useState(true);
    return (
        <div>
            <Counter0 />
            {showB && <Counter0 />}
            <label>
                <input
                    type="checkbox"
                    checked={showB}
                    onChange={e => {
                        setShowB(e.target.checked)
                    }}
                />
                渲染第二个计数器
            </label>
        </div>
    );
}

function Counter0() {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }

    return (
        <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <h1>{score}</h1>
            <button onClick={() => setScore(score + 1)}>
                +1
            </button>
        </div>
    );
}


function CounterApp1() {
    const [isFancy, setIsFancy] = useState(false);
    return (
        <div>
            {isFancy ? (
                <Counter1 isFancy={true} />
            ) : (
                <Counter1 isFancy={false} />
            )}
            <label>
                <input
                    type="checkbox"
                    checked={isFancy}
                    onChange={e => {
                        setIsFancy(e.target.checked)
                    }}
                />
                Use fancy styling
            </label>
        </div>
    );
}

function Counter1({ isFancy }: { isFancy: boolean }) {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);

    let className = 'counter';
    if (hover) {
        className += ' hover';
    }
    if (isFancy) {
        className += ' fancy';
    }

    return (
        <div
            className={className}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <h1>{score}</h1>
            <button onClick={() => setScore(score + 1)}>
                Add one
            </button>
        </div>
    );
}
