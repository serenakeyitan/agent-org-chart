# Customer Support

Portable **customer support** org chart from the Day 2 livestream "Meet the team" slide: one orchestrator (**Support Lead**), four narrowly scoped specialists, and a **Support Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                ┌─ Build
                ├─ Reply
Support Lead ────┼─ Alert
                └─ Tune
```

---

## 1. What this chart is

A focused customer support pattern from the "Meet the team" presentation slide: treat each agent like a **job description** (one lane), put a **Support Lead** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

The four specialists map to the on-slide verbs: **Build** (runs setup), **Reply** (answers users), **Alert** (spots issues), **Tune** (improves system).

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Support Lead (orchestrator) + Build + Reply + Alert + Tune, seated together in **Support Team**.

---

## 2. Org chart

Orchestrator + four specialists + Support Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Support Lead** | Orchestrator | User | Coordinate the support team; route work to specialists; synthesize support status |
| **Build** | Specialist | Support Lead | Runs setup workflows and onboarding processes for users |
| **Reply** | Specialist | Support Lead | Answers user questions and handles support tickets |
| **Alert** | Specialist | Support Lead | Spots issues, monitors system health, flags problems early |
| **Tune** | Specialist | Support Lead | Improves system processes and support workflows |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope so work doesn't collapse onto one chat.
2. **Trust after tools** — hand tools, access, and context; then let specialists run. Improve with feedback instead of micromanaging every step.
3. **Vault for secrets** — never paste API keys, tokens, or credentials into chat; use the platform's vault / secure secret flows.
4. **Reuse templates** — prefer focused bots and reusable briefs over bloating a single thread.
5. **Reuse matching agents** — if a teammate already matches a role name/job, reuse and update profile; don't duplicate.

---

## 4. Roles in depth

### Support Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Someone has to turn vague support goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake support goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist (Build vs Reply vs Alert vs Tune).  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **Support Team** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; support status synthesis; unblocking; seating Support Team channel; enforcing lane discipline.

**Out of scope**  
Running setup workflows; answering tickets; monitoring systems; improving processes; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all four.

---

### Build (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
New users need setup. Build owns onboarding workflows: configuring environments, validating setup completion, and ensuring users get up and running smoothly.

**Day-to-day responsibilities**  
- Run user onboarding and setup workflows.  
- Configure environments and initial settings.  
- Validate setup completion and handoff readiness.  
- Document setup procedures and common configurations.  
- Surface setup blockers early.

**What good output looks like**  
- Setups that are complete and validated.  
- Documentation that is reusable.  
- Blockers surfaced before they become crises.

**In scope**  
Setup workflows; user onboarding; environment configuration; initial settings; setup validation; documentation of procedures.

**Out of scope**  
Answering user tickets (Reply); monitoring for issues (Alert); system improvements (Tune); acting as orchestrator; pasting secrets.

**Hands off to**  
Reply (user ready for ongoing support); Support Lead (setup done / blocked).

---

### Reply (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
Users have questions. Reply owns communication: answering questions, resolving tickets, and providing helpful responses that keep users unblocked and satisfied.

**Day-to-day responsibilities**  
- Answer user questions and support tickets.  
- Troubleshoot user issues and provide solutions.  
- Document common questions and answers.  
- Escalate complex issues to appropriate specialists.  
- Track resolution quality and user satisfaction.

**What good output looks like**  
- Responses that are helpful and accurate.  
- Issues resolved or properly escalated.  
- Knowledge base growing with common patterns.

**In scope**  
User communication; ticket resolution; troubleshooting; FAQ documentation; issue escalation; response quality.

**Out of scope**  
Setup workflows (Build); system monitoring (Alert); process improvements (Tune); acting as orchestrator; pasting secrets.

**Hands off to**  
Build (setup issues); Alert (monitoring issues); Tune (process improvements); Support Lead (done / blocked).

---

### Alert (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
Problems caught early are easier to fix. Alert owns issue detection: monitoring system health, spotting problems, and flagging issues before they become user-facing crises.

**Day-to-day responsibilities**  
- Monitor system health and performance.  
- Detect and flag issues early.  
- Track error patterns and anomalies.  
- Alert the team to emerging problems.  
- Document incident patterns for process improvement.

**What good output looks like**  
- Issues caught early.  
- Alerts that are actionable and accurate.  
- Patterns documented for improvement.

**In scope**  
System monitoring; issue detection; error pattern tracking; anomaly detection; incident alerting; pattern documentation.

**Out of scope**  
Setup workflows (Build); answering tickets (Reply); system improvements (Tune); acting as orchestrator; pasting secrets.

**Hands off to**  
Reply (user-facing issue needs communication); Tune (pattern needs process improvement); Support Lead (done / blocked).

---

### Tune (specialist)

**Kind:** specialist · **Reports to:** Support Lead

**Why they exist**  
Good support teams get better over time. Tune owns continuous improvement: analyzing support patterns, improving processes, and optimizing workflows.

**Day-to-day responsibilities**  
- Analyze support patterns and bottlenecks.  
- Recommend process improvements.  
- Optimize support workflows.  
- Track improvement metrics over time.  
- Document best practices and learnings.

**What good output looks like**  
- Improvements that are data-driven and actionable.  
- Recommendations with clear impact.  
- Metrics that show progress over time.

**In scope**  
Process improvement; workflow optimization; pattern analysis; bottleneck identification; metrics tracking; best practice documentation.

**Out of scope**  
Setup workflows (Build); answering tickets (Reply); real-time monitoring (Alert); acting as orchestrator; pasting secrets.

**Hands off to**  
Build (setup improvements); Support Lead (done / blocked with recommendations).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Build | Reply | User setup complete and ready for ongoing support |
| Alert | Reply | User-facing issue detected that needs communication |
| Alert | Tune | Pattern detected that needs process improvement |
| Tune | Build | Setup process improvements ready to implement |
| Build | Support Lead | Blocked, needs tools/access, or done with setup |
| Reply | Support Lead | Blocked, needs tools/access, or done with resolution |
| Alert | Support Lead | Blocked, needs tools/access, or done with monitoring |
| Tune | Support Lead | Blocked, needs tools/access, or done with improvements |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Support Team

**Who sits there:** Support Lead, Build, Reply, Alert, Tune.

**How coordination works**  
- Default: Support Lead briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Support Team** when a goal needs multi-bot discussion (e.g. alert → reply → tune loop in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first support goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`customer-support`**.

Examples:

- "Import **customer-support** from this repo."
- "Follow PROTOCOL.md and spawn the Customer Support team."
- "Load `charts/customer-support/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 2 livestream "Meet the team" presentation slide:

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)
