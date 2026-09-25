import { useEffect, useMemo, useRef, useState } from 'react'
import type { Chart } from '../types'
import type { FloorPlan, Furniture, Seat } from '../lib/layout'
import type { RoutineRun } from '../lib/routines'
import { DAY_START } from '../lib/routines'
import { alongPath, boxSvg, iso, quadSvg, type Faces, type Pt } from '../lib/iso'

const WALL_H = 70
const WOOD: Faces = ['#b98450', '#8b5a2b', '#6e4521']
const GLASS: Faces = ['#d7eef9', '#a9d3ea', '#8fc0dc']
const WALL: Faces = ['#9aa6b8', '#7a879b', '#667387']
const SCREEN: Faces = ['#2b2d42', '#23253a', '#34374f']
const ZONE: Record<string, Faces> = {
  office: ['#c3cde0', '#a5b1c7', '#96a2b8'],
  meeting: ['#cfdcbc', '#b2c19d', '#a1b08b'],
  lounge: ['#e6d3c2', '#cdb6a1', '#bfa791'],
}
const SHIRTS = ['#4f7cff', '#2bb673', '#d9534f', '#9b59b6', '#16a2b8', '#e67e22', '#3d5a80', '#c0392b', '#27ae60', '#8e44ad', '#d35400']
const LEAD_SHIRT = '#e0a526'
const SKIN = ['#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#ffdbac']
const HAIR = ['#3b2a1a', '#1c1c1c', '#7a4a21', '#b5651d', '#4a3222']

export interface Trip {
  seat: number
  path: Pt[]
  leave: number
  arrive: number
  stay: number
}

interface IsoFloorProps {
  chart: Chart
  plan: FloorPlan
  minute: number
  tick: number
  runs: RoutineRun[]
  selectedRoleId: string | null
  onSelect: (roleId: string) => void
  onVan: () => void
  onCopyBot: () => void
}

const WALK = 6 // simulated minutes to walk anywhere on the floor

// Everyone's movement is a pure function of the simulated minute, so scrubbing
// the clock replays the day exactly.
function buildTrips(plan: FloorPlan, runs: RoutineRun[]): Trip[] {
  const trips: Trip[] = []
  const leadIdx = plan.style === 'hierarchy' ? 0 : -1
  if (leadIdx === 0 && plan.meetingEntry) {
    const times = [...new Set(runs.filter(r => r.kind !== 'interval').map(r => r.at))]
    times.forEach(at => {
      trips.push({ seat: 0, path: [...plan.seats[0].exit, ...plan.meetingEntry!], leave: at - WALK, arrive: at, stay: 14 })
    })
  }
  plan.seats.forEach((_, i) => {
    if (i === leadIdx) return
    let t = DAY_START + 35 + ((i * 97) % 170)
    while (t < DAY_START + 11 * 60) {
      trips.push({ seat: i, path: [...plan.seats[i].exit, ...plan.coolerEntry], leave: t, arrive: t + WALK, stay: 7 })
      t += 150 + ((i * 53) % 110)
    }
  })
  return trips
}

function positionOf(seat: Seat, idx: number, trips: Trip[], minute: number): { at: Pt; walking: boolean } {
  for (const trip of trips) {
    if (trip.seat !== idx) continue
    const back = trip.arrive + trip.stay
    if (minute < trip.leave || minute > back + WALK) continue
    if (minute < trip.arrive) return { at: alongPath(trip.path, (minute - trip.leave) / WALK), walking: true }
    if (minute <= back) return { at: trip.path[trip.path.length - 1], walking: false }
    return { at: alongPath([...trip.path].reverse(), (minute - back) / WALK), walking: true }
  }
  return { at: seat.at, walking: false }
}

function skyColor(minute: number): string {
  const stops: Array<[number, [number, number, number]]> = [
    [7 * 60, [246, 201, 160]],
    [9 * 60, [165, 214, 240]],
    [16 * 60, [165, 214, 240]],
    [18 * 60, [240, 162, 122]],
    [19 * 60, [110, 110, 160]],
  ]
  let a = stops[0]
  let b = stops[stops.length - 1]
  for (let i = 1; i < stops.length; i++) {
    if (minute <= stops[i][0]) {
      a = stops[i - 1]
      b = stops[i]
      break
    }
  }
  const k = b[0] === a[0] ? 0 : Math.min(Math.max((minute - a[0]) / (b[0] - a[0]), 0), 1)
  const c = a[1].map((v, i) => Math.round(v + (b[1][i] - v) * k))
  return `rgb(${c.join(',')})`
}

function furnitureKey(f: Furniture): number {
  switch (f.kind) {
    case 'desk':
    case 'table':
    case 'glass':
      return f.x + f.w / 2 + f.y + f.d / 2
    case 'sofa':
      return f.x + f.w / 2 + f.y + 0.5
    case 'board':
      return -1
    default:
      return f.x + f.y + 0.6
  }
}

function furnitureSvg(f: Furniture, tick: number, boardOn: boolean): string {
  switch (f.kind) {
    case 'desk': {
      let s = boxSvg(f.x, f.y, 0, f.w, f.d, 14, WOOD)
      if (f.monitor) {
        const glow = (tick >> 3) % 7 === 0 ? '#bdeeff' : '#7fd1ff'
        s += boxSvg(f.x + 0.7, f.y + 0.1, 14, 0.6, 0.12, 11, [SCREEN[0], glow, SCREEN[2]])
      }
      return s
    }
    case 'table':
      return boxSvg(f.x, f.y, 0, f.w, f.d, 14, WOOD)
    case 'glass':
      return boxSvg(f.x, f.y, 0, f.w, f.d, 40, GLASS, 0.5)
    case 'cooler':
      return boxSvg(f.x, f.y, 0, 0.6, 0.6, 18, ['#e9eef3', '#c9d2dc', '#b4bfcb']) + boxSvg(f.x + 0.1, f.y + 0.1, 18, 0.4, 0.4, 12, ['#bfe6ff', '#8fd0f7', '#7cc2ec'], 0.9)
    case 'plant': {
      const [px, py] = iso(f.x + 0.3, f.y + 0.3, 10)
      return boxSvg(f.x, f.y, 0, 0.6, 0.6, 10, ['#b07a45', '#8a5a33', '#6b4420']) + `<circle cx="${px}" cy="${py - 10}" r="11" fill="#3f7d3a"/><circle cx="${px + 6}" cy="${py - 16}" r="7" fill="#4f9448"/>`
    }
    case 'sofa':
      return boxSvg(f.x, f.y, 0, f.w, 1, 9, ['#7c8fb5', '#62749a', '#566789']) + boxSvg(f.x, f.y, 9, f.w, 0.3, 9, ['#8a9cc0', '#6b7da3', '#5d6e93'])
    case 'board': {
      const a = iso(f.x - 1.1, f.y, 26)
      const b = iso(f.x + 1.1, f.y, 26)
      const c = iso(f.x + 1.1, f.y, 52)
      const d = iso(f.x - 1.1, f.y, 52)
      return quadSvg([a, b, c, d], boardOn ? '#ffe58a' : '#2b2d42') + quadSvg([a, b, c, d], 'none', `stroke="${boardOn ? '#d9a400' : '#1a1b29'}" stroke-width="2"`)
    }
  }
}

function personSvg(at: Pt, shirt: string, skin: string, hair: string, bob: number, selected: boolean): string {
  const [px, py] = iso(at[0], at[1])
  const y = py - bob
  let s = `<ellipse cx="${px}" cy="${py}" rx="10" ry="4.5" fill="#000" fill-opacity="0.18"/>`
  if (selected) s += `<ellipse cx="${px}" cy="${py}" rx="17" ry="8" fill="none" stroke="#e5484d" stroke-width="2.5"/>`
  s += `<rect x="${px - 6.5}" y="${y - 25}" width="13" height="19" rx="4.5" fill="${shirt}"/>`
  s += `<circle cx="${px}" cy="${y - 31}" r="7" fill="${skin}"/>`
  s += `<path d="M${px - 7} ${y - 32}a7 7 0 0 1 14 0z" fill="${hair}"/>`
  return s
}

export default function IsoFloor({ chart, plan, minute, tick, runs, selectedRoleId, onSelect, onVan, onCopyBot }: IsoFloorProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width) // measure now; the observer's first callback can wait a frame
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const trips = useMemo(() => buildTrips(plan, runs), [plan, runs])

  const van = { x: plan.W + 0.8, y: plan.D - 2.4 }
  const box = useMemo(() => {
    const corners = [iso(0, 0, WALL_H), iso(plan.W, 0, WALL_H), iso(0, plan.D, -8), iso(plan.W, plan.D, -8), iso(0, 0, WALL_H), iso(van.x + 3, van.y, 30), iso(van.x + 3, van.y + 1.5, 0), iso(0, plan.D, 0)]
    const xs = corners.map(c => c[0])
    const ys = corners.map(c => c[1])
    const pad = 18
    return { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad - 30, w: Math.max(...xs) - Math.min(...xs) + pad * 2, h: Math.max(...ys) - Math.min(...ys) + pad * 2 + 30 }
  }, [plan, van.x, van.y])

  // When the scene renders much smaller than its own units, always-on name tags would
  // be unreadable and collide: show them only for the active person, enlarge them back
  // to ~11px on screen, give everyone a bigger tap target, and dock the card below.
  const scale = width ? width / box.w : 1
  const compact = scale < 0.7
  const k = compact ? Math.min(2.6, 0.95 / scale) : 1

  const boardRuns = runs.filter(r => minute >= r.at && minute < r.at + (r.kind === 'interval' ? 4 : 14))
  const boardOn = boardRuns.length > 0

  const people = plan.seats.map((seat, i) => {
    const pos = positionOf(seat, i, trips, minute)
    const lead = seat.role.kind === 'orchestrator'
    return {
      seat,
      ...pos,
      shirt: lead ? LEAD_SHIRT : SHIRTS[(i - (plan.style === 'hierarchy' ? 1 : 0) + SHIRTS.length) % SHIRTS.length],
      skin: SKIN[(i * 3) % SKIN.length],
      hair: HAIR[(i * 2) % HAIR.length],
      lead,
    }
  })

  const art = useMemo(() => {
    const { W, D } = plan
    let s = boxSvg(0, 0, -8, W, D, 8, ['#e4ca9f', '#bb9c6e', '#a78959'])
    for (let i = 1; i < W; i++) {
      const a = iso(i, 0)
      const b = iso(i, D)
      s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#d2b688" stroke-width="1"/>`
    }
    for (let j = 1; j < D; j++) {
      const a = iso(0, j)
      const b = iso(W, j)
      s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#d2b688" stroke-width="1"/>`
    }
    s += boxSvg(0, -0.3, 0, W, 0.3, WALL_H, WALL) + boxSvg(-0.3, -0.3, 0, 0.3, D + 0.3, WALL_H, WALL)
    const sky = skyColor(minute)
    for (let i = 1; i + 1.6 < W; i += 2.6) {
      if (plan.style === 'hierarchy' && i > W - 4 && i < W - 0.5) continue
      s += quadSvg([iso(i, 0, 22), iso(i + 1.6, 0, 22), iso(i + 1.6, 0, 56), iso(i, 0, 56)], sky)
    }
    for (let j = 1; j + 1.6 < D; j += 2.6) {
      s += quadSvg([iso(0, j, 22), iso(0, j + 1.6, 22), iso(0, j + 1.6, 56), iso(0, j, 56)], sky)
    }
    plan.zones.forEach(z => {
      s += boxSvg(z.x, z.y, 0, z.w, z.d, 1, ZONE[z.tone])
    })
    return s
  }, [plan, minute])

  const items: Array<{ k: number; s: string }> = plan.furniture.map(f => ({ k: furnitureKey(f), s: furnitureSvg(f, tick, boardOn) }))
  people.forEach((p, i) => {
    const bob = p.walking ? ((tick >> 1) % 2) * 2 : ((tick >> 3) + i) % 4 === 0 ? 1.5 : 0
    items.push({ k: p.at[0] + p.at[1], s: personSvg(p.at, p.shirt, p.skin, p.hair, bob, selectedRoleId === p.seat.role.id) })
  })
  items.push({
    k: 999,
    s:
      boxSvg(van.x, van.y, 4, 3, 1.4, 26, ['#f7f7f7', '#dedede', '#c8c8c8']) +
      quadSvg([iso(van.x, van.y + 1.4, 12), iso(van.x + 3, van.y + 1.4, 12), iso(van.x + 3, van.y + 1.4, 17), iso(van.x, van.y + 1.4, 17)], '#e5484d') +
      boxSvg(van.x + 3, van.y + 0.1, 4, 0.9, 1.2, 16, ['#eeeeee', '#d4d4d4', '#bfbfbf']) +
      quadSvg([iso(van.x + 3.9, van.y + 0.3, 10), iso(van.x + 3.9, van.y + 1.1, 10), iso(van.x + 3.9, van.y + 1.1, 18), iso(van.x + 3.9, van.y + 0.3, 18)], '#9fd3ef') +
      [0.6, 3.3].map(dx => { const [cx, cy] = iso(van.x + dx, van.y + 1.4, 4); return `<ellipse cx="${cx}" cy="${cy}" rx="6" ry="6" fill="#222"/>` }).join(''),
  })
  items.sort((a, b) => a.k - b.k)

  const boardPt = iso(plan.board[0], plan.board[1], 60)
  const vanPt = iso(van.x + 1.8, van.y + 0.7, 48)
  const hoveredPerson = selectedRoleId ? undefined : people.find(p => p.seat.role.id === hovered)
  const selectedPerson = people.find(p => p.seat.role.id === selectedRoleId)
  const manager = selectedPerson?.seat.role.reports_to ? chart.roles.find(r => r.id === selectedPerson.seat.role.reports_to) : null

  const pct = (x: number, y: number) => ({ left: `${((x - box.x) / box.w) * 100}%`, top: `${((y - box.y) / box.h) * 100}%` })

  return (
    <div className={`iso-floor${compact ? ' is-compact' : ''}`} ref={wrapRef} onMouseLeave={() => setHovered(null)}>
      <svg viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`} role="group" aria-label={`${chart.title} floor. ${chart.roles.length} bots.`}>
        <g aria-hidden="true" dangerouslySetInnerHTML={{ __html: art + items.map(i => i.s).join('') }} />
        {boardOn && (
          <g aria-hidden="true" className="board-bubble">
            <BubbleSvg x={boardPt[0]} y={boardPt[1] - 6} lines={[...new Set(boardRuns.map(r => r.name))]} />
          </g>
        )}
        {people.map(p => {
          const [px, py] = iso(p.at[0], p.at[1])
          const label = p.seat.role.name
          const w = (label.length * 6.7 + 14) * k
          const active = selectedRoleId === p.seat.role.id || hovered === p.seat.role.id
          return (
            <g
              key={p.seat.role.id}
              className={`person-hit${active ? ' is-active' : ''}${p.lead ? ' is-lead' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${label}${p.lead ? ', orchestrator' : ''}. ${p.seat.role.summary}`}
              aria-pressed={selectedRoleId === p.seat.role.id}
              onClick={() => onSelect(p.seat.role.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(p.seat.role.id)
                }
              }}
              onMouseEnter={() => setHovered(p.seat.role.id)}
              onFocus={() => setHovered(p.seat.role.id)}
              onBlur={() => setHovered(h => (h === p.seat.role.id ? null : h))}
            >
              <rect x={px - (compact ? 30 : 14)} y={py - (compact ? 62 : 42)} width={compact ? 60 : 28} height={compact ? 72 : 46} fill="transparent" />
              <rect className="tag-bg" x={px - w / 2} y={py - 46 - 18 * k} width={w} height={18 * k} rx={4 * k} />
              <text className="tag-text" x={px} y={py - 46 - 5 * k} textAnchor="middle" style={compact ? { fontSize: 11 * k } : undefined}>{label}</text>
            </g>
          )
        })}
        <g
          className="van-hit"
          role="button"
          tabIndex={0}
          aria-label="Move this team in: copy the import prompt"
          onClick={onVan}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onVan()
            }
          }}
        >
          {(() => {
            const w = 148 * k
            const x = Math.min(vanPt[0] - w / 2, box.x + box.w - w - 6)
            return (
              <>
                <rect x={x} y={vanPt[1] - 20 * k} width={w} height={20 * k} rx={4 * k} />
                <text x={x + w / 2} y={vanPt[1] - 6 * k} textAnchor="middle" style={compact ? { fontSize: 11 * k } : undefined}>Move this team in →</text>
              </>
            )
          })()}
        </g>
      </svg>
      {compact && !selectedPerson && <p className="tap-hint">Tap anyone on the floor to meet them.</p>}
      {hoveredPerson && !compact && (
        <div className="person-tip" style={pct(...iso(hoveredPerson.at[0], hoveredPerson.at[1]))} role="presentation">
          <strong>{hoveredPerson.seat.role.name}</strong>
          <span>{hoveredPerson.seat.role.summary}</span>
        </div>
      )}
      {selectedPerson && (() => {
        const [sx, sy] = iso(selectedPerson.at[0], selectedPerson.at[1])
        const onLeft = (sx - box.x) / box.w > 0.55
        return (
          <div className={`person-card${compact ? ' is-docked' : onLeft ? ' is-left' : ''}`} style={compact ? undefined : pct(sx + (onLeft ? -22 : 22), sy - 22)} role="dialog" aria-label={selectedPerson.seat.role.name}>
            <div className="person-card-head">
              <strong>{selectedPerson.seat.role.name}</strong>
              <button type="button" className="person-card-x" onClick={() => onSelect(selectedPerson.seat.role.id)} aria-label="Close">×</button>
            </div>
            <span className="person-card-kind">{selectedPerson.lead ? 'Orchestrator' : manager ? `Reports to ${manager.name}` : 'Peer'}</span>
            <p>{selectedPerson.seat.role.summary}</p>
            <button type="button" className="btn-secondary" onClick={onCopyBot}>Copy this bot</button>
          </div>
        )
      })()}
    </div>
  )
}

function BubbleSvg({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  const shown = lines.slice(0, 3)
  if (lines.length > 3) shown[2] = `+${lines.length - 2} more routines`
  const w = Math.max(...shown.map(l => l.length)) * 6.7 + 24
  const h = shown.length * 15 + 10
  return (
    <>
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={5} fill="#fff7d6" stroke="#d9b650" />
      {shown.map((l, i) => (
        <text key={i} x={x} y={y - h + 18 + i * 15} textAnchor="middle" className="bubble-text">
          {l}
        </text>
      ))}
    </>
  )
}

