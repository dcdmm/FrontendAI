import { useState, useEffect } from 'react';


// 自定义Hook
// * use开头,后跟一个大写字母
// * 内部调用了其他Hook
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

export default SearchBox;
