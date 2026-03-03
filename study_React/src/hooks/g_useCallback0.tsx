import { useState, useCallback, useEffect } from 'react';

export default function App() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState<any>(null);
    const [inputText, setInputText] = useState('');

    const fetchUserBad = async () => {
        console.log('❌ fetchUserBad 被调用了！userId =', userId);
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return res.json();
    };

    const fetchUserGood = useCallback(async () => {
        console.log('✅ fetchUserGood 被调用了！userId =', userId);
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return res.json();
    }, [userId]);

    const USE_GOOD_VERSION = true;

    const fetchFn = USE_GOOD_VERSION ? fetchUserGood : fetchUserBad;

    useEffect(() => {
        fetchFn().then((data: any) => setUser(data));
    }, [fetchFn]);

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
                <label>输入任意内容（不应触发请求）：</label>
                <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ marginLeft: 8 }}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>切换用户（应该触发请求）：</label>
                {[1, 2, 3].map((id) => (
                    <button
                        key={id}
                        onClick={() => setUserId(id)}
                        style={{
                            margin: 4,
                            fontWeight: userId === id ? 'bold' : 'normal',
                            background: userId === id ? '#1890ff' : '#fff',
                            color: userId === id ? '#fff' : '#000',
                            border: '1px solid #ccc',
                            padding: '4px 12px',
                            borderRadius: 4,
                            cursor: 'pointer',
                        }}
                    >
                        用户 {id}
                    </button>
                ))}
            </div>
            {user && (
                <div style={{ padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                    <p><b>姓名：</b>{user.name}</p>
                    <p><b>邮箱：</b>{user.email}</p>
                    <p><b>电话：</b>{user.phone}</p>
                </div>
            )}
            <div style={{ marginTop: 24, padding: 16, background: '#fffbe6', borderRadius: 8 }}>
            </div>
        </div>
    );
}
