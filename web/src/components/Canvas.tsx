import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { getCreditInfo } from '../credits'
import type { Box, TreeLayout, TreeNode } from '../lib/tree'

export interface Camera {
  x: number
  y: number
  k: number
}

export interface Focus {
  key: string
  box: Box
  minK?: number // never zoom out past this; the box is centred and may overflow
}

interface CanvasProps {
  layout: TreeLayout
  focus: Focus
  inset: Inset
  selectedTeamId: string | null
  selectedRoleId: string | null
  emptyHint: string | null // shown beside You while no team is hired yet
  newTeamId: string | null // just hired: pulses once
  onYou: () => void
  onTeam: (teamId: string) => void
  onHire: (teamId: string) => void
  onLetGo: (teamId: string) => void
  onRole: (teamId: string, roleId: string) => void
  onBackground: () => void
}

const MIN_K = 0.2
const MAX_K = 2
const TWEEN_MS = 380
const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k))
const ease = (t: number) => 1 - Math.pow(1 - t, 3)
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Pos = Map<string, { x: number; y: number }>
export interface Inset {
  top: number
  left: number
  right: number
  bottom: number
}

// Fit a world-space box into the part of the viewport no overlay covers.
function fit(box: Box, vw: number, vh: number, inset: Inset, minK = MIN_K): Camera {
  const pad = 40
  const aw = Math.max(vw - inset.left - inset.right, 200)
  const ah = Math.max(vh - inset.top - inset.bottom, 200)
  const k = clampK(Math.max(minK, Math.min(aw / (box.w + pad * 2), ah / (box.h + pad * 2), 1)))
  return { k, x: inset.left + (aw - box.w * k) / 2 - box.x * k, y: inset.top + (ah - box.h * k) / 2 - box.y * k }
}

export default function Canvas({ layout, focus, inset, selectedTeamId, selectedRoleId, emptyHint, newTeamId, onYou, onTeam, onHire, onLetGo, onRole, onBackground }: CanvasProps) {
  const viewRef = useRef<HTMLDivElement>(null)
  const [cam, setCam] = useState<Camera>({ x: 0, y: 0, k: 1 })
  const camRef = useRef(cam)
  const [pos, setPos] = useState<Pos>(() => new Map(layout.nodes.map(n => [n.id, { x: n.x, y: n.y }])))
  const posRef = useRef(pos)
  const anim = useRef<number | null>(null)

  // Mirror the latest committed state for event handlers and the tween below.
  // Declared first so it runs before the tween effect in the same commit.
  useLayoutEffect(() => {
    camRef.current = cam
    posRef.current = pos
  })

  // Animate node positions and the camera together whenever the layout or focus changes.
  useLayoutEffect(() => {
    const el = viewRef.current
    if (!el) return
    const from = posRef.current
    const target: Pos = new Map(layout.nodes.map(n => [n.id, { x: n.x, y: n.y }]))
    const start: Pos = new Map(
      layout.nodes.map(n => {
        const prev = from.get(n.id) ?? (n.parentId ? from.get(n.parentId) : undefined) ?? { x: n.x, y: n.y }
        return [n.id, prev]
      }),
    )
    const camFrom = camRef.current
    const first = from.size === 0 || !el.dataset.ready || ![camFrom.x, camFrom.y, camFrom.k].every(Number.isFinite)
    const camTo = fit(focus.box, el.clientWidth, el.clientHeight, inset, focus.minK)
    el.dataset.ready = '1'
    if (anim.current) cancelAnimationFrame(anim.current)
    if (first || reducedMotion()) {
      setPos(target)
      setCam(camTo)
      return
    }
    const t0 = performance.now()
    const step = (now: number) => {
      const t = ease(Math.min((now - t0) / TWEEN_MS, 1))
      const next: Pos = new Map()
      target.forEach((to, id) => {
        const a = start.get(id)!
        next.set(id, { x: a.x + (to.x - a.x) * t, y: a.y + (to.y - a.y) * t })
      })
      setPos(next)
      setCam({ x: camFrom.x + (camTo.x - camFrom.x) * t, y: camFrom.y + (camTo.y - camFrom.y) * t, k: camFrom.k + (camTo.k - camFrom.k) * t })
      anim.current = t < 1 ? requestAnimationFrame(step) : null
    }
    anim.current = requestAnimationFrame(step)
  }, [layout, focus, inset])

  // Wheel: pan by default, zoom with ctrl/⌘ (trackpad pinch arrives as ctrl+wheel).
  useEffect(() => {
    const el = viewRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (anim.current) cancelAnimationFrame(anim.current)
      anim.current = null
      const c = camRef.current
      if (e.ctrlKey || e.metaKey) {
        const r = el.getBoundingClientRect()
        const px = e.clientX - r.left
        const py = e.clientY - r.top
        const k = clampK(c.k * Math.exp(-Math.max(-40, Math.min(40, e.deltaY)) * 0.01)) // mouse wheels send ~100/notch; trackpads send small deltas
        setCam({ k, x: px - ((px - c.x) / c.k) * k, y: py - ((py - c.y) / c.k) * k })
      } else {
        setCam({ ...c, x: c.x - e.deltaX, y: c.y - e.deltaY })
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Drag to pan (from anywhere, nodes included) and two-finger pinch to zoom.
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const drag = useRef<{ x: number; y: number; cam: Camera; moved: boolean; pinch?: { d: number; mx: number; my: number } } | null>(null)
  const suppressClick = useRef(false)

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (anim.current) cancelAnimationFrame(anim.current)
    anim.current = null
    const pts = [...pointers.current.values()]
    if (pts.length === 2) {
      const r = viewRef.current!.getBoundingClientRect()
      drag.current = {
        x: 0,
        y: 0,
        cam: camRef.current,
        moved: true,
        pinch: { d: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), mx: (pts[0].x + pts[1].x) / 2 - r.left, my: (pts[0].y + pts[1].y) / 2 - r.top },
      }
    } else {
      drag.current = { x: e.clientX, y: e.clientY, cam: camRef.current, moved: false }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId) || !drag.current) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const d = drag.current
    if (d.pinch) {
      const pts = [...pointers.current.values()]
      if (pts.length < 2) return
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      const k = clampK(d.cam.k * (dist / d.pinch.d))
      setCam({ k, x: d.pinch.mx - ((d.pinch.mx - d.cam.x) / d.cam.k) * k, y: d.pinch.my - ((d.pinch.my - d.cam.y) / d.cam.k) * k })
      return
    }
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.moved && Math.hypot(dx, dy) < 5) return
    if (!d.moved) viewRef.current?.setPointerCapture(e.pointerId)
    d.moved = true
    setCam({ ...d.cam, x: d.cam.x + dx, y: d.cam.y + dy })
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (drag.current?.moved) suppressClick.current = true
    if (pointers.current.size === 0) drag.current = null
  }

  const zoomBy = (f: number) => {
    const el = viewRef.current!
    const c = camRef.current
    const px = inset.left + (el.clientWidth - inset.left - inset.right) / 2
    const py = inset.top + (el.clientHeight - inset.top - inset.bottom) / 2
    const k = clampK(c.k * f)
    setCam({ k, x: px - ((px - c.x) / c.k) * k, y: py - ((py - c.y) / c.k) * k })
  }

  const fitAll = () => {
    const el = viewRef.current!
    const b = { x: Math.min(...layout.nodes.map(n => n.x)), y: Math.min(...layout.nodes.map(n => n.y)), w: 0, h: 0 }
    b.w = Math.max(...layout.nodes.map(n => n.x + n.w)) - b.x
    b.h = Math.max(...layout.nodes.map(n => n.y + n.h)) - b.y
    setCam(fit(b, el.clientWidth, el.clientHeight, inset))
  }

  const at = (n: TreeNode) => pos.get(n.id) ?? { x: n.x, y: n.y }

  const links = layout.nodes
    .filter(n => n.parentId)
    .map(n => {
      const p = layout.byId.get(n.parentId!)!
      const a = at(p)
      const b = at(n)
      const x1 = a.x + p.w
      const y1 = a.y + p.h / 2
      const x2 = b.x
      const y2 = b.y + n.h / 2
      const mx = (x1 + x2) / 2
      const hot = n.team?.chart.id === selectedTeamId
      return <path key={n.id} d={`M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} className={`link${hot ? ' is-hot' : ''}${n.candidate ? ' is-candidate' : ''}`} />
    })

  return (
    <div
      ref={viewRef}
      className="canvas"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={e => {
        if (suppressClick.current) {
          suppressClick.current = false
          e.stopPropagation()
          e.preventDefault()
        }
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onBackground()
      }}
    >
      <div className="world" style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})` }}>
        <svg className="links" aria-hidden="true">{links}</svg>
        {layout.nodes.map(n => {
          const p = at(n)
          const style = { transform: `translate(${p.x}px, ${p.y}px)`, width: n.w, height: n.h }
          if (n.kind === 'root') {
            return (
              <button key={n.id} type="button" className="node node-role node-you" style={style} onClick={onYou} aria-label="You, the boss. Show your whole org.">
                <Avatar index={0} lead={false} boss height={66} />
                <span className="role-text">
                  <span className="tag tag-you">You</span>
                  <span className="role-kind">Boss</span>
                </span>
                {emptyHint && <span className="empty-hint">{emptyHint}</span>}
              </button>
            )
          }
          if (n.kind === 'team') {
            const t = n.team!
            const credit = getCreditInfo(t.chart.id)
            const lead = t.chart.roles.find(r => r.kind === 'orchestrator')
            const id = t.chart.id
            return (
              <div
                key={n.id}
                className={`node node-team${selectedTeamId === id ? ' is-selected' : ''}${n.candidate ? ' is-candidate' : ''}${newTeamId === id ? ' is-new' : ''}`}
                style={{ ...style, borderLeftColor: t.wing.color }}
              >
                <button
                  type="button"
                  className="team-open"
                  onClick={() => onTeam(id)}
                  aria-pressed={selectedTeamId === id}
                  aria-label={`${t.chart.title} team, ${t.chart.roles.length} bots${t.chart.routines?.length ? `, ${t.chart.routines.length} routines` : ''}${n.candidate ? ', not hired yet' : ''}`}
                >
                  <span className="team-top">
                    <span className="team-title">{t.chart.title}</span>
                    <span className="team-tags">
                      {(t.chart.routines?.length ?? 0) > 0 && (
                        <span className="routine-chip" title={`${t.chart.routines!.length} scheduled routine${t.chart.routines!.length > 1 ? 's' : ''}`}>
                          <svg className="clock-ico" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8 4.6V8l2.4 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                          {t.chart.routines!.length}
                        </span>
                      )}
                      <span className="team-wing">{n.candidate ? 'Candidate' : t.wing.label}</span>
                    </span>
                  </span>
                  <span className="team-bottom">
                    <span className="stack" aria-hidden="true">
                      {t.chart.roles.slice(0, 6).map((r, i) => (
                        <Avatar key={r.id} index={i} lead={r.kind === 'orchestrator'} height={24} />
                      ))}
                    </span>
                    <span className="team-meta">
                      {t.chart.roles.length} bots{lead ? '' : ' · peers'}
                      {credit.url ? ` · ${credit.text}` : ''}
                    </span>
                  </span>
                </button>
                {n.candidate ? (
                  <button type="button" className="team-hire" onClick={() => onHire(id)}>＋ Hire</button>
                ) : (
                  <button type="button" className="team-x" onClick={() => onLetGo(id)} aria-label={`Let ${t.chart.title} go`} title="Let go">×</button>
                )}
              </div>
            )
          }
          const r = n.role!
          const t = n.team!
          const peers = !t.chart.roles.some(x => x.kind === 'orchestrator')
          const selected = selectedTeamId === t.chart.id && selectedRoleId === r.id
          return (
            <button
              key={n.id}
              type="button"
              className={`node node-role${selected ? ' is-selected' : ''}${r.kind === 'orchestrator' ? ' is-lead' : ''}${n.candidate ? ' is-candidate' : ''}`}
              style={style}
              onClick={() => onRole(t.chart.id, r.id)}
              aria-pressed={selected}
              aria-label={`${r.name}, ${t.chart.title}. ${r.summary}`}
            >
              <Avatar index={n.roleIndex ?? 0} lead={r.kind === 'orchestrator'} height={60} selected={selected} />
              <span className="role-text">
                <span className="tag">{r.name}</span>
                <span className="role-kind">{r.kind === 'orchestrator' ? 'Orchestrator' : peers ? 'Peer' : r.kind === 'optional_peer' ? 'Optional peer' : 'Specialist'}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="zoom" onPointerDown={e => e.stopPropagation()}>
        <button type="button" onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">−</button>
        <span aria-live="off">{Math.round(cam.k * 100)}%</span>
        <button type="button" onClick={() => zoomBy(1.25)} aria-label="Zoom in">+</button>
        <button type="button" className="fit" onClick={fitAll}>Fit all</button>
      </div>
    </div>
  )
}
