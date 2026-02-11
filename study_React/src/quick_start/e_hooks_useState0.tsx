import { useState } from 'react';

function MyButton() {
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

export default function MyApp() {
    return (
        <div>
            <h1>单独更新的计数器</h1>
            <MyButton />
            <MyButton />
        </div>
    );
}

