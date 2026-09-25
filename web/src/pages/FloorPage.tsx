import { useEffect, useMemo, useRef, useState } from 'react'
import type { Chart } from '../types'
import IsoFloor from '../components/IsoFloor'
import Blueprint from '../components/Blueprint'
import ClockBar from '../components/ClockBar'
import { REPO_URL, floorLabel, importPrompt, type Floor } from '../lib/catalog'
import { copyText, roleInstruction } from '../lib/copy'
import { planFloor } from '../lib/layout'
import { DAY_END, DAY_START, routineRuns } from '../lib/routines'
import type { View } from '../lib/route'
import { getCreditInfo } from '../credits'

interface FloorPageProps {
  chart: Chart
  floor: Floor
  below: Floor | null
  above: Floor | null
  view: View
  roleId: string | null
  onNavigate: (chartId: string) => void
  onView: (view: View) => void
  onRole: (roleId: string | null) => void
  onLobby: () => void
  toast: (message: string) => void
}

const SIM_MIN_PER_SEC = 11 // one 12-hour day ≈ 65 seconds

export default function FloorPage({ chart, floor, below, above, view, roleId, onNavigate, onView, onRole, onLobby, toast }: FloorPageProps) {
  const plan = useMemo(() => planFloor(chart), [chart])
  const runs = useMemo(() => routineRuns(chart.routines), [chart])
  const firstRun = runs.find(r => r.kind !== 'interval')
  const [minute, setMinute] = useState(() => (firstRun ? Math.max(DAY_START, firstRun.at - 14) : 8 * 60 + 20))
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [tick, setTick] = useState(0)
  const [flash, setFlash] = useState(false)
  const credit = getCreditInfo(chart.id)
  const selected = chart.roles.find(r => r.id === roleId) ?? null

  const last = useRef<number | null>(null)
  useEffect(() => {
    if (!playing) {
      last.current = null
      return
    }
    let raf = 0
    let acc = 0
    const loop = (now: number) => {
      const dt = last.current === null ? 0 : Math.min(now - last.current, 100)
      last.current = now
      acc += dt
      if (acc >= 60) {
        const step = (acc / 1000) * SIM_MIN_PER_SEC
        acc = 0
        setMinute(m => (m + step >= DAY_END ? DAY_START : m + step))
        setTick(t => t + 1)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  useEffect(() => {
    document.title = `${chart.title} · Agent Army Tower`
  }, [chart.title])

  const copyImport = async () => {
    const ok = await copyText(importPrompt(chart.id))
    toast(ok ? 'Import prompt copied — paste it into your agent' : 'Copy failed — select the prompt and copy it by hand')
    setFlash(true)
    window.setTimeout(() => setFlash(false), 900)
  }

  const copyJson = async () => {
    const ok = await copyText(JSON.stringify(chart, null, 2))
    toast(ok ? 'chart.json copied' : 'Copy failed')
  }

  const copyBot = async () => {
    if (!selected) return
    const ok = await copyText(roleInstruction(chart, selected))
    toast(ok ? `${selected.name} copied` : 'Copy failed')
  }

  const toggleRole = (id: string) => onRole(roleId === id ? null : id)
  const manager = selected?.reports_to ? chart.roles.find(r => r.id === selected.reports_to) : null

  return (
    <div className="floor-page">
      <div className="elevator-doors" key={chart.id} aria-hidden="true">
        <span className="door left" />
        <span className="door right" />
        <span className="door-num">{floorLabel(floor.level)}</span>
      </div>

      <header className="floor-bar">
        <a href="#/" className="lobby-link" onClick={e => { e.preventDefault(); onLobby() }}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Lobby
        </a>
        <div className="floor-id">
          <span className="floor-badge" style={{ background: floor.wing.color }}>Floor {floorLabel(floor.level)}</span>
          <h1>{chart.title}</h1>
          <span className="floor-meta">
            {chart.roles.length} bots · {plan.style === 'hierarchy' ? 'one orchestrator' : 'peers'}
            {credit.url ? (
              <> · <a href={credit.url} target="_blank" rel="noopener noreferrer">{credit.text}</a></>
            ) : null}
          </span>
        </div>
        <nav className="elevator" aria-label="Elevator">
          <button type="button" disabled={!above} onClick={() => above && onNavigate(above.id)} title={above ? `Up to ${above.title}` : 'Top floor'} aria-label={above ? `Up to floor ${above.level}, ${above.title}` : 'Top floor'}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.5 13 11H3z" /></svg>
          </button>
          <button type="button" disabled={!below} onClick={() => below && onNavigate(below.id)} title={below ? `Down to ${below.title}` : 'Ground floor'} aria-label={below ? `Down to floor ${below.level}, ${below.title}` : 'Ground floor'}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 12.5 3 5h10z" /></svg>
          </button>
        </nav>
      </header>

      <div className="floor-grid">
        <section className="stage" aria-label="Floor view">
          <div className="stage-top">
            <div className="seg" role="tablist" aria-label="View">
              <button type="button" role="tab" aria-selected={view === 'office'} onClick={() => onView('office')}>Office</button>
              <button type="button" role="tab" aria-selected={view === 'blueprint'} onClick={() => onView('blueprint')}>Blueprint</button>
            </div>
            <span className="stage-note">Roles and routines from chart.json · office life simulated</span>
          </div>

          {view === 'office' ? (
            <>
              <IsoFloor chart={chart} plan={plan} minute={minute} tick={tick} runs={runs} selectedRoleId={roleId} onSelect={toggleRole} onVan={copyImport} onCopyBot={copyBot} />
              <ClockBar minute={minute} playing={playing} runs={runs} onToggle={() => setPlaying(p => !p)} onSeek={m => setMinute(Math.min(Math.max(m, DAY_START), DAY_END))} />
            </>
          ) : (
            <Blueprint chart={chart} selectedRoleId={roleId} onSelect={toggleRole} onCopyBot={copyBot} />
          )}
        </section>

        <aside className="side">
          <section className={`move${flash ? ' is-flash' : ''}`} aria-labelledby="move-h">
            <h2 id="move-h">Move this team in</h2>
            <p>Paste this into any agent that can spawn teammates. It reads the chart and hires the whole team.</p>
            <div className="prompt">
              <code>{importPrompt(chart.id)}</code>
            </div>
            <button type="button" className="btn-primary" onClick={copyImport}>Copy import prompt</button>
            <div className="move-links">
              <button type="button" className="btn-quiet" onClick={copyJson}>Copy chart.json</button>
              <a className="btn-quiet" href={`${REPO_URL}/tree/main/charts/${chart.id}`} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
            {chart.sources && chart.sources.length > 0 && (
              <p className="source">
                Source:{' '}
                {chart.sources.map((u, i) => (
                  <a key={u} href={u} target="_blank" rel="noopener noreferrer">{chart.sources!.length > 1 ? `link ${i + 1}` : 'original broadcast'}</a>
                ))}
              </p>
            )}
          </section>

          <section className="roster" aria-labelledby="roster-h">
            <h2 id="roster-h">On this floor</h2>
            <ul>
              {chart.roles.map(r => {
                const open = r.id === roleId
                return (
                  <li key={r.id} className={open ? 'is-open' : ''}>
                    <button type="button" className="roster-row" onClick={() => toggleRole(r.id)} aria-expanded={open}>
                      <span className={`roster-dot${r.kind === 'orchestrator' ? ' is-lead' : ''}`} aria-hidden="true" />
                      <span className="roster-name">{r.name}</span>
                      {r.kind === 'orchestrator' && <span className="roster-tag">Orchestrator</span>}
                    </button>
                    {open && selected && (
                      <div className="roster-detail">
                        <p>{selected.summary}</p>
                        {manager && (
                          <p className="muted">
                            Reports to <button type="button" className="inline-link" onClick={() => onRole(manager.id)}>{manager.name}</button>
                          </p>
                        )}
                        <button type="button" className="btn-secondary" onClick={copyBot}>Copy this bot</button>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
            {chart.routines && chart.routines.length > 0 && (
              <>
                <h2 className="routines-h">Routines</h2>
                <ul className="routines">
                  {chart.routines.map(r => (
                    <li key={r.name}>
                      <span>{r.name}</span>
                      <span className="muted">{r.schedule}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <nav className="neighbors" aria-label="Other floors">
            {below ? (
              <button type="button" onClick={() => onNavigate(below.id)}>
                <span className="muted">↓ Floor {floorLabel(below.level)}</span>
                {below.title}
              </button>
            ) : <span />}
            {above ? (
              <button type="button" className="right" onClick={() => onNavigate(above.id)}>
                <span className="muted">Floor {floorLabel(above.level)} ↑</span>
                {above.title}
              </button>
            ) : <span />}
          </nav>
        </aside>
      </div>
    </div>
  )
}
