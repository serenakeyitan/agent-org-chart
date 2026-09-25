import { useEffect, useState } from 'react'

// Everything lives in the hash so an org can be shared as a link:
//   #/?hired=sdr,marketing              the org you've built
//   #/?hired=sdr,marketing&team=sdr     …with one team open in the panel
//   #/?hired=sdr&team=sdr&role=email    …and one bot selected
// Old links (#/sdr, #/sdr?role=email) still work: they hire and open that team.
export interface Route {
  hired: string[]
  teamId: string | null
  roleId: string | null
}

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '')
  const [path, search = ''] = raw.split('?')
  const p = new URLSearchParams(search)
  const hired = (p.get('hired') ?? '').split(',').map(s => s.trim()).filter(Boolean)
  const legacy = path.split('/').filter(Boolean).map(decodeURIComponent)[0] ?? null
  const teamId = p.get('team') ?? legacy
  if (teamId && !hired.includes(teamId)) hired.push(teamId)
  return { hired: [...new Set(hired)], teamId, roleId: teamId ? p.get('role') : null }
}

export function toHash(route: Route): string {
  const p: string[] = []
  if (route.hired.length) p.push(`hired=${route.hired.map(encodeURIComponent).join(',')}`)
  if (route.teamId) p.push(`team=${encodeURIComponent(route.teamId)}`)
  if (route.teamId && route.roleId) p.push(`role=${encodeURIComponent(route.roleId)}`)
  return p.length ? `#/?${p.join('&')}` : '#/'
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
