import json
import os
from typing import AsyncIterator, Literal

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel

load_dotenv()

MODEL = os.getenv("DASHSCOPE_MODEL", "qwen-plus")
BASE_URL = os.getenv("DASHSCOPE_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1")

client = AsyncOpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url=BASE_URL,
)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict:
    return {"ok": True, "backend": "fastapi+dashscope", "model": MODEL}


async def sse_stream(messages: list[ChatMessage]) -> AsyncIterator[str]:
    completion = await client.chat.completions.create(
        model=MODEL,
        messages=[m.model_dump() for m in messages],
        stream=True,
    )
    async for chunk in completion:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta.content or ""
        if delta:
            yield f"data: {json.dumps({'delta': delta})}\n\n"
    yield "data: [DONE]\n\n"


@app.post("/chat")
async def chat(req: ChatRequest) -> StreamingResponse:
    return StreamingResponse(sse_stream(req.messages), media_type="text/event-stream")
