export interface Role {
  id: string
  name: string
  kind: 'orchestrator' | 'specialist' | 'optional_peer'
  title?: string
  reports_to: string | null
  summary: string
  persona: string
  in_scope: string[]
  out_of_scope: string[]
  required: boolean
}

export interface Channel {
  id: string
  name: string
  member_role_ids: string[]
}

export interface Handoff {
  from_role_id: string
  to_role_id: string
  when: string
}

export interface Routine {
  name: string
  schedule: string
  cron?: string // 5-field cron, user's local time zone
  trigger?: string // event-driven routines (no cron), e.g. "webhook"
  notes?: string
}

export interface Spawn {
  prefer_current_agent_as: string | null
  reuse_matching_by_name: boolean
  do_not_fanout_until_first_goal: boolean
  secrets: 'vault_only'
}

export interface Chart {
  schema_version: number
  id: string
  title: string
  summary: string
  version: string
  tags: string[]
  sources?: string[]
  principles: string[]
  roles: Role[]
  channels: Channel[]
  handoffs: Handoff[]
  routines?: Routine[]
  spawn: Spawn
}

export interface ChartIndex {
  id: string
  title: string
  summary: string
  roleCount: number
  roles: Array<Pick<Role, 'id' | 'name' | 'kind'>>
  routineCount: number
}
