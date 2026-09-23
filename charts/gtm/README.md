# GTM

Portable **go-to-market** org chart from the Day 2 livestream **GTM Team** sidebar: one orchestrator (**Chief of Staff**), seven narrowly scoped specialists, and a **GTM Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                    ┌─ Content
                    ├─ Engineer
                    ├─ Prospecting
Chief of Staff ─────┼─ Forecast
                    ├─ Customer Expert
                    ├─ Travel & Expense
                    └─ Onboarding
```

---

## 1. What this chart is

A focused GTM org pattern: treat each agent like a **job description** (one lane), put a **Chief of Staff** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Chief of Staff (orchestrator) + Content + Engineer + Prospecting + Forecast + Customer Expert + Travel & Expense + Onboarding, seated together in **GTM Team**.

> **Naming notes:** On-screen labels sometimes include nickname prefixes (e.g. "PG Prospecting", "Echo (onboarding)"). This catalog uses **job titles only** — **Prospecting** and **Onboarding**. An "X bot" sidebar item was **omitted** because it is not a clear job title.

---

## 2. Org chart

Orchestrator + seven specialists + GTM Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Chief of Staff** | Orchestrator | User | Coordinate the GTM team; route goals to specialists; synthesize go-to-market status |
| **Content** | Specialist | Chief of Staff | GTM content, messaging, and enablement assets |
| **Engineer** | Specialist | Chief of Staff | Engineering support for GTM tooling and integrations |
| **Prospecting** | Specialist | Chief of Staff | Outbound prospecting, lead generation, and outreach |
| **Forecast** | Specialist | Chief of Staff | Revenue and pipeline forecasting for GTM |
| **Customer Expert** | Specialist | Chief of Staff | Customer expertise, account guidance, and product-market insight |
| **Travel & Expense** | Specialist | Chief of Staff | Travel planning and expense operations for GTM |
| **Onboarding** | Specialist | Chief of Staff | Customer onboarding programs and activation |

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
Someone has to turn vague GTM goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake GTM goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist for each lane.  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **GTM Team** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; GTM status synthesis; unblocking; seating GTM Team channel; enforcing lane discipline.

**Out of scope**  
Writing content assets; building GTM tooling; running prospecting; owning forecasts; deep customer expertise; travel/expense ops; onboarding programs; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all seven.

---

### Content (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
GTM needs clear messaging and reusable enablement assets so prospecting, onboarding, and customer conversations stay on-narrative.

**Day-to-day responsibilities**  
- Draft and refine GTM messaging and narratives.  
- Produce collateral and enablement assets.  
- Support Prospecting and Onboarding with copy and templates.  
- Keep brand and product story consistent across GTM surfaces.

**What good output looks like**  
- Content that is clear, on-message, and reusable.  
- Templates Prospecting and Onboarding can ship without rewriting from scratch.

**In scope**  
Messaging; collateral; enablement assets; copy templates; content consistency across GTM surfaces.

**Out of scope**  
Building tools (Engineer); running prospecting (Prospecting); forecasts (Forecast); deep account expertise (Customer Expert); travel/expense (Travel & Expense); owning onboarding execution (Onboarding); pasting secrets.

**Hands off to**  
Prospecting (outreach-ready copy); Onboarding (materials); Engineer (tooling); Chief of Staff (done / blocked).

---

### Engineer (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
GTM teams need engineering support: tooling, integrations, automations, and technical solutions that help the team execute.

**Day-to-day responsibilities**  
- GTM tool development and maintenance.  
- CRM and data integrations.  
- Automation scripts for GTM workflows.  
- Technical support for demos and enablement.  
- Debug and fix GTM-related technical issues.

**What good output looks like**  
- Code that is clean, tested, and documented.  
- Integrations that are reliable and maintainable.  
- Technical blockers surfaced early.

**In scope**  
GTM tooling; integrations; automations; data pipelines; demo tech support; debugging technical issues.

**Out of scope**  
Writing GTM content; running prospecting; owning forecasts; customer expertise guidance; travel/expense ops; onboarding program ownership; pasting secrets.

**Hands off to**  
Chief of Staff (deliverables ready / blocked).

---

### Prospecting (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
The top of funnel needs dedicated attention: lead research, outreach, and prospecting so Forecast and Customer Expert have real pipeline to work from.

**Day-to-day responsibilities**  
- Lead research and list building.  
- Outreach campaign design and execution.  
- Messaging sequences using Content assets where available.  
- Prospecting metrics and conversion tracking.  
- Hand qualified leads toward Customer Expert; feed Forecast with pipeline inputs.

**What good output looks like**  
- Outreach that is personalized and relevant.  
- Metrics tracked and reported.  
- Qualified leads ready for deeper GTM work.

**In scope**  
Lead research; list building; outreach campaigns; messaging sequences; prospecting metrics; lead qualification; top-of-funnel generation.

**Out of scope**  
Long-form content ownership (Content); building tooling (Engineer); owning forecasts (Forecast); deep post-sale expertise (Customer Expert); travel/expense; onboarding ownership; pasting secrets.

**Hands off to**  
Customer Expert (qualified leads); Forecast (pipeline inputs); Engineer (automation); Content (copy needs); Chief of Staff (done / blocked).

---

### Forecast (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
GTM planning needs an owner for pipeline projections, revenue outlook, and forecast hygiene so the user can make clear decisions.

**Day-to-day responsibilities**  
- Build and maintain pipeline and revenue forecasts.  
- Track forecast accuracy and variance.  
- Surface risks, slips, and upside.  
- Align inputs with Prospecting and Customer Expert.  
- Deliver forecast briefs the user can act on.

**What good output looks like**  
- Forecasts grounded in data — no invented metrics.  
- Risks and upside called out explicitly.

**In scope**  
Pipeline forecasting; revenue outlook; forecast hygiene; variance analysis; risk and upside reporting; forecast briefs.

**Out of scope**  
Writing content; building tooling; running prospecting; deep customer guidance; travel/expense; onboarding programs; pasting secrets.

**Hands off to**  
Engineer (tooling); Chief of Staff (done / blocked). Pulls inputs from Prospecting and Customer Expert.

---

### Customer Expert (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Prospecting, Content, and Onboarding need accurate product-market and account guidance so GTM stays customer-true.

**Day-to-day responsibilities**  
- Answer product and customer questions for the GTM team.  
- Provide account guidance and objection handling.  
- Surface voice-of-customer and product-market insights.  
- Support Onboarding with accurate customer expectations.  
- Feed Forecast with qualitative deal/account risk signals.

**What good output looks like**  
- Guidance that is accurate and actionable.  
- Insights that cite real customer context when available.

**In scope**  
Customer expertise; account guidance; objection handling; product-market insight; enablement for Prospecting and Onboarding; qualitative risk signals for Forecast.

**Out of scope**  
Owning all content production; building tooling; running prospecting campaigns; owning numeric forecasts; travel/expense; owning the full onboarding program; pasting secrets.

**Hands off to**  
Onboarding (expectations); Forecast (risk signals); Content (VoC for messaging); Chief of Staff (done / blocked).

---

### Travel & Expense (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Field and customer-facing GTM work needs travel planning and expense ops so logistics do not block the rest of the team.

**Day-to-day responsibilities**  
- Plan and coordinate GTM-related travel.  
- Track expenses and support reimbursement workflows.  
- Flag policy or budget issues early.  
- Keep spend summaries clear for the user and Chief of Staff.

**What good output looks like**  
- Plans and expense summaries that are accurate and policy-aware.  
- Budget or policy issues flagged early.

**In scope**  
Travel planning; expense tracking; policy-aligned spend guidance; trip logistics; spend summaries and blockers.

**Out of scope**  
Writing content; building tooling (except via handoff); running prospecting; owning forecasts; customer expertise; onboarding ownership; pasting secrets.

**Hands off to**  
Engineer (automation needs); Chief of Staff (done / blocked).

---

### Onboarding (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Wins need a clean handoff to first value: activation plans, checklists, and ramp so new customers succeed.

**Day-to-day responsibilities**  
- Design and run onboarding programs.  
- Maintain checklists and activation milestones.  
- Coordinate with Customer Expert for accurate expectations.  
- Use Content assets for onboarding materials.  
- Hand tooling needs to Engineer.

**What good output looks like**  
- Onboarding plans that are clear, milestone-based, and customer-true.  
- Status that names stage, blockers, and next activation step.

**In scope**  
Onboarding program design; activation milestones; checklists; new-customer ramp plans; onboarding status reporting.

**Out of scope**  
Owning all content production; building tooling; running prospecting; owning forecasts; replacing Customer Expert; travel/expense; pasting secrets.

**Hands off to**  
Customer Expert (deeper expertise); Engineer (tooling); Chief of Staff (done / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Content | Prospecting | Outreach copy or enablement assets ready for prospecting |
| Content | Onboarding | Onboarding materials or templates ready |
| Prospecting | Customer Expert | Qualified leads need account or product expertise |
| Prospecting | Forecast | Pipeline inputs ready for forecast update |
| Customer Expert | Onboarding | Customer expectations and guidance ready for onboarding |
| Customer Expert | Forecast | Qualitative deal or account risk signals for forecast |
| Customer Expert | Content | Voice-of-customer insight for messaging updates |
| Onboarding | Customer Expert | Need deeper product or account expertise during ramp |
| Content | Engineer | Need tooling or publishing automation for content |
| Prospecting | Engineer | Need automation or outreach tooling |
| Forecast | Engineer | Need forecast tooling or data integrations |
| Travel & Expense | Engineer | Need travel/expense automation or tooling |
| Onboarding | Engineer | Need onboarding tooling or integrations |
| Content | Chief of Staff | Blocked, needs tools/access, or done with content |
| Engineer | Chief of Staff | Blocked, needs tools/access, or done with deliverables |
| Prospecting | Chief of Staff | Blocked, needs tools/access, or done with a report |
| Forecast | Chief of Staff | Blocked, needs tools/access, or done with a forecast |
| Customer Expert | Chief of Staff | Blocked, needs tools/access, or done with guidance |
| Travel & Expense | Chief of Staff | Blocked, needs tools/access, or done with travel/expense work |
| Onboarding | Chief of Staff | Blocked, needs tools/access, or done with onboarding status |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: GTM Team

**Who sits there:** Chief of Staff, Content, Engineer, Prospecting, Forecast, Customer Expert, Travel & Expense, Onboarding.

**How coordination works**  
- Default: Chief of Staff briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **GTM Team** when a goal needs multi-bot discussion (e.g. prospecting → customer expertise → forecast in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first GTM goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`gtm`**.

Examples:

- "Import **gtm** from this repo."
- "Follow PROTOCOL.md and spawn the GTM team."
- "Load `charts/gtm/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 2 livestream **GTM Team** sidebar (~4:15):

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)
