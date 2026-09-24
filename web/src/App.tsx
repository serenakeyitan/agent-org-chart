import { useEffect, useState } from 'react'
import type { ChartIndex, Chart } from './types'
import Home from './pages/Home'
import Detail from './pages/Detail'
import './index.css'

function App() {
  const [chartIndex, setChartIndex] = useState<ChartIndex[]>([])
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null)
  const [chart, setChart] = useState<Chart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('./charts/index.json')
      .then(res => res.json())
      .then((data: ChartIndex[]) => {
        setChartIndex(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load chart index:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (selectedChartId) {
      setLoading(true)
      fetch(`./charts/${selectedChartId}/chart.json`)
        .then(res => res.json())
        .then((data: Chart) => {
          setChart(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to load chart:', err)
          setLoading(false)
        })
    } else {
      setChart(null)
    }
  }, [selectedChartId])

  const handleBack = () => {
    setSelectedChartId(null)
    setChart(null)
  }

  if (loading && chartIndex.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-muted)]">Loading charts...</div>
      </div>
    )
  }

  if (selectedChartId && chart) {
    return <Detail chart={chart} onBack={handleBack} />
  }

  return (
    <Home 
      charts={chartIndex} 
      onSelectChart={setSelectedChartId} 
    />
  )
}

export default App
