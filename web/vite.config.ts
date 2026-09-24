import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

function copyChartsPlugin() {
  return {
    name: 'copy-charts',
    buildStart() {
      const chartsDir = resolve(__dirname, '../charts')
      const destDir = resolve(__dirname, 'public/charts')
      
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }
      
      const chartFolders = readdirSync(chartsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
      
      const index: Array<{
        id: string
        title: string
        summary: string
        roleCount: number
        attribution?: string
        shape: Array<{ id: string; kind: string; reports_to: string | null }>
      }> = []
      
      for (const folder of chartFolders) {
        const chartPath = resolve(chartsDir, folder, 'chart.json')
        if (existsSync(chartPath)) {
          const chartDestDir = resolve(destDir, folder)
          if (!existsSync(chartDestDir)) {
            mkdirSync(chartDestDir, { recursive: true })
          }
          copyFileSync(chartPath, resolve(chartDestDir, 'chart.json'))
          
          const chart = JSON.parse(readFileSync(chartPath, 'utf-8'))
          const attribution = extractAttribution(chart.summary)
          index.push({
            id: chart.id,
            title: chart.title,
            summary: chart.summary,
            roleCount: chart.roles?.length || 0,
            ...(attribution && { attribution }),
            shape: (chart.roles || []).map((r: { id: string; kind: string; reports_to: string | null }) => ({
              id: r.id,
              kind: r.kind,
              reports_to: r.reports_to
            }))
          })
        }
      }
      
      writeFileSync(resolve(destDir, 'index.json'), JSON.stringify(index, null, 2))
    }
  }
}

function extractAttribution(summary: string): string | undefined {
  const joshKimMatch = summary.match(/Josh Kim/i)
  if (joshKimMatch) return 'Josh Kim'
  return undefined
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyChartsPlugin()],
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
