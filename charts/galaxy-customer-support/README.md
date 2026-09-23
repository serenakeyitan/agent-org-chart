# Galaxy — Customer Support

Portable **Customer Support** org from Grok Bot Galaxy Day 2 (David Gan / DomainMaster notes): always-on support coworker pattern with Flylo-style maturity roles **Build / Reply / Alert / Tune**, coordinated by a **Support Lead**.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
                ┌─ Build
                ├─ Reply
Support Lead ────┼─ Alert
                └─ Tune
```

---

## 1. What this session is

Support that feels like a coworker: always-on computer + routines, chat-simple, connectors into helpdesks. Maturity lanes: Build (workflows/tooling), Reply (high-confidence answers with citations), Alert (low-confidence / enterprise escalations), Tune (policy and quality loops).


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Support Lead (orchestrator) + Build, Reply, Alert, Tune, seated together in **Support Team**.

---

## 2. Org chart

```
                ┌─ Build
                ├─ Reply
Support Lead ────┼─ Alert
                └─ Tune
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Support Lead** | Orchestrator | User | CoS — coordinates Build / Reply / Alert / Tune |
| **Build** | Specialist | Support Lead | Support workflows, macros, and tooling |
| **Reply** | Specialist | Support Lead | High-confidence replies with cited sources |
| **Alert** | Specialist | Support Lead | Low-confidence / enterprise escalation pings |
| **Tune** | Specialist | Support Lead | Policy and quality tuning loops |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Support Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
CoS — coordinates Build / Reply / Alert / Tune.

**Day-to-day responsibilities**  
- Support goal intake
- Routing across Build/Reply/Alert/Tune
- Queue health status
- Unblocking

**In scope**  
Support goal intake; Routing across Build/Reply/Alert/Tune; Queue health status; Unblocking.

**Out of scope**  
Writing every reply; Building every workflow alone; Inventing refund policy; Pasting secrets.

### Build (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
Support workflows, macros, and tooling.

**Day-to-day responsibilities**  
- Workflows/macros
- Helpdesk connector wiring
- Runbooks
- Handoffs to Reply/Tune

**In scope**  
Workflows/macros; Helpdesk connector wiring; Runbooks; Handoffs to Reply/Tune.

**Out of scope**  
Live customer replies as primary owner; Alert paging ownership; Inventing refund/legal policy.

### Reply (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
High-confidence replies with cited sources.

**Day-to-day responsibilities**  
- High-confidence reply drafts
- Citations
- Confidence scoring
- Escalate low confidence to Alert

**In scope**  
High-confidence reply drafts; Citations; Confidence scoring; Escalate low confidence to Alert.

**Out of scope**  
Workflow engineering (Build); Alert ownership; Inventing policy; Pasting secrets.

### Alert (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
Low-confidence / enterprise escalation pings.

**Day-to-day responsibilities**  
- Escalation detection
- Alert pings
- Open-alert tracking
- Close-the-loop reports

**In scope**  
Escalation detection; Alert pings; Open-alert tracking; Close-the-loop reports.

**Out of scope**  
Primary reply drafting; Workflow engineering; Inventing severity without signals.

### Tune (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
Policy and quality tuning loops.

**Day-to-day responsibilities**  
- QA reviews
- Policy/macro updates
- Quality trend notes
- Announce changes via Support Lead

**In scope**  
QA reviews; Policy/macro updates; Quality trend notes; Announce changes via Support Lead.

**Out of scope**  
Live alert paging ownership; Net-new product engineering; Legal rulings.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Reply | Alert | Low confidence or enterprise lockout risk |
| Alert | Support Lead | Escalation needs user/owner decision |
| Tune | Build | Policy change needs workflow/macro update |
| Tune | Reply | Updated guidance should change reply behavior |
| Build | Support Lead | Workflow shipped or blocked |
| Reply | Support Lead | Reply ready for send policy check or blocked |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Support Team

**Who sits there:** Support Lead, Build, Reply, Alert, Tune.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Support Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-customer-support`**.

Examples:

- “Import **galaxy-customer-support** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Customer Support.”
- “Load `charts/galaxy-customer-support/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100371923238563892
- https://x.com/DomainMaster/status/2100372075974459491
- https://luma.com/3ifrgttw
