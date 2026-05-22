import asyncio
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agents import run_melchior, run_balthasar, run_casper
from arbiter import run_arbiter

load_dotenv()

app = FastAPI(title="MAGI-PROTOCOL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class DebateRequest(BaseModel):
    message: str


@app.get("/health")
async def health():
    return {"status": "online", "system": "MAGI-PROTOCOL"}


@app.post("/debate")
async def debate(request: DebateRequest):
    results = await asyncio.gather(
        run_melchior(request.message),
        run_balthasar(request.message),
        run_casper(request.message),
    )

    results = list(results)
    arbiter = await run_arbiter(results)

    return {
        "query": request.message,
        "responses": results,
        "arbiter": arbiter,
    }
