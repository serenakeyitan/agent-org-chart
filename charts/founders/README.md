# Founders

Portable **Founders** team org chart from the Day 1 livestream grid: four narrowly scoped specialists (**Product**, **Design**, **Comms**, **Random**) and a **Founders Team** channel. No orchestrator was demonstrated on-stream.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
Product
Design
Comms
Random
```

---

## 1. What this chart is

A small, specialist-only org pattern for founders / startup teams. All roles are peers — no orchestrator was visible on-stream.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Product + Design + Comms + Random, seated together in **Founders Team**.

**Note:** Two additional roles were visible on the Day 1 livestream grid but had truncated labels ("Customer…" and "NOTES H…"). They are omitted from this chart because their full titles could not be verified from the broadcast.

---

## 2. Org chart

Four specialists (no orchestrator demonstrated).

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Product** | Specialist | — | Owns product strategy, vision, and direction |
| **Design** | Specialist | — | Owns visual design, UX, and design systems |
| **Comms** | Specialist | — | Owns communications, messaging, and external voice |
| **Random** | Specialist | — | Handles miscellaneous tasks and ad-hoc needs |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope so work doesn't collapse onto one chat.
2. **Trust after tools** — hand tools, access, and context; then let specialists run. Improve with feedback instead of micromanaging every step.
3. **Vault for secrets** — never paste API keys, tokens, or credentials into chat; use the platform's vault / secure secret flows.
4. **Reuse templates** — prefer focused bots and reusable briefs over bloating a single thread.
5. **Reuse matching agents** — if a teammate already matches a role name/job, reuse and update profile; don't duplicate.

---

## 4. Roles in depth

### Product (specialist)

**Kind:** specialist · **Reports to:** —

**Why they exist**  
Founders need product direction. A dedicated Product specialist ensures vision is clear and guides the team toward delivering real value.

**Day-to-day responsibilities**  
- Define and communicate product vision.  
- Set product direction and strategy.  
- Identify user needs and market opportunities.  
- Guide product decisions and trade-offs.

**What good output looks like**  
- Strategy is clear and actionable.  
- Vision guides the team's work.  
- User needs are well understood.

**In scope**  
Product vision; product strategy; direction setting; user needs analysis; market opportunity identification.

**Out of scope**  
Visual design (Design); communications (Comms); miscellaneous tasks (Random); pasting secrets into chat.

**Hands off to**  
Design (need designs); Comms (need communications).

---

### Design (specialist)

**Kind:** specialist · **Reports to:** —

**Why they exist**  
Founders need visual and UX work. A dedicated Design specialist ensures the product looks good and is easy to use.

**Day-to-day responsibilities**  
- Create visual designs and mockups.  
- Define UX patterns and user flows.  
- Prototype ideas quickly.  
- Collaborate with Product on experience.

**What good output looks like**  
- Designs are clear, consistent, and user-centered.  
- Prototypes communicate ideas effectively.  
- Visual assets are polished.

**In scope**  
Visual design; UX design; prototyping; mockups; user flows; visual assets.

**Out of scope**  
Product strategy (Product); communications (Comms); miscellaneous tasks (Random); pasting secrets into chat.

**Hands off to**  
Product (designs ready for feedback).

---

### Comms (specialist)

**Kind:** specialist · **Reports to:** —

**Why they exist**  
Founders need to communicate externally. A dedicated Comms specialist ensures messaging is clear and consistent.

**Day-to-day responsibilities**  
- Craft messaging and announcements.  
- Manage external communications.  
- Write and edit content.  
- Maintain consistent voice and tone.

**What good output looks like**  
- Messaging is clear, consistent, and on-brand.  
- Communications reach the right audience.  
- Voice is appropriate for context.

**In scope**  
Messaging; announcements; external communications; content writing; voice and tone consistency.

**Out of scope**  
Product strategy (Product); visual design (Design); miscellaneous tasks (Random); pasting secrets into chat.

**Hands off to**  
Product (messaging ready for alignment).

---

### Random (specialist)

**Kind:** specialist · **Reports to:** —

**Why they exist**  
Startups have ad-hoc needs. A dedicated Random specialist handles tasks that don't fit elsewhere, keeping other specialists focused.

**Day-to-day responsibilities**  
- Handle ad-hoc tasks and requests.  
- Support the team with miscellaneous needs.  
- Pick up work that doesn't fit other specialists.  
- Escalate when tasks belong elsewhere.

**What good output looks like**  
- Tasks are completed flexibly and reliably.  
- Work is escalated appropriately when it belongs to another specialist.  
- The team is supported without distracting focused specialists.

**In scope**  
Ad-hoc tasks; miscellaneous needs; flexible support; tasks that don't fit other specialists.

**Out of scope**  
Product strategy (Product); visual design (Design); communications (Comms); pasting secrets into chat.

**Hands off to**  
Product / Design / Comms (when a task belongs to them).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Product | Design | Need designs or visual work |
| Product | Comms | Need communications or announcements |
| Design | Product | Designs ready for product feedback |
| Comms | Product | Messaging ready for product alignment |
| Random | Product | Task belongs to Product |
| Random | Design | Task belongs to Design |
| Random | Comms | Task belongs to Comms |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Founders Team

**Who sits there:** Product, Design, Comms, Random.

**How coordination works**  
- Use **Founders Team** for coordination between specialists.  
- No orchestrator was demonstrated — all roles are peers.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal (`spawn.do_not_fanout_until_first_goal`).

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`founders`**.

Examples:

- "Import **founders** from this repo."
- "Follow PROTOCOL.md and spawn the Founders team."
- "Load `charts/founders/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 1 livestream grid:

- [Day 1 broadcast](https://x.com/i/broadcasts/1AxRnZbVpjaxl)

**Note:** Two roles visible on-stream ("Customer…" and "NOTES H…") had truncated labels and are omitted from this chart. Only fully visible titles are included.
