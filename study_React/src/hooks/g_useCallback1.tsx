import { useState, useCallback, useEffect, memo } from 'react';

const SearchButton = memo(
    ({ onSearch }: { onSearch: () => void }) => {
        console.log('SearchButton 渲染了');
        return <button onClick={onSearch} style={{ marginLeft: 8, padding: '8px 16px' }}>刷新</button>;
    }
);

export default function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const fetchData = useCallback(() => {
        console.log(`发起搜索: "${query}"`);
        const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '香瓜'];
        setResults(query ? fruits.filter(f => f.includes(query)) : []);
    }, [query]);

    // const fetchData = () => {
    //     console.log(`发起搜索: "${query}"`);
    //     const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '香瓜'];
    //     setResults(query ? fruits.filter(f => f.includes(query)) : []);
    // }

    /*
    不使用useCallback(死循环)
        → 初始渲染
        → fetchData初始创建
        → useEffect首次挂载
        → fetchData被调用
        → setResults被调用--->返回空数组[]--->但引用地址改变
        → 组件重新渲染
        → fetchData重新创建(新的引用地址)
        → useEffect检测到fetchData变化
        → fetchData被调用
        → setResults被调用--->返回空数组[]--->但引用地址改变
        → 组件重新渲染
        → ...死循环
    */
    useEffect(() => {
        fetchData();
    }, [fetchData]); // 自动搜索(每次query变化时)

    return (
        <div style={{ padding: 20 }}>
            <h2></h2>
            <div>
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="搜索水果..."
                    style={{ padding: 8, fontSize: 16 }}
                />
                <button onClick={fetchData} style={{ marginLeft: 8, padding: '8px 16px' }}>手动搜索</button>
                <SearchButton onSearch={fetchData} />
            </div>
            <ul>
                {results.map(r => <li key={r}>{r}</li>)}
            </ul>
        </div>
    );
}
