import { useState, useCallback, useEffect } from 'react';

// 场景：输入关键词 → 自动搜索
// useCallback 让 fetchData 引用稳定，避免 useEffect 无限触发

export default function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    // ✅ useCallback：只有 query 变化时，fetchData 才是新函数
    const fetchData = useCallback(() => {
        console.log(`发起搜索: "${query}"`);
        const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓'];
        setResults(query ? fruits.filter(f => f.includes(query)) : []);
    }, [query]);

    // fetchData 作为 useEffect 的依赖
    // 因为用了 useCallback，只有 query 变时才重新执行
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ❌ 如果去掉 useCallback，fetchData 每次渲染都是新引用
    //    → useEffect 每次都执行 → setResults 触发渲染 → 又创建新 fetchData → 无限循环！

    return (
        <div style={{ padding: 20 }}>
            <h2>useCallback + useEffect（防止无限循环）</h2>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="搜索水果..."
                style={{ padding: 8, fontSize: 16 }}
            />
            <ul>
                {results.map(r => <li key={r}>{r}</li>)}
            </ul>
            {query && results.length === 0 && <p>没有结果</p>}
            <p style={{ color: '#888', fontSize: 14 }}>打开控制台查看搜索日志</p>
        </div>
    );
}
