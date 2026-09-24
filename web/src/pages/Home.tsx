import type { ChartIndex } from '../types'
import { getCreditInfo } from '../credits'

interface HomeProps {
  charts: ChartIndex[]
  onSelectChart: (id: string) => void
}

export default function Home({ charts, onSelectChart }: HomeProps) {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-medium text-[var(--text-primary)] mb-3">
          Grok Bot Team Workflows
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Agent org charts from the Galaxy livestream
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {charts.map(chart => {
          const credit = getCreditInfo(chart.id)
          return (
            <button
              key={chart.id}
              onClick={() => onSelectChart(chart.id)}
              className="group text-left bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 
                         hover:border-[var(--accent)] hover:shadow-sm transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                         focus:ring-offset-[var(--bg-primary)]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {chart.title}
                </h2>
                <span className="shrink-0 text-sm text-[var(--text-muted)] bg-[var(--bg-panel)] px-2.5 py-1 rounded-full">
                  {chart.roleCount} {chart.roleCount === 1 ? 'role' : 'roles'}
                </span>
              </div>

              {/* Credit line with @handle */}
              <div className="mb-3">
                {credit.url ? (
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-[var(--accent)] hover:underline"
                  >
                    {credit.text}
                  </a>
                ) : (
                  <span className="text-sm text-[var(--text-muted)]">
                    {credit.text}
                  </span>
                )}
                {credit.day && (
                  <span className="text-sm text-[var(--text-muted)]"> · Day {credit.day}</span>
                )}
              </div>
              
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                {chart.roleCount} roles: {getRoleSummary(chart)}
              </p>
            </button>
          )
        })}
      </div>

      <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-[var(--border)] text-center">
        <p className="text-sm text-[var(--text-muted)]">
          Charts from{' '}
          <a 
            href="https://github.com/serenakeyitan/agent-org-chart" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            serenakeyitan/agent-org-chart
          </a>
        </p>
      </footer>
    </div>
  )
}

function getRoleSummary(chart: ChartIndex): string {
  const match = chart.summary.match(/Galaxy Day \d+/)
  if (match) {
    const beforeDay = chart.summary.split(match[0])[0].trim()
    if (beforeDay.endsWith(' from')) {
      return beforeDay.slice(0, -5).trim()
    }
    return beforeDay || chart.summary
  }
  return chart.summary
}
