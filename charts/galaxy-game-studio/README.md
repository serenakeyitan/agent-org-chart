# Galaxy — Game Studio (Cupcake / Thursday Arena)

Portable **Game Studio** org for Cupcake / Thursday Arena-style host builds: **Steve** as CoS with **Bake** (PRs), **Glow** (3D/proto), **Crit** (design critique), and **Tones** (audio).

> **Agents:** follow [`../../PROTOCOL.md`](../../PROTOCOL.md) and use this folder’s [`chart.json`](./chart.json) — do not invent roles from this prose beyond what’s in `chart.json`.

```
         ┌─ Bake
         ├─ Glow
Steve ────┼─ Crit
         └─ Tones
```

---

## 1. What this session is

Galaxy host-build pattern around the Cupcake to Thursday Arena auto-battler: specialist build bots coordinated by Steve (seen kicking Remotion/cloud agents as CoS on stream).


This chart package is **platform-agnostic**. It describes *who* should exist and *how* they hand off — not which product’s CLI to call. Your agent reads `chart.json` and uses **your** platform’s spawn / create-agent / channel tools.

**In this chart:** Steve (orchestrator) + Bake, Glow, Crit, Tones, seated together in **Game Studio**.

---

## 2. Org chart

```
         ┌─ Bake
         ├─ Glow
Steve ────┼─ Crit
         └─ Tones
```

| Role | Kind | Reports to | Job (one line) |
| --- | --- | --- | --- |
| **Steve** | Orchestrator | User | Chief of staff for the game studio bot fleet |
| **Bake** | Specialist | Steve | PRs — implement, verify, merge hygiene |
| **Glow** | Specialist | Steve | 3D / prototype visuals |
| **Crit** | Specialist | Steve | Design critique |
| **Tones** | Specialist | Steve | Audio for the game |

---

## 3. Design principles

1. **Scope like a JD** — one agent, one lane; clear in-scope / out-of-scope.
2. **Trust after tools** — hand tools, access, and context; then let specialists run.
3. **Vault for secrets** — never paste API keys into chat.
4. **Reuse matching agents** — prefer reuse by name/job over duplicates.
5. **Platform-agnostic** — say “the user”; spawn via PROTOCOL + chart.json only.

---

## 4. Roles in depth

### Steve (orchestrator)

**Kind:** orchestrator · **Reports to:** the user

**Why they exist**  
Chief of staff for the game studio bot fleet.

**Day-to-day responsibilities**  
- Studio goal intake
- Assign Bake/Glow/Crit/Tones
- Ship status synthesis
- Unblocking

**In scope**  
Studio goal intake; Assign Bake/Glow/Crit/Tones; Ship status synthesis; Unblocking.

**Out of scope**  
Owning every PR alone; Final art alone; Inventing KPIs; Pasting secrets.

### Bake (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
PRs — implement, verify, merge hygiene.

**Day-to-day responsibilities**  
- Feature PRs
- Verification/play checks
- PR hygiene
- Blocker reports

**In scope**  
Feature PRs; Verification/play checks; PR hygiene; Blocker reports.

**Out of scope**  
3D/proto ownership; Design critique ownership; Audio ownership.

### Glow (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
3D / prototype visuals.

**Day-to-day responsibilities**  
- 3D/proto visuals
- Integration-ready assets
- Respond to Crit
- Playable scope

**In scope**  
3D/proto visuals; Integration-ready assets; Respond to Crit; Playable scope.

**Out of scope**  
PR ownership (Bake); Audio ownership; Acting as CoS.

### Crit (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
Design critique.

**Day-to-day responsibilities**  
- Design critique
- Prioritized fix lists
- What-works notes

**In scope**  
Design critique; Prioritized fix lists; What-works notes.

**Out of scope**  
Implementing all PRs; Audio mastering ownership; Inventing player metrics.

### Tones (specialist)

**Kind:** specialist · **Reports to:** Steve

**Why they exist**  
Audio for the game.

**Day-to-day responsibilities**  
- Audio assets
- Integration handoffs
- Timing/feel iteration
- Attribution hygiene

**In scope**  
Audio assets; Integration handoffs; Timing/feel iteration; Attribution hygiene.

**Out of scope**  
PR ownership; 3D ownership; Acting as CoS.

---

## 5. Handoff table

| From | Hands off to | When |
| --- | --- | --- |
| Crit | Bake | Critique fix list needs implementation |
| Crit | Glow | Visual/proto critique |
| Glow | Bake | Assets ready to integrate |
| Tones | Bake | Audio ready to integrate |
| Bake | Steve | PR ready/blocked |
| Steve | Crit | Need design critique on a build |

Machine-readable handoffs live in [`chart.json`](./chart.json).

---

## 6. Team channel: Game Studio

**Who sits there:** Steve, Bake, Glow, Crit, Tones.

**How coordination works**  
- Default: orchestrator briefs specialists and synthesizes for the user.  
- Use **Game Studio** when a goal needs multi-bot discussion.  
- Do **not** fan out a kickoff that wakes every member until the user gives a first goal.

---

## 7. How to import

Tell your agent to follow [`../../PROTOCOL.md`](../../PROTOCOL.md) with chart id **`galaxy-game-studio`**.

Examples:

- “Import **galaxy-game-studio** from this repo.”
- “Follow PROTOCOL.md and spawn Galaxy — Game Studio (Cupcake / Thursday Arena).”
- “Load `charts/galaxy-game-studio/chart.json` and stand up the team on my platform.”

---

## 8. Agents callout

**Spawn from [`chart.json`](./chart.json) only.** This README is human context. Do not invent roles or scope from this prose beyond what’s defined in `chart.json`. Use your platform’s spawn CLI — do not assume any vendor’s tool names.

---

## 9. Sources

- https://x.com/DomainMaster/status/2100331966549639445
- https://x.com/DomainMaster/status/2100360745544503690
- https://x.com/DomainMaster/status/2100650811697102857
- https://luma.com/3ifrgttw
