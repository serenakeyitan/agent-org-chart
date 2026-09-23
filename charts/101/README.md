# Grok Bot 101

Portable **Grok Bot 101** org chart from the Day 1 livestream sidebar: two narrowly scoped specialists (**Comma Drafter**, **Slide Maker**) and a **Grok Bot 101** channel. No orchestrator was demonstrated on-stream.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
Comma Drafter
Slide Maker
```

---

## 1. What this chart is

A small, specialist-only org pattern for content and presentation work. Both roles are peers — no orchestrator was visible on-stream.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Comma Drafter + Slide Maker, seated together in **Grok Bot 101**.

---

## 2. Org chart

Two specialists (no orchestrator demonstrated).

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Comma Drafter** | Specialist | — | Drafts written content with attention to grammar and punctuation |
| **Slide Maker** | Specialist | — | Creates and designs presentation slides |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope so work doesn't collapse onto one chat.
2. **Trust after tools** — hand tools, access, and context; then let specialists run. Improve with feedback instead of micromanaging every step.
3. **Vault for secrets** — never paste API keys, tokens, or credentials into chat; use the platform's vault / secure secret flows.
4. **Reuse templates** — prefer focused bots and reusable briefs over bloating a single thread.
5. **Reuse matching agents** — if a teammate already matches a role name/job, reuse and update profile; don't duplicate.

---

## 4. Roles in depth

### Comma Drafter (specialist)

**Kind:** specialist · **Reports to:** —

**Why they exist**  
Content needs attention to grammar, punctuation, and clarity. A dedicated drafter ensures written work is polished before it reaches other outputs.

**Day-to-day responsibilities**  
- Draft written content for various purposes.  
- Edit and refine text for grammar and clarity.  
- Ensure punctuation is correct and consistent.  
- Structure content for readability.

**What good output looks like**  
- Clear, well-structured text.  
- Grammar and punctuation are correct.  
- Content is ready to be used in slides or other formats.

**In scope**  
Content drafting; grammar editing; punctuation review; text structuring; written communication.

**Out of scope**  
Slide creation (Slide Maker); visual design; pasting secrets into chat.

**Hands off to**  
Slide Maker (content ready for slides).

---

### Slide Maker (specialist)

**Kind:** specialist · **Reports to:** —

**Why they exist**  
Presentations need visual design and structure. A dedicated slide maker ensures decks are clean, readable, and communicate ideas effectively.

**Day-to-day responsibilities**  
- Create presentation slides.  
- Design slide layouts and visual hierarchy.  
- Structure presentations for flow and impact.  
- Incorporate content from Comma Drafter.

**What good output looks like**  
- Slides are visually clear and well-structured.  
- Presentations flow logically.  
- Visual hierarchy guides the viewer.

**In scope**  
Slide creation; presentation design; visual layout; slide structuring; incorporating written content.

**Out of scope**  
Written content drafting (Comma Drafter); detailed copywriting; pasting secrets into chat.

**Hands off to**  
Comma Drafter (need content drafted or refined).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Comma Drafter | Slide Maker | Written content ready to be incorporated into slides |
| Slide Maker | Comma Drafter | Need written content drafted or refined |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Grok Bot 101

**Who sits there:** Comma Drafter, Slide Maker.

**How coordination works**  
- Use **Grok Bot 101** for coordination between the two specialists.  
- No orchestrator was demonstrated — both roles are peers.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal (`spawn.do_not_fanout_until_first_goal`).

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`101`**.

Examples:

- "Import **101** from this repo."
- "Follow PROTOCOL.md and spawn the Grok Bot 101 team."
- "Load `charts/101/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 1 livestream sidebar:

- [Day 1 broadcast](https://x.com/i/broadcasts/1AxRnZbVpjaxl)
