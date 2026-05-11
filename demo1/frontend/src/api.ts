export type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export const BACKENDS = {
  openrouter: { label: 'OpenRouter(Hono)', baseUrl: 'http://localhost:8787' },
  dashscope: { label: '阿里DashScope(FastAPI)', baseUrl: 'http://localhost:8000' },
} as const;

export type BackendKey = keyof typeof BACKENDS;

export type ModelsResponse = { models: string[]; default: string };

export async function fetchModels(backend: BackendKey): Promise<ModelsResponse> {
  const res = await fetch(`${BACKENDS[backend].baseUrl}/models`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


export async function* streamChat(
  backend: BackendKey,
  model: string,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string> {
  const res = await fetch(`${BACKENDS[backend].baseUrl}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model }),
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
      const data = line.slice(6).trim(); // 去掉前缀"data: "
      if (data === '[DONE]') return;
      try {
        const { delta } = JSON.parse(data) as { delta: string };
        if (delta) yield delta;
      } catch {
        // ignore
      }
    }
  }
}
