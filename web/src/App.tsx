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

function App() {
  const [charts, setCharts] = useState<Chart[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [route, navigate] = useRoute()
  const [query, setQuery] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [flash, setFlash] = useState(false)
  const toastTimer = useRef<number | undefined>(undefined)
  const narrow = useNarrow()

  const toast = useCallback((msg: string) => {
    setToastMsg(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 2400)
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
  const layout = useMemo(() => layoutTree(hired), [hired])

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

  const go = useCallback((r: Partial<Route>) => navigate({ ...route, ...r }), [navigate, route])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (route.teamId) go({ teamId: null, roleId: null })
      else setPickerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [route.teamId, go])

  const toggleHire = (id: string) => {
    const t = byId.get(id)
    if (!t) return
    if (route.hired.includes(id)) {
      go({ hired: route.hired.filter(h => h !== id), ...(route.teamId === id ? { teamId: null, roleId: null } : {}) })
      toast(`${t.chart.title} let go`)
    } else {
      go({ hired: [...route.hired, id], teamId: id, roleId: null })
      setPickerOpen(false)
      toast(`${t.chart.title} hired — ${t.chart.roles.length} bots joined your org`)
    }
  }

  const openTeam = (id: string) => {
    go({ teamId: route.teamId === id ? null : id, roleId: null })
    setPickerOpen(false)
  }

  const onRole = (teamId: string, roleId: string) => go({ teamId, roleId: route.teamId === teamId && route.roleId === roleId ? null : roleId })

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
  const unknown = route.hired.filter(id => !byId.has(id))

  return (
    <div className="app">
      <Canvas
        layout={layout}
        focus={focus}
        inset={inset}
        selectedTeamId={team?.chart.id ?? null}
        selectedRoleId={route.roleId}
        emptyHint={hired.length ? null : narrow ? "Tap “Hire teams” to build your org" : "← Hire a team to start your org"}
        onYou={() => go({ teamId: null, roleId: null })}
        onTeam={openTeam}
        onRole={onRole}
        onBackground={() => route.teamId && go({ teamId: null, roleId: null })}
      />

      <Picker
        teams={teams}
        hired={route.hired}
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
          roleId={route.roleId}
          flash={flash}
          onRole={roleId => go({ roleId })}
          onClose={() => go({ teamId: null, roleId: null })}
          onCopyImport={copyImport}
          onCopyJson={copyJson}
          onCopyBot={copyBot}
          onLetGo={() => toggleHire(team.chart.id)}
        />
      )}

      <div className={`toast${toastMsg ? ' is-on' : ''}`} role="status" aria-live="polite">
        {toastMsg}
      </div>
    </div>
  )
}

export default App
