import type { RoleShape } from '../types'

export interface LayoutNode<R extends RoleShape = RoleShape> {
  role: R
  /** Unit coordinates: the outermost ring has radius 1, center is (0, 0). */
  x: number
  y: number
  depth: number
  /** Radians, screen orientation (y grows downward). Null for the center node. */
  angle: number | null
}

export interface LayoutEdge {
  from: string
  to: string
}

export interface ChartLayout<R extends RoleShape = RoleShape> {
  nodes: LayoutNode<R>[]
  edges: LayoutEdge[]
  /** Ring radii in unit space, innermost first. */
  rings: number[]
  /**
   * 'lead' when a single role sits at the center.
   * 'peers' when there is no single lead and top-level roles share a ring.
   */
  hub: 'lead' | 'peers'
}

export function layoutChart<R extends RoleShape>(roles: R[]): ChartLayout<R> {
  const byId = new Map(roles.map(r => [r.id, r]))
  const children = new Map<string, R[]>()
  const roots: R[] = []

  for (const role of roles) {
    const parent = role.reports_to ? byId.get(role.reports_to) : undefined
    if (!parent || parent.id === role.id) {
      roots.push(role)
    } else {
      const list = children.get(parent.id) ?? []
      list.push(role)
      children.set(parent.id, list)
    }
  }

  // Roles caught in a reporting cycle never reach a root; surface them as roots.
  const reachable = new Set<string>()
  const mark = (r: R) => {
    if (reachable.has(r.id)) return
    reachable.add(r.id)
    children.get(r.id)?.forEach(mark)
  }
  roots.forEach(mark)
  for (const role of roles) {
    if (!reachable.has(role.id)) {
      roots.push(role)
      mark(role)
    }
  }

  const leafCount = new Map<string, number>()
  const countLeaves = (r: R): number => {
    const kids = children.get(r.id) ?? []
    const n = kids.length === 0 ? 1 : kids.reduce((sum, k) => sum + countLeaves(k), 0)
    leafCount.set(r.id, n)
    return n
  }
  roots.forEach(countLeaves)

  const hub: ChartLayout['hub'] = roots.length === 1 ? 'lead' : 'peers'
  const center = hub === 'lead' ? roots[0] : null
  const topLevel = center ? children.get(center.id) ?? [] : roots

  let maxDepth = 0
  const walk = (r: R, depth: number) => {
    maxDepth = Math.max(maxDepth, depth)
    children.get(r.id)?.forEach(k => walk(k, depth + 1))
  }
  topLevel.forEach(r => walk(r, 1))
  const ringCount = Math.max(1, maxDepth)

  const placed: LayoutNode<R>[] = []
  if (center) placed.push({ role: center, x: 0, y: 0, depth: 0, angle: null })

  const total = topLevel.reduce((sum, r) => sum + (leafCount.get(r.id) ?? 1), 0)
  if (total > 0) {
    // One satellite hangs below its lead; a pair sits left and right; larger groups start at the top.
    const firstAngle = topLevel.length === 1 ? 90 : topLevel.length === 2 ? 180 : -90
    const firstSpan = ((leafCount.get(topLevel[0].id) ?? 1) / total) * 360
    let cursor = firstAngle - firstSpan / 2

    const assign = (r: R, start: number, span: number, depth: number) => {
      const deg = start + span / 2
      const rad = (deg * Math.PI) / 180
      const radius = depth / ringCount
      placed.push({ role: r, x: Math.cos(rad) * radius, y: Math.sin(rad) * radius, depth, angle: rad })
      const kids = children.get(r.id) ?? []
      const kidTotal = leafCount.get(r.id) ?? 1
      let kidCursor = start
      for (const k of kids) {
        const kidSpan = ((leafCount.get(k.id) ?? 1) / kidTotal) * span
        assign(k, kidCursor, kidSpan, depth + 1)
        kidCursor += kidSpan
      }
    }

    for (const r of topLevel) {
      const span = ((leafCount.get(r.id) ?? 1) / total) * 360
      assign(r, cursor, span, 1)
      cursor += span
    }
  }

  const edges: LayoutEdge[] = []
  for (const [parentId, kids] of children) {
    for (const k of kids) edges.push({ from: parentId, to: k.id })
  }

  const rings = Array.from({ length: ringCount }, (_, i) => (i + 1) / ringCount)

  return { nodes: placed, edges, rings, hub }
}
