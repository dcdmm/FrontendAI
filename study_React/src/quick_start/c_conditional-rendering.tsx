import { useState } from 'react';

function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
    if (isLoggedIn) {
        return <h2>欢迎回来！</h2>;
    }
    return <h2>请先登录。</h2>;
}

// 三元运算符
function StatusBadge({ isOnline }: { isOnline: boolean }) {
    return (
        <span style={{
            color: isOnline ? 'green' : 'gray',
            fontWeight: 'bold'
        }}>
            {isOnline ? '🟢 在线' : '⚪ 离线'}
        </span>
    );
}

// &&运算符
function NotificationBell({ count }: { count: number }) {
    return (
        <div>
            🔔 通知
            {count > 0 && <span style={{ color: 'red', marginLeft: 4 }}>({count})</span>}
        </div>
    );
}

export default function MyApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [msgCount, setMsgCount] = useState(3);

    return (
        <div style={{ padding: 20 }}>
            <h1>条件渲染示例</h1>
            <section style={{ marginBottom: 20 }}>
                <h3>if/else 条件渲染</h3>
                <Greeting isLoggedIn={isLoggedIn} />
                <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                    {isLoggedIn ? '退出登录' : '登录'}
                </button>
            </section>

            <section style={{ marginBottom: 20 }}>
                <h3>三元运算符</h3>
                <StatusBadge isOnline={isOnline} />
                <br />
                <button onClick={() => setIsOnline(!isOnline)} style={{ marginTop: 8 }}>
                    切换状态
                </button>
            </section>

            <section style={{ marginBottom: 20 }}>
                <h3>&& 短路运算符</h3>
                <NotificationBell count={msgCount} />
                <button onClick={() => setMsgCount(msgCount > 0 ? 0 : 5)} style={{ marginTop: 8 }}>
                    {msgCount > 0 ? '清空通知' : '模拟新通知'}
                </button>
            </section>
        </div>
    );
}

