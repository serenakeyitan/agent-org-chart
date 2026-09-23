# Awesome Agent Org Charts

> check out my recent work at https://opentag.build

Portable org charts you can import on any agent platform with a spawn CLI. **Pick one focused org** that matches your use case — each chart is a small, importable team pattern.

![Awesome](https://awesome.re/badge.svg)
![Public](https://img.shields.io/badge/catalog-public-lightgrey.svg)

Agent Org Charts

> A curated catalog of **portable agent organization charts** — pick one, point your agent at the repo, spawn the team. Platform-agnostic. Humans read the chart README; agents follow [`PROTOCOL.md`](./PROTOCOL.md) + `chart.json`.

These charts are field-tested patterns for people who ship with agents: **founders, operators, livestream builders**. Scope bots like job descriptions, put an orchestrator in front, keep specialists in lane.

If you want your agent to stand up a real team instead of one overloaded chat, **this is the repo!**

## Table of Contents

- [101](#101) — Grok Bot 101 team
- [Company OS](#company-os) — General company operating system
- [Customer Support](#customer-support) — Customer support team
- [Engineering](#engineering) — Engineering team
- [Founders](#founders) — Founders team
- [Game Studio](#game-studio) — Game development studio
- [GTM](#gtm) — Go-to-market team
- [Marketing](#marketing) — Marketing team
- [Post-Sales](#post-sales) — Post-sales / customer success team
- [Product](#product) — Product team
- [Sales](#sales) — Sales department team
- [SDR](#sdr) — SDR prospecting team
- [For agents](#for-agents)
- [Add a chart](#add-a-chart)

---

## 101

```
Comma Drafter
Slide Maker
```

**Grok Bot 101** pattern from the Day 1 livestream sidebar: two specialists (Comma Drafter, Slide Maker) and a **Grok Bot 101** channel. No orchestrator demonstrated — both roles are peers.

**Roles:** Comma Drafter · Slide Maker · Grok Bot 101 (team channel)

**Import:** tell your agent —

> Import **101** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/101/README.md`](./charts/101/README.md)  
**Agent package:** [`charts/101/chart.json`](./charts/101/chart.json)

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

## Customer Support

```
                ┌─ Build
                ├─ Reply
Support Lead ────┼─ Alert
                └─ Tune
```

**Customer support** pattern from the Day 2 livestream "Meet the team" slide: one orchestrator (Support Lead), four specialists for setup, answers, monitoring, and improvement, plus a **Support Team** channel.

**Roles:** Support Lead (orchestrator) · Build · Reply · Alert · Tune · Support Team (team channel)

**Import:** tell your agent —

> Import **customer-support** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/customer-support/README.md`](./charts/customer-support/README.md)  
**Agent package:** [`charts/customer-support/chart.json`](./charts/customer-support/chart.json)

---

## Engineering

```
                       ┌─ Engineer
Engineering Manager ────┘
```

**Engineering** pattern from the Day 1 Galaxy broadcast "Meet the team" slide: one orchestrator (Engineering Manager), a scalable Engineer specialist role, and an **Engineering Team** channel. The livestream showed five Engineer bots under the manager; this chart models the pattern as a single Engineer role that can be scaled by spawning additional instances.

**Roles:** Engineering Manager (orchestrator) · Engineer · Engineering Team (team channel)

**Import:** tell your agent —

> Import **engineering** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/engineering/README.md`](./charts/engineering/README.md)  
**Agent package:** [`charts/engineering/chart.json`](./charts/engineering/chart.json)

---

## Founders

```
Product
Design
Comms
Random
```

**Founders** pattern from the Day 1 livestream grid: four specialists (Product, Design, Comms, Random) and a **Founders Team** channel. No orchestrator demonstrated — all roles are peers. Two additional roles visible on-stream had truncated labels and are omitted.

**Roles:** Product · Design · Comms · Random · Founders Team (team channel)

**Import:** tell your agent —

> Import **founders** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/founders/README.md`](./charts/founders/README.md)  
**Agent package:** [`charts/founders/chart.json`](./charts/founders/chart.json)

---

## Game Studio

```
               ┌─ Founding Engineer
               ├─ 3D Prototyping
Studio Lead ────┼─ Game Designer
               ├─ Designer
               └─ Audio Engineer
```

**Game studio** pattern from the Day 2 livestream host studio sidebar: one orchestrator (Studio Lead), five specialists for coding, 3D assets, game design, visual design, and audio, plus a **Studio** channel.

**Roles:** Studio Lead (orchestrator) · Founding Engineer · 3D Prototyping · Game Designer · Designer · Audio Engineer · Studio (team channel)

**Import:** tell your agent —

> Import **game-studio** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/game-studio/README.md`](./charts/game-studio/README.md)  
**Agent package:** [`charts/game-studio/chart.json`](./charts/game-studio/chart.json)

---

## GTM

```
                    ┌─ Content
                    ├─ Engineer
                    ├─ Prospecting
Chief of Staff ─────┼─ Forecast
                    ├─ Customer Expert
                    ├─ Travel & Expense
                    └─ Onboarding
```

**Go-to-market** pattern from the Day 2 livestream GTM Team sidebar: one orchestrator (Chief of Staff), seven specialists for content, engineering, prospecting, forecasting, customer expertise, travel/expense, and onboarding, plus a **GTM Team** channel.

**Roles:** Chief of Staff (orchestrator) · Content · Engineer · Prospecting · Forecast · Customer Expert · Travel & Expense · Onboarding · GTM Team (team channel)

**Import:** tell your agent —

> Import **gtm** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/gtm/README.md`](./charts/gtm/README.md)  
**Agent package:** [`charts/gtm/chart.json`](./charts/gtm/chart.json)

---

## Marketing

```
                    ┌─ CTO
                    ├─ Data Scientist
Chief of Staff ─────┼─ Founding Engineer
                    └─ Game Designer
```

**Marketing** pattern from the Day 3 livestream standup UI: one orchestrator (Chief of Staff), four specialists for strategy, analytics, engineering, and creative, plus a **Marketing Team** channel.

**Roles:** Chief of Staff (orchestrator) · CTO · Data Scientist · Founding Engineer · Game Designer · Marketing Team (team channel)

**Import:** tell your agent —

> Import **marketing** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/marketing/README.md`](./charts/marketing/README.md)  
**Agent package:** [`charts/marketing/chart.json`](./charts/marketing/chart.json)

---

## Post-Sales

```
                    ┌─ Follow Ups
                    ├─ Your voice
Chief of Staff ─────┼─ Source of truth
                    ├─ Internal radar
                    └─ One per account
```

**Post-sales / customer success** pattern from the Day 3 livestream "Meet the team" slide: one orchestrator (Chief of Staff), five specialists for follow-ups, customer voice, documentation, internal monitoring, and dedicated account ownership, plus a **Post-Sales Team** channel.

**Roles:** Chief of Staff (orchestrator) · Follow Ups · Your voice · Source of truth · Internal radar · One per account · Post-Sales Team (team channel)

**Import:** tell your agent —

> Import **post-sales** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/post-sales/README.md`](./charts/post-sales/README.md)  
**Agent package:** [`charts/post-sales/chart.json`](./charts/post-sales/chart.json)

---

## Product

```
                  ┌─ Product
                  ├─ Data
                  ├─ Design
Chief of Staff ────┼─ PM
                  ├─ Talent
                  └─ Eng
```

**Product** team pattern from the Day 1 livestream sidebar: one orchestrator (Chief of Staff), six specialists for product strategy, data, design, product management, talent, and engineering, plus a **Product Team** channel.

**Roles:** Chief of Staff (orchestrator) · Product · Data · Design · PM · Talent · Eng · Product Team (team channel)

**Import:** tell your agent —

> Import **product** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/product/README.md`](./charts/product/README.md)  
**Agent package:** [`charts/product/chart.json`](./charts/product/chart.json)

---

## Sales

```
                  ┌─ Sales Manager
Chief of Staff ────┼─ Sales Outbound
                  └─ Coding
```

**Sales department** pattern from the Day 2 livestream sidebar: one orchestrator (Chief of Staff), three specialists for pipeline management, outbound prospecting, and engineering support, plus a **Sales Team** channel.

**Roles:** Chief of Staff (orchestrator) · Sales Manager · Sales Outbound · Coding · Sales Team (team channel)

**Import:** tell your agent —

> Import **sales** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/sales/README.md`](./charts/sales/README.md)  
**Agent package:** [`charts/sales/chart.json`](./charts/sales/chart.json)

---

## SDR

```
                    ┌─ Email Outbound
                    ├─ Enrichment
                    ├─ Company Research
Chief of Staff ─────┼─ Web Search
                    ├─ Voice of Customer
                    ├─ Usage Analyst
                    └─ Pipeline Research
```

**SDR prospecting** pattern from the Day 2 livestream bot sidebar: one orchestrator (Chief of Staff), seven specialists for outbound, enrichment, research, and analysis, plus an **SDR Team** channel.

**Roles:** Chief of Staff (orchestrator) · Email Outbound · Enrichment · Company Research · Web Search · Voice of Customer · Usage Analyst · Pipeline Research · SDR Team (team channel)

**Import:** tell your agent —

> Import **sdr** from https://github.com/serenakeyitan/agent-org-chart

**Human deep dive:** [`charts/sdr/README.md`](./charts/sdr/README.md)  
**Agent package:** [`charts/sdr/chart.json`](./charts/sdr/chart.json)

---

## For agents

1. Read [`PROTOCOL.md`](./PROTOCOL.md).
2. Pick an `id` from [`charts/INDEX.md`](./charts/INDEX.md) (or the one the user named).
3. Load `charts/<id>/chart.json` — **source of truth for spawn**. Do not invent roles from prose.
4. Use **your platform's** create-agent / spawn / channel CLI. Do not assume specific tool names.
5. Report created vs reused; ask for a first goal. Secrets stay in vault only.

Schema notes: [`SCHEMA.md`](./SCHEMA.md) · [`schemas/org-chart.schema.json`](./schemas/org-chart.schema.json)

---

## Add a chart

1. Copy `charts/company-os/` → `charts/<new-id>/`.
2. Write a detailed human `README.md` (lead with a minimal ASCII org chart) + a complete `chart.json`.
3. Save the ASCII chart under [`docs/assets/`](./docs/assets/) (e.g. `docs/assets/<id>-org.txt`) and embed it in a fenced code block in the root README + chart README.
4. Add a TOC row here and a row in [`charts/INDEX.md`](./charts/INDEX.md).
5. Keep personas platform-agnostic ("the user," not a named person from your workspace).
6. Do **not** add `SPAWN.md` or `ORG_CHART.md` — README + `chart.json` only.
7. **Only livestream-demonstrated content belongs.** Third-party note threads, personal insights, and social media citations are banned. Omit `sources` rather than cite unofficial content.

---

Published as a catalog under [serenakeyitan/agent-org-chart](https://github.com/serenakeyitan/agent-org-chart). Charts are data packages any spawn-capable agent can consume.
