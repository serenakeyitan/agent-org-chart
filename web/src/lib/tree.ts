import type { Role } from '../types'
import type { Team } from './catalog'

// Left-to-right branch tree of one team's reporting lines from chart.json.

export type NodeKind = 'team' | 'role'

export interface TreeNode {
  id: string
  kind: NodeKind
  x: number
  y: number
  w: number
  h: number
  parentId: string | null
  team?: Team
  role?: Role
  roleIndex?: number
}

export interface TreeLayout {
  nodes: TreeNode[]
  byId: Map<string, TreeNode>
}

const SIZE: Record<NodeKind, [number, number]> = {
  team: [260, 78],
  role: [240, 66],
}
const ROLE_X = 330
const ROLE_STEP = 250
const GAP: Record<NodeKind, number> = { team: 40, role: 8 }

interface Draft {
  node: Omit<TreeNode, 'x' | 'y'>
  x: number
  children: Draft[]
}

// A person node is a figure plus a name tag, so its width follows the name; links
// to direct reports then start right where the tag ends.
function roleWidth(role: Role): number {
  return Math.min(SIZE.role[0], Math.max(104, 46 + role.name.length * 7.9 + 18))
}

export const teamNodeId = (id: string) => `team:${id}`
export const roleNodeId = (teamId: string, roleId: string) => `role:${teamId}:${roleId}`

function roleDrafts(team: Team, parentId: string): Draft[] {
  const roles = team.chart.roles
  const ids = new Set(roles.map(r => r.id))
  const make = (role: Role, depth: number, parent: string): Draft => {
    const id = roleNodeId(team.chart.id, role.id)
    return {
      node: { id, kind: 'role', w: roleWidth(role), h: SIZE.role[1], parentId: parent, team, role, roleIndex: roles.indexOf(role) },
      x: ROLE_X + depth * ROLE_STEP,
      children: roles.filter(r => r.reports_to === role.id).map(r => make(r, depth + 1, id)),
    }
  }
  return roles.filter(r => !r.reports_to || !ids.has(r.reports_to)).map(r => make(r, 0, parentId))
}

function slot(d: Draft): number {
  if (!d.children.length) return d.node.h
  const kids = d.children.reduce((s, c) => s + slot(c), 0) + GAP[d.children[0].node.kind] * (d.children.length - 1)
  return Math.max(d.node.h, kids)
}

// Emits nodes parent-first so DOM (and Tab) order reads team → lead → their reports.
function place(d: Draft, top: number, out: TreeNode[]): number {
  const slotIdx = out.length
  out.push(undefined as unknown as TreeNode) // filled once the children fix this node's y
  const total = slot(d)
  let centerY: number
  if (d.children.length) {
    const kidsH = d.children.reduce((s, c) => s + slot(c), 0) + GAP[d.children[0].node.kind] * (d.children.length - 1)
    let cursor = top + (total - kidsH) / 2
    const centers: number[] = []
    d.children.forEach(c => {
      centers.push(place(c, cursor, out))
      cursor += slot(c) + GAP[c.node.kind]
    })
    centerY = (centers[0] + centers[centers.length - 1]) / 2
  } else {
    centerY = top + total / 2
  }
  out[slotIdx] = { ...d.node, x: d.x, y: centerY - d.node.h / 2 }
  return centerY
}

// The team is the root: team → its lead(s) → their reports, as in chart.json.
export function layoutTree(team: Team | null): TreeLayout {
  const nodes: TreeNode[] = []
  if (team) {
    const id = teamNodeId(team.chart.id)
    place({ node: { id, kind: 'team', w: SIZE.team[0], h: SIZE.team[1], parentId: null, team }, x: 0, children: roleDrafts(team, id) }, 0, nodes)
  }
  return { nodes, byId: new Map(nodes.map(n => [n.id, n])) }
}

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export function boundsOf(nodes: TreeNode[]): Box {
  const x0 = Math.min(...nodes.map(n => n.x))
  const y0 = Math.min(...nodes.map(n => n.y))
  const x1 = Math.max(...nodes.map(n => n.x + n.w))
  const y1 = Math.max(...nodes.map(n => n.y + n.h))
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
}
