import { useRef, useState } from 'react';
import { BACKENDS, BackendKey, ChatMessage, streamChat } from './api';

export default function App() {
  const [backend, setBackend] = useState<BackendKey>('openrouter');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      let acc = '';
      for await (const delta of streamChat(backend, next, ctrl.signal)) {
        acc += delta;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: `[错误] ${msg}` };
        return copy;
      });
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Chat Demo</h1>
        <select
          value={backend}
          onChange={(e) => setBackend(e.target.value as BackendKey)}
          disabled={loading}
        >
          {Object.entries(BACKENDS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </header>

      <main className="messages">
        {messages.length === 0 && <p className="empty">开始对话吧～</p>}
        {messages.map((m, i) => (
          <div key={i} className={`msg msg-${m.role}`}>
            <div className="role">{m.role === 'user' ? '我' : 'AI'}</div>
            <div className="content">{m.content || (loading && i === messages.length - 1 ? '...' : '')}</div>
          </div>
        ))}
      </main>

      <footer className="composer">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="输入消息，Enter 发送，Shift+Enter 换行"
          rows={2}
        />
        {loading ? (
          <button onClick={handleStop}>停止</button>
        ) : (
          <button onClick={handleSend} disabled={!input.trim()}>发送</button>
        )}
      </footer>
    </div>
  );
}
