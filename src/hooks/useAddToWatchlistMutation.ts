import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { WatchlistEntryCreate, WatchlistEntryRead } from '@/types/watchlist'

export const useAddToWatchlistMutation = () => {
  return useMutation({
    mutationFn: async (tmdbId: number) => {
      const body: WatchlistEntryCreate = {
        tmdb_id: tmdbId,
        status: 'want',
      }
      const { data } = await apiClient.post<WatchlistEntryRead>('/entry', body)
      return data
    },
  })
}
