import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { MovieDetails } from '@/types/movieDetails'

export const isNumericMovieId = (id: string | undefined): id is string =>
  Boolean(id) && /^\d+$/.test(id!)

export const useMovieDetailsQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['movie', id],
    // Skip the request for non-numeric ids so the page can show not-found immediately.
    enabled: isNumericMovieId(id),
    queryFn: async () => {
      const { data } = await apiClient.get<MovieDetails>(`/movies/${id}`)
      return data
    },
    // Default retries turn a 404 into a long loading state.
    retry: false,
  })
}
