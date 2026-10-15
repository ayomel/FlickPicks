import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { MovieDetails } from '@/types/movieDetails'
import { isNumericMovieId } from '@/utils/isNumericMovieId'

export const useMovieDetailsQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['movie', id],
    enabled: isNumericMovieId(id),
    queryFn: async () => {
      const { data } = await apiClient.get<MovieDetails>(`/movies/${id}`)
      return data
    },
    // Default retries turn a missing movie into a long spinner.
    retry: false,
  })
}
