import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { stream } from 'hono/streaming';
import { HTTPException } from 'hono/http-exception';
import OpenAI from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MODELS_PATH = resolve(__dirname, '../../models.json');
const { default: DEFAULT_MODEL, models: MODELS } = JSON.parse(
  readFileSync(MODELS_PATH, 'utf-8'),
).openrouter as { default: string; models: string[] };

const PORT = Number(process.env.OPENROUTER_PORT ?? 8787);
const BASE_URL = process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1';

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: BASE_URL,
});

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
type ChatRequest = { messages: ChatMessage[]; model?: string };

const app = new Hono();

app.use('/*', cors());

app.get('/models', (c) => c.json({ models: MODELS, default: DEFAULT_MODEL }));

app.post('/chat', async (c) => {
  const { messages, model } = await c.req.json<ChatRequest>();
  const chosen = model ?? DEFAULT_MODEL;
  if (!MODELS.includes(chosen)) {
    throw new HTTPException(400, { message: `model ${chosen} not in allow-list` });
  }

  const completion = await client.chat.completions.create({
    model: chosen,
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
