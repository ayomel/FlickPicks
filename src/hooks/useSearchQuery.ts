import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { SearchMoviesResponse } from '@/types/search'

export const MIN_SEARCH_LENGTH = 2

export const useSearchQuery = (query: string) => {
  const trimmed = query.trim()

  return useQuery({
    queryKey: ['search', 'movie', trimmed],
    enabled: trimmed.length >= MIN_SEARCH_LENGTH,
    queryFn: async () => {
      const { data } = await apiClient.get<SearchMoviesResponse>(
        '/search/movie',
        {
          params: { query: trimmed },
        },
      )
      return data.results ?? []
    },
  })
}
