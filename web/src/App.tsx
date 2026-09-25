import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Chart, ChartIndex } from './types'
import Lobby from './pages/Lobby'
import FloorPage from './pages/FloorPage'
import { buildFloors } from './lib/catalog'
import { useRoute } from './lib/route'

function App() {
  const [index, setIndex] = useState<ChartIndex[] | null>(null)
  const [indexError, setIndexError] = useState(false)
  const [charts, setCharts] = useState<Record<string, Chart>>({})
  const [chartError, setChartError] = useState<string | null>(null)
  const [route, navigate] = useRoute()
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const toast = useCallback((msg: string) => {
    setToastMsg(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 2400)
  }, [])

  useEffect(() => {
    fetch('./charts/index.json')
      .then(res => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json()
      })
      .then((data: ChartIndex[]) => setIndex(data))
      .catch(() => setIndexError(true))
  }, [])

  const chartId = route.page === 'floor' ? route.chartId : null
  useEffect(() => {
    if (!chartId || charts[chartId]) return
    fetch(`./charts/${encodeURIComponent(chartId)}/chart.json`)
      .then(res => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json()
      })
      .then((data: Chart) => setCharts(c => ({ ...c, [chartId]: data })))
      .catch(() => setChartError(chartId))
  }, [chartId, charts])

  useEffect(() => {
    if (route.page === 'lobby') document.title = 'Agent Army Tower'
    window.scrollTo(0, 0)
  }, [route.page, chartId])

  const floors = useMemo(() => (index ? buildFloors(index) : []), [index])

  let body: React.ReactNode
  if (indexError) {
    body = <div className="center-msg">Couldn't load the directory. Refresh to try again.</div>
  } else if (!index) {
    body = <div className="center-msg">Opening the lobby…</div>
  } else if (route.page === 'lobby') {
    body = (
      <Lobby
        floors={floors}
        query={route.query}
        onQuery={q => navigate({ page: 'lobby', query: q }, { replace: true })}
        onPick={id => navigate({ page: 'floor', chartId: id, view: 'office', roleId: null })}
      />
    )
  } else {
    const i = floors.findIndex(f => f.id === route.chartId)
    const chart = charts[route.chartId]
    if (i === -1 || chartError === route.chartId) {
      body = (
        <div className="center-msg">
          <p>There's no floor called “{route.chartId}”.</p>
          <a href="#/">Back to the lobby</a>
        </div>
      )
    } else if (!chart) {
      body = <div className="center-msg">Riding the elevator…</div>
    } else {
      const r = route
      body = (
        <FloorPage
          key={chart.id}
          chart={chart}
          floor={floors[i]}
          below={floors[i - 1] ?? null}
          above={floors[i + 1] ?? null}
          view={r.view}
          roleId={r.roleId}
          onNavigate={id => navigate({ page: 'floor', chartId: id, view: r.view, roleId: null })}
          onView={view => navigate({ ...r, view }, { replace: true })}
          onRole={roleId => navigate({ ...r, roleId }, { replace: true })}
          onLobby={() => navigate({ page: 'lobby', query: '' })}
          toast={toast}
        />
      )
    }
  }

  return (
    <>
      {body}
      <div className={`toast${toastMsg ? ' is-on' : ''}`} role="status" aria-live="polite">
        {toastMsg}
      </div>
    </>
  )
}

export default App
