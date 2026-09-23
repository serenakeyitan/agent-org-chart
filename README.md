# Agent org chart catalog

A **platform-agnostic catalog** of portable agent organization charts.

People pick which org chart to import. Platforms expose an agent-spawn CLI or command; an agent that can read a chart package can stand that org up on **whatever platform it’s on**. This repo is **not** tied to one product (not Grok Bot–only, not Cursor-only, not a single workflow host).

> **Agents:** read [`PROTOCOL.md`](./PROTOCOL.md), pick an `id` from [`charts/INDEX.md`](./charts/INDEX.md), load `charts/<id>/chart.json`. Use your platform’s spawn CLI. Do not assume Grok Bot / Cursor tool names.

## What this repo is

- A **multi-chart** library: each folder under `charts/` is one importable org.
- **Humans** read markdown (this README, each chart’s detailed README).
- **Agents** follow `PROTOCOL.md` and load `charts/<id>/chart.json` — same facts, structured. Do not invent roles from prose beyond what’s in `chart.json`.

## How to pick a chart

1. Open [`charts/INDEX.md`](./charts/INDEX.md).
2. Choose a chart by `id` (e.g. `company-os`).
3. Tell your agent something like: **“Import company-os from this repo”** (or “spawn Company OS”).

## What’s in a chart folder

| File | Audience | Purpose |
| --- | --- | --- |
| `README.md` | Humans | Detailed prose: org story, mermaid, roles in depth, handoffs, how to import |
| `chart.json` | Agents | Source of truth for spawn: roles, personas, channels, handoffs, spawn policy |

No separate SPAWN or ORG_CHART files — that content lives in the chart README (humans) and `chart.json` (agents).

## Catalog layout

| Path | Purpose |
| --- | --- |
| [`PROTOCOL.md`](./PROTOCOL.md) | Steps any agent follows to import a chart |
| [`SCHEMA.md`](./SCHEMA.md) | Human explanation of `chart.json` fields |
| [`schemas/org-chart.schema.json`](./schemas/org-chart.schema.json) | Machine schema for chart packages |
| [`charts/INDEX.md`](./charts/INDEX.md) | Table of available charts |
| [`charts/<id>/`](./charts/) | One folder per chart (`README.md` + `chart.json`) |

## How an agent / platform imports

1. Follow [`PROTOCOL.md`](./PROTOCOL.md).
2. Load `charts/<id>/chart.json` (optionally skim that folder’s `README.md` for human context).
3. Use **your platform’s** create-agent / spawn / update-profile / create-channel commands — do not assume tool names from another product.
4. Report created vs reused; ask the user for a first goal. Keep secrets in vault only.

## How to ask your agent to import

Examples (any platform):

- “Import **company-os** from [this repo](https://github.com/serenakeyitan/agent-org-chart).”
- “Follow PROTOCOL.md and spawn the Company OS chart.”
- “Stand up chart id `company-os` using my platform’s spawn CLI.”

## How to add a new chart

1. Copy `charts/company-os/` to `charts/<new-id>/`.
2. Write a **detailed** `README.md` for humans (mermaid, roles in depth, handoffs, import notes).
3. Set `id`, `title`, `summary`, roles, channels, handoffs, and `spawn` in `chart.json` (`schema_version: 1`). Deepen each `persona` so agents get the same richness as the README.
4. Add a row to [`charts/INDEX.md`](./charts/INDEX.md).
5. Keep personas platform-agnostic (“the user,” not a named person from your own workspace).
6. Do **not** add SPAWN.md or ORG_CHART.md — README + chart.json only.

## Design principles (shared)

- Scope agents like job descriptions — one lane, clear out-of-scope.
- Hand tools and context, then trust specialists to run.
- Reuse matching agents by name/job; don’t duplicate.
- Secrets stay in vault — never in chat.

## License / ownership

Published as a catalog under [serenakeyitan/agent-org-chart](https://github.com/serenakeyitan/agent-org-chart). Charts are data packages any spawn-capable agent can consume.
