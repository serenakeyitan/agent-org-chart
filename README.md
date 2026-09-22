# Company OS — Bot Organization

Portable org chart and spawn playbook for a Grok Bot / multi-agent **company operating system**.

Any agent that can read this repo should be able to recreate the same organization: one orchestrator plus narrowly scoped specialists and a team channel.

## Quick start (for agents)

1. Read [`ORG_CHART.md`](./ORG_CHART.md) for roles and reporting lines.
2. Follow [`SPAWN.md`](./SPAWN.md) to create missing agents, set profiles, and open the team channel.
3. Optionally install the repo skill at [`.cursor/skills/spawn-company-os/SKILL.md`](./.cursor/skills/spawn-company-os/SKILL.md).

## Design principles

- **Scope like a job description** — one bot, one lane; clear in-scope / out-of-scope.
- **Trust after tools + context** — hand access, then let specialists run.
- **Invest and copy** — improve with feedback; reuse templates rather than bloating one chat.
- **Secrets stay in vault** — never paste API keys into chat history.

## Related

- Chat skill (shared across assistants): `sand-workflow:recreate-bot-setup-from-video` — watch a livestream/video and derive a bot team from it.
