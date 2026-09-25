import { useEffect, useState } from 'react'

// Hash routes: #/               overview, nothing selected
//              #/sdr            team selected (its branch expanded)
//              #/sdr?role=email team + one bot selected
export interface Route {
  teamId: string | null
  roleId: string | null
}

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '')
  const [path, search = ''] = raw.split('?')
  const teamId = path.split('/').filter(Boolean).map(decodeURIComponent)[0] ?? null
  return { teamId, roleId: teamId ? new URLSearchParams(search).get('role') : null }
}

export function toHash(route: Route): string {
  if (!route.teamId) return '#/'
  const base = `#/${encodeURIComponent(route.teamId)}`
  return route.roleId ? `${base}?role=${encodeURIComponent(route.roleId)}` : base
}

export function useRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))
  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const navigate = (r: Route) => {
    const hash = toHash(r)
    if (hash !== window.location.hash) window.location.hash = hash
  }
  return [route, navigate]
}
