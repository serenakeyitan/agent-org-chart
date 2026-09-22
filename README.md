# Agent org chart catalog

A **platform-agnostic catalog** of portable agent organization charts.

People pick which org chart to import. Platforms expose an agent-spawn CLI or command; an agent that can read a chart package can stand that org up on **whatever platform it’s on**. This repo is **not** tied to one product (not Grok Bot–only, not Cursor-only, not a single workflow host).

## What’s here

| Path | Purpose |
| --- | --- |
| [`PROTOCOL.md`](./PROTOCOL.md) | Steps any agent follows to import a chart |
| [`SCHEMA.md`](./SCHEMA.md) | Human explanation of `chart.json` fields |
| [`schemas/org-chart.schema.json`](./schemas/org-chart.schema.json) | Machine schema for chart packages |
| [`charts/INDEX.md`](./charts/INDEX.md) | Table of available charts |
| [`charts/<id>/`](./charts/) | One folder per chart (`chart.json` + docs) |

## How a human picks a chart

1. Open [`charts/INDEX.md`](./charts/INDEX.md).
2. Choose a chart by `id` (e.g. `company-os`).
3. Point your agent at this repo (or that folder) and say which `id` to import — or “spawn Company OS.”

## How an agent / platform imports

1. Follow [`PROTOCOL.md`](./PROTOCOL.md).
2. Load `charts/<id>/chart.json` (see also that folder’s `SPAWN.md` thin wrapper and `ORG_CHART.md`).
3. Use **your platform’s** create-agent / spawn / update-profile / create-channel commands — do not assume tool names from another product.
4. Report created vs reused; ask the user for a first goal. Keep secrets in vault only.

## How to add a new chart

1. Copy `charts/company-os/` to `charts/<new-id>/`.
2. Set `id`, `title`, `summary`, roles, channels, handoffs, and `spawn` in `chart.json` (`schema_version: 1`).
3. Refresh that folder’s `README.md`, `ORG_CHART.md`, and thin `SPAWN.md`.
4. Add a row to [`charts/INDEX.md`](./charts/INDEX.md).
5. Keep personas platform-agnostic (“the user,” not a named person from your own workspace).

## Design principles (shared)

- Scope agents like job descriptions — one lane, clear out-of-scope.
- Hand tools and context, then trust specialists to run.
- Reuse matching agents by name/job; don’t duplicate.
- Secrets stay in vault — never in chat.

## License / ownership

Published as a catalog under [serenakeyitan/agent-org-chart](https://github.com/serenakeyitan/agent-org-chart). Charts are data packages any spawn-capable agent can consume.
