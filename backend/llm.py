import os
import httpx
from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3:latest")
API_KEY = os.getenv("API_KEY", "")
API_BASE_URL = os.getenv("API_BASE_URL", "")
API_MODEL = os.getenv("API_MODEL", "")


async def query_llm(system_prompt: str, user_message: str) -> str:
    if LLM_PROVIDER == "ollama":
        return await _query_ollama(system_prompt, user_message)
    elif LLM_PROVIDER == "api":
        return await _query_api(system_prompt, user_message)
    else:
        raise ValueError(f"Unknown LLM_PROVIDER: {LLM_PROVIDER}")


async def _query_ollama(system_prompt: str, user_message: str) -> str:
    async with httpx.AsyncClient(timeout=360) as client:
        response = await client.post(
            f"{OLLAMA_BASE_URL}/api/chat",
            json={
                "model": OLLAMA_MODEL,
                "stream": False,
                "keep_alive": "10m",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message},
                ],
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["message"]["content"]


async def _query_api(system_prompt: str, user_message: str) -> str:
    async with httpx.AsyncClient(timeout=360) as client:
        response = await client.post(
            f"{API_BASE_URL}/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": API_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message},
                ],
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]
