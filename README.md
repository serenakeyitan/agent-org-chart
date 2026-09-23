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
- [Grok Bot Galaxy (Sep 2026)](#grok-bot-galaxy-sep-2026)
- [Galaxy — Marketing Operations](#galaxy-marops)
- [Galaxy — Sales / GTM](#galaxy-sales)
- [Galaxy — Sales Engineering](#galaxy-sales-engineering)
- [Galaxy — SDR](#galaxy-sdr)
- [Galaxy — Customer Support](#galaxy-customer-support)
- [Galaxy — Post-Sales / Customer Success](#galaxy-post-sales)
- [Galaxy — Marketing](#galaxy-marketing)
- [Galaxy — Engineering](#galaxy-engineering)
- [Galaxy — Game Studio (Cupcake / Thursday Arena)](#galaxy-game-studio)
- [Galaxy — Company Build (Day1 potato factory)](#galaxy-company-build)
- [Galaxy — 101](#galaxy-101)
- [Galaxy — Founders](#galaxy-founders)
- [Galaxy — Product (Fly Low)](#galaxy-product)
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

## Grok Bot Galaxy (Sep 2026)

Catalogued from Grok Bot Galaxy livestream sessions (department deep dives + host builds). Each chart is a portable `README.md` + `chart.json` package — **no live bot spawn from this repo**.

### `galaxy-marops`

```
        ┌─ Fisher
OP-1 ────┼─ Juno
        └─ Ondes
```

MarOps fleet: OP-1 CoS + Fisher / Juno / Ondes.

**Import:** tell your agent —

> Import **galaxy-marops** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-marops/README.md`](./charts/galaxy-marops/README.md)  
**Agent package:** [`charts/galaxy-marops/chart.json`](./charts/galaxy-marops/chart.json)

### `galaxy-sales`

```
         ┌─ PG
         ├─ Echo
Olive ────┼─ Customer Expert
         └─ Engineer
```

Sales staff: Olive CoS + PG / Echo / Customer Expert / Engineer.

**Import:** tell your agent —

> Import **galaxy-sales** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-sales/README.md`](./charts/galaxy-sales/README.md)  
**Agent package:** [`charts/galaxy-sales/chart.json`](./charts/galaxy-sales/chart.json)

### `galaxy-sales-engineering`

```
                  ┌─ Mimi
                  ├─ Sherlock
                  ├─ Serena Williams
Sales Eng Lead ────┼─ Battlecard Blair
                  ├─ Demo Drake
                  └─ AI Radar
```

SE fleet: Sales Eng Lead + Mimi / Sherlock / Serena Williams + Blair / Drake / AI Radar.

**Import:** tell your agent —

> Import **galaxy-sales-engineering** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-sales-engineering/README.md`](./charts/galaxy-sales-engineering/README.md)  
**Agent package:** [`charts/galaxy-sales-engineering/chart.json`](./charts/galaxy-sales-engineering/chart.json)

### `galaxy-sdr`

```
               ┌─ Enrichment Scout
Shakespeare ────┼─ VOC Analyst
               └─ Outbound SDR
```

SDR org: Shakespeare CoS + Enrichment Scout / VOC Analyst / Outbound SDR (draft names).

**Import:** tell your agent —

> Import **galaxy-sdr** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-sdr/README.md`](./charts/galaxy-sdr/README.md)  
**Agent package:** [`charts/galaxy-sdr/chart.json`](./charts/galaxy-sdr/chart.json)

### `galaxy-customer-support`

```
                ┌─ Build
                ├─ Reply
Support Lead ────┼─ Alert
                └─ Tune
```

Support: Support Lead + Build / Reply / Alert / Tune.

**Import:** tell your agent —

> Import **galaxy-customer-support** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-customer-support/README.md`](./charts/galaxy-customer-support/README.md)  
**Agent package:** [`charts/galaxy-customer-support/chart.json`](./charts/galaxy-customer-support/chart.json)

### `galaxy-post-sales`

```
       ┌─ Frankie
Gus ────└─ Herbert
```

Post-sales: Gus CoS + Frankie / Herbert.

**Import:** tell your agent —

> Import **galaxy-post-sales** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-post-sales/README.md`](./charts/galaxy-post-sales/README.md)  
**Agent package:** [`charts/galaxy-post-sales/chart.json`](./charts/galaxy-post-sales/chart.json)

### `galaxy-marketing`

```
                  ┌─ Product Marketer
                  ├─ Performance Marketer
Marketing Lead ────┼─ Analyst
                  ├─ Website Ops
                  └─ Product Manager
```

Marketing: Marketing Lead + Product / Performance / Analyst / Website Ops / PM.

**Import:** tell your agent —

> Import **galaxy-marketing** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-marketing/README.md`](./charts/galaxy-marketing/README.md)  
**Agent package:** [`charts/galaxy-marketing/chart.json`](./charts/galaxy-marketing/chart.json)

### `galaxy-engineering`

```
            ┌─ Quill
            ├─ Baltata
            ├─ Shaoruru
Eng Lead ────┼─ Craig
            ├─ Hogan
            └─ Jenny
```

Eng fleet: Eng Lead + Quill / Baltata / Shaoruru / Craig / Hogan + Jenny ops.

**Import:** tell your agent —

> Import **galaxy-engineering** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-engineering/README.md`](./charts/galaxy-engineering/README.md)  
**Agent package:** [`charts/galaxy-engineering/chart.json`](./charts/galaxy-engineering/chart.json)

### `galaxy-game-studio`

```
         ┌─ Bake
         ├─ Glow
Steve ────┼─ Crit
         └─ Tones
```

Game studio: Steve CoS + Bake / Glow / Crit / Tones.

**Import:** tell your agent —

> Import **galaxy-game-studio** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-game-studio/README.md`](./charts/galaxy-game-studio/README.md)  
**Agent package:** [`charts/galaxy-game-studio/chart.json`](./charts/galaxy-game-studio/chart.json)

### `galaxy-company-build`

```
         ┌─ GROCPOT
         ├─ Tater
Steve ────┼─ Hash Brown
         ├─ Marky McMarkface
         └─ Dr. Eggbot
```

Potato factory: Steve + GROCPOT / Tater / Hash Brown / Marky (+ Dr. Eggbot optional).

**Import:** tell your agent —

> Import **galaxy-company-build** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-company-build/README.md`](./charts/galaxy-company-build/README.md)  
**Agent package:** [`charts/galaxy-company-build/chart.json`](./charts/galaxy-company-build/chart.json)

### `galaxy-101`

```
            ┌─ Data Dan
101 Lead ────┼─ Slide Sonya
            └─ Email Ethan
```

101 stub: Data Dan / Slide Sonya / Email Ethan.

**Import:** tell your agent —

> Import **galaxy-101** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-101/README.md`](./charts/galaxy-101/README.md)  
**Agent package:** [`charts/galaxy-101/chart.json`](./charts/galaxy-101/chart.json)

### `galaxy-founders`

```
                 ┌─ Close
                 ├─ Prod
Founders Lead ────┼─ Proto
                 ├─ Yap
                 └─ Misc
```

Founders stub: Close / Prod / Proto / Yap / Misc.

**Import:** tell your agent —

> Import **galaxy-founders** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-founders/README.md`](./charts/galaxy-founders/README.md)  
**Agent package:** [`charts/galaxy-founders/chart.json`](./charts/galaxy-founders/chart.json)

### `galaxy-product`

```
Product Lead ────┌─ Fly Low
```

Product stub: Fly Low cast under Product Lead.

**Import:** tell your agent —

> Import **galaxy-product** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/galaxy-product/README.md`](./charts/galaxy-product/README.md)  
**Agent package:** [`charts/galaxy-product/chart.json`](./charts/galaxy-product/chart.json)

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
