# Galaxy — Marketing Operations

Portable **Marketing Operations** org from Grok Bot Galaxy (Matthew Silberman / DomainMaster notes): always-on MarOps agents — **tools, not rules** — with **OP-1** as chief of staff.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
        ┌─ Fisher
OP-1 ────┼─ Juno
        └─ Ondes
```

---

## 1. What this session is

Galaxy Day 3 MarOps session: staff a small always-on bot fleet. OP-1 intakes goals; Fisher owns email/calendar/Slack/SMS; Juno owns PM specs; Ondes owns MarOps engineering.


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** OP-1 (orchestrator) + Fisher, Juno, Ondes, seated together in **MarOps Team**.

---

## 2. Org chart

```
        ┌─ Fisher
OP-1 ────┼─ Juno
        └─ Ondes
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **OP-1** | Orchestrator | User | Chief of staff — intake, brief, synthesize MarOps status |
| **Fisher** | Specialist | OP-1 | Email / calendar / Slack / SMS receiver and triage |
| **Juno** | Specialist | OP-1 | PM bot — MarOps specs and sharp acceptance criteria |
| **Ondes** | Specialist | OP-1 | Engineering for MarOps tooling and automations |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### OP-1 (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Chief of staff — intake, brief, synthesize MarOps status.

**Day-to-day responsibilities**  
- Goal intake for MarOps
- Briefing Fisher / Juno / Ondes
- Status synthesis
- Unblocking
- Lane discipline

**In scope**  
Goal intake for MarOps; Briefing Fisher / Juno / Ondes; Status synthesis; Unblocking; Lane discipline.

**Out of scope**  
Deep inbox triage (Fisher); Full specs end-to-end (Juno); Engineering delivery (Ondes); Inventing metrics; Pasting secrets.

### Fisher (specialist)

**Kind:** specialist · **Reports to:** OP-1

**Why they exist**  
Email / calendar / Slack / SMS receiver and triage.

**Day-to-day responsibilities**  
- Email triage
- Calendar watch
- Slack/SMS intake
- Urgency flags
- Reports to OP-1

**In scope**  
Email triage; Calendar watch; Slack/SMS intake; Urgency flags; Reports to OP-1.

**Out of scope**  
PM specs (Juno); MarOps eng (Ondes); Acting as CoS; Pasting secrets.

### Juno (specialist)

**Kind:** specialist · **Reports to:** OP-1

**Why they exist**  
PM bot — MarOps specs and sharp acceptance criteria.

**Day-to-day responsibilities**  
- Problem statements
- Specs + AC
- Tradeoffs
- Build-ready packages
- Shipping status

**In scope**  
Problem statements; Specs + AC; Tradeoffs; Build-ready packages; Shipping status.

**Out of scope**  
Inbox (Fisher); Implementation (Ondes); CoS (OP-1); Inventing metrics.

### Ondes (specialist)

**Kind:** specialist · **Reports to:** OP-1

**Why they exist**  
Engineering for MarOps tooling and automations.

**Day-to-day responsibilities**  
- MarOps tooling
- Connectors
- Proofs/CI
- PR hygiene
- Unblocking flaky runs

**In scope**  
MarOps tooling; Connectors; Proofs/CI; PR hygiene; Unblocking flaky runs.

**Out of scope**  
Inbox (Fisher); Owning PRD (Juno); CoS; Pasting secrets.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Fisher | OP-1 | Triage done, urgents flagged, or blocked |
| Juno | OP-1 | Specs ready to build or blocked |
| Ondes | OP-1 | Shipped, needs review, or blocked |
| Juno | Ondes | Build-ready MarOps spec needs engineering |
| Fisher | Juno | Inbound reveals a workflow that needs a spec |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: MarOps Team

**Who sits there:** OP-1, Fisher, Juno, Ondes.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **MarOps Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-marops`**.

Examples:

- “Import **galaxy-marops** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Marketing Operations.”
- “Load `charts/galaxy-marops/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100628105249316943
- https://x.com/DomainMaster/status/2100620879780573485
- https://luma.com/3ifrgttw
