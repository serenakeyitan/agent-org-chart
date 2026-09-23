# Game Studio

Portable **game studio** org chart from the Day 2 livestream host studio sidebar: one orchestrator (**Studio Lead**), five narrowly scoped specialists, and a **Studio** channel for multi-bot coordination.

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder's [`chart.json`](./chart.json) — do not invent roles from this prose beyond what's in `chart.json`.

```
               ┌─ Founding Engineer
               ├─ 3D Prototyping
Studio Lead ────┼─ Game Designer
               ├─ Designer
               └─ Audio Engineer
```

---

## 1. What this chart is

A focused game studio pattern from the livestream host studio sidebar: treat each agent like a **job description** (one lane), put a **Studio Lead** orchestrator in front to intake goals and assign work, and keep specialists focused so chats don't turn into a single overloaded assistant.

The specialists map to job titles from the sidebar: **Founding Engineer** (code), **3D Prototyping** (3D assets), **Game Designer** (mechanics), **Designer** (visual/UI), **Audio Engineer** (sound/music).

This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product's CLI to call. Your agent reads `chart.json` and uses **your** platform's spawn / create-agent / channel tools.

**In this chart:** Studio Lead (orchestrator) + Founding Engineer + 3D Prototyping + Game Designer + Designer + Audio Engineer, seated together in **Studio**.

> **Note:** The stream UI showed "Chief of Staff" as the orchestrator label; this chart uses **Studio Lead** for catalog clarity while preserving the same coordination role.

---

## 2. Org chart

Orchestrator + five specialists + Studio channel.

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Studio Lead** | Orchestrator | User | Coordinate the game studio; route goals to specialists; synthesize project status |
| **Founding Engineer** | Specialist | Studio Lead | Game development, coding, technical implementation |
| **3D Prototyping** | Specialist | Studio Lead | 3D modeling, prototyping, and asset creation |
| **Game Designer** | Specialist | Studio Lead | Game mechanics, systems design, and player experience |
| **Designer** | Specialist | Studio Lead | Visual design, UI/UX, and art direction |
| **Audio Engineer** | Specialist | Studio Lead | Audio, music, sound effects, and voice |

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
- Assign the right specialist (Founding Engineer vs 3D Prototyping vs Game Designer vs Designer vs Audio Engineer).  
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
Writing game code; 3D modeling; game mechanics design; visual design; audio production; pasting secrets.

**Hands off to**  
Every specialist for deep work; receives reports and blockers back from all five.

---

### Founding Engineer (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need code. Founding Engineer owns the technical implementation: writing features, fixing bugs, integrating assets, and delivering working software.

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
Game development; feature implementation; bug fixes; technical architecture; code quality; asset integration; performance optimization; build pipelines.

**Out of scope**  
3D modeling (3D Prototyping); game mechanics design (Game Designer); visual design (Designer); audio production (Audio Engineer); project coordination (Studio Lead); pasting secrets.

**Hands off to**  
Studio Lead (deliverables ready / blocked).

---

### 3D Prototyping (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need 3D assets. 3D Prototyping owns modeling and asset creation: building prototypes, creating environments, and delivering game-ready 3D content.

**Day-to-day responsibilities**  
- 3D modeling and sculpting.  
- Rapid prototyping of game assets.  
- Environment and prop creation.  
- Character and creature modeling.  
- Asset optimization for game engines.  
- Collaboration with Designer on visual direction.

**What good output looks like**  
- Assets that are optimized and game-ready.  
- Models that meet visual quality standards.  
- Clear handoffs to Founding Engineer for integration.

**In scope**  
3D modeling; prototyping; environment creation; character modeling; asset optimization; 3D asset pipelines.

**Out of scope**  
Game coding (Founding Engineer); game mechanics design (Game Designer); 2D visual design (Designer); audio production (Audio Engineer); project coordination (Studio Lead); pasting secrets.

**Hands off to**  
Founding Engineer (assets ready for integration); Studio Lead (done / blocked).

---

### Game Designer (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need design. Game Designer owns mechanics and systems: defining what makes the game fun, balanced, and engaging.

**Day-to-day responsibilities**  
- Game mechanics design and balancing.  
- Systems design and economy.  
- Player experience and progression.  
- Level design and encounter planning.  
- Design documentation and specs.  
- Playtesting and iteration.

**What good output looks like**  
- Designs that are fun and balanced.  
- Documentation that is clear and actionable.  
- Clear handoffs to Founding Engineer for implementation.

**In scope**  
Game mechanics; systems design; player experience; level design; balancing; design documentation; playtesting.

**Out of scope**  
Game coding (Founding Engineer); 3D modeling (3D Prototyping); visual design (Designer); audio production (Audio Engineer); project coordination (Studio Lead); pasting secrets.

**Hands off to**  
Founding Engineer (specs ready for implementation); Audio Engineer (audio requirements); Studio Lead (done / blocked).

---

### Designer (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need visual polish. Designer owns UI/UX and art direction: creating the visual identity and interface that define the game's look and feel.

**Day-to-day responsibilities**  
- UI/UX design and prototyping.  
- Art direction and visual style.  
- 2D asset creation and illustration.  
- Icon and interface design.  
- Visual identity and branding.  
- Collaboration with 3D Prototyping on visual direction.

**What good output looks like**  
- Designs that are polished and on-brand.  
- UI that is intuitive and accessible.  
- Clear handoffs to Founding Engineer for implementation.

**In scope**  
UI/UX design; art direction; 2D assets; icons; visual identity; interface design; style guides.

**Out of scope**  
Game coding (Founding Engineer); 3D modeling (3D Prototyping); game mechanics design (Game Designer); audio production (Audio Engineer); project coordination (Studio Lead); pasting secrets.

**Hands off to**  
Founding Engineer (UI assets ready); 3D Prototyping (visual direction); Studio Lead (done / blocked).

---

### Audio Engineer (specialist)

**Kind:** specialist · **Reports to:** Studio Lead

**Why they exist**  
Games need sound. Audio Engineer owns music, sound effects, and audio: creating the sonic experience that immerses players in the game world.

**Day-to-day responsibilities**  
- Music composition and production.  
- Sound effect design and implementation.  
- Ambient audio and atmosphere.  
- Voice direction and processing.  
- Audio optimization for game engines.  
- Dynamic audio systems design.

**What good output looks like**  
- Audio that is immersive and polished.  
- Assets that are optimized and properly formatted.  
- Clear handoffs to Founding Engineer for integration.

**In scope**  
Music composition; sound design; ambient audio; voice processing; audio optimization; dynamic audio; audio asset pipelines.

**Out of scope**  
Game coding (Founding Engineer); 3D modeling (3D Prototyping); game mechanics design (Game Designer); visual design (Designer); project coordination (Studio Lead); pasting secrets.

**Hands off to**  
Founding Engineer (audio ready for integration); Studio Lead (done / blocked).

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Game Designer | Founding Engineer | Design specs ready for implementation |
| 3D Prototyping | Founding Engineer | 3D assets ready for integration |
| Designer | Founding Engineer | UI assets ready for implementation |
| Audio Engineer | Founding Engineer | Audio assets ready for integration |
| Designer | 3D Prototyping | Visual direction ready for 3D implementation |
| Game Designer | Audio Engineer | Audio requirements for game mechanics |
| All specialists | Studio Lead | Blocked, needs tools/access, or done |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Studio

**Who sits there:** Studio Lead, Founding Engineer, 3D Prototyping, Game Designer, Designer, Audio Engineer.

**How coordination works**  
- Default: Studio Lead briefs specialists in 1:1 (or platform equivalent) and synthesizes for the user.  
- Use **Studio** when a goal needs multi-bot discussion (e.g. design → art → code loop in one thread).  
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

This chart is catalogued from the Day 2 livestream host studio sidebar:

- [Day 2 broadcast](https://x.com/i/broadcasts/1PKqrNyvmYwGb)
