import { boxSvg, iso, quadSvg, type Faces } from '../lib/iso'
import { floorLabel, type Floor } from '../lib/catalog'

const FW = 6 // footprint
const FD = 4
const FLOOR_H = 26
const LOBBY_H = 34
const SLOTS = 12

interface TowerProps {
  floors: Floor[]
  hoveredId: string | null
  matchIds: Set<string> | null
  onHover: (id: string | null) => void
  onPick: (id: string) => void
}

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(Math.min(255, Math.max(0, v + (amt > 0 ? (255 - v) * amt : v * amt)))))
  return `#${ch.map(v => v.toString(16).padStart(2, '0')).join('')}`
}

export default function Tower({ floors, hoveredId, matchIds, onHover, onPick }: TowerProps) {
  const topZ = LOBBY_H + floors.length * FLOOR_H
  const corners = [iso(0, 0, topZ + 60), iso(FW, 0, topZ), iso(0, FD, 0), iso(FW, FD, -6), iso(0, FD, topZ)]
  const xs = corners.map(c => c[0])
  const ys = corners.map(c => c[1])
  const vb = { x: Math.min(...xs) - 34, y: Math.min(...ys) - 8, w: Math.max(...xs) - Math.min(...xs) + 52, h: Math.max(...ys) - Math.min(...ys) + 20 }

  let base = boxSvg(-1.5, -1.5, -6, FW + 3, FD + 3, 6, ['#d8d2c4', '#bdb5a4', '#aaa190'])
  base += boxSvg(0, 0, 0, FW, FD, LOBBY_H, ['#8d99ab', '#b9c6d6', '#9fadc0'])
  base += quadSvg([iso(FW / 2 - 0.8, FD, 0), iso(FW / 2 + 0.8, FD, 0), iso(FW / 2 + 0.8, FD, 24), iso(FW / 2 - 0.8, FD, 24)], '#3b4a60')
  base += quadSvg([iso(0.4, FD, 8), iso(FW / 2 - 1.2, FD, 8), iso(FW / 2 - 1.2, FD, 26), iso(0.4, FD, 26)], '#dcebf6')
  base += quadSvg([iso(FW / 2 + 1.2, FD, 8), iso(FW - 0.4, FD, 8), iso(FW - 0.4, FD, 26), iso(FW / 2 + 1.2, FD, 26)], '#dcebf6')

  const roof =
    boxSvg(0, 0, topZ, FW, FD, 6, ['#6b778a', '#5a6576', '#4d5766']) +
    boxSvg(FW - 2, 0.6, topZ + 6, 1.2, 1.2, 14, ['#9aa6b8', '#7a879b', '#667387']) +
    `<line x1="${iso(1.2, 1.2, topZ + 6)[0]}" y1="${iso(1.2, 1.2, topZ + 6)[1]}" x2="${iso(1.2, 1.2, topZ + 50)[0]}" y2="${iso(1.2, 1.2, topZ + 50)[1]}" stroke="#4d5766" stroke-width="2"/>` +
    `<circle cx="${iso(1.2, 1.2, topZ + 52)[0]}" cy="${iso(1.2, 1.2, topZ + 52)[1]}" r="3" fill="#e5484d"/>`

  return (
    <svg className="tower" viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} role="group" aria-label="The tower. Each floor is one team.">
      <g aria-hidden="true" dangerouslySetInnerHTML={{ __html: base }} />
      {floors.map((f, i) => {
        const z = LOBBY_H + i * FLOOR_H
        const hot = hoveredId === f.id
        const dim = matchIds !== null && !matchIds.has(f.id)
        const wall: Faces = dim ? ['#c9ccd2', '#c3c7ce', '#b5bac2'] : hot ? ['#f4f1ea', '#f7f4ee', shade(f.wing.color, 0.15)] : ['#e7e2d8', '#ece7dd', f.wing.color]
        let s = boxSvg(0, 0, z, FW, FD, FLOOR_H, wall)
        const lit = Math.min(f.roleCount, SLOTS)
        for (let k = 0; k < SLOTS; k++) {
          const x0 = 0.18 + k * 0.48
          const on = k < lit
          const fill = dim ? (on ? '#d8d2b8' : '#aab1bb') : on ? (hot ? '#ffe27a' : '#ffd25e') : '#44546b'
          s += quadSvg([iso(x0, FD, z + 6), iso(x0 + 0.32, FD, z + 6), iso(x0 + 0.32, FD, z + FLOOR_H - 6), iso(x0, FD, z + FLOOR_H - 6)], fill)
        }
        s += `<line x1="${iso(0, FD, z)[0]}" y1="${iso(0, FD, z)[1]}" x2="${iso(FW, FD, z)[0]}" y2="${iso(FW, FD, z)[1]}" stroke="#9a9384" stroke-width="1"/>`
        const [lx, ly] = iso(0, FD, z + FLOOR_H / 2)
        return (
          <g
            key={f.id}
            className={`tower-floor${hot ? ' is-hot' : ''}${dim ? ' is-dim' : ''}`}
            role="link"
            tabIndex={-1}
            aria-label={`Floor ${f.level}: ${f.title}`}
            onMouseEnter={() => onHover(f.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onPick(f.id)}
          >
            <g dangerouslySetInnerHTML={{ __html: s }} />
            <text x={lx - 8} y={ly + 4} textAnchor="end" className="tower-num">{floorLabel(f.level)}</text>
          </g>
        )
      })}
      <g aria-hidden="true" dangerouslySetInnerHTML={{ __html: roof }} />
    </svg>
  )
}
