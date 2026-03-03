import { useState, useCallback, memo } from 'react';

const Child = memo(function Child({ onClick }: { onClick: () => void }) {
    console.log('Child 渲染了');
    return <button onClick={onClick}>点我</button>;
});

export default function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // ❌ 普通函数：每次 App 渲染都会创建新的引用 → Child 跟着重新渲染
    const handleClick = () => setCount(c => c + 1);

    // ✅ useCallback：text 变化时，handleClick 引用不变 → Child 不会重新渲染
    // const handleClick = useCallback(() => {
    //     setCount(c => c + 1);
    // }, []); // 依赖为空，因为用了函数式更新，不依赖外部变量

    return (
        <div style={{ padding: 20 }}>
            <p>count: {count}</p>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="打字试试" />
            <Child onClick={handleClick} />
        </div>
    );
}

