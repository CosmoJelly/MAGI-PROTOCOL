# MAGI-PROTOCOL

> A multi-agent AI operating system inspired by the MAGI supercomputer 
> from Neon Genesis Evangelion.

Three AI agents - MELCHIOR (Logic), BALTHASAR (Emotion), and CASPER (Ethics) - debate every user query in real time. Watch them disagree, argue, and vote.

## How It Works

Every query is sent to three AI subsystems simultaneously. Each agent analyses 
the question through a different lens and returns a response, a confidence score, 
and a stance. A fourth ARBITER system then synthesises a final verdict.

### The Three Subsystems

> You can view the full prompts in `/backend/prompts/`

| Agent | Designation | Reasoning Style |
|---|---|---|
| MELCHIOR-1 | Logic | Probabilistic, data-driven, outcome focused |
| BALTHASAR-2 | Emotion | Empathetic, intuitive, human centred |
| CASPER-3 | Ethics | Principled, moral, precedent aware |

### Verdict States
- `APPROVE` - majority vote in favour
- `OPPOSE` - majority vote against
- `DEADLOCK` - no majority reached, further deliberation required

### What It Works Best For
MAGI-PROTOCOL is designed for questions where reasonable perspectives can conflict:
- Decisions - *"Should I quit my job?"*
- Technical tradeoffs - *"Should I use PostgreSQL or MongoDB?"*
- Ethical dilemmas - *"Is it acceptable to surveil employees?"*
- Risk assessment - *"Should I go bungee jumping?"*

## Architecture

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Backend | FastAPI |
| Message Broker | Redis |
| LLM Runtime | Ollama or any LLM API |
| Deployment | Docker Compose |

## Configuration

| Provider | `LLM_PROVIDER` | `API_BASE_URL` |
|---|---|---|
| Ollama (local) | `ollama` | — |
| OpenAI | `api` | `https://api.openai.com/v1` |
| Anthropic | `api` | `https://api.anthropic.com/v1` |
| Mistral | `api` | `https://api.mistral.ai/v1` |
| Groq | `api` | `https://api.groq.com/openai/v1` |

> No API key needed for Ollama. For cloud providers, set `API_KEY` in your `.env`.
> 
> Use `.env.example` as a master reference for other `.env` files.

## Running Locally
> Will add later

## Copyright & Legal

MAGI-PROTOCOL is an independent fan project and is not affiliated with, endorsed by, or connected to Gainax, Khara, or the Neon Genesis Evangelion franchise in any way.

Neon Genesis Evangelion and all related names, characters, and imagery are the intellectual property of Gainax and Khara. No copyright infringement is intended.

All original code in this repository is released under the MIT License. See [LICENSE](./LICENSE) for details.
