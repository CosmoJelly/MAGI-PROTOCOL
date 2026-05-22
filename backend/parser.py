import re


def parse_response(raw: str) -> dict:
    confidence = None
    stance = None

    confidence_match = re.search(r"CONFIDENCE:\s*([\d.]+)", raw)
    if confidence_match:
        confidence = float(confidence_match.group(1))

    stance_match = re.search(r"STANCE:\s*(APPROVE|OPPOSE|NEUTRAL)", raw)
    if stance_match:
        stance = stance_match.group(1)

    clean_response = re.sub(r"\n?CONFIDENCE:\s*[\d.]+", "", raw)
    clean_response = re.sub(r"\n?STANCE:\s*(APPROVE|OPPOSE|NEUTRAL)", "", clean_response)
    clean_response = clean_response.strip()

    return {
        "confidence": confidence,
        "stance": stance,
        "response": clean_response,
    }
