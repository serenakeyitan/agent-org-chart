import type { ChartIndex } from '../types'

interface HomeProps {
  charts: ChartIndex[]
  onSelectChart: (id: string) => void
}

export default function Home({ charts, onSelectChart }: HomeProps) {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-medium text-[var(--text-primary)] mb-3">
          Agent Org Charts
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Browse portable org charts you can import on any agent platform
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {charts.map(chart => (
          <button
            key={chart.id}
            onClick={() => onSelectChart(chart.id)}
            className="group text-left bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 
                       hover:border-[var(--accent)] hover:shadow-sm transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                       focus:ring-offset-[var(--bg-primary)]"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {chart.title}
              </h2>
              <span className="shrink-0 text-sm text-[var(--text-muted)] bg-[var(--bg-panel)] px-2.5 py-1 rounded-full">
                {chart.roleCount} {chart.roleCount === 1 ? 'role' : 'roles'}
              </span>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
              {getRoleNames(chart)}
            </p>

            {chart.attribution && (
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--text-muted)]">
                  from {chart.attribution}
                </span>
              </div>
            )}
          </button>
        ))}
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

function getRoleNames(chart: ChartIndex): string {
  const summary = chart.summary
  const roleMatch = summary.match(/Galaxy Day \d+/i)
  if (roleMatch) {
    return summary
  }
  return summary
}
