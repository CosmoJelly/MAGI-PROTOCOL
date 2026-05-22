from pathlib import Path
from llm import query_llm
from parser import parse_response


def load_prompt(name: str) -> str:
    path = Path(__file__).parent / "prompts" / f"{name}.md"
    return path.read_text()


async def run_melchior(user_message: str) -> dict:
    raw = await query_llm(load_prompt("melchior"), user_message)
    parsed = parse_response(raw)
    return {"agent": "MELCHIOR-1", **parsed}


async def run_balthasar(user_message: str) -> dict:
    raw = await query_llm(load_prompt("balthasar"), user_message)
    parsed = parse_response(raw)
    return {"agent": "BALTHASAR-2", **parsed}


async def run_casper(user_message: str) -> dict:
    raw = await query_llm(load_prompt("casper"), user_message)
    parsed = parse_response(raw)
    return {"agent": "CASPER-3", **parsed}
