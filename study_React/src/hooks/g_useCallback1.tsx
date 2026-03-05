import { useState, useCallback, useEffect } from 'react';


export default function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const fetchData = useCallback(() => {
        console.log(`发起搜索: "${query}"`);
        const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓'];
        setResults(query ? fruits.filter(f => f.includes(query)) : []);
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
