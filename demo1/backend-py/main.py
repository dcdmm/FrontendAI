import json
import os
from pathlib import Path
from typing import AsyncIterator, Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

_cfg = json.loads((ROOT / "models.json").read_text(encoding="utf-8"))["dashscope"]
MODELS: list[str] = _cfg["models"]
DEFAULT_MODEL: str = _cfg["default"]

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
    model: str | None = None


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/models")
async def list_models() -> dict:
    return {"models": MODELS, "default": DEFAULT_MODEL}


async def sse_stream(messages: list[ChatMessage], model: str) -> AsyncIterator[str]:
    completion = await client.chat.completions.create(
        model=model,
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
    chosen = req.model or DEFAULT_MODEL
    if chosen not in MODELS:
        raise HTTPException(400, f"model {chosen} not in allow-list")
    return StreamingResponse(sse_stream(req.messages, chosen), media_type="text/event-stream")
