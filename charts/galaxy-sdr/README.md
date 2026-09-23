# Galaxy — SDR

Portable **SDR** org from Grok Bot Galaxy Day 2 (Simon Lackowski / DomainMaster notes): CoS-centered SDR maturity — chat copy to copilots that send to end-to-end bot staff. **Shakespeare** is the voice/CoS center.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
               ┌─ Enrichment Scout
Shakespeare ────┼─ VOC Analyst
               └─ Outbound SDR
```

---

## 1. What this session is

Simon SDR loop: prospect ICP from AE wins, ranked prospects, sequencer brain, living ICP skill. Catalog roles: Shakespeare (voice/CoS), Enrichment Scout (Exa/Amplemarket/Sumble-style enrichment), VOC Analyst, Outbound SDR.

> **Draft names:** Enrichment Scout, VOC Analyst, and Outbound SDR are catalog names implied by the session (enrichment/huddle army, VOC/customer insight, outbound). Treat as draft labels — rename to match your workspace without changing lanes.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Shakespeare (orchestrator) + Enrichment Scout, VOC Analyst, Outbound SDR, seated together in **SDR Team**.

---

## 2. Org chart

```
               ┌─ Enrichment Scout
Shakespeare ────┼─ VOC Analyst
               └─ Outbound SDR
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Shakespeare** | Orchestrator | User | Voice / chief of staff for the SDR org |
| **Enrichment Scout** | Specialist | Shakespeare | Enrichment (Exa / Amplemarket / Sumble-style) |
| **VOC Analyst** | Specialist | Shakespeare | VOC / customer insight for SDR messaging |
| **Outbound SDR** | Specialist | Shakespeare | Outbound sequences and sends (policy-gated) |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Shakespeare (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Voice / chief of staff for the SDR org.

**Day-to-day responsibilities**  
- SDR voice/tone
- Daily prospect prioritization
- Briefing specialists
- Status synthesis

**In scope**  
SDR voice/tone; Daily prospect prioritization; Briefing specialists; Status synthesis.

**Out of scope**  
Deep enrichment runs; VOC research dumps; Blasting sequences without review; Pasting secrets.

### Enrichment Scout (specialist)

**Kind:** specialist · **Reports to:** Shakespeare

**Why they exist**  
Enrichment (Exa / Amplemarket / Sumble-style).

**Day-to-day responsibilities**  
- Prospect enrichment
- Structured fields + confidence
- Thin-data flags

**In scope**  
Prospect enrichment; Structured fields + confidence; Thin-data flags.

**Out of scope**  
Final outbound copy ownership; VOC ownership; Acting as CoS; Inventing contacts.

### VOC Analyst (specialist)

**Kind:** specialist · **Reports to:** Shakespeare

**Why they exist**  
VOC / customer insight for SDR messaging.

**Day-to-day responsibilities**  
- VOC mining
- Messaging angles
- Insight briefs

**In scope**  
VOC mining; Messaging angles; Insight briefs.

**Out of scope**  
Enrichment ownership; Sending sequences; Inventing customer quotes.

### Outbound SDR (specialist)

**Kind:** specialist · **Reports to:** Shakespeare

**Why they exist**  
Outbound sequences and sends (policy-gated).

**Day-to-day responsibilities**  
- Outbound drafts/sequences
- Confidence scores
- Unsequence hygiene
- Respect send policy

**In scope**  
Outbound drafts/sequences; Confidence scores; Unsequence hygiene; Respect send policy.

**Out of scope**  
Enrichment ownership; Primary VOC research; Acting as CoS; Sending against policy.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Enrichment Scout | Shakespeare | Enrichment pack ready or thin data |
| VOC Analyst | Shakespeare | Messaging angles ready |
| Shakespeare | Outbound SDR | Brief ready for sequence drafts |
| Outbound SDR | Shakespeare | Drafts ready for voice review or blocked |
| VOC Analyst | Outbound SDR | Angles ready to shape copy (via CoS when needed) |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: SDR Team

**Who sits there:** Shakespeare, Enrichment Scout, VOC Analyst, Outbound SDR.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **SDR Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-sdr`**.

Examples:

- “Import **galaxy-sdr** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — SDR.”
- “Load `charts/galaxy-sdr/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100347921149329857
- https://x.com/DomainMaster/status/2100348031195337180
- https://luma.com/3ifrgttw
