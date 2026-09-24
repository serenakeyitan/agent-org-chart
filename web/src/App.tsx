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

function App() {
  const [chartIndex, setChartIndex] = useState<ChartIndex[] | null>(null)
  const [route, setRoute] = useState<Route>(parseHash)
  const [chart, setChart] = useState<Chart | null>(null)
  const [failedId, setFailedId] = useState<string | null>(null)

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

  useEffect(() => {
    const id = route.chartId
    if (!id) return
    let cancelled = false
    fetch(`./charts/${id}/chart.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: Chart) => {
        if (!cancelled) setChart(data)
      })
      .catch(err => {
        console.error('Failed to load chart:', err)
        if (!cancelled) setFailedId(id)
      })
    return () => {
      cancelled = true
    }
  }, [route.chartId])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route.chartId])

  useEffect(() => {
    document.title = chart && route.chartId === chart.id ? `${chart.title} — Agent Army 图鉴` : 'Agent Army 图鉴'
  }, [chart, route.chartId])

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
    if (chart && chart.id === route.chartId) {
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

  return <Home charts={chartIndex} />
}

export default App
