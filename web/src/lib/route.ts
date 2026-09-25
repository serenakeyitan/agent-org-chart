import { useEffect, useState } from 'react'

export type View = 'office' | 'blueprint'

export type Route =
  | { page: 'lobby'; query: string }
  | { page: 'floor'; chartId: string; view: View; roleId: string | null }

// Hash routes: #/            lobby
//              #/?q=recruiter lobby with a role search
//              #/sdr          floor, office view
//              #/sdr/blueprint
//              #/sdr?role=email
export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '')
  const [path, search = ''] = raw.split('?')
  const params = new URLSearchParams(search)
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent)
  if (parts.length === 0) return { page: 'lobby', query: params.get('q') ?? '' }
  return {
    page: 'floor',
    chartId: parts[0],
    view: parts[1] === 'blueprint' ? 'blueprint' : 'office',
    roleId: params.get('role'),
  }
}

export function toHash(route: Route): string {
  if (route.page === 'lobby') return route.query ? `#/?q=${encodeURIComponent(route.query)}` : '#/'
  const base = `#/${encodeURIComponent(route.chartId)}${route.view === 'blueprint' ? '/blueprint' : ''}`
  return route.roleId ? `${base}?role=${encodeURIComponent(route.roleId)}` : base
}

export function useRoute(): [Route, (r: Route, opts?: { replace?: boolean }) => void] {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))
  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const navigate = (r: Route, opts?: { replace?: boolean }) => {
    const hash = toHash(r)
    if (hash === window.location.hash) return
    if (opts?.replace) {
      history.replaceState(null, '', hash)
      setRoute(r)
    } else {
      window.location.hash = hash
    }
  }
  return [route, navigate]
}
