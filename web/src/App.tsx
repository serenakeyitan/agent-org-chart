import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ChartIndex, Chart, Role } from './types'
import Home from './pages/Home'
import Detail from './pages/Detail'
import SiteHeader from './components/SiteHeader'
import { toPlates } from './lib/catalog'

interface Route {
  chartId: string | null
  roleId: string | null
}

function parseHash(): Route {
  const [chartId, roleId] = window.location.hash
    .replace(/^#\/?/, '')
    .split('/')
    .map(s => decodeURIComponent(s))
    .filter(Boolean)
  return { chartId: chartId ?? null, roleId: roleId ?? null }
}

const chartRequests = new Map<string, Promise<Chart>>()

function App() {
  const [chartIndex, setChartIndex] = useState<ChartIndex[] | null>(null)
  const [route, setRoute] = useState<Route>(parseHash)
  const [charts, setCharts] = useState<Record<string, Chart>>({})
  const [failedId, setFailedId] = useState<string | null>(null)
  const chart = route.chartId ? (charts[route.chartId] ?? null) : null

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    fetch('./charts/index.json')
      .then(res => res.json())
      .then((data: ChartIndex[]) => setChartIndex(data))
      .catch(err => {
        console.error('Failed to load chart index:', err)
        setChartIndex([])
      })
  }, [])

  const loadChart = useCallback((id: string) => {
    let request = chartRequests.get(id)
    if (!request) {
      request = fetch(`./charts/${id}/chart.json`).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Chart>
      })
      chartRequests.set(id, request)
      request.catch(() => chartRequests.delete(id))
    }
    return request
  }, [])

  const prefetchChart = useCallback(
    (id: string) => {
      loadChart(id)
        .then(data => setCharts(prev => (prev[id] ? prev : { ...prev, [id]: data })))
        .catch(() => {})
    },
    [loadChart]
  )

  useEffect(() => {
    const id = route.chartId
    if (!id) return
    let cancelled = false
    loadChart(id)
      .then(data => {
        if (!cancelled) setCharts(prev => (prev[id] ? prev : { ...prev, [id]: data }))
      })
      .catch(err => {
        console.error('Failed to load chart:', err)
        if (!cancelled) setFailedId(id)
      })
    return () => {
      cancelled = true
    }
  }, [route.chartId, loadChart])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route.chartId])

  useEffect(() => {
    document.title = chart ? `${chart.title} — Agent Army 图鉴` : 'Agent Army 图鉴'
  }, [chart])

  const selectRole = useCallback(
    (role: Role | null) => {
      if (!route.chartId) return
      const hash = `#/${encodeURIComponent(route.chartId)}${role ? `/${encodeURIComponent(role.id)}` : ''}`
      window.history.replaceState(null, '', hash)
      setRoute({ chartId: route.chartId, roleId: role?.id ?? null })
    },
    [route.chartId]
  )

  const plateNumber = useMemo(() => {
    if (!chartIndex || !route.chartId) return null
    return toPlates(chartIndex).find(p => p.chart.id === route.chartId)?.number ?? null
  }, [chartIndex, route.chartId])

  if (route.chartId) {
    if (chart) {
      return <Detail chart={chart} plateNumber={plateNumber} selectedRoleId={route.roleId} onSelectRole={selectRole} />
    }
    return (
      <div className="page">
        <SiteHeader back />
        <p className="quiet-state">{failedId === route.chartId ? 'This plate could not be found.' : 'Loading…'}</p>
      </div>
    )
  }

  if (!chartIndex) {
    return (
      <div className="page">
        <SiteHeader />
        <p className="quiet-state">Loading…</p>
      </div>
    )
  }

  return <Home charts={chartIndex} onPrefetch={prefetchChart} />
}

export default App
