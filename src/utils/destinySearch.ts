export interface DestinyResult {
  type: 'city' | 'airport'
  code: string
  title: string
  subTitle: string
  iata?: string
  searchTarget: string
  country: string
  image?: string
  child?: boolean
  defaulted?: boolean
}

export interface DestinyResponse {
  [key: string]: DestinyResult[]
}

export async function searchDestinations(query: string): Promise<DestinyResult[]> {
  if (!query || query.trim().length < 2) return []

  const params = new URLSearchParams({
    pf: query.trim(),
    ctx: 'flor',
    locale: 'en-US',
    include: 'TYRECA',
    brand: 'skymonde',
  })

  try {
    const response = await fetch(
      `https://destiny.skymonde.net/dest?${params.toString()}`
    )
    if (!response.ok) return []
    const data: DestinyResponse = await response.json()

    const key = Object.keys(data).find(k => Array.isArray(data[k]))
    if (!key) return []

    return (data[key] as DestinyResult[]).filter(
      r => r.type === 'airport' || r.type === 'city'
    )
  } catch {
    return []
  }
}
