import re
from llm import query_llm
from pathlib import Path


def load_prompt(name: str) -> str:
    path = Path(__file__).parent / "prompts" / f"{name}.md"
    return path.read_text()


def parse_arbiter_response(raw: str) -> dict:
    verdict = None
    reasoning = None

    verdict_match = re.search(r"VERDICT:\s*(APPROVE|OPPOSE|DEADLOCK)", raw)
    if verdict_match:
        verdict = verdict_match.group(1)

    reasoning_match = re.search(r"REASONING:\s*(.+)", raw, re.DOTALL)
    if reasoning_match:
        reasoning = reasoning_match.group(1).strip()

    return {
        "verdict": verdict,
        "reasoning": reasoning,
    }


async def run_arbiter(agent_responses: list) -> dict:

    summary = ""
    votes = {"APPROVE": 0, "OPPOSE": 0, "NEUTRAL": 0}

    for agent in agent_responses:
        summary += f"{agent['agent']}:\n"
        summary += f"Response: {agent['response']}\n"
        summary += f"Confidence: {agent['confidence']}\n"
        summary += f"Stance: {agent['stance']}\n\n"

        if agent["stance"] in votes:
            votes[agent["stance"]] += 1

    raw = await query_llm(load_prompt("arbiter"), summary)
    parsed = parse_arbiter_response(raw)

    return {
        **parsed,
        "votes": votes,
    }
