# Galaxy — Sales / GTM

Portable **Sales / GTM** org from Grok Bot Galaxy Day 2 (DomainMaster notes on Krista Letts + Mark Wright): **Olive** as chief of staff — staff of specialists, not chat babysitting.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
         ┌─ PG
         ├─ Echo
Olive ────┼─ Customer Expert
         └─ Engineer
```

---

## 1. What this session is

Olive runs morning prep, inbox, and draft emails; PG owns CRM/intent/outreach; Echo builds live decks from meeting notes; Customer Expert and Engineer cover on-call answers in live deals.


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Olive (orchestrator) + PG, Echo, Customer Expert, Engineer, seated together in **Sales Team**.

---

## 2. Org chart

```
         ┌─ PG
         ├─ Echo
Olive ────┼─ Customer Expert
         └─ Engineer
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Olive** | Orchestrator | User | Chief of staff — morning prep, inbox, draft emails |
| **PG** | Specialist | Olive | CRM / intent / outreach owner |
| **Echo** | Specialist | Olive | Live deck from meeting notes |
| **Customer Expert** | Specialist | Olive | Product/customer answers for live deals |
| **Engineer** | Specialist | Olive | On-call technical answers for sales |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Olive (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Chief of staff — morning prep, inbox, draft emails.

**Day-to-day responsibilities**  
- Morning prep
- Inbox + draft emails
- Assign specialists
- Deal status synthesis
- Unblocking

**In scope**  
Morning prep; Inbox + draft emails; Assign specialists; Deal status synthesis; Unblocking.

**Out of scope**  
Deep CRM (PG); Deck production (Echo); Deep product answers alone; Deep eng alone; Pasting secrets.

### PG (specialist)

**Kind:** specialist · **Reports to:** Olive

**Why they exist**  
CRM / intent / outreach owner.

**Day-to-day responsibilities**  
- CRM hygiene
- Intent review
- Outreach drafts
- Pipeline notes

**In scope**  
CRM hygiene; Intent review; Outreach drafts; Pipeline notes.

**Out of scope**  
CoS (Olive); Decks (Echo); Inventing metrics; Pasting secrets.

### Echo (specialist)

**Kind:** specialist · **Reports to:** Olive

**Why they exist**  
Live deck from meeting notes.

**Day-to-day responsibilities**  
- Live decks from notes
- Slide narrative
- Approved asset pulls
- Revision loops

**In scope**  
Live decks from notes; Slide narrative; Approved asset pulls; Revision loops.

**Out of scope**  
CRM (PG); CoS; Inventing proof; Pasting secrets.

### Customer Expert (specialist)

**Kind:** specialist · **Reports to:** Olive

**Why they exist**  
Product/customer answers for live deals.

**Day-to-day responsibilities**  
- Deal Q&A
- Cited answers
- Uncertainty flags
- Handoff to Engineer

**In scope**  
Deal Q&A; Cited answers; Uncertainty flags; Handoff to Engineer.

**Out of scope**  
Deep eng debug; CRM ownership; CoS; Inventing compliance.

### Engineer (specialist)

**Kind:** specialist · **Reports to:** Olive

**Why they exist**  
On-call technical answers for sales.

**Day-to-day responsibilities**  
- On-call tech answers
- Evidence packs
- Confidence labels
- SE escalation flags

**In scope**  
On-call tech answers; Evidence packs; Confidence labels; SE escalation flags.

**Out of scope**  
CRM; Decks; CoS; Inventing SLAs.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| PG | Olive | Pipeline update, outreach ready, or blocked |
| Echo | Olive | Deck ready or missing assets |
| Customer Expert | Engineer | Needs technical depth |
| Customer Expert | Olive | Answer ready or needs user decision |
| Engineer | Olive | Technical answer ready or blocked |
| Olive | Echo | Meeting notes ready for a live deck |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Sales Team

**Who sits there:** Olive, PG, Echo, Customer Expert, Engineer.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Sales Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-sales`**.

Examples:

- “Import **galaxy-sales** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Sales / GTM.”
- “Load `charts/galaxy-sales/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100317968676913462
- https://luma.com/3ifrgttw
