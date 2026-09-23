# Chart package schema (human guide)

Machine schema: [`schemas/org-chart.schema.json`](./schemas/org-chart.schema.json).

Each chart lives at `charts/<id>/` with:

- **`README.md`** — detailed human documentation (org story, mermaid, roles in depth).
- **`chart.json`** — the single importable package agents load (source of truth for spawn).

## Top level

| Field | Meaning |
| --- | --- |
| `schema_version` | Always `1` for this format. |
| `id` | Kebab-case id; must match the folder name under `charts/`. |
| `title` | Human title for the catalog. |
| `summary` | Short description of what the org does. |
| `version` | Chart package version (e.g. `1.2.0`). |
| `tags` | String labels for discovery. |
| `principles` | Operating principles every spawned agent should follow. |
| `roles` | Array of role objects (orchestrator, specialists; optional peers allowed by schema for future charts). |
| `channels` | Team channels and which role ids sit in them. |
| `handoffs` | Typical from → to handoffs with a `when` clause. |
| `spawn` | Import policy for the reading agent. |

## Role object

| Field | Meaning |
| --- | --- |
| `id` | Kebab-case role id (used in channels, handoffs, spawn). |
| `name` | Display name on the target platform. |
| `kind` | `orchestrator` \| `specialist` \| `optional_peer`. |
| `title` | Optional job title (e.g. `Orchestrator`). |
| `reports_to` | Role id of the manager, or `null` for the orchestrator. |
| `summary` | One-line job description. |
| `persona` | Full system/profile text (rich, multi-paragraph). Platform-agnostic; say “the user,” not a specific person. |
| `in_scope` | String list of work this role owns. |
| `out_of_scope` | String list of work to hand off. |
| `required` | `true` for roles that must exist after import; `false` for optional peers. |

## Channel object

| Field | Meaning |
| --- | --- |
| `id` | Kebab-case channel id. |
| `name` | Display name on the platform. |
| `member_role_ids` | Role ids to seat (map to created/reused agents). |

## Handoff object

| Field | Meaning |
| --- | --- |
| `from_role_id` | Sender role id. |
| `to_role_id` | Receiver role id. |
| `when` | Human condition for the handoff. |

## Spawn object

| Field | Meaning |
| --- | --- |
| `prefer_current_agent_as` | Role id to apply to the current agent (usually orchestrator), or `null`. |
| `reuse_matching_by_name` | Reuse existing agents whose name/job matches. |
| `do_not_fanout_until_first_goal` | Create agents but don’t wake everyone until the user gives a goal. |
| `secrets` | Always `vault_only` — never paste secrets into chat. |

## Adding a chart

1. Copy `charts/company-os/` to `charts/<new-id>/`.
2. Rewrite that folder’s **`README.md`** (detailed human doc) and **`chart.json`** only — no SPAWN.md or ORG_CHART.md.
3. Validate `chart.json` against the JSON schema.
4. Add a row to [`charts/INDEX.md`](./charts/INDEX.md).
