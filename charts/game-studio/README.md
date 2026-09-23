# Game Studio

Portable **game studio** org chart from the Day 2 livestream on-screen diagram: one orchestrator (**Studio Lead**), three narrowly scoped specialists, and a **Studio** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
               ┌─ Developer
Studio Lead ────┼─ Character Specialist
               └─ Trend Research
```

---

## 1. What this chart is

A focused game studio pattern: treat each agent like a **job description** (one lane), put a **Studio Lead** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Studio Lead (orchestrator) + Developer + Character Specialist + Trend Research, seated together in **Studio**.

---

## 2. Org chart

Orchestrator + three specialists + Studio channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Studio Lead** | Orchestrator | User | Coordinate the game studio; route goals to specialists; synthesize project status |
| **Developer** | Specialist | Studio Lead | Game development, coding, technical implementation |
| **Character Specialist** | Specialist | Studio Lead | Character development, influencer presence, community engagement |
| **Trend Research** | Specialist | Studio Lead | Market trends, competitive analysis, audience insights |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope so work doesn't collapse onto one chat.
2. **Trust after tools** — hand tools, access, and context; then let specialists run. Improve with feedback instead of micromanaging every step.
3. **Vault for secrets** — never paste API keys, tokens, or credentials into chat; use the platform's vault / secure secret flows.
4. **Reuse templates** — prefer focused bots and reusable briefs over bloating a single thread.
5. **Reuse matching agents** — if a teammate already matches a role name/job, reuse and update profile; don't duplicate.

---

## 4. Roles in depth

### Studio Lead (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Someone has to turn vague game development goals into assignable work, keep specialists in lane, track parallel streams, and give the user a single coherent status. Without an orchestrator, every specialist either waits forever or invents conflicting priorities.

**Day-to-day responsibilities**  
- Intake game development goals from the user; clarify success criteria before assigning.  
- Write briefs for specialists: goal, context, success criteria, what to report back, and what *not* to do.  
- Assign the right specialist (Developer vs Character Specialist vs Trend Research).  
- Track parallel work; unblock with tools, access, or missing context.  
- Synthesize specialist outputs into status updates the user can act on.  
- Keep lanes clean — push deep work back to specialists rather than doing it yourself.  
- Use **Studio** for multi-bot coordination when a thread needs more than one specialist.

**What good output looks like**  
- Clear briefs with measurable success criteria.  
- Status that names owners, blockers, and next decisions — not a dump of every chat.  
- Specialists unblocked; no duplicate jobs; secrets never in chat.

**In scope**  
Goal intake and prioritization; briefing; routing; project status synthesis; unblocking; seating Studio channel; enforcing lane discipline.

**Out of scope**  
Writing game code; creating character content; researching market trends; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all three.

---

### Developer (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need code. Developer owns the technical implementation: writing features, fixing bugs, and delivering working software that brings the game vision to life.

**Day-to-day responsibilities**  
- Game feature development and implementation.  
- Bug fixes and technical debt management.  
- Code review and quality assurance.  
- Technical architecture decisions.  
- Integration with game assets and systems.  
- Performance optimization.

**What good output looks like**  
- Code that is clean, tested, and documented.  
- Features that work as specified.  
- Technical risks surfaced early.

**In scope**  
Game development; feature implementation; bug fixes; technical architecture; code quality; asset integration; performance optimization.

**Out of scope**  
Character content and influencer management (Character Specialist); market research and trend analysis (Trend Research); project coordination (Studio Lead); pasting secrets into chat.

**Hands off to**  
Studio Lead (deliverables ready / blocked).

---

### Character Specialist (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need personality. Character Specialist owns character development, influencer presence, and community engagement — building the game's identity and social presence.

**Day-to-day responsibilities**  
- Character design and development.  
- Content creation for game characters.  
- Community engagement and social presence.  
- Influencer and personality management.  
- Character voice and tone consistency.

**What good output looks like**  
- Character content that is engaging and consistent.  
- Community interactions that are authentic.  
- Engagement insights that inform development.

**In scope**  
Character development; content creation; community engagement; influencer presence; character voice and tone; social content; personality consistency.

**Out of scope**  
Game coding and technical implementation (Developer); deep market research and trend analysis (Trend Research); project coordination (Studio Lead); pasting secrets into chat.

**Hands off to**  
Developer (character assets ready for implementation); Studio Lead (deliverables ready / blocked).

---

### Trend Research (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Good games need market intelligence. Trend Research owns research: gaming trends, competitive analysis, and audience insights so the team can make informed decisions.

**Day-to-day responsibilities**  
- Gaming market trend research.  
- Competitive analysis and positioning.  
- Audience insights and player behavior.  
- Industry news and emerging patterns.  
- Opportunity identification and risk flags.

**What good output looks like**  
- Research that is sourced and actionable.  
- Insights that drive decisions.  
- Opportunities and risks surfaced proactively.

**In scope**  
Market trends; competitive analysis; audience insights; player behavior research; industry monitoring; opportunity identification; research briefs with recommendations.

**Out of scope**  
Game coding and technical implementation (Developer); character content creation (Character Specialist); project coordination (Studio Lead); pasting secrets into chat.

**Hands off to**  
Developer (technical insights for development); Character Specialist (audience insights for character work); Studio Lead (research ready / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Trend Research | Developer | Technical insights that inform development priorities |
| Trend Research | Character Specialist | Audience insights that inform character development |
| Character Specialist | Developer | Character assets or specs ready for implementation |
| Developer | Studio Lead | Blocked, needs tools/access, or done with deliverables |
| Character Specialist | Studio Lead | Blocked, needs tools/access, or done with deliverables |
| Trend Research | Studio Lead | Blocked, needs tools/access, or done with research |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Studio

**Who sits there:** Studio Lead, Developer, Character Specialist, Trend Research.

**How coordination works**  
- Default: Studio Lead briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Studio** when a goal needs multi-bot discussion (e.g. trend research → character direction → feature implementation in one thread).  
- Do **not** fan out a kickoff that wakes every member until the user gives a first project goal (`spawn.do_not_fanout_until_first_goal`).  
- If the platform caps channel membership, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`game-studio`**.

Examples:

- "Import **game-studio** from this repo."
- "Follow PROTOCOL.md and spawn the Game Studio team."
- "Load `charts/game-studio/chart.json` and stand up the team on my platform."

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles, optional peers, or scope from this prose beyond what's defined in `chart.json`. Use your platform's spawn CLI — do not assume specific tool names.

---

## 9. Sources

This chart is catalogued from the Day 2 livestream on-screen diagram:

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)
