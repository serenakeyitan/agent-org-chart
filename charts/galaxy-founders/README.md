# Galaxy — Founders

Stub **Founders** chart from Galaxy Day 1 founders session: Close, Prod, Proto, Yap, Misc lanes under Founders Lead.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
                 ┌─ Close
                 ├─ Prod
Founders Lead ────┼─ Proto
                 ├─ Yap
                 └─ Misc
```

---

## 1. What this session is

Thin stub — expand from Shub Gaur founders session notes.

> **Stub:** thin roster — expand from session notes before treating as production.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Founders Lead (orchestrator) + Close, Prod, Proto, Yap, Misc, seated together in **Active Bots**.

---

## 2. Org chart

```
                 ┌─ Close
                 ├─ Prod
Founders Lead ────┼─ Proto
                 ├─ Yap
                 └─ Misc
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Founders Lead** | Orchestrator | User | Orchestrator for Galaxy — Founders |
| **Close** | Specialist | Founders Lead | Close (stub lane) |
| **Prod** | Specialist | Founders Lead | Prod (stub lane) |
| **Proto** | Specialist | Founders Lead | Proto (stub lane) |
| **Yap** | Specialist | Founders Lead | Yap (stub lane) |
| **Misc** | Specialist | Founders Lead | Misc (stub lane) |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Founders Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Orchestrator for Galaxy — Founders.

**Day-to-day responsibilities**  
- Goal intake
- Brief specialists
- Status

**In scope**  
Goal intake; Brief specialists; Status.

**Out of scope**  
Deep invented work; Pasting secrets.

### Close (specialist)

**Kind:** specialist · **Reports to:** Founders Lead

**Why they exist**  
Close (stub lane).

**Day-to-day responsibilities**  
- Close lane tasks
- Done/blocked reports

**In scope**  
Close lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

### Prod (specialist)

**Kind:** specialist · **Reports to:** Founders Lead

**Why they exist**  
Prod (stub lane).

**Day-to-day responsibilities**  
- Prod lane tasks
- Done/blocked reports

**In scope**  
Prod lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

### Proto (specialist)

**Kind:** specialist · **Reports to:** Founders Lead

**Why they exist**  
Proto (stub lane).

**Day-to-day responsibilities**  
- Proto lane tasks
- Done/blocked reports

**In scope**  
Proto lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

### Yap (specialist)

**Kind:** specialist · **Reports to:** Founders Lead

**Why they exist**  
Yap (stub lane).

**Day-to-day responsibilities**  
- Yap lane tasks
- Done/blocked reports

**In scope**  
Yap lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

### Misc (specialist)

**Kind:** specialist · **Reports to:** Founders Lead

**Why they exist**  
Misc (stub lane).

**Day-to-day responsibilities**  
- Misc lane tasks
- Done/blocked reports

**In scope**  
Misc lane tasks; Done/blocked reports.

**Out of scope**  
Acting as orchestrator; Inventing scope beyond notes.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Close | Founders Lead | Done or blocked |
| Prod | Founders Lead | Done or blocked |
| Proto | Founders Lead | Done or blocked |
| Yap | Founders Lead | Done or blocked |
| Misc | Founders Lead | Done or blocked |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Active Bots

**Who sits there:** Founders Lead, Close, Prod, Proto, Yap, Misc.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Active Bots** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-founders`**.

Examples:

- “Import **galaxy-founders** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Founders.”
- “Load `charts/galaxy-founders/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://luma.com/3ifrgttw
