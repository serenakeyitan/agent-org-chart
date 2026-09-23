# SDR

Portable **SDR prospecting** org chart from the Day 2 livestream bot sidebar: one orchestrator (**Chief of Staff**), seven narrowly scoped specialists, and an **SDR Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                    ┌─ Email Outbound
                    ├─ Enrichment
                    ├─ Company Research
Chief of Staff ─────┼─ Web Search
                    ├─ Voice of Customer
                    ├─ Usage Analyst
                    └─ Pipeline Research
```

---

## 1. What this chart is

A focused SDR prospecting pattern from the livestream bot sidebar: treat each agent like a **job description** (one lane), put a **Chief of Staff** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

The specialists map to the tool labels from the UI: **Email Outbound** (outbound/email lane), **Enrichment** (data enrichment), **Company Research** (target company research), **Web Search** (web intelligence), **Voice of Customer** (customer feedback analysis), **Usage Analyst** (usage data and signals), **Pipeline Research** (Salesforce/PLG research lane).

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Chief of Staff (orchestrator) + Email Outbound + Enrichment + Company Research + Web Search + Voice of Customer + Usage Analyst + Pipeline Research, seated together in **SDR Team**.

---

## 2. Org chart

Orchestrator + seven specialists + SDR Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Chief of Staff** | Orchestrator | User | Coordinate the SDR team; route prospecting goals to specialists; synthesize pipeline status |
| **Email Outbound** | Specialist | Chief of Staff | Writes and sends outbound prospecting emails |
| **Enrichment** | Specialist | Chief of Staff | Enriches contact and company data for prospecting |
| **Company Research** | Specialist | Chief of Staff | Researches target companies for prospecting insights |
| **Web Search** | Specialist | Chief of Staff | Performs web searches for prospecting intelligence |
| **Voice of Customer** | Specialist | Chief of Staff | Analyzes customer feedback and sentiment for prospecting |
| **Usage Analyst** | Specialist | Chief of Staff | Analyzes product usage data for prospecting signals |
| **Pipeline Research** | Specialist | Chief of Staff | Researches Salesforce pipeline and PLG signals for prospecting |

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
Someone has to turn vague prospecting goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake prospecting goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist for each prospecting task.  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **SDR Team** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; pipeline status synthesis; unblocking; seating SDR Team channel; enforcing lane discipline.

**Out of scope**  
Writing outbound emails; enriching data; researching companies; web searches; customer feedback analysis; usage analysis; pipeline research; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all seven.

---

### Email Outbound (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Prospects need to be reached. Email Outbound owns outbound email prospecting: writing personalized emails, managing sequences, and filling the top of the funnel.

**Day-to-day responsibilities**  
- Write personalized outbound emails.  
- Design and manage email sequences.  
- Track open rates, replies, and conversions.  
- A/B test subject lines and messaging.  
- Hand enrichment needs to Enrichment; research needs to Company Research or Web Search.

**In scope**  
Outbound email writing; sequence design; email personalization; open/reply tracking; A/B testing; prospect engagement.

**Out of scope**  
Contact enrichment (Enrichment); company research (Company Research); web searches (Web Search); usage analysis (Usage Analyst); pipeline research (Pipeline Research); acting as orchestrator; pasting secrets.

**Hands off to**  
Enrichment (need data); Company Research (need research); Chief of Staff (done / blocked).

---

### Enrichment (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Good outreach needs good data. Enrichment owns data enhancement: enriching contact and company records so Email Outbound can write more personalized, relevant outreach.

**Day-to-day responsibilities**  
- Enrich contact records with titles, emails, and firmographic data.  
- Validate and clean existing data.  
- Append company information to prospect records.  
- Track data quality and coverage metrics.

**In scope**  
Contact data enrichment; company data enrichment; data validation; data cleaning; firmographic data; coverage metrics.

**Out of scope**  
Writing outbound emails (Email Outbound); deep company research (Company Research); web searches (Web Search); usage analysis (Usage Analyst); pipeline research (Pipeline Research); acting as orchestrator; pasting secrets.

**Hands off to**  
Email Outbound (enriched data ready); Chief of Staff (done / blocked).

---

### Company Research (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Personalized outreach needs company context. Company Research owns target company analysis: researching companies, identifying buying signals, and surfacing insights for compelling outreach.

**Day-to-day responsibilities**  
- Research target companies and their business models.  
- Identify buying signals and trigger events.  
- Analyze company news, funding, and hiring patterns.  
- Surface competitive intelligence.  
- Document research in structured briefs.

**In scope**  
Company research; buying signal identification; trigger event tracking; competitive intelligence; news and funding analysis; research briefs.

**Out of scope**  
Writing outbound emails (Email Outbound); contact enrichment (Enrichment); general web searches (Web Search); usage analysis (Usage Analyst); pipeline research (Pipeline Research); acting as orchestrator; pasting secrets.

**Hands off to**  
Email Outbound (research ready for outreach); Chief of Staff (done / blocked).

---

### Web Search (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Intelligence is everywhere. Web Search owns web lookups: searching for prospect information, news, and signals that inform the team's prospecting efforts.

**Day-to-day responsibilities**  
- Search for prospect and company information.  
- Find recent news and announcements.  
- Locate contact information and social profiles.  
- Surface relevant industry trends.  
- Compile search results into actionable briefs.

**In scope**  
Web searches; prospect information lookup; news search; contact discovery; industry trend research; search result compilation.

**Out of scope**  
Writing outbound emails (Email Outbound); contact enrichment (Enrichment); deep company research (Company Research); usage analysis (Usage Analyst); pipeline research (Pipeline Research); acting as orchestrator; pasting secrets.

**Hands off to**  
Requesting specialists (search results); Chief of Staff (done / blocked).

---

### Voice of Customer (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Customer feedback informs messaging. Voice of Customer owns feedback analysis: analyzing sentiment, extracting insights, and surfacing patterns that inform prospecting messaging.

**Day-to-day responsibilities**  
- Analyze customer feedback and reviews.  
- Extract sentiment and themes.  
- Identify customer pain points and needs.  
- Surface messaging insights for Email Outbound.  
- Track customer satisfaction patterns.

**In scope**  
Customer feedback analysis; sentiment analysis; pain point identification; messaging insights; satisfaction tracking; voice of customer briefs.

**Out of scope**  
Writing outbound emails (Email Outbound); contact enrichment (Enrichment); company research (Company Research); web searches (Web Search); usage analysis (Usage Analyst); pipeline research (Pipeline Research); acting as orchestrator; pasting secrets.

**Hands off to**  
Email Outbound (messaging insights); Chief of Staff (done / blocked).

---

### Usage Analyst (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Product usage reveals intent. Usage Analyst owns usage data analysis: identifying high-potential prospects based on behavior and surfacing expansion and upsell signals.

**Day-to-day responsibilities**  
- Analyze product usage data and patterns.  
- Identify high-engagement accounts.  
- Surface expansion and upsell signals.  
- Track usage trends over time.  
- Deliver usage briefs with prospecting recommendations.

**In scope**  
Usage data analysis; engagement tracking; expansion signal identification; upsell signal identification; usage trend analysis; prospecting recommendations.

**Out of scope**  
Writing outbound emails (Email Outbound); contact enrichment (Enrichment); company research (Company Research); web searches (Web Search); customer feedback analysis (Voice of Customer); pipeline research (Pipeline Research); acting as orchestrator; pasting secrets.

**Hands off to**  
Email Outbound (usage insights); Chief of Staff (done / blocked).

---

### Pipeline Research (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
CRM data drives priorities. Pipeline Research owns Salesforce and PLG research: analyzing pipeline data, tracking signals, and surfacing intelligence that informs prospecting priorities.

**Day-to-day responsibilities**  
- Research Salesforce pipeline data.  
- Track PLG (product-led growth) signals.  
- Identify pipeline gaps and opportunities.  
- Surface high-priority accounts for outreach.  
- Deliver pipeline briefs with recommendations.

**In scope**  
Salesforce pipeline research; PLG signal tracking; pipeline gap analysis; opportunity identification; account prioritization; pipeline briefs.

**Out of scope**  
Writing outbound emails (Email Outbound); contact enrichment (Enrichment); company research (Company Research); web searches (Web Search); customer feedback analysis (Voice of Customer); usage analysis (Usage Analyst); acting as orchestrator; pasting secrets.

**Hands off to**  
Email Outbound (pipeline intelligence); Chief of Staff (done / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Enrichment | Email Outbound | Enriched contact data ready for outreach |
| Company Research | Email Outbound | Company research ready for personalized outreach |
| Web Search | Email Outbound | Search results ready for outreach |
| Voice of Customer | Email Outbound | Messaging insights ready for outreach |
| Usage Analyst | Email Outbound | Usage signals ready for outreach |
| Pipeline Research | Email Outbound | Pipeline intelligence ready for outreach |
| Email Outbound | Enrichment | Need additional contact or company data |
| Email Outbound | Company Research | Need deeper company research |
| All specialists | Chief of Staff | Blocked, needs tools/access, or done |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: SDR Team

**Who sits there:** Chief of Staff, Email Outbound, Enrichment, Company Research, Web Search, Voice of Customer, Usage Analyst, Pipeline Research.

**How coordination works**  
- Default: Chief of Staff briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **SDR Team** when a goal needs multi-bot discussion (e.g. research → enrichment → outreach loop in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first prospecting goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`sdr`**.

Examples:

- "Import **sdr** from this repo."
- "Follow PROTOCOL.md and spawn the SDR team."
- "Load `charts/sdr/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 2 livestream bot sidebar:

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)
