import { useMemo } from 'react'
import type { RoleShape } from '../types'
import { layoutChart } from '../lib/layout'

const R = 0.92

export default function Constellation({ shape }: { shape: RoleShape[] }) {
  const layout = useMemo(() => layoutChart(shape), [shape])
  const pos = new Map(layout.nodes.map(n => [n.role.id, n]))

  return (
    <svg className="constellation" viewBox="-1.5 -1.125 3 2.25" role="img" aria-hidden="true">
      <g className="constellation__rotor">
        {layout.rings.map(r => (
          <circle
            key={r}
            r={r * R}
            className={layout.hub === 'peers' && r === layout.rings[0] ? 'c-ring c-ring--peers' : 'c-ring'}
          />
        ))}
        {layout.hub === 'peers' && <circle r={0.035} className="c-hub" />}
        {layout.edges.map(e => {
          const a = pos.get(e.from)
          const b = pos.get(e.to)
          if (!a || !b) return null
          return <line key={`${e.from}-${e.to}`} x1={a.x * R} y1={a.y * R} x2={b.x * R} y2={b.y * R} className="c-edge" />
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
