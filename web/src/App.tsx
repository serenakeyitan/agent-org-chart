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

  const routeRef = useRef(route)
  useEffect(() => {
    routeRef.current = route
  }, [route])

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
  const team = route.teamId ? byId.get(route.teamId) ?? null : null
  const layout = useMemo(() => layoutTree(team ? [team] : []), [team])

  const focus: Focus = useMemo(() => {
    if (team && narrow) {
      // A whole branch shrinks past legibility on a phone: centre on the selected bot
      // (or the team's people) at a readable zoom and let the rest overflow.
      const target = route.roleId ? layout.byId.get(roleNodeId(team.chart.id, route.roleId)) : undefined
      const people = layout.nodes.filter(n => n.kind === 'role')
      return { key: `team:${team.chart.id}:${route.roleId ?? ''}`, box: boundsOf(target ? [target] : people), minK: 0.75 }
    }
    if (team) {
      // Frame the team and its people at a readable zoom; the line back to You
      // runs off to the left, and Fit all shows everything.
      const ids = new Set([teamNodeId(team.chart.id), ...team.chart.roles.map(r => roleNodeId(team.chart.id, r.id))])
      return { key: `team:${team.chart.id}`, box: boundsOf(layout.nodes.filter(n => ids.has(n.id))), minK: 0.8 }
    }
    return { key: 'empty', box: boundsOf(layout.nodes), minK: 1 }
  }, [layout, team, narrow, route.roleId])

  // Keep fitted content clear of the picker and the team panel.
  const hasPanel = team !== null
  const inset = useMemo(
    () =>
      narrow
        ? { top: 44, left: 0, right: 0, bottom: hasPanel ? Math.round(window.innerHeight * 0.5) : 0 }
        : { top: 0, left: 392, right: hasPanel ? 400 : 0, bottom: 0 },
    [narrow, hasPanel],
  )

  useEffect(() => {
    document.title = team ? `${team.chart.title} · Agent Army` : 'Agent Army — agent org charts'
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

  // Picking the team that's already shown puts it away again.
  const pickTeam = (id: string) => {
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

  const unknown = route.teamId && !team ? route.teamId : null

  return (
    <div className="app">
      <Canvas
        layout={layout}
        focus={focus}
        inset={inset}
        selectedTeamId={team?.chart.id ?? null}
        selectedRoleId={route.roleId}
        emptyHint={team ? null : unknown ? `No team called “${unknown}” — pick one` : narrow ? 'Tap “Teams” to pick one' : '← Pick a team to see who’s on it'}
        onYou={() => go({ roleId: null })}
        onTeam={() => go({ roleId: null })}
        onRole={onRole}
        onBackground={() => routeRef.current.roleId && go({ roleId: null })}
      />

      <Picker
        teams={teams}
        openTeamId={team?.chart.id ?? null}
        query={query}
        open={pickerOpen}
        onQuery={setQuery}
        onOpenTeam={pickTeam}
        onClose={() => setPickerOpen(false)}
      />

      <p className="mobile-title" aria-hidden="true">Agent Army</p>
      <button type="button" className="teams-fab" onClick={() => setPickerOpen(true)}>Teams</button>

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
          onCopyText={async (text, what) => toast((await copyText(text)) ? `${what} copied` : 'Copy failed')}
        />
      )}

      <div className={`toast${toastMsg ? ' is-on' : ''}`} role="status" aria-live="polite">
        {toastMsg}
      </div>
    </div>
  )
}

export default App
