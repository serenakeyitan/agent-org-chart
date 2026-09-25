import type { Role } from '../types'
import type { Team, Wing } from './catalog'

// Left-to-right branch tree: Agent Army → wing → team → reporting lines.
// Teams stay collapsed until expanded, so the overview fits on one screen.

export type NodeKind = 'root' | 'wing' | 'team' | 'role'

export interface TreeNode {
  id: string
  kind: NodeKind
  x: number
  y: number
  w: number
  h: number
  parentId: string | null
  wing?: Wing
  team?: Team
  role?: Role
  roleIndex?: number
}

export interface TreeLayout {
  nodes: TreeNode[]
  byId: Map<string, TreeNode>
}

const SIZE: Record<NodeKind, [number, number]> = {
  root: [210, 64],
  wing: [170, 38],
  team: [260, 78],
  role: [240, 66],
}
const COL_X = { root: 0, wing: 290, team: 530 }
const ROLE_X = 880
const ROLE_STEP = 300
const GAP: Record<NodeKind, number> = { root: 0, wing: 48, team: 18, role: 8 }

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

function place(d: Draft, top: number, out: TreeNode[]): number {
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
  out.push({ ...d.node, x: d.x, y: centerY - d.node.h / 2 })
  return centerY
}

export function layoutTree(teams: Team[], expanded: Set<string>, wings: Wing[]): TreeLayout {
  const wingDrafts: Draft[] = wings
    .map(wing => {
      const members = teams.filter(t => t.wing.id === wing.id)
      const wingId = `wing:${wing.id}`
      return {
        node: { id: wingId, kind: 'wing' as const, w: SIZE.wing[0], h: SIZE.wing[1], parentId: 'root', wing },
        x: COL_X.wing,
        children: members.map(team => {
          const id = teamNodeId(team.chart.id)
          return {
            node: { id, kind: 'team' as const, w: SIZE.team[0], h: SIZE.team[1], parentId: wingId, team },
            x: COL_X.team,
            children: expanded.has(team.chart.id) ? roleDrafts(team, id) : [],
          }
        }),
      }
    })
    .filter(w => w.children.length)

  const root: Draft = { node: { id: 'root', kind: 'root', w: SIZE.root[0], h: SIZE.root[1], parentId: null }, x: COL_X.root, children: wingDrafts }
  const nodes: TreeNode[] = []
  place(root, 0, nodes)
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
