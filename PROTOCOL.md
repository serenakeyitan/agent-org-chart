# Spawn protocol (platform-agnostic)

Any agent that can create teammates and channels on **its** platform should follow these steps. Do **not** assume a specific product’s tool names (Grok Bot, Cursor, etc.). Use whatever create-agent / spawn / update-profile / create-channel commands your platform provides.

## 1. Pick a chart

1. Open [`charts/INDEX.md`](./charts/INDEX.md).
2. If the user named a chart `id` (e.g. `company-os`), use that.
3. If ambiguous or they only said “spawn an org,” list available charts (id + title + one-liner) and ask which `id` to import.
4. Proceed only after you have a concrete `id`.

## 2. Load the package

1. Read `charts/<id>/chart.json`.
2. Mentally validate against [`schemas/org-chart.schema.json`](./schemas/org-chart.schema.json) (required fields, role kinds, spawn policy). See [`SCHEMA.md`](./SCHEMA.md) for a human explanation.
3. Optionally skim `charts/<id>/ORG_CHART.md` for the visual reporting model.

## 3. Inventory this platform

1. List existing agents (teammates) and channels on **this** platform.
2. Build a map: chart `roles[].id` / `name` → existing agent (or “missing”).
3. Prefer matches by **name** and job/title when `spawn.reuse_matching_by_name` is true.
4. Do **not** create duplicates for the same job.

## 4. Create or reuse required roles

1. For each role with `required: true`:
   - If a match exists → reuse it; update profile/title from `persona` / `title` if your platform allows.
   - If missing → create via your platform’s **create-agent / spawn** command (or API). Set name, title, and persona from the chart.
2. For `kind: optional_peer` (`required: false`):
   - Reuse if present; **do not** create unless the user explicitly asks.
3. If `spawn.prefer_current_agent_as` is a role id, prefer renaming/reprofiling **the current agent** as that role (usually the orchestrator) instead of spawning a second orchestrator — unless the user wants a separate one.

## 5. Apply personas and titles

Apply `roles[].persona` and optional `roles[].title` so each agent’s system/profile text matches the chart. Keep wording platform-agnostic; refer to **the user**, not a named person from the chart author’s environment.

## 6. Create channels and seat members

For each entry in `channels`:

1. Create or reuse a channel named `channels[].name`.
2. Map `member_role_ids` → the agents you created or reused.
3. Seat those members. If membership is capped below the set, prioritize the orchestrator + as many required specialists as fit, and tell the user who was left out.
4. If `spawn.do_not_fanout_until_first_goal` is true, do **not** blast a kickoff that wakes every member until the user gives a first goal.

## 7. Persist, report, ask for a goal

1. Persist a local mapping: chart role id → platform agent id/name, channel id/name, and a pointer to this chart package.
2. Report to the user: **created** vs **reused** (by role name).
3. Ask for the **first company goal** to run through the team.
4. Success looks like: all required roles exist (or clearly reused), channels seated, no duplicate jobs, user asked for a first goal.

## 8. Secrets

`spawn.secrets` is always `vault_only`.

- Never paste API keys, tokens, or other secrets into chat.
- Use your platform’s vault / secure secret flows when specialists need credentials.

## Thin wrappers

Chart folders may include `SPAWN.md` that simply says: follow this protocol using that folder’s `chart.json`. Prefer the protocol + JSON over any outdated narrative playbook.
