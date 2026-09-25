import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Chart, ChartIndex } from './types'
import Canvas, { type Focus } from './components/Canvas'
import Picker from './components/Picker'
import TeamPanel from './components/TeamPanel'
import { buildTeams, importPrompt } from './lib/catalog'
import { copyText, roleInstruction } from './lib/copy'
import { useRoute, type Route } from './lib/route'
import { boundsOf, layoutTree, roleNodeId, teamNodeId } from './lib/tree'

function useNarrow(query = '(max-width: 760px)') {
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return narrow
}

interface Toast {
  msg: string
  undo?: () => void
}

function App() {
  const [charts, setCharts] = useState<Chart[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [route, navigate] = useRoute()
  const [query, setQuery] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [toastState, setToastState] = useState<Toast | null>(null)
  const [flash, setFlash] = useState(false)
  const [newTeamId, setNewTeamId] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const newTimer = useRef<number | undefined>(undefined)
  const narrow = useNarrow()

  // Undo runs after later navigation, so it must read the latest route, not a stale closure.
  const routeRef = useRef(route)
  useEffect(() => {
    routeRef.current = route
  }, [route])

  const toast = useCallback((msg: string, undo?: () => void) => {
    setToastState({ msg, undo })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastState(null), undo ? 5000 : 2400)
  }, [])

  useEffect(() => {
    const getJson = <T,>(url: string): Promise<T> =>
      fetch(url).then(res => {
        if (!res.ok) throw new Error(`${url}: ${res.status}`)
        return res.json() as Promise<T>
      })
    getJson<ChartIndex[]>('./charts/index.json')
      .then(index => Promise.all(index.map(c => getJson<Chart>(`./charts/${encodeURIComponent(c.id)}/chart.json`))))
      .then(setCharts)
      .catch(() => setLoadError(true))
  }, [])

  const teams = useMemo(() => (charts ? buildTeams(charts) : []), [charts])
  const byId = useMemo(() => new Map(teams.map(t => [t.chart.id, t])), [teams])
  // Hire order is org order: the newest team joins at the bottom of your org.
  const hired = useMemo(() => route.hired.map(id => byId.get(id)).filter((t): t is NonNullable<typeof t> => !!t), [route.hired, byId])
  const team = route.teamId ? byId.get(route.teamId) ?? null : null
  const isHired = team ? route.hired.includes(team.chart.id) : false
  const candidate = team && !isHired ? team : null
  const layout = useMemo(() => layoutTree(hired, candidate), [hired, candidate])

  const focus: Focus = useMemo(() => {
    if (team && narrow) {
      // A whole branch shrinks past legibility on a phone: centre on the selected bot
      // (or the team's people) at a readable zoom and let the rest overflow.
      const target = route.roleId ? layout.byId.get(roleNodeId(team.chart.id, route.roleId)) : undefined
      const people = layout.nodes.filter(n => n.kind === 'role' && n.team?.chart.id === team.chart.id)
      return { key: `team:${team.chart.id}:${route.roleId ?? ''}:${hired.length}`, box: boundsOf(target ? [target] : people), minK: 0.75 }
    }
    if (team) {
      // Frame the team and its people at a readable zoom; the line back to You
      // runs off to the left, and Fit all shows the whole org.
      const ids = new Set([teamNodeId(team.chart.id), ...team.chart.roles.map(r => roleNodeId(team.chart.id, r.id))])
      return { key: `team:${team.chart.id}:${hired.length}`, box: boundsOf(layout.nodes.filter(n => ids.has(n.id))), minK: 0.8 }
    }
    return { key: `all:${hired.map(t => t.chart.id).join(',')}`, box: boundsOf(layout.nodes), ...(hired.length ? {} : { minK: 1 }) }
  }, [layout, team, hired, narrow, route.roleId])

  // Keep fitted content clear of the picker and the team panel.
  const hasPanel = team !== null
  const inset = useMemo(
    () =>
      narrow
        ? { top: 44, left: 0, right: 0, bottom: hasPanel ? Math.round(window.innerHeight * 0.5) : 72 }
        : { top: 0, left: 392, right: hasPanel ? 400 : 0, bottom: 72 },
    [narrow, hasPanel],
  )

  useEffect(() => {
    document.title = team ? `${team.chart.title} · Agent Army` : 'Agent Army — hire an agent team'
  }, [team])

  const go = useCallback((r: Partial<Route>) => navigate({ ...routeRef.current, ...r }), [navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (routeRef.current.teamId) go({ teamId: null, roleId: null })
      else setPickerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  // Hiring never opens or moves anything: the team joins the org and pulses once.
  // If it was the team being previewed, the panel simply turns into its hired view.
  const hire = (id: string) => {
    const t = byId.get(id)
    if (!t || routeRef.current.hired.includes(id)) return
    const before = routeRef.current.hired
    go({ hired: [...before, id] })
    setNewTeamId(id)
    window.clearTimeout(newTimer.current)
    newTimer.current = window.setTimeout(() => setNewTeamId(null), 1600)
    toast(narrow ? `${t.chart.title} hired` : `${t.chart.title} hired — ${t.chart.roles.length} bots joined your org`, () => go({ hired: before }))
  }

  // Letting go is always undoable. If that team's panel is open it stays open as a preview.
  const letGo = (id: string) => {
    const t = byId.get(id)
    if (!t) return
    const before = routeRef.current.hired
    go({ hired: before.filter(h => h !== id) })
    toast(`${t.chart.title} let go`, () => go({ hired: before }))
  }

  const toggleHire = (id: string) => (routeRef.current.hired.includes(id) ? letGo(id) : hire(id))

  const openTeam = (id: string) => {
    go({ teamId: routeRef.current.teamId === id ? null : id, roleId: null })
    setPickerOpen(false)
  }

  const onRole = (teamId: string, roleId: string) => {
    const r = routeRef.current
    go({ teamId, roleId: r.teamId === teamId && r.roleId === roleId ? null : roleId })
  }

  const copyImport = async () => {
    if (!team) return
    const ok = await copyText(importPrompt(team.chart.id))
    toast(ok ? 'Import prompt copied — paste it into your agent' : 'Copy failed — select the prompt and copy it by hand')
    setFlash(true)
    window.setTimeout(() => setFlash(false), 900)
  }
  const copyOrg = async () => {
    const ok = await copyText(hired.map(t => importPrompt(t.chart.id)).join('\n'))
    toast(ok ? `Import prompts for ${hired.length} team${hired.length > 1 ? 's' : ''} copied — paste them into your agent` : 'Copy failed')
  }
  const copyJson = async () => {
    if (!team) return
    const ok = await copyText(JSON.stringify(team.chart, null, 2))
    toast(ok ? 'chart.json copied' : 'Copy failed')
  }
  const copyBot = async () => {
    const role = team?.chart.roles.find(r => r.id === route.roleId)
    if (!team || !role) return
    const ok = await copyText(roleInstruction(team.chart, role))
    toast(ok ? `${role.name} copied` : 'Copy failed')
  }

  if (loadError) return <div className="center-msg">Couldn't load the org charts. Refresh to try again.</div>
  if (!charts) return <div className="center-msg">Loading org charts…</div>

  const bots = hired.reduce((n, t) => n + t.chart.roles.length, 0)
  const unknown = [...route.hired, ...(route.teamId ? [route.teamId] : [])].filter(id => !byId.has(id))

  return (
    <div className="app">
      <Canvas
        layout={layout}
        focus={focus}
        inset={inset}
        selectedTeamId={team?.chart.id ?? null}
        selectedRoleId={route.roleId}
        emptyHint={hired.length || candidate ? null : narrow ? 'Tap “Hire teams” to build your org' : '← Pick a team to look it over'}
        newTeamId={newTeamId}
        onYou={() => go({ teamId: null, roleId: null })}
        onTeam={openTeam}
        onHire={hire}
        onLetGo={letGo}
        onRole={onRole}
        onBackground={() => routeRef.current.teamId && go({ teamId: null, roleId: null })}
      />

      <Picker
        teams={teams}
        hired={route.hired}
        openTeamId={team?.chart.id ?? null}
        query={query}
        open={pickerOpen}
        onQuery={setQuery}
        onToggleHire={toggleHire}
        onOpenTeam={openTeam}
        onClose={() => setPickerOpen(false)}
      />

      <p className="mobile-title" aria-hidden="true">Agent Army</p>

      <div className="orgbar" role="region" aria-label="Your org">
        <button type="button" className={`orgbar-hire${hired.length ? '' : ' is-primary'}`} onClick={() => setPickerOpen(true)}>Hire teams</button>
        <span className="orgbar-count">
          {hired.length ? (
            <>{narrow ? '' : 'Your org: '}<strong>{hired.length} team{hired.length > 1 ? 's' : ''}</strong> · {bots} bots</>
          ) : (
            narrow ? 'No teams yet' : 'No teams hired yet'
          )}
          {unknown.length > 0 && <span className="orgbar-warn"> · unknown team {unknown.join(', ')}</span>}
        </span>
        <button type="button" className="orgbar-copy" onClick={copyOrg} disabled={!hired.length}>
          {narrow ? 'Copy prompt' : 'Copy import prompt'}{hired.length > 1 ? 's' : ''}
        </button>
      </div>

      {team && (
        <TeamPanel
          key={team.chart.id}
          team={team}
          hired={isHired}
          roleId={route.roleId}
          flash={flash}
          onRole={roleId => go({ roleId })}
          onClose={() => go({ teamId: null, roleId: null })}
          onCopyImport={copyImport}
          onCopyJson={copyJson}
          onCopyBot={copyBot}
          onHire={() => hire(team.chart.id)}
          onLetGo={() => letGo(team.chart.id)}
        />
      )}

      <div className={`toast${toastState ? ' is-on' : ''}`} role="status" aria-live="polite">
        <span>{toastState?.msg}</span>
        {toastState?.undo && (
          <button
            type="button"
            className="toast-undo"
            onClick={() => {
              toastState.undo?.()
              setToastState(null)
            }}
          >
            Undo
          </button>
        )}
      </div>
    </div>
  )
}

export default App
