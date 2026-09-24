import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Role } from '../types'
import { layoutChart, type LayoutNode } from '../lib/layout'
import { kindLabel } from '../lib/catalog'

interface OrgChartProps {
  roles: Role[]
  selectedRoleId: string | null
  onSelectRole: (role: Role | null) => void
  /** When true the parent gives the chart a definite height and the drawing scales to fill it. */
  fill?: boolean
}

const LABEL_W = 124
const LABEL_GAP = 18
const PAD_Y = 72
const MIN_RADIAL = 112

type Side = 'center' | 'center-top' | 'top' | 'bottom' | 'left' | 'right'

function labelSide(node: LayoutNode, centerLabelAbove: boolean): Side {
  if (node.angle === null) return centerLabelAbove ? 'center-top' : 'center'
  const c = Math.cos(node.angle)
  const s = Math.sin(node.angle)
  if (Math.abs(c) < 0.34) return s < 0 ? 'top' : 'bottom'
  return c > 0 ? 'right' : 'left'
}

export default function OrgChart({ roles, selectedRoleId, onSelectRole, fill = false }: OrgChartProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const width = size.width
  const layout = useMemo(() => layoutChart(roles), [roles])

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    setSize({ width: el.clientWidth, height: el.clientHeight })
    const ro = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const fillHeight = fill && size.height > 0 ? size.height : 0
  const widthFit = (width - 2 * (LABEL_W + LABEL_GAP)) / 2
  const heightFit = fillHeight ? (fillHeight - 2 * PAD_Y) / 2 : 250
  const radius = Math.min(widthFit, heightFit, 290)

  // Put the lead's label on whichever side (above or below) its reporting lines leave more room.
  const centerLabelAbove = useMemo(() => {
    const satellites = layout.nodes.filter(n => n.depth === 1 && n.angle !== null)
    const clearance = (target: number) =>
      Math.min(
        Math.PI,
        ...satellites.map(n => Math.abs(Math.atan2(Math.sin(n.angle! - target), Math.cos(n.angle! - target))))
      )
    return clearance(-Math.PI / 2) > clearance(Math.PI / 2) + 0.01
  }, [layout])
  const radial = width === 0 || radius >= MIN_RADIAL

  const related = useMemo(() => {
    const set = new Set<string>()
    if (!selectedRoleId) return set
    for (const e of layout.edges) {
      if (e.from === selectedRoleId) set.add(`${e.from}>${e.to}`)
      if (e.to === selectedRoleId) set.add(`${e.from}>${e.to}`)
    }
    return set
  }, [layout, selectedRoleId])

  const stateOf = (id: string) => (selectedRoleId === null ? '' : selectedRoleId === id ? 'is-selected' : 'is-dimmed')

  const clearOnBackdrop = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('button')) onSelectRole(null)
  }

  return (
    <div ref={stageRef} className={`chart-measure ${fill ? 'chart-measure--fill' : ''}`}>
      {radial ? renderRadial() : renderList()}
    </div>
  )

  function renderList() {
    const indentBase = layout.hub === 'peers' ? 1 : 0
    return (
      <div className="chart-stage chart-stage--list" onClick={clearOnBackdrop}>
        <ol className="chart-list">
          {layout.nodes.map((n, i) => (
            <li
              key={n.role.id}
              className={n.depth - indentBase > 0 ? 'is-child' : undefined}
              style={{ '--indent': n.depth - indentBase, '--i': i } as React.CSSProperties}
            >
              <button
                type="button"
                className={`list-node node--${n.role.kind} ${stateOf(n.role.id)}`}
                aria-pressed={selectedRoleId === n.role.id}
                onClick={() => onSelectRole(selectedRoleId === n.role.id ? null : (n.role as Role))}
              >
                <span className="node__dot" aria-hidden="true" />
                <span className="node__name">{n.role.name}</span>
                <span className="node__kind">{kindLabel[n.role.kind]}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  function renderRadial() {
    const height = fillHeight || Math.max(radius, 0) * 2 + PAD_Y * 2
    const cx = width / 2
    const cy = height / 2
    const outer = radius * layout.rings[layout.rings.length - 1]
    let ticks = ''
    for (let k = 0; k < 72; k++) {
      const a = (k / 72) * Math.PI * 2
      const len = k % 6 === 0 ? 9 : 4
      const c = Math.cos(a)
      const sn = Math.sin(a)
      ticks += `M${cx + c * (outer - len / 2)} ${cy + sn * (outer - len / 2)}L${cx + c * (outer + len / 2)} ${cy + sn * (outer + len / 2)}`
    }
    const pos = new Map(layout.nodes.map(n => [n.role.id, { x: cx + n.x * radius, y: cy + n.y * radius }]))

    return (
      <div
        className={`chart-stage ${selectedRoleId ? 'has-selection' : ''}`}
        style={{ height: width ? height : 560 }}
        onClick={clearOnBackdrop}
      >
        {width > 0 && (
          <>
            <svg className="chart-lines" width={width} height={height} aria-hidden="true">
              <path d={ticks} className="bezel" />
              <circle cx={cx} cy={cy} r={outer * 0.5} className="guide" />
              {layout.hub === 'peers' &&
                layout.nodes.flatMap((a, i) =>
                  layout.nodes.slice(i + 1).map(b => {
                    const pa = pos.get(a.role.id)!
                    const pb = pos.get(b.role.id)!
                    const lit = selectedRoleId === a.role.id || selectedRoleId === b.role.id
                    return (
                      <line
                        key={`${a.role.id}~${b.role.id}`}
                        x1={pa.x}
                        y1={pa.y}
                        x2={pb.x}
                        y2={pb.y}
                        className={`chord ${selectedRoleId ? (lit ? 'is-active' : 'is-faded') : ''}`}
                      />
                    )
                  })
                )}
              {layout.rings.map((r, i) => (
                <circle
                  key={r}
                  cx={cx}
                  cy={cy}
                  r={r * radius}
                  pathLength={1}
                  className={`ring ${layout.hub === 'peers' && i === 0 ? 'ring--peers' : ''}`}
                />
              ))}
              {layout.edges.map((e, i) => {
                const a = pos.get(e.from)
                const b = pos.get(e.to)
                if (!a || !b) return null
                const key = `${e.from}>${e.to}`
                const cls = selectedRoleId ? (related.has(key) ? 'is-active' : 'is-faded') : ''
                return (
                  <line
                    key={key}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    pathLength={1}
                    className={`edge ${cls}`}
                    style={{ '--i': i } as React.CSSProperties}
                  />
                )
              })}
              {layout.hub === 'peers' && (
                <g className="peer-hub">
                  <circle cx={cx} cy={cy} r={2.5} />
                  <text x={cx} y={cy + 22} textAnchor="middle">
                    {layout.nodes.length} peers
                  </text>
                </g>
              )}
            </svg>

            {layout.nodes.map((n, i) => {
              const p = pos.get(n.role.id)!
              const role = n.role as Role
              return (
                <button
                  key={role.id}
                  type="button"
                  className={`node node--${role.kind} label--${labelSide(n, centerLabelAbove)} ${stateOf(role.id)}`}
                  style={{ left: p.x, top: p.y, '--i': i } as React.CSSProperties}
                  aria-pressed={selectedRoleId === role.id}
                  aria-label={`${role.name}, ${kindLabel[role.kind]}`}
                  onClick={() => onSelectRole(selectedRoleId === role.id ? null : role)}
                >
                  <span className="node__dot" aria-hidden="true" />
                  <span className="node__label" aria-hidden="true">
                    <span className="node__name">{role.name}</span>
                    <span className="node__kind">{kindLabel[role.kind]}</span>
                  </span>
                </button>
              )
            })}
          </>
        )}
      </div>
    )
  }
}
