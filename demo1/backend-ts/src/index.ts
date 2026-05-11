import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { stream } from 'hono/streaming';
import OpenAI from 'openai';

const PORT = Number(process.env.PORT ?? 8787);
const MODEL = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4o-mini';
const BASE_URL = process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1';

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: BASE_URL,
});

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
type ChatRequest = { messages: ChatMessage[] };

const app = new Hono();

app.use('/*', cors());

app.get('/health', (c) => c.json({ ok: true, backend: 'hono+openrouter', model: MODEL }));

app.post('/chat', async (c) => {
  const { messages } = await c.req.json<ChatRequest>();

  const completion = await client.chat.completions.create({
    model: MODEL,
    messages,
    stream: true,
  });

  c.header('Content-Type', 'text/event-stream');
  c.header('Cache-Control', 'no-cache');
  c.header('Connection', 'keep-alive');

  return stream(c, async (s) => {
    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta?.content ?? '';
      if (delta) {
        await s.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }
    await s.write('data: [DONE]\n\n');
  });
});

serve({ fetch: app.fetch, port: PORT });
console.log(`[backend-ts] listening on http://localhost:${PORT}`);
