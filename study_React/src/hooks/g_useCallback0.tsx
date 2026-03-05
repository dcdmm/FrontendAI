import { useState, useCallback, memo } from 'react';

// memo lets you skip re-rendering a component when its props are unchanged.
const Child = memo(
    function Child({ handleClick }: { handleClick: () => void }) {
        console.log('Child渲染了');
        return <button onClick={handleClick}>点我</button>;
    }
);

// const Child = function Child({ handleClick }: { handleClick: () => void }) {
//     console.log('Child 渲染了');
//     return <button onClick={handleClick}>点我</button>;
// }

/*
只用memo,不用useCallback
1. 打字操作:打印 Child渲染了
2. 点击操作:打印 Child渲染了

不用memo,只用useCallback
1. 打字操作:打印 Child渲染了
2. 点击操作:打印 Child渲染了

memo和useCallback都有
1. 打字操作:不打印
2. 点击操作:不打印
*/
export default function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // const handleClick = () => setCount(c => c + 1);

    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <p>count: {count}</p>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="打字试试" />
            <Child handleClick={handleClick} />
        </div>
    );
}

