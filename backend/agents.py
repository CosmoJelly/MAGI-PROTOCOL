from pathlib import Path
from llm import query_llm

def load_prompt(name: str) -> str:
    path = Path(__file__).parent / "prompts" / f"{name}.md"
    return path.read_text()


async def run_melchior(user_message: str) -> dict:
    response = await query_llm(load_prompt("melchior"), user_message)
    return {"agent": "MELCHIOR-1", "response": response}


async def run_balthasar(user_message: str) -> dict:
    response = await query_llm(load_prompt("balthasar"), user_message)
    return {"agent": "BALTHASAR-2", "response": response}


async def run_casper(user_message: str) -> dict:
    response = await query_llm(load_prompt("casper"), user_message)
    return {"agent": "CASPER-3", "response": response}
