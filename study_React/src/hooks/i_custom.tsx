import { useState, useEffect } from 'react';


// 自定义Hook(函数名use开头,后跟一个大写字母.内部调用了其他Hook)
// * Custom Hooks let you share logic between components.
// * Custom Hooks only share stateful logic, not state itself.
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(timer); // 清理函数
    }, [value, delay]);

    return debouncedValue;
}

function SearchBox() {
    const [keyword, setKeyword] = useState(''); // 每次都变化
    const debouncedKeyword = useDebounce(keyword, 1000); // 1000毫秒延迟后稳定的值

    useEffect(() => {
        if (!debouncedKeyword) return;
        console.log('发起搜索:', debouncedKeyword);
    }, [debouncedKeyword]);

    return (
        <div>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <p>实时输入: {keyword}</p>
            <p>实际搜索: {debouncedKeyword}</p>
        </div>
    );
}

function QuantityCounter() {
    const [quantity, setQuantity] = useState(0);
    const debouncedQuantity = useDebounce(quantity, 3000);

    useEffect(() => {
        console.log('数量稳定后:', debouncedQuantity);
    }, [debouncedQuantity]);

    return (
        <div>
            <button onClick={() => setQuantity((q) => q - 1)}>-</button>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            <p>实时数量: {quantity}</p>
            <p>防抖后数量: {debouncedQuantity}</p>
        </div>
    );
}

function CustomHookDemo() {
    return (
        <div>
            <SearchBox />
            <QuantityCounter />
        </div>
    );
}

export default CustomHookDemo;
