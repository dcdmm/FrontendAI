import { useState } from 'react';

export default function MyApp() {
    return (
        <>
            <h2>示例1:移除组件,状态重置</h2>
            <CounterApp0 />
            <hr />
            <h2>示例2:相同位置相同组件,状态保留</h2>
            <CounterApp1 />
            <hr />
            <h2>示例3:相同位置不同组件,状态重置</h2>
            <CounterApp2 />
            <hr />
            <h2>重置状态方式1:Rendering a component in different positions</h2>
            <ResettingState1 />
            <hr />
            <h2>重置状态方式2:Resetting state with a key</h2>
            <ResettingState2 />
        </>
    );
}

// Notice how the moment you stop rendering the second counter, its state disappears completely. That’s because when React removes a component, it destroys its state.
// When you tick “Render the second counter”, a second Counter and its state are initialized from scratch (score = 0) and added to the DOM.
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
                    onChange={e => {setShowB(e.target.checked)}}
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
                +1
            </button>
        </div>
    );
}


function CounterApp2() {
    const [isPaused, setIsPaused] = useState(false);
    return (
        <div>
            {isPaused ? (
                <p>See you later!</p>
            ) : (
                <Counter2 />
            )}
            <label>
                <input
                    type="checkbox"
                    checked={isPaused}
                    onChange={e => {
                        setIsPaused(e.target.checked)
                    }}
                />
                Take a break
            </label>
        </div>
    );
}

// Here, you switch between different component types at the same position. Initially, the first child of the <div> contained a Counter. But when you swapped in a p, React removed the Counter from the UI tree and destroyed its state.
function Counter2() {
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

function ResettingState1() {
    const [isPlayerA, setIsPlayerA] = useState(true);
    return (
        <div>
            {isPlayerA &&
                <Counter_way1 person="Taylor" />
            }
            {!isPlayerA &&
                <Counter_way1 person="Sarah" />
            }
            <button onClick={() => {
                setIsPlayerA(!isPlayerA);
            }}>
                Next player!
            </button>
        </div>
    );
}

/*
Initially, isPlayerA is true. So the first position contains Counter state, and the second one is empty.
When you click the “Next player” button the first position clears but the second one now contains a Counter.
*/
function Counter_way1({ person }: { person: string }) {
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
            <h1>{person}'s score: {score}</h1>
            <button onClick={() => setScore(score + 1)}>
                +1
            </button>
        </div>
    );
}

function ResettingState2() {
    const [isPlayerA, setIsPlayerA] = useState(true);
    return (
        <div>
            {/* Switching between Taylor and Sarah does not preserve the state. This is because you gave them different keys: */}
            {isPlayerA ? (
                <Counter_way2 key="Taylor" person="Taylor" />
            ) : (
                <Counter_way2 key="Sarah" person="Sarah" />
            )}
            <button onClick={() => {
                setIsPlayerA(!isPlayerA);
            }}>
                Next player!
            </button>
        </div>
    );
}

function Counter_way2({ person }: { person: string }) {
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
            <h1>{person}'s score: {score}</h1>
            <button onClick={() => setScore(score + 1)}>
                +1
            </button>
        </div>
    );
}
