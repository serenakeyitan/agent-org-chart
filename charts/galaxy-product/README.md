# Galaxy — Product (Fly Low)

Stub **Product** chart for Galaxy PM / Fly Low cast — draft placeholder under Product Lead.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
Product Lead ────┌─ Fly Low
```

---

## 1. What this session is

Thin stub for Fly Low / PM session cast — refine before production.

> **Stub:** thin roster — expand from session notes before treating as production.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Product Lead (orchestrator) + Fly Low, seated together in **Active Bots**.

---

## 2. Org chart

```
Product Lead ────┌─ Fly Low
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Product Lead** | Orchestrator | User | Orchestrator for Galaxy — Product (Fly Low) |
| **Fly Low** | Specialist | Product Lead | Fly Low (stub lane) |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Product Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Orchestrator for Galaxy — Product (Fly Low).

**Day-to-day responsibilities**  
- Goal intake
- Brief specialists
- Status

**In scope**  
Goal intake; Brief specialists; Status.

**Out of scope**  
Deep invented work; Pasting secrets.

### Fly Low (specialist)

**Kind:** specialist · **Reports to:** Product Lead

**Why they exist**  
Fly Low (stub lane).

**Day-to-day responsibilities**  
- Fly Low lane tasks
- Done/blocked reports

**In scope**  
Fly Low lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Fly Low | Product Lead | Done or blocked |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Active Bots

**Who sits there:** Product Lead, Fly Low.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Active Bots** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-product`**.

Examples:

- “Import **galaxy-product** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Product (Fly Low).”
- “Load `charts/galaxy-product/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://luma.com/3ifrgttw
