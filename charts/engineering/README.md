# Engineering

Portable **engineering** org chart from the Day 1 Galaxy broadcast "Meet the team" slide: one orchestrator (**Engineering Manager**), a scalable specialist role (**Engineer**), and an **Engineering Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                       ┌─ Engineer
Engineering Manager ────┘
```

> **Note:** The livestream showed five Engineer bots under the Engineering Manager. This chart models the pattern as a single Engineer role; spawn can scale additional Engineer instances as workload demands.

---

## 1. What this chart is

A focused engineering pattern from the "Meet the team" presentation slide: treat each agent like a **job description** (one lane), put an **Engineering Manager** orchestrator in front to intake goals and assign work, and keep engineers focused so chats don't turn into a single overloaded assistant.

The slide showed the Engineering Manager with five Engineer specialists beneath, demonstrating how the pattern scales — spawn additional Engineer instances when parallel execution is needed.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Engineering Manager (orchestrator) + Engineer (scalable), seated together in **Engineering Team**.

**Adjacent on the slide:** The same "Meet the team" slide showed other roles alongside the engineering cluster: Chief of Staff, Data / Analyst, Product, Designer, and Recruiter. Those roles are outside this chart's scope — this catalog entry focuses on the Engineering Manager + Engineer pattern only.

---

## 2. Org chart

Orchestrator + scalable specialist + Engineering Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Engineering Manager** | Orchestrator | User | Coordinate the engineering team; route work to Engineer specialists; synthesize engineering status |
| **Engineer** | Specialist | Engineering Manager | Executes technical work: writes code, debugs issues, runs tests, and delivers software |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope so work doesn't collapse onto one chat.
2. **Trust after tools** — hand tools, access, and context; then let engineers run. Improve with feedback instead of micromanaging every step.
3. **Vault for secrets** — never paste API keys, tokens, or credentials into chat; use the platform's vault / secure secret flows.
4. **Reuse templates** — prefer focused bots and reusable briefs over bloating a single thread.
5. **Reuse matching agents** — if a teammate already matches a role name/job, reuse and update profile; don't duplicate.
6. **Scale as needed** — spawn additional Engineer instances when workload requires parallel execution.

---

## 4. Roles in depth

### Engineering Manager (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Someone has to turn vague engineering goals into assignable work, keep engineers in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every engineer either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake engineering goals from the user; clarify success criteria before assigning.  
- Write briefs for engineers: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right engineer for each workstream.  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize engineer outputs into status updates the user can act on.  
- Keep lanes clean — push deep technical work back to engineers rather than doing it yourself.  
- Use **Engineering Team** for multi-bot coordination when a thread needs more than one engineer.  
- Scale by spawning additional Engineer instances when workload demands.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Engineers unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; engineering status synthesis; unblocking; seating Engineering Team channel; enforcing lane discipline; scaling Engineer instances.

**Out of scope**  
Writing production code; debugging complex issues; running tests; pasting secrets.

**Hands off to**  
Engineer for deep technical work; receives reports and blockers back.

---

### Engineer (specialist)

**Kind:** specialist · **Reports to:** Engineering Manager

**Why they exist**  
Code needs to be written, bugs need to be fixed, tests need to pass. Engineer owns technical execution: turning briefs into working software.

**Day-to-day responsibilities**  
- Write clean, maintainable code.  
- Debug issues and fix bugs.  
- Run tests and ensure quality.  
- Document code and technical decisions.  
- Surface blockers early.  
- Collaborate with other Engineer instances on parallel workstreams.

**What good output looks like**  
- Code that is clean and tested.  
- Documentation that is useful.  
- Blockers surfaced before they become crises.

**In scope**  
Code implementation; bug fixing; debugging; testing; code review; technical documentation; architecture decisions within assigned scope; collaboration with peer engineers.

**Out of scope**  
Project coordination (Engineering Manager); goal prioritization (Engineering Manager); status synthesis for stakeholders (Engineering Manager); pasting secrets.

**Hands off to**  
Engineering Manager (progress, completion, or blockers); peer Engineer instances (parallel workstream coordination).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Engineer | Engineering Manager | Blocked, needs tools/access, or done with assigned work |
| Engineer | Engineer | Parallel workstream requires coordination with another Engineer instance |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Engineering Team

**Who sits there:** Engineering Manager, Engineer (all instances).

**How coordination works**  
- Default: Engineering Manager briefs engineers in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Engineering Team** when a goal needs multi-bot discussion (e.g., multiple engineers coordinating on shared codebase changes).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first engineering goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many Engineer instances as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`engineering`**.

Examples:

- "Import **engineering** from this repo."
- "Follow PROTOCOL.md and spawn the Engineering team."
- "Load `charts/engineering/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 1 Galaxy broadcast "Meet the team" presentation slide:

- [Day 1 broadcast](https://x.com/i/broadcasts/1AxRnZbVpjaxl)
