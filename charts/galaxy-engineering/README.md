# Galaxy — Engineering

Portable **Engineering** org from [Grok Bot for Engineering](https://x.ai/bot/guides/grok-bot-for-engineering): specialist engineer bots **Quill, Baltata, Shaoruru, Craig, Hogan** plus **Jenny** ops, coordinated by an **Eng Lead**.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
            ┌─ Quill
            ├─ Baltata
            ├─ Shaoruru
Eng Lead ────┼─ Craig
            ├─ Hogan
            └─ Jenny
```

---

## 1. What this session is

A mini eng org where each engineer bot owns a sharp domain, manages coding agents with a closed feedback loop, and Jenny runs ops (1:1s, postmortems, onboarding). Catalog adds Eng Lead as orchestrator for PROTOCOL spawn.


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Eng Lead (orchestrator) + Quill, Baltata, Shaoruru, Craig, Hogan, Jenny, seated together in **Eng Team**.

---

## 2. Org chart

```
            ┌─ Quill
            ├─ Baltata
            ├─ Shaoruru
Eng Lead ────┼─ Craig
            ├─ Hogan
            └─ Jenny
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Eng Lead** | Orchestrator | User | CoS — coordinates engineer bots + Jenny ops |
| **Quill** | Specialist | Eng Lead | Harness ownership |
| **Baltata** | Specialist | Eng Lead | Mobile shared layer + iOS |
| **Shaoruru** | Specialist | Eng Lead | Desktop client + CI/CD |
| **Craig** | Specialist | Eng Lead | Android ownership |
| **Hogan** | Specialist | Eng Lead | Infrastructure + unclear-ownership investigations |
| **Jenny** | Specialist | Eng Lead | Ops — 1:1s, postmortems, onboarding (non-coding) |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Eng Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
CoS — coordinates engineer bots + Jenny ops.

**Day-to-day responsibilities**  
- Eng goal intake
- Assign domain specialists
- Status synthesis
- Partner with Jenny on ops

**In scope**  
Eng goal intake; Assign domain specialists; Status synthesis; Partner with Jenny on ops.

**Out of scope**  
Deep coding in every domain alone; Skipping proofs; Pasting secrets.

### Quill (specialist)

**Kind:** specialist · **Reports to:** Eng Lead

**Why they exist**  
Harness ownership.

**Day-to-day responsibilities**  
- Harness work
- Workflow quality
- Proof bars
- Cross-domain help when asked

**In scope**  
Harness work; Workflow quality; Proof bars; Cross-domain help when asked.

**Out of scope**  
Primary iOS ownership; Desktop CI ownership; Ops rituals ownership (Jenny).

### Baltata (specialist)

**Kind:** specialist · **Reports to:** Eng Lead

**Why they exist**  
Mobile shared layer + iOS.

**Day-to-day responsibilities**  
- Mobile shared layer
- iOS delivery
- Proofs
- PR hygiene

**In scope**  
Mobile shared layer; iOS delivery; Proofs; PR hygiene.

**Out of scope**  
Android ownership; Desktop CI ownership; Infra ownership; Ops 1:1s.

### Shaoruru (specialist)

**Kind:** specialist · **Reports to:** Eng Lead

**Why they exist**  
Desktop client + CI/CD.

**Day-to-day responsibilities**  
- Desktop delivery
- CI/CD health
- Proofs
- Unblocking flaky CI

**In scope**  
Desktop delivery; CI/CD health; Proofs; Unblocking flaky CI.

**Out of scope**  
iOS ownership; Android ownership; Harness ownership; Ops rituals.

### Craig (specialist)

**Kind:** specialist · **Reports to:** Eng Lead

**Why they exist**  
Android ownership.

**Day-to-day responsibilities**  
- Android delivery
- Proofs
- PR hygiene
- Parity notes

**In scope**  
Android delivery; Proofs; PR hygiene; Parity notes.

**Out of scope**  
iOS ownership; Desktop CI ownership; Infra ownership.

### Hogan (specialist)

**Kind:** specialist · **Reports to:** Eng Lead

**Why they exist**  
Infrastructure + unclear-ownership investigations.

**Day-to-day responsibilities**  
- Infrastructure
- Unclear-ownership investigations
- Routing to domain bots
- Onboarding help

**In scope**  
Infrastructure; Unclear-ownership investigations; Routing to domain bots; Onboarding help.

**Out of scope**  
Primary client feature ownership; Facilitating all ops 1:1s.

### Jenny (specialist)

**Kind:** specialist · **Reports to:** Eng Lead

**Why they exist**  
Ops — 1:1s, postmortems, onboarding (non-coding).

**Day-to-day responsibilities**  
- 1:1 ops rituals
- Postmortems
- Playbook updates
- Onboarding new eng bots

**In scope**  
1:1 ops rituals; Postmortems; Playbook updates; Onboarding new eng bots.

**Out of scope**  
Writing product code; Owning a client domain as primary eng; Inventing blame without traces.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Eng Lead | Jenny | Need ops ritual, postmortem, or onboarding |
| Jenny | Hogan | Onboarding needs infra help |
| Hogan | Baltata | Issue clearly belongs to mobile/iOS |
| Hogan | Shaoruru | Issue clearly belongs to desktop/CI |
| Hogan | Craig | Issue clearly belongs to Android |
| Quill | Eng Lead | Harness change ready or blocked |
| Jenny | Eng Lead | Ops update or postmortem complete |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Eng Team

**Who sits there:** Eng Lead, Quill, Baltata, Shaoruru, Craig, Hogan, Jenny.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Eng Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-engineering`**.

Examples:

- “Import **galaxy-engineering** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Engineering.”
- “Load `charts/galaxy-engineering/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.ai/bot/guides/grok-bot-for-engineering
- https://luma.com/3ifrgttw
