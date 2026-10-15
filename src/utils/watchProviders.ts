import type { WatchProvider } from '@/types/movieDetails'

export const uniqueProviders = (items: WatchProvider[]) => {
  const seen = new Set<number>()
  return items.filter((provider) => {
    if (seen.has(provider.provider_id)) return false
    seen.add(provider.provider_id)
    return true
  })
}

export const providerInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}
