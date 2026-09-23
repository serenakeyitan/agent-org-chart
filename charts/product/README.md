# Product

Portable **Product** team org chart from the Day 1 livestream sidebar: one orchestrator (**Chief of Staff**), six narrowly scoped specialists, and a **Product Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                  ┌─ Product
                  ├─ Data
                  ├─ Design
Chief of Staff ────┼─ PM
                  ├─ Talent
                  └─ Eng
```

---

## 1. What this chart is

A focused product team pattern: treat each agent like a **job description** (one lane), put a **Chief of Staff** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Chief of Staff (orchestrator) + Product + Data + Design + PM + Talent + Eng, seated together in **Product Team**.

---

## 2. Org chart

Orchestrator + six specialists + Product Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Chief of Staff** | Orchestrator | User | Coordinate the product team; route goals to specialists; synthesize status |
| **Product** | Specialist | Chief of Staff | Owns product strategy, vision, and direction |
| **Data** | Specialist | Chief of Staff | Owns data analysis, metrics, and insights |
| **Design** | Specialist | Chief of Staff | Owns visual design, UX, and design systems |
| **PM** | Specialist | Chief of Staff | Owns roadmap planning, prioritization, and execution |
| **Talent** | Specialist | Chief of Staff | Owns recruiting, hiring, and team building |
| **Eng** | Specialist | Chief of Staff | Owns engineering implementation and technical execution |

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
Someone has to turn vague product goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake product goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist (Product vs Data vs Design vs PM vs Talent vs Eng).  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **Product Team** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; status synthesis; unblocking; seating Product Team channel; enforcing lane discipline.

**Out of scope**  
Product strategy deep work; data analysis; visual design; roadmap planning; recruiting; engineering implementation; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all six.

---

### Product (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
The product needs strategic direction. A dedicated Product specialist ensures vision is clear and guides the team toward delivering real user value.

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
Data analysis (Data); visual design (Design); roadmap management (PM); recruiting (Talent); engineering implementation (Eng); pasting secrets into chat.

**Hands off to**  
Data (need metrics); PM (strategy ready for roadmap); Chief of Staff (done / blocked).

---

### Data (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Decisions need data. A dedicated Data specialist ensures metrics are tracked, analyzed, and surfaced as actionable insights.

**Day-to-day responsibilities**  
- Analyze product metrics and KPIs.  
- Surface insights from user behavior data.  
- Build dashboards and reports.  
- Provide data-driven recommendations.

**What good output looks like**  
- Analysis is grounded in real data.  
- Insights are actionable and timely.  
- Metrics are tracked consistently.

**In scope**  
Data analysis; metrics tracking; insight generation; dashboard building; data-driven recommendations.

**Out of scope**  
Product strategy (Product); visual design (Design); roadmap management (PM); recruiting (Talent); engineering implementation (Eng); pasting secrets into chat.

**Hands off to**  
Product (insights for strategy); Chief of Staff (done / blocked).

---

### Design (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Products need great user experiences. A dedicated Design specialist ensures visuals and UX are polished and consistent.

**Day-to-day responsibilities**  
- Create visual designs and mockups.  
- Define UX patterns and user flows.  
- Maintain design systems and components.  
- Collaborate with Eng on implementation.

**What good output looks like**  
- Designs are clear, consistent, and user-centered.  
- Design systems are maintained and documented.  
- Implementation handoffs are smooth.

**In scope**  
Visual design; UX design; design systems; mockups; user flows; prototyping.

**Out of scope**  
Product strategy (Product); data analysis (Data); roadmap management (PM); recruiting (Talent); engineering implementation (Eng); pasting secrets into chat.

**Hands off to**  
Eng (designs ready for implementation); Chief of Staff (done / blocked).

---

### PM (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Features need planning and prioritization. A dedicated PM ensures roadmaps are clear and execution stays on track.

**Day-to-day responsibilities**  
- Plan and maintain product roadmaps.  
- Prioritize features and initiatives.  
- Write specs and requirements.  
- Drive execution with Eng.

**What good output looks like**  
- Roadmaps are clear and prioritized.  
- Specs are actionable and complete.  
- Progress is tracked and communicated.

**In scope**  
Roadmap planning; feature prioritization; spec writing; execution tracking; requirements definition.

**Out of scope**  
Product strategy (Product); data analysis (Data); visual design (Design); recruiting (Talent); engineering implementation (Eng); pasting secrets into chat.

**Hands off to**  
Design (specs ready for design); Eng (specs ready for implementation); Chief of Staff (done / blocked).

---

### Talent (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Teams need to grow. A dedicated Talent specialist ensures recruiting pipelines are active and hiring runs smoothly.

**Day-to-day responsibilities**  
- Source and screen candidates.  
- Manage recruiting pipelines.  
- Coordinate interviews and feedback.  
- Support hiring decisions.

**What good output looks like**  
- Pipelines are active and qualified.  
- Hiring processes are smooth and timely.  
- Candidates have a good experience.

**In scope**  
Candidate sourcing; recruiting pipeline management; interview coordination; hiring support; recruiting metrics.

**Out of scope**  
Product strategy (Product); data analysis (Data); visual design (Design); roadmap management (PM); engineering implementation (Eng); pasting secrets into chat.

**Hands off to**  
Chief of Staff (done / blocked).

---

### Eng (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Products need to be built. A dedicated Eng specialist ensures features are implemented correctly and systems are maintained.

**Day-to-day responsibilities**  
- Implement features from specs.  
- Build and maintain systems.  
- Write clean, tested code.  
- Collaborate with Design on implementation.

**What good output looks like**  
- Code is clean, tested, and documented.  
- Features work as specified.  
- Technical debt is managed.

**In scope**  
Feature implementation; system building; code writing; technical collaboration; debugging; technical execution.

**Out of scope**  
Product strategy (Product); data analysis (Data); visual design (Design); roadmap management (PM); recruiting (Talent); pasting secrets into chat.

**Hands off to**  
Chief of Staff (done / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Product | Data | Need metrics or data analysis |
| Product | PM | Strategy ready for roadmap planning |
| PM | Design | Specs ready for design |
| PM | Eng | Specs ready for implementation |
| Design | Eng | Designs ready for implementation |
| Data | Product | Insights ready for strategy decisions |
| Product | Chief of Staff | Blocked, needs tools/access, or done with strategy |
| Data | Chief of Staff | Blocked, needs tools/access, or done with analysis |
| Design | Chief of Staff | Blocked, needs tools/access, or done with designs |
| PM | Chief of Staff | Blocked, needs tools/access, or done with roadmap |
| Talent | Chief of Staff | Blocked, needs tools/access, or done with recruiting |
| Eng | Chief of Staff | Blocked, needs tools/access, or done with implementation |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Product Team

**Who sits there:** Chief of Staff, Product, Data, Design, PM, Talent, Eng.

**How coordination works**  
- Default: Chief of Staff briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Product Team** when a goal needs multi-bot discussion (e.g. strategy → roadmap → design → engineering in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first product goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`product`**.

Examples:

- "Import **product** from this repo."
- "Follow PROTOCOL.md and spawn the Product team."
- "Load `charts/product/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 1 livestream sidebar:

- [Day 1 broadcast](https://x.com/i/broadcasts/1AxRnZbVpjaxl)
