# Galaxy — 101

Stub **Grok Bot 101** chart: starter demo roles **Data Dan**, **Slide Sonya**, **Email Ethan** under a thin 101 Lead.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
            ┌─ Data Dan
101 Lead ────┼─ Slide Sonya
            └─ Email Ethan
```

---

## 1. What this session is

Galaxy Day 1 Grok Bot 101 pattern — short stub for catalog completeness.

> **Stub:** thin roster — expand from session notes before treating as production.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** 101 Lead (orchestrator) + Data Dan, Slide Sonya, Email Ethan, seated together in **Active Bots**.

---

## 2. Org chart

```
            ┌─ Data Dan
101 Lead ────┼─ Slide Sonya
            └─ Email Ethan
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **101 Lead** | Orchestrator | User | Orchestrator for Galaxy — 101 |
| **Data Dan** | Specialist | 101 Lead | Data Dan (stub lane) |
| **Slide Sonya** | Specialist | 101 Lead | Slide Sonya (stub lane) |
| **Email Ethan** | Specialist | 101 Lead | Email Ethan (stub lane) |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### 101 Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Orchestrator for Galaxy — 101.

**Day-to-day responsibilities**  
- Goal intake
- Brief specialists
- Status

**In scope**  
Goal intake; Brief specialists; Status.

**Out of scope**  
Deep invented work; Pasting secrets.

### Data Dan (specialist)

**Kind:** specialist · **Reports to:** 101 Lead

**Why they exist**  
Data Dan (stub lane).

**Day-to-day responsibilities**  
- Data Dan lane tasks
- Done/blocked reports

**In scope**  
Data Dan lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

### Slide Sonya (specialist)

**Kind:** specialist · **Reports to:** 101 Lead

**Why they exist**  
Slide Sonya (stub lane).

**Day-to-day responsibilities**  
- Slide Sonya lane tasks
- Done/blocked reports

**In scope**  
Slide Sonya lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

### Email Ethan (specialist)

**Kind:** specialist · **Reports to:** 101 Lead

**Why they exist**  
Email Ethan (stub lane).

**Day-to-day responsibilities**  
- Email Ethan lane tasks
- Done/blocked reports

**In scope**  
Email Ethan lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Data Dan | 101 Lead | Done or blocked |
| Slide Sonya | 101 Lead | Done or blocked |
| Email Ethan | 101 Lead | Done or blocked |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Active Bots

**Who sits there:** 101 Lead, Data Dan, Slide Sonya, Email Ethan.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Active Bots** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-101`**.

Examples:

- “Import **galaxy-101** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — 101.”
- “Load `charts/galaxy-101/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://luma.com/3ifrgttw
