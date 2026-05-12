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


export type StreamHandlers = {
  delta?: (p: { text: string }) => void;
};

export async function streamChat(
  backend: BackendKey,
  model: string,
  messages: ChatMessage[],
  signal: AbortSignal,
  on: StreamHandlers,
): Promise<void> {
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

    const chunks = buffer.split('\n\n');
    buffer = chunks.pop() ?? '';

    for (const chunk of chunks) {
      let event = '';
      let data = '';
      for (const line of chunk.split('\n')) {
        if (line.startsWith('event: ')) event = line.slice(7).trim();
        else if (line.startsWith('data: ')) data = line.slice(6);
      }
      if (!event || !data) continue;
      const handler = on[event as keyof StreamHandlers];
      if (handler) handler(JSON.parse(data));
    }
  }
}
