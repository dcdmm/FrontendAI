import { useEffect } from 'react';

export default function ChatRoom() {
    useEffect(() => {
        const connection = createConnection();
        connection.connect();

        // React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed).
        return () => connection.disconnect(); // 返回清理函数
    }, []);
    return <h1>Welcome to the chat!</h1>;
}


export function createConnection() {
    return {
        connect() {
            console.log('✅ Connecting...');
        },
        disconnect() {
            console.log('❌ Disconnected.');
        }
    };
}