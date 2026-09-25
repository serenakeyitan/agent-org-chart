import type { Chart, Role } from '../types'
import type { Pt } from './iso'

// A floor plan derived purely from chart structure: who reports to whom decides
// who gets an office, who sits in the open plan, and whether the team shares one table.

export type Furniture =
  | { kind: 'desk'; x: number; y: number; w: number; d: number; monitor: boolean }
  | { kind: 'table'; x: number; y: number; w: number; d: number }
  | { kind: 'glass'; x: number; y: number; w: number; d: number }
  | { kind: 'cooler'; x: number; y: number }
  | { kind: 'plant'; x: number; y: number }
  | { kind: 'sofa'; x: number; y: number; w: number }
  | { kind: 'board'; x: number; y: number }

export interface Zone {
  x: number
  y: number
  w: number
  d: number
  tone: 'office' | 'meeting' | 'lounge'
}

export interface Seat {
  role: Role
  at: Pt
  exit: Pt[] // seat → a point on the aisle
}

export interface FloorPlan {
  W: number
  D: number
  style: 'hierarchy' | 'peers'
  zones: Zone[]
  furniture: Furniture[]
  seats: Seat[]
  aisleY: number
  coolerEntry: Pt[] // aisle → standing spot at the water cooler
  meetingEntry: Pt[] | null // aisle → standing spot in the meeting room
  board: Pt // where routine announcements appear
}

// Glass walls are cut into 1-unit segments so painter's-order sorting stays correct.
function glassRun(x: number, y: number, len: number, axis: 'x' | 'y'): Furniture[] {
  const out: Furniture[] = []
  for (let i = 0; i < len; i += 1) {
    const l = Math.min(1, len - i)
    out.push(axis === 'x' ? { kind: 'glass', x: x + i, y, w: l, d: 0.1 } : { kind: 'glass', x, y: y + i, w: 0.1, d: l })
  }
  return out
}

export function planFloor(chart: Chart): FloorPlan {
  const lead = chart.roles.find(r => r.kind === 'orchestrator')
  return lead ? hierarchyPlan(lead, chart.roles.filter(r => r !== lead)) : peersPlan(chart.roles)
}

function hierarchyPlan(lead: Role, team: Role[]): FloorPlan {
  const n = Math.max(team.length, 1)
  const cols = n <= 4 ? n : Math.min(5, Math.ceil(n / 2))
  const rows = Math.ceil(team.length / cols)
  const pitch = 3.4 // wide enough that neighbouring name tags never touch
  const W = Math.max(13, Math.ceil(cols * pitch + 1))
  const deskTop = 6.2
  const D = deskTop + (rows - 1) * 3 + 2.2
  const aisleY = 4.9
  const x0 = (W - (cols * pitch - 1.4)) / 2

  const furniture: Furniture[] = [
    { kind: 'desk', x: 1.4, y: 1.9, w: 2, d: 1, monitor: true },
    ...glassRun(5, 0, 2.4, 'y'),
    ...glassRun(0, 4, 5, 'x'),
    { kind: 'table', x: W - 3.7, y: 0.9, w: 2.6, d: 1.6 },
    { kind: 'board', x: W - 2.4, y: 0 },
    ...glassRun(W - 5, 0, 1.4, 'y'),
    ...glassRun(W - 5, 4, 5, 'x'),
    { kind: 'cooler', x: 6, y: 0.5 },
    { kind: 'plant', x: W - 6.2, y: 0.6 },
  ]

  const seats: Seat[] = [
    { role: lead, at: [2.4, 1.3], exit: [[2.4, 1.3], [4.4, 1.3], [4.4, 3.2], [5.6, 3.2], [5.6, aisleY]] },
  ]
  team.forEach((role, i) => {
    const c = i % cols
    const r = Math.floor(i / cols)
    const dx = x0 + c * pitch
    const dy = deskTop + r * 3
    furniture.push({ kind: 'desk', x: dx, y: dy, w: 2, d: 1, monitor: true })
    const at: Pt = [dx + 1, dy - 0.6]
    const lane = dx - 0.5
    seats.push({ role, at, exit: [at, [lane, at[1]], [lane, aisleY]] })
  })

  return {
    W,
    D,
    style: 'hierarchy',
    zones: [
      { x: 0, y: 0, w: 5, d: 4, tone: 'office' },
      { x: W - 5, y: 0, w: 5, d: 4, tone: 'meeting' },
    ],
    furniture,
    seats,
    aisleY,
    coolerEntry: [[6.8, aisleY], [6.8, 1.6]],
    meetingEntry: [[W - 5.6, aisleY], [W - 5.6, 2.7], [W - 4.3, 2.5]],
    board: [W - 2.4, 0],
  }
}

function peersPlan(team: Role[]): FloorPlan {
  const perSide = Math.max(1, Math.ceil(team.length / 2))
  const L = Math.max(3, perSide * 1.8 + 0.6)
  const W = Math.max(12, Math.ceil(L + 7))
  const D = 9
  const tx = (W - L) / 2
  const ty = 3.8
  const td = 1.6
  const aisleY = 2
  const frontY = ty + td + 1.4

  const furniture: Furniture[] = [
    { kind: 'table', x: tx, y: ty, w: L, d: td },
    { kind: 'board', x: W / 2, y: 0 },
    { kind: 'cooler', x: 0.6, y: 0.5 },
    { kind: 'plant', x: W - 1.2, y: 0.5 },
    { kind: 'sofa', x: W - 4.6, y: 0.4, w: 3 },
    { kind: 'plant', x: 0.5, y: D - 1.4 },
  ]

  const seats: Seat[] = team.map((role, i) => {
    const back = i % 2 === 0
    const slot = Math.floor(i / 2)
    const x = tx + 0.9 + slot * 1.8
    if (back) {
      const at: Pt = [x, ty - 0.55]
      return { role, at, exit: [at, [x, aisleY]] }
    }
    const at: Pt = [x, ty + td + 0.55]
    return { role, at, exit: [at, [x, frontY], [tx - 0.9, frontY], [tx - 0.9, aisleY]] }
  })

  return {
    W,
    D,
    style: 'peers',
    zones: [{ x: W - 5, y: 0, w: 5, d: 2.2, tone: 'lounge' }],
    furniture,
    seats,
    aisleY,
    coolerEntry: [[1.3, aisleY], [1.3, 1.4]],
    meetingEntry: null,
    board: [W / 2, 0],
  }
}
