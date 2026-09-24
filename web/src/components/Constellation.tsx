import { useMemo } from 'react'
import type { RoleShape } from '../types'
import { layoutChart } from '../lib/layout'

const R = 0.92

export default function Constellation({ shape }: { shape: RoleShape[] }) {
  const layout = useMemo(() => layoutChart(shape), [shape])
  const pos = new Map(layout.nodes.map(n => [n.role.id, n]))
  let ticks = ''
  for (let k = 0; k < 48; k++) {
    const a = (k / 48) * Math.PI * 2
    const len = k % 4 === 0 ? 0.07 : 0.035
    const c = Math.cos(a) * R
    const sn = Math.sin(a) * R
    const f = len / 2 / R
    ticks += `M${c * (1 - f)} ${sn * (1 - f)}L${c * (1 + f)} ${sn * (1 + f)}`
  }

  return (
    <svg className="constellation" viewBox="-1.5 -1.125 3 2.25" role="img" aria-hidden="true">
      <g className="constellation__rotor">
        <path d={ticks} className="c-bezel" />
        {layout.rings.map(r => (
          <circle
            key={r}
            r={r * R}
            className={layout.hub === 'peers' && r === layout.rings[0] ? 'c-ring c-ring--peers' : 'c-ring'}
          />
        ))}
        {layout.hub === 'peers' && <circle r={0.035} className="c-hub" />}
        {layout.hub === 'peers' &&
          layout.nodes.flatMap((a, i) =>
            layout.nodes
              .slice(i + 1)
              .map(b => (
                <line
                  key={`${a.role.id}~${b.role.id}`}
                  x1={a.x * R}
                  y1={a.y * R}
                  x2={b.x * R}
                  y2={b.y * R}
                  className="c-chord"
                />
              ))
          )}
        {layout.edges.map(e => {
          const a = pos.get(e.from)
          const b = pos.get(e.to)
          if (!a || !b) return null
          return (
            <line key={`${e.from}-${e.to}`} x1={a.x * R} y1={a.y * R} x2={b.x * R} y2={b.y * R} className="c-edge" />
          )
        })}
        {layout.nodes.map(n => (
          <g key={n.role.id} transform={`translate(${n.x * R} ${n.y * R})`}>
            {n.role.kind === 'orchestrator' && <circle r={0.16} className="c-halo" />}
            <circle r={n.role.kind === 'orchestrator' ? 0.085 : 0.055} className={`c-dot c-dot--${n.role.kind}`} />
          </g>
        ))}
      </g>
    </svg>
  )
}
