# Sales

Portable **sales department** org chart from the Day 2 livestream sidebar: one orchestrator (**Chief of Staff**), three narrowly scoped specialists, and a **Sales Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                  ┌─ Sales Manager
Chief of Staff ────┼─ Sales Outbound
                  └─ Coding
```

---

## 1. What this chart is

A focused sales org pattern: treat each agent like a **job description** (one lane), put a **Chief of Staff** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Chief of Staff (orchestrator) + Sales Manager + Sales Outbound + Coding, seated together in **Sales Team**.

---

## 2. Org chart

Orchestrator + three specialists + Sales Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Chief of Staff** | Orchestrator | User | Coordinate the sales team; route goals to specialists; synthesize pipeline status |
| **Sales Manager** | Specialist | Chief of Staff | Pipeline management, quota tracking, rep coordination |
| **Sales Outbound** | Specialist | Chief of Staff | Outbound prospecting, lead generation, outreach campaigns |
| **Coding** | Specialist | Chief of Staff | Engineering support for sales tooling and integrations |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope so work doesn't collapse onto one chat.
2. **Trust after tools** — hand tools, access, and context; then let specialists run. Improve with feedback instead of micromanaging every step.
3. **Vault for secrets** — never paste API keys, tokens, or credentials into chat; use the platform's vault / secure secret flows.
4. **Reuse templates** — prefer focused bots and reusable briefs over bloating a single thread.
5. **Reuse matching agents** — if a teammate already matches a role name/job, reuse and update profile; don't duplicate.

---

## 4. Roles in depth

### Chief of Staff (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Someone has to turn vague sales goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake sales goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist (Sales Manager vs Sales Outbound vs Coding).  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **Sales Team** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; pipeline status synthesis; unblocking; seating Sales Team channel; enforcing lane discipline.

**Out of scope**  
Running outbound campaigns; managing quotas and reps directly; writing sales tooling code; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all three.

---

### Sales Manager (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
The pipeline needs an owner: tracking opportunities, managing quotas, coordinating reps, and surfacing pipeline health so the team can hit targets.

**Day-to-day responsibilities**  
- Pipeline tracking and opportunity management.  
- Quota tracking and forecasting.  
- Rep coordination and deal support.  
- Pipeline health reports with risks and recommendations.  
- Win/loss analysis and sales process optimization.

**What good output looks like**  
- Pipeline reports that are accurate and actionable.  
- Forecasts grounded in real data.  
- Clear handoffs for prospecting needs.

**In scope**  
Pipeline management; quota tracking; forecasting; rep coordination; deal support; pipeline health reporting; opportunity prioritization.

**Out of scope**  
Outbound prospecting (Sales Outbound); writing code or integrations (Coding); legal advice on contracts; pasting secrets into chat.

**Hands off to**  
Sales Outbound (need more leads); Coding (tooling needs); Chief of Staff (done / blocked).

---

### Sales Outbound (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
The top of funnel needs dedicated attention: lead research, outreach campaigns, and prospecting to fill the pipeline with qualified opportunities.

**Day-to-day responsibilities**  
- Lead research and list building.  
- Outreach campaign design and execution.  
- Cold email and messaging sequences.  
- Prospecting metrics and conversion tracking.  
- Lead qualification before handing to Sales Manager.

**What good output looks like**  
- Outreach that is personalized and relevant.  
- Metrics tracked and reported.  
- Qualified leads ready for pipeline.

**In scope**  
Lead research; list building; outreach campaigns; cold email sequences; prospecting metrics; lead qualification; top-of-funnel activities.

**Out of scope**  
Pipeline management and quota tracking (Sales Manager); writing code or integrations (Coding); closing deals; legal advice; pasting secrets into chat.

**Hands off to**  
Sales Manager (qualified leads); Coding (automation needs); Chief of Staff (done / blocked).

---

### Coding (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Sales teams need engineering support: tooling, integrations, automations, and technical solutions that help the team sell more effectively.

**Day-to-day responsibilities**  
- Sales tool development and maintenance.  
- CRM integrations and data pipelines.  
- Automation scripts for sales workflows.  
- Technical support for sales demos.  
- Debug and fix sales-related technical issues.

**What good output looks like**  
- Code that is clean, tested, and documented.  
- Integrations that are reliable and maintainable.  
- Technical blockers surfaced early.

**In scope**  
Sales tooling development; CRM integrations; automation scripts; data pipelines; technical demo support; sales workflow automation; debugging technical issues.

**Out of scope**  
Pipeline management (Sales Manager); outbound prospecting (Sales Outbound); sales strategy decisions; legal advice; pasting secrets into chat.

**Hands off to**  
Chief of Staff (deliverables ready / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Sales Outbound | Sales Manager | Qualified leads ready for pipeline |
| Sales Manager | Sales Outbound | Need more leads or prospecting support |
| Sales Manager | Coding | Need tooling, integrations, or technical support |
| Sales Outbound | Coding | Need automation or outreach tooling |
| Sales Manager | Chief of Staff | Blocked, needs tools/access, or done with a report |
| Sales Outbound | Chief of Staff | Blocked, needs tools/access, or done with a report |
| Coding | Chief of Staff | Blocked, needs tools/access, or done with deliverables |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Sales Team

**Who sits there:** Chief of Staff, Sales Manager, Sales Outbound, Coding.

**How coordination works**  
- Default: Chief of Staff briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Sales Team** when a goal needs multi-bot discussion (e.g. lead qualification → pipeline strategy → tooling needs in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first sales goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`sales`**.

Examples:

- "Import **sales** from this repo."
- "Follow PROTOCOL.md and spawn the Sales team."
- "Load `charts/sales/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 2 livestream sidebar:

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)
