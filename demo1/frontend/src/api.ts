export type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export const BACKENDS = {
  openrouter: { label: 'OpenRouter (Hono)', url: 'http://localhost:8787/chat' },
  dashscope: { label: '阿里 DashScope (FastAPI)', url: 'http://localhost:8000/chat' },
} as const;

export type BackendKey = keyof typeof BACKENDS;

export async function* streamChat(
  backend: BackendKey,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string> {
  const res = await fetch(BACKENDS[backend].url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  });
  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') return;
      try {
        const { delta } = JSON.parse(data) as { delta: string };
        if (delta) yield delta;
      } catch {
        // ignore malformed chunks
      }
    }
  }
}
