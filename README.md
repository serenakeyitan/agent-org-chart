# Awesome Agent Org Charts

> check out my recent work at https://opentag.build 🥇

Portable org charts you can import on any agent platform with a spawn CLI.

```
                    ┌─ Market Research
                    ├─ Product Manager
Project Manager ────┼─ People Ops
                    └─ Performance Marketer
```

![Awesome](https://awesome.re/badge.svg)
![Public](https://img.shields.io/badge/catalog-public-lightgrey.svg)

Agent Org Charts⚡️

> A curated catalog of **portable agent organization charts** — pick one, point your agent at the repo, spawn the team. Platform-agnostic. Humans read the chart README; agents follow [`PROTOCOL.md`](./PROTOCOL.md) + `chart.json`.

These charts are field-tested patterns for people who ship with agents: **founders, operators, livestream builders**. Scope bots like job descriptions, put an orchestrator in front, keep specialists in lane.

If you want your agent to stand up a real team instead of one overloaded chat, **this is the repo!**

## Table of Contents

- [Company OS](#company-os)
- [For agents](#for-agents)
- [Add a chart](#add-a-chart)

---

## Company OS

```
                    ┌─ Market Research
                    ├─ Product Manager
Project Manager ────┼─ People Ops
                    └─ Performance Marketer
```

Livestream **Company OS** pattern: one orchestrator, four narrowly scoped specialists, and an **Active Bots** channel for multi-bot coordination. Import it, give a first goal, run the company.

**Roles:** Project Manager (orchestrator) · Market Research · Product Manager · People Ops · Performance Marketer · Active Bots (team channel)

**Import:** tell your agent —

> Import **company-os** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/company-os/README.md`](./charts/company-os/README.md)  
**Agent package:** [`charts/company-os/chart.json`](./charts/company-os/chart.json)

---

## For agents

1. Read [`PROTOCOL.md`](./PROTOCOL.md).
2. Pick an `id` from [`charts/INDEX.md`](./charts/INDEX.md) (or the one the user named).
3. Load `charts/<id>/chart.json` — **source of truth for spawn**. Do not invent roles from prose.
4. Use **your platform’s** create-agent / spawn / channel CLI. Do not assume Grok Bot / Cursor tool names.
5. Report created vs reused; ask for a first goal. Secrets stay in vault only.

Schema notes: [`SCHEMA.md`](./SCHEMA.md) · [`schemas/org-chart.schema.json`](./schemas/org-chart.schema.json)

---

## Add a chart

1. Copy `charts/company-os/` → `charts/<new-id>/`.
2. Write a detailed human `README.md` (lead with a minimal ASCII org chart) + a complete `chart.json`.
3. Save the ASCII chart under [`docs/assets/`](./docs/assets/) (e.g. `docs/assets/<id>-org.txt`) and embed it in a fenced code block in the root README + chart README.
4. Add a TOC row here and a row in [`charts/INDEX.md`](./charts/INDEX.md).
5. Keep personas platform-agnostic (“the user,” not a named person from your workspace).
6. Do **not** add `SPAWN.md` or `ORG_CHART.md` — README + `chart.json` only.

---

Published as a catalog under [serenakeyitan/agent-org-chart](https://github.com/serenakeyitan/agent-org-chart). Charts are data packages any spawn-capable agent can consume.
