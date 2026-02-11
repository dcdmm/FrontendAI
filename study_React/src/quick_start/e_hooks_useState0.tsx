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

export default function MyApp() {
    return (
        <div>
            <h1>单独更新的计数器</h1>
            {/* State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other. */}
            <MyButton />
            <MyButton />
        </div>
    );
}

