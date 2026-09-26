# Awesome Agent Org Charts

> check out my recent work at https://opentag.build

Portable org charts you can import on any agent platform with a spawn CLI. **Pick one focused org** that matches your use case — each chart is a small, importable team pattern.

![Awesome](https://awesome.re/badge.svg)
![Public](https://img.shields.io/badge/catalog-public-lightgrey.svg)

## Table of Contents

- [101](#101) — Grok Bot 101 team
- [Customer Support](#customer-support) — Customer support team
- [Engineering](#engineering) — Engineering team
- [Founders](#founders) — Founders team
- [Game Studio](#game-studio) — Game development studio
- [Marketing](#marketing) — Marketing team
- [MarOps](#marops) — Marketing operations team
- [Post-Sales](#post-sales) — Post-sales team
- [Product](#product) — Product team
- [Sales Engineering](#sales-engineering) — Sales Engineering team
- [SDR](#sdr) — SDR prospecting team
- [For agents](#for-agents)
- [Add a chart](#add-a-chart)

---

## 101

```
Comms Drafter
Slide Maker
```

**Grok Bot 101** from Day 1: two specialists (peers).

**Import:** `Import 101 from https://github.com/serenakeyitan/agent-org-chart`

[`charts/101/`](./charts/101/)

---

## Customer Support

```
Build
Reply
Alert
Tune
```

**Customer support** from Day 2: four specialists (peers).

**Import:** `Import customer-support from https://github.com/serenakeyitan/agent-org-chart`

[`charts/customer-support/`](./charts/customer-support/)

---

## Engineering

```
Engineering Manager
Engineer
```

**Engineering** from Day 1: orchestrator + scalable specialist.

**Import:** `Import engineering from https://github.com/serenakeyitan/agent-org-chart`

[`charts/engineering/`](./charts/engineering/)

---

## Founders

```
Product
Design
Comms
Random
```

**Founders** from Day 1: four specialists (peers).

**Import:** `Import founders from https://github.com/serenakeyitan/agent-org-chart`

[`charts/founders/`](./charts/founders/)

---

## Game Studio

```
Chief of Staff
Creative Director
Founding Engineer
Growth Engineer
3D Prototyping
Image Gen
Game Designer
Designer
Audio Engineer
Intern
Ops
```

**Game studio** from Day 2: orchestrator + ten specialists.

**Import:** `Import game-studio from https://github.com/serenakeyitan/agent-org-chart`

[`charts/game-studio/`](./charts/game-studio/)

---

## Marketing

```
Project Manager
├── Market Researcher
├── Product Marketer
├── Website Ops
├── Performance Marketer
└── Marketing Analyst
```

**Marketing** from Josh Kim session, Galaxy Day 3: orchestrator + five specialists.

**Import:** `Import marketing from https://github.com/serenakeyitan/agent-org-chart`

[`charts/marketing/`](./charts/marketing/)

---

## MarOps

```
Chief of Staff
Data Scientist
GTM
Founding Engineer
Game Designer
```

**MarOps** from Day 3: orchestrator + four specialists.

**Import:** `Import marops from https://github.com/serenakeyitan/agent-org-chart`

[`charts/marops/`](./charts/marops/)

---

## Post-Sales

```
Chief of Staff
Follow Ups
Your voice
Source of truth
Internal radar
One per account
```

**Post-Sales** from Day 3: orchestrator + five specialists; includes routines.

**Import:** `Import post-sales from https://github.com/serenakeyitan/agent-org-chart`

[`charts/post-sales/`](./charts/post-sales/)

---

## Product

```
Chief of Staff
Product
Data / Analyst
Designer
Recruiter
```

**Product** from Day 1: orchestrator + four specialists.

**Import:** `Import product from https://github.com/serenakeyitan/agent-org-chart`

[`charts/product/`](./charts/product/)

---

## Sales Engineering

```
Technical Resource
Customer Expert
Echo
Competitive Intel
```

**Sales Engineering** from Day 2: four specialists (peers).

**Import:** `Import sales-engineering from https://github.com/serenakeyitan/agent-org-chart`

[`charts/sales-engineering/`](./charts/sales-engineering/)

---

## SDR

```
Chief of Staff
├── Outbound: Shakespeare (Email)
├── Research: PLG Bot · Amplemarket Bot · Company Research Bot · Web Search Bot · Voice of the Customer Bot · Usage Bot
└── Simon's Army: Soldier (+ Army Huddle channel)
```

**SDR** from Day 2: orchestrator + eight bots, named as on the livestream sidebar.

**Import:** `Import sdr from https://github.com/serenakeyitan/agent-org-chart`

[`charts/sdr/`](./charts/sdr/)

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

1. Copy an existing chart folder → `charts/<new-id>/`.
2. Write a minimal human `README.md` + a `chart.json`.
3. Add a row to [`charts/INDEX.md`](./charts/INDEX.md) and the TOC above.
4. **Only livestream-demonstrated content belongs.** Third-party note threads, personal insights, and social media citations are banned. Omit `sources` rather than cite unofficial content.
5. Validate against the schema: `cd web && npm run validate`.

---

Job titles as shown on Galaxy livestream Days 1–3; personas/channels stripped for fidelity.

Published as a catalog under [serenakeyitan/agent-org-chart](https://github.com/serenakeyitan/agent-org-chart).

## License

[MIT](./LICENSE)
