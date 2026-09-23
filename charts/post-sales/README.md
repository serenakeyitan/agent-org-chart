# Post-Sales

Portable **post-sales** org chart from the Day 3 livestream **"Meet the team"** slide: one orchestrator (**Chief of Staff**), five narrowly scoped specialists, and a **Post-Sales Team** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
                    ┌─ Follow Ups
                    ├─ Your voice
Chief of Staff ─────┼─ Source of truth
                    ├─ Internal radar
                    └─ One per account
```

---

## 1. What this chart is

A focused post-sales / customer success pattern from the livestream "Meet the team" slide: treat each agent like a **job description** (one lane), put a **Chief of Staff** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Chief of Staff (orchestrator) + Follow Ups + Your voice + Source of truth + Internal radar + One per account, seated together in **Post-Sales Team**.

> **Naming notes:** On-screen labels use exact titles from the slide (e.g. "Your voice", "One per account"). This catalog preserves those job titles exactly as shown, including capitalization.

---

## 2. Org chart

Orchestrator + five specialists + Post-Sales Team channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Chief of Staff** | Orchestrator | User | Coordinate the post-sales team; route goals to specialists; synthesize customer success status |
| **Follow Ups** | Specialist | Chief of Staff | Tracks and executes customer follow-ups and action items |
| **Your voice** | Specialist | Chief of Staff | Captures and represents the customer's voice and feedback |
| **Source of truth** | Specialist | Chief of Staff | Maintains documentation and serves as the knowledge authority |
| **Internal radar** | Specialist | Chief of Staff | Monitors internal signals and surfaces relevant information |
| **One per account** | Specialist | Chief of Staff | Dedicated account ownership with deep customer focus |

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
Someone has to turn vague post-sales goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake post-sales goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist for each lane.  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **Post-Sales Team** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; customer success status synthesis; unblocking; seating Post-Sales Team channel; enforcing lane discipline.

**Out of scope**  
Follow-up execution; customer voice capture; documentation; internal monitoring; dedicated account work; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all five.

---

### Follow Ups (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Nothing should fall through the cracks. Follow Ups owns action item tracking and ensures timely customer follow-ups.

**Day-to-day responsibilities**  
- Track customer action items and commitments.  
- Execute follow-up sequences and reminders.  
- Report follow-up completion and pending items.  
- Flag overdue or at-risk follow-ups.

**What good output looks like**  
- Follow-ups are timely and tracked.  
- No dropped balls.

**In scope**  
Follow-up tracking; action item management; reminder execution; follow-up status reporting; loop closing; overdue flagging.

**Out of scope**  
Customer voice capture (Your voice); documentation (Source of truth); internal monitoring (Internal radar); dedicated account ownership (One per account); pasting secrets.

**Hands off to**  
Source of truth (documentation needs); One per account (account-specific items); Chief of Staff (done / blocked).

---

### Your voice (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Customer perspectives need a dedicated owner. Your voice captures feedback and represents customer sentiment.

**Day-to-day responsibilities**  
- Capture customer feedback and sentiment.  
- Represent customer perspectives in team discussions.  
- Surface customer pain points and requests.  
- Track customer satisfaction signals.

**What good output looks like**  
- Customer voice is accurately captured and actionable.  
- Insights cite real customer context.

**In scope**  
Customer feedback capture; sentiment tracking; voice-of-customer synthesis; customer perspective representation; pain point surfacing; satisfaction signal tracking.

**Out of scope**  
Follow-up execution (Follow Ups); documentation (Source of truth); internal monitoring (Internal radar); dedicated account ownership (One per account); pasting secrets.

**Hands off to**  
Source of truth (documentation needs); Follow Ups (follow-up actions); Chief of Staff (done / blocked).

---

### Source of truth (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Teams need reliable reference material. Source of truth owns documentation and serves as the knowledge authority.

**Day-to-day responsibilities**  
- Maintain customer documentation and records.  
- Update knowledge bases and reference materials.  
- Answer questions about documented information.  
- Ensure documentation accuracy and currency.

**What good output looks like**  
- Documentation is accurate, current, and accessible.  
- Records are reliable.

**In scope**  
Documentation maintenance; knowledge base management; record accuracy; reference material updates; information authority; documentation status reporting.

**Out of scope**  
Follow-up execution (Follow Ups); customer voice capture (Your voice); internal monitoring (Internal radar); dedicated account ownership (One per account); pasting secrets.

**Hands off to**  
Follow Ups (follow-up needs); One per account (account-specific documentation); Chief of Staff (done / blocked).

---

### Internal radar (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Internal developments affect customers. Internal radar monitors signals and surfaces relevant information.

**Day-to-day responsibilities**  
- Monitor internal channels and signals.  
- Surface relevant information for the post-sales team.  
- Flag changes that affect customer relationships.  
- Track internal developments impacting accounts.

**What good output looks like**  
- Radar catches relevant signals early.  
- Alerts are actionable.

**In scope**  
Internal signal monitoring; information surfacing; change flagging; development tracking; radar alerts; internal awareness.

**Out of scope**  
Follow-up execution (Follow Ups); customer voice capture (Your voice); documentation (Source of truth); dedicated account ownership (One per account); pasting secrets.

**Hands off to**  
Source of truth (documentation needs); One per account (account-specific alerts); Chief of Staff (done / blocked).

---

### One per account (specialist)

**Kind:** specialist · **Reports to:** Chief of Staff

**Why they exist**  
Accounts need personalized attention. One per account provides dedicated focus on specific customer relationships.

**Day-to-day responsibilities**  
- Manage dedicated account relationships.  
- Provide personalized attention to assigned accounts.  
- Track account health and engagement.  
- Coordinate account-specific activities.

**What good output looks like**  
- Accounts get deep, personalized attention.  
- Relationships are strong and healthy.

**In scope**  
Dedicated account management; personalized attention; account health tracking; relationship maintenance; account-specific coordination; account status reporting.

**Out of scope**  
General follow-up execution (Follow Ups); broad customer voice capture (Your voice); team-wide documentation (Source of truth); general internal monitoring (Internal radar); pasting secrets.

**Hands off to**  
Source of truth (cross-account documentation); Follow Ups (general follow-ups); Chief of Staff (done / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Your voice | Source of truth | Customer feedback needs documentation |
| Your voice | Follow Ups | Customer feedback requires follow-up action |
| Internal radar | One per account | Internal signal affects specific account |
| Internal radar | Source of truth | Internal change needs documentation |
| Follow Ups | Source of truth | Follow-up completion needs documentation |
| One per account | Source of truth | Account-specific information needs documentation |
| One per account | Follow Ups | Account needs general follow-up support |
| All specialists | Chief of Staff | Blocked, needs tools/access, or done |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Post-Sales Team

**Who sits there:** Chief of Staff, Follow Ups, Your voice, Source of truth, Internal radar, One per account.

**How coordination works**  
- Default: Chief of Staff briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Post-Sales Team** when a goal needs multi-bot discussion (e.g. account issue → feedback → follow-up → documentation in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first post-sales goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`post-sales`**.

Examples:

- "Import **post-sales** from this repo."
- "Follow PROTOCOL.md and spawn the Post-Sales team."
- "Load `charts/post-sales/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 3 livestream **"Meet the team"** slide (~4:05):

- [Day 3 broadcast](https://x.com/i/broadcasts/1YGNrbXEeazGw)
