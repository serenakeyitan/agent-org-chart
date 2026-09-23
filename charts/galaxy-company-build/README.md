# Galaxy — Company Build (Day1 potato factory)

Portable **Company Build** org inspired by Galaxy Day 1 potato-factory host builds: **Steve** CoS with implementation, HTML/CSS, PR audit, and research bots — **draft** where roster details are medium-confidence.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
         ┌─ GROCPOT
         ├─ Tater
Steve ────┼─ Hash Brown
         ├─ Marky McMarkface
         └─ Dr. Eggbot
```

---

## 1. What this session is

A scrappy company-build fleet for zero-to-one days: GROCPOT (HTML/CSS), Tater (eng), Hash Brown (PR audit), Marky McMarkface (research), optional Dr. Eggbot (bot factory meta). Medium confidence — tagged draft.

> **Draft / medium confidence:** names and lanes are reconstructed from Galaxy Day 1 potato-factory vibes + later host-build patterns; refine against your own session notes.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Steve (orchestrator) + GROCPOT, Tater, Hash Brown, Marky McMarkface, Dr. Eggbot, seated together in **Company Build**.

---

## 2. Org chart

```
         ┌─ GROCPOT
         ├─ Tater
Steve ────┼─ Hash Brown
         ├─ Marky McMarkface
         └─ Dr. Eggbot
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Steve** | Orchestrator | User | Chief of staff for the potato-factory build |
| **GROCPOT** | Specialist | Steve | HTML/CSS prototype surfaces |
| **Tater** | Specialist | Steve | Engineering for the company build |
| **Hash Brown** | Specialist | Steve | PR audit |
| **Marky McMarkface** | Specialist | Steve | Research |
| **Dr. Eggbot** | Optional Peer | Steve | Bot factory — meta role for spawning templates |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Steve (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Chief of staff for the potato-factory build.

**Day-to-day responsibilities**  
- Build goal intake
- Assign specialists
- Ship status
- Unblocking

**In scope**  
Build goal intake; Assign specialists; Ship status; Unblocking.

**Out of scope**  
Doing all coding alone; Inventing traction metrics; Pasting secrets.

### GROCPOT (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
HTML/CSS prototype surfaces.

**Day-to-day responsibilities**  
- HTML/CSS prototypes
- Visual polish
- Hand-off to eng
- Respond to PR audit

**In scope**  
HTML/CSS prototypes; Visual polish; Hand-off to eng; Respond to PR audit.

**Out of scope**  
Backend ownership; Primary research ownership; Inventing metrics.

### Tater (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
Engineering for the company build.

**Day-to-day responsibilities**  
- Feature eng
- Proofs
- Integrate HTML/CSS
- Status to Steve

**In scope**  
Feature eng; Proofs; Integrate HTML/CSS; Status to Steve.

**Out of scope**  
PR audit ownership; Research ownership; Acting as CoS.

### Hash Brown (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
PR audit.

**Day-to-day responsibilities**  
- PR audit
- Risk/proof flags
- Fix requests
- Audit summaries

**In scope**  
PR audit; Risk/proof flags; Fix requests; Audit summaries.

**Out of scope**  
Primary feature implementation; Research ownership; Acting as CoS.

### Marky McMarkface (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
Research.

**Day-to-day responsibilities**  
- Research briefs
- Citations
- Labeled estimates
- Handoffs to Steve

**In scope**  
Research briefs; Citations; Labeled estimates; Handoffs to Steve.

**Out of scope**  
Primary coding; PR audit ownership; Inventing market sizes.

### Dr. Eggbot (optional peer)

**Kind:** optional peer · **Reports to:** Steve

**Why they exist**  
Bot factory — meta role for spawning templates.

**Day-to-day responsibilities**  
- Template minting/duplication
- Skills/routines sharing notes

**In scope**  
Template minting/duplication; Skills/routines sharing notes.

**Out of scope**  
Replacing domain specialists; Acting as CoS; Pasting secrets.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Marky McMarkface | Steve | Research brief ready |
| GROCPOT | Tater | HTML/CSS ready to wire |
| Tater | Hash Brown | PR ready for audit |
| Hash Brown | Tater | Audit requested fixes |
| Hash Brown | Steve | Audit complete |
| Steve | Dr. Eggbot | Need a new bot template minted (optional) |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Company Build

**Who sits there:** Steve, GROCPOT, Tater, Hash Brown, Marky McMarkface.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Company Build** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-company-build`**.

Examples:

- “Import **galaxy-company-build** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Company Build (Day1 potato factory).”
- “Load `charts/galaxy-company-build/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100030302542283104
- https://x.com/DomainMaster/status/2100621966784745664
- https://luma.com/3ifrgttw
