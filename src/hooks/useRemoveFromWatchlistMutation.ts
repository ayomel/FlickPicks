import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { WatchlistEntryRead } from '@/types/watchlist'
import { watchlistQueryKey } from '@/hooks/useWatchlistQuery'

const getWatchlistEntries = async (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  const cached = queryClient.getQueryData<WatchlistEntryRead[]>(watchlistQueryKey)
  if (cached) return cached
  const { data } = await apiClient.get<WatchlistEntryRead[]>('/entry')
  return data
}

export const useRemoveFromWatchlistMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tmdbId: number) => {
      const entries = await getWatchlistEntries(queryClient)
      const matching = entries.filter((entry) => entry.tmdb_id === tmdbId)
      await Promise.all(
        matching.map((entry) => apiClient.delete(`/entry/${entry.id}`)),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: watchlistQueryKey })
    },
  })
}
