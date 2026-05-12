import { useEffect, useRef, useState } from 'react';
import { BACKENDS, BackendKey, ChatMessage, fetchModels, streamChat } from './api';

export default function App() {
  const [backend, setBackend] = useState<BackendKey>('openrouter');
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    setModels([]);
    setModel('');
    fetchModels(backend)
      .then((r) => {
        if (cancelled) return;
        setModels(r.models);
        setModel(r.default);
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, [backend]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading || !model) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      let acc = '';
      await streamChat(backend, model, next, ctrl.signal, {
        delta: ({ text }) => {
          acc += text;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        },
      });
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

  function handleNewChat() {
    abortRef.current?.abort();
    setMessages([]);
    setInput('');
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Chat Demo</h1>
        <div className="selectors">
          <select
            value={backend}
            onChange={(e) => setBackend(e.target.value as BackendKey)}
            disabled={loading}
          >
            {Object.entries(BACKENDS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={loading || models.length === 0}
          >
            {models.length === 0 && <option value="">(无可用模型)</option>}
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <button onClick={handleNewChat} disabled={messages.length === 0}>
            新对话
          </button>
        </div>
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
          <button onClick={handleSend} disabled={!input.trim() || !model}>发送</button>
        )}
      </footer>
    </div>
  );
}
