# Galaxy — Post-Sales / Customer Success

Portable **Post-Sales / Customer Success** org from Grok Bot Galaxy Day 3 (Blake Schuller / DomainMaster notes): **Gus** as CoS with **Frankie** on follow-ups and **Herbert**-style account watchers.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
       ┌─ Frankie
Gus ────└─ Herbert
```

---

## 1. What this session is

Customer success maturity with a CoS plus specialists: Frankie owns follow-up loops; Herbert watches accounts for risk/expansion signals; Gus coordinates and synthesizes CS health for the user.


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Gus (orchestrator) + Frankie, Herbert, seated together in **Post-Sales Team**.

---

## 2. Org chart

```
       ┌─ Frankie
Gus ────└─ Herbert
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Gus** | Orchestrator | User | Chief of staff for post-sales / CS |
| **Frankie** | Specialist | Gus | Follow-ups owner |
| **Herbert** | Specialist | Gus | Account watchers — risk and expansion signals |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Gus (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Chief of staff for post-sales / CS.

**Day-to-day responsibilities**  
- CS goal intake
- Assign Frankie/Herbert
- CS health synthesis
- Unblocking

**In scope**  
CS goal intake; Assign Frankie/Herbert; CS health synthesis; Unblocking.

**Out of scope**  
Doing every follow-up alone; Watching every account alone; Inventing NRR; Pasting secrets.

### Frankie (specialist)

**Kind:** specialist · **Reports to:** Gus

**Why they exist**  
Follow-ups owner.

**Day-to-day responsibilities**  
- Follow-up tracking
- Draft follow-ups
- Close-the-loop proofs
- Escalate stuck threads

**In scope**  
Follow-up tracking; Draft follow-ups; Close-the-loop proofs; Escalate stuck threads.

**Out of scope**  
Account watching ownership; Acting as CoS; Inventing customer commitments.

### Herbert (specialist)

**Kind:** specialist · **Reports to:** Gus

**Why they exist**  
Account watchers — risk and expansion signals.

**Day-to-day responsibilities**  
- Account health monitoring
- Churn/expansion flags
- Evidence briefs to Gus
- Coordinate follow-ups with Frankie

**In scope**  
Account health monitoring; Churn/expansion flags; Evidence briefs to Gus; Coordinate follow-ups with Frankie.

**Out of scope**  
Owning all follow-up sends; Acting as CoS; Inventing revenue metrics.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Herbert | Gus | Risk/expansion signal needs attention |
| Herbert | Frankie | Account signal should trigger a follow-up |
| Frankie | Gus | Follow-ups done, stuck, or need user voice |
| Gus | Frankie | Assigning a follow-up brief |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Post-Sales Team

**Who sits there:** Gus, Frankie, Herbert.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Post-Sales Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-post-sales`**.

Examples:

- “Import **galaxy-post-sales** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Post-Sales / Customer Success.”
- “Load `charts/galaxy-post-sales/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100684546173698547
- https://luma.com/3ifrgttw
