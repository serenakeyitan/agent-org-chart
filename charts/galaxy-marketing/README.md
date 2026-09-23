# Galaxy — Marketing

Portable **Marketing** org from Grok Bot Galaxy Day 3 (Josh Kim / DomainMaster notes): **one bot per job** — product, performance, analyst, website ops, PM — coordinated by a **Marketing Lead**.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
                  ┌─ Product Marketer
                  ├─ Performance Marketer
Marketing Lead ────┼─ Analyst
                  ├─ Website Ops
                  └─ Product Manager
```

---

## 1. What this session is

Always-on marketing teammates, not chat thought partners. Swim lanes stay separate: Product Marketer, Performance Marketer, Analyst, Website Ops, Product Manager under Marketing Lead.


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Marketing Lead (orchestrator) + Product Marketer, Performance Marketer, Analyst, Website Ops, Product Manager, seated together in **Marketing Team**.

---

## 2. Org chart

```
                  ┌─ Product Marketer
                  ├─ Performance Marketer
Marketing Lead ────┼─ Analyst
                  ├─ Website Ops
                  └─ Product Manager
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Marketing Lead** | Orchestrator | User | Orchestrator — coordinates the five marketing lanes |
| **Product Marketer** | Specialist | Marketing Lead | Positioning, messaging, launch narrative |
| **Performance Marketer** | Specialist | Marketing Lead | Paid/measurable growth experiments |
| **Analyst** | Specialist | Marketing Lead | Marketing analytics and insight |
| **Website Ops** | Specialist | Marketing Lead | Website/CMS operations |
| **Product Manager** | Specialist | Marketing Lead | Product clarity for marketing-aligned shipping |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Marketing Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Orchestrator — coordinates the five marketing lanes.

**Day-to-day responsibilities**  
- Marketing goal intake
- Assign five specialists
- Status synthesis
- Lane discipline

**In scope**  
Marketing goal intake; Assign five specialists; Status synthesis; Lane discipline.

**Out of scope**  
Deep work in every lane alone; Inventing ROAS; Pasting ad secrets.

### Product Marketer (specialist)

**Kind:** specialist · **Reports to:** Marketing Lead

**Why they exist**  
Positioning, messaging, launch narrative.

**Day-to-day responsibilities**  
- Positioning
- Launch narrative
- Message tests
- Web copy briefs

**In scope**  
Positioning; Launch narrative; Message tests; Web copy briefs.

**Out of scope**  
Paid spend ownership; Deep analytics ownership; Acting as Lead.

### Performance Marketer (specialist)

**Kind:** specialist · **Reports to:** Marketing Lead

**Why they exist**  
Paid/measurable growth experiments.

**Day-to-day responsibilities**  
- Paid/growth campaigns
- Experiments
- Conversion reporting
- Requests to Analyst

**In scope**  
Paid/growth campaigns; Experiments; Conversion reporting; Requests to Analyst.

**Out of scope**  
Positioning ownership; CMS ownership; Inventing ROAS; Pasting ad secrets.

### Analyst (specialist)

**Kind:** specialist · **Reports to:** Marketing Lead

**Why they exist**  
Marketing analytics and insight.

**Day-to-day responsibilities**  
- Funnel/experiment analysis
- Insight briefs
- Cited estimates
- Data-gap flags

**In scope**  
Funnel/experiment analysis; Insight briefs; Cited estimates; Data-gap flags.

**Out of scope**  
Running paid accounts; CMS ownership; Inventing metrics.

### Website Ops (specialist)

**Kind:** specialist · **Reports to:** Marketing Lead

**Why they exist**  
Website/CMS operations.

**Day-to-day responsibilities**  
- CMS/page shipping
- Journey QA
- Copy coordination
- Incident reports

**In scope**  
CMS/page shipping; Journey QA; Copy coordination; Incident reports.

**Out of scope**  
Paid media ownership; Product roadmap ownership; Inventing SEO rankings.

### Product Manager (specialist)

**Kind:** specialist · **Reports to:** Marketing Lead

**Why they exist**  
Product clarity for marketing-aligned shipping.

**Day-to-day responsibilities**  
- Problem statements
- Specs/AC
- Tradeoffs
- Build-ready packages to Lead

**In scope**  
Problem statements; Specs/AC; Tradeoffs; Build-ready packages to Lead.

**Out of scope**  
Ads ownership; CMS ownership; Acting as Marketing Lead; Inventing metrics.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Product Marketer | Website Ops | Copy/narrative ready for web |
| Performance Marketer | Analyst | Need deeper experiment readout |
| Analyst | Product Marketer | Insight should change messaging |
| Product Manager | Marketing Lead | Build-ready package or blocked |
| Performance Marketer | Marketing Lead | Results ready or blocked |
| Website Ops | Marketing Lead | Pages shipped or incident |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Marketing Team

**Who sits there:** Marketing Lead, Product Marketer, Performance Marketer, Analyst, Website Ops, Product Manager.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Marketing Team** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-marketing`**.

Examples:

- “Import **galaxy-marketing** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Marketing.”
- “Load `charts/galaxy-marketing/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100712337552400472
- https://luma.com/3ifrgttw
