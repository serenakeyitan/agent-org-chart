import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Chart, ChartIndex } from './types'
import Canvas, { type Focus } from './components/Canvas'
import TeamPanel from './components/TeamPanel'
import { REPO_URL, WINGS, buildTeams, importPrompt } from './lib/catalog'
import { copyText, roleInstruction } from './lib/copy'
import { useRoute } from './lib/route'
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
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [query, setQuery] = useState('')
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
  const team = teams.find(t => t.chart.id === route.teamId) ?? null
  const q = query.trim().toLowerCase()

  const search = useMemo(() => {
    if (!q) return null
    const nodeIds = new Set<string>(['root'])
    const teamIds = new Set<string>()
    teams.forEach(t => {
      const hits = t.chart.roles.filter(r => r.name.toLowerCase().includes(q))
      if (!hits.length && !t.chart.title.toLowerCase().includes(q)) return
      teamIds.add(t.chart.id)
      nodeIds.add(`wing:${t.wing.id}`)
      nodeIds.add(teamNodeId(t.chart.id))
      hits.forEach(r => nodeIds.add(roleNodeId(t.chart.id, r.id)))
    })
    return { nodeIds, teamIds }
  }, [teams, q])

  // Selecting a team (from a link or a click) always opens its branch; a search
  // opens every team with a match.
  const open = useMemo(() => {
    const s = new Set(expanded)
    if (route.teamId) s.add(route.teamId)
    search?.teamIds.forEach(id => s.add(id))
    return s
  }, [expanded, route.teamId, search])

  const layout = useMemo(() => layoutTree(teams, open, WINGS), [teams, open])

  const focus: Focus = useMemo(() => {
    if (!layout.nodes.length) return { key: 'empty', box: { x: 0, y: 0, w: 1, h: 1 } }
    if (team && narrow) {
      // A whole branch shrinks past legibility on a phone: centre on the selected bot
      // (or the team's people) at a readable zoom and let the rest overflow.
      const target = route.roleId ? layout.byId.get(roleNodeId(team.chart.id, route.roleId)) : undefined
      const people = layout.nodes.filter(n => n.kind === 'role' && n.team?.chart.id === team.chart.id)
      return { key: `team:${team.chart.id}:${route.roleId ?? ''}`, box: boundsOf(target ? [target] : people), minK: 0.75 }
    }
    if (team) {
      const ids = new Set([teamNodeId(team.chart.id), ...team.chart.roles.map(r => roleNodeId(team.chart.id, r.id))])
      return { key: `team:${team.chart.id}`, box: boundsOf(layout.nodes.filter(n => ids.has(n.id))) }
    }
    if (search && search.teamIds.size) {
      return { key: `search:${q}`, box: boundsOf(layout.nodes.filter(n => search.nodeIds.has(n.id))) }
    }
    return { key: `all:${[...open].sort().join(',')}`, box: boundsOf(layout.nodes) }
  }, [layout, team, search, q, open, narrow, route.roleId])

  // Keep fitted content clear of the brand card and the team panel.
  const hasPanel = team !== null
  const inset = useMemo(
    () =>
      narrow
        ? { top: 128, left: 0, right: 0, bottom: hasPanel ? Math.round(window.innerHeight * 0.5) : 0 }
        : { top: 0, left: 352, right: hasPanel ? 400 : 0, bottom: 0 },
    [narrow, hasPanel],
  )

  useEffect(() => {
    document.title = team ? `${team.chart.title} · Agent Army` : 'Agent Army — agent org charts'
  }, [team])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && route.teamId) navigate({ teamId: null, roleId: null })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [route.teamId, navigate])

  const onTeam = (id: string) => {
    if (route.teamId === id) {
      setExpanded(s => {
        const n = new Set(s)
        n.delete(id)
        return n
      })
      navigate({ teamId: null, roleId: null })
      return
    }
    setExpanded(s => new Set(s).add(id))
    navigate({ teamId: id, roleId: null })
  }

  const onRole = (teamId: string, roleId: string) => {
    setExpanded(s => new Set(s).add(teamId))
    navigate({ teamId, roleId: route.teamId === teamId && route.roleId === roleId ? null : roleId })
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

  const missing = route.teamId && !team

  return (
    <div className="app">
      <Canvas
        layout={layout}
        focus={focus}
        inset={inset}
        expanded={open}
        selectedTeamId={team?.chart.id ?? null}
        selectedRoleId={route.roleId}
        matches={search?.nodeIds ?? null}
        onTeam={onTeam}
        onRole={onRole}
        onBackground={() => route.teamId && navigate({ teamId: null, roleId: null })}
      />

      <header className="brand">
        <h1>Agent Army</h1>
        <p>Org charts of real agent teams. Open a team, meet the bots, then move the whole team into your own agent.</p>
        <label htmlFor="role-search" className="sr-only">Find a role</label>
        <input
          id="role-search"
          type="search"
          placeholder="Find a role — try Designer"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
        />
        {search && search.teamIds.size === 0 && <p className="brand-empty">No team has a “{query.trim()}”.</p>}
        {missing && <p className="brand-empty">There's no team called “{route.teamId}”.</p>}
        <p className="brand-hint">{narrow ? 'Drag to move · pinch to zoom' : 'Drag to move · ⌘/Ctrl + scroll to zoom'}</p>
      </header>

      {team && (
        <TeamPanel
          key={team.chart.id}
          team={team}
          roleId={route.roleId}
          flash={flash}
          onRole={roleId => navigate({ teamId: team.chart.id, roleId })}
          onClose={() => navigate({ teamId: null, roleId: null })}
          onCopyImport={copyImport}
          onCopyJson={copyJson}
          onCopyBot={copyBot}
        />
      )}

      <a className="repo-link" href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>

      <div className={`toast${toastMsg ? ' is-on' : ''}`} role="status" aria-live="polite">
        {toastMsg}
      </div>
    </div>
  )
}

export default App
