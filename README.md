# MAGI-OS

> A multi-agent AI operating system inspired by the MAGI supercomputer 
> from Neon Genesis Evangelion.

Three AI agents - MELCHIOR (Logic), BALTHASAR (Emotion), and CASPER (Ethics) - debate every user query in real time. Watch them disagree, argue, and vote.

## Status
> Working on it rn

## Architecture
- **Frontend:** Next.js
- **Backend:** FastAPI
- **Message Broker:** Redis
- **LLM Runtime:** Ollama / OpenAI
- **Deployment:** Docker Compose

## Configuration

Copy `.env.example` to `.env` and choose your LLM provider:

| Provider | Set `LLM_PROVIDER` to | Notes |
|---|---|---|
| Ollama | `ollama` | Requires Ollama installed, no API key needed |
| OpenAI | `api` | Set `API_BASE_URL=https://api.openai.com/v1` |
| Anthropic | `api` | Set `API_BASE_URL=https://api.anthropic.com/v1` |
| Mistral | `api` | Set `API_BASE_URL=https://api.mistral.ai/v1` |
| Groq | `api` | Set `API_BASE_URL=https://api.groq.com/openai/v1` |

## Running Locally
> Will add later

## Acknowledgements
- Inspired by [lordpba/AI_Magi](https://github.com/lordpba/AI_Magi) 
  and [TomaszRewak/MAGI](https://github.com/TomaszRewak/MAGI)
- NERV UI aesthetic by 
  [TheGreatGildo/nerv-ui](https://github.com/TheGreatGildo/nerv-ui)
- Concept from Neon Genesis Evangelion (Gainax/Khara)

## Copyright & Legal

MAGI-PROTOCOL is an independent fan project and is not affiliated with, endorsed by, or connected to Gainax, Khara, or the Neon Genesis Evangelion franchise in any way.

Neon Genesis Evangelion and all related names, characters, and imagery are the intellectual property of Gainax and Khara. No copyright infringement is intended.

All original code in this repository is released under the MIT License. See [LICENSE](./LICENSE) for details.
