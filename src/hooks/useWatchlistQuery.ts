import { useQueries, useQuery } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { MovieDetails } from '@/types/movieDetails'
import type { WatchlistEntryRead } from '@/types/watchlist'

export const watchlistQueryKey = ['watchlist'] as const

export const useWatchlistQuery = () => {
  return useQuery({
    queryKey: watchlistQueryKey,
    queryFn: async () => {
      const { data } = await apiClient.get<WatchlistEntryRead[]>('/entry')
      return data
    },
  })
}

export const useIsMovieOnWatchlist = (tmdbId: number) => {
  const { data, isLoading, isFetching } = useWatchlistQuery()
  const isOnWatchlist = data?.some((entry) => entry.tmdb_id === tmdbId) ?? false

  return {
    isOnWatchlist,
    isLoading: isLoading || isFetching,
  }
}

const uniqueOrderedTmdbIds = (entries: WatchlistEntryRead[]) => {
  const seen = new Set<number>()
  const ids: number[] = []
  for (const entry of entries) {
    if (seen.has(entry.tmdb_id)) continue
    seen.add(entry.tmdb_id)
    ids.push(entry.tmdb_id)
  }
  return ids
}

export const useWatchlistMovies = () => {
  const entriesQuery = useWatchlistQuery()
  const tmdbIds = uniqueOrderedTmdbIds(entriesQuery.data ?? [])

  const movieQueries = useQueries({
    queries: tmdbIds.map((id) => ({
      queryKey: ['movie', String(id)],
      queryFn: async () => {
        const { data } = await apiClient.get<MovieDetails>(`/movies/${id}`)
        return data
      },
    })),
  })

  const movies = movieQueries
    .map((query) => query.data)
    .filter((movie): movie is MovieDetails => Boolean(movie))

  const isLoadingMovies =
    entriesQuery.isLoading ||
    (tmdbIds.length > 0 && movieQueries.some((query) => query.isLoading))

  return {
    entriesQuery,
    tmdbIds,
    movies,
    isLoadingMovies,
    isError:
      entriesQuery.isError || movieQueries.some((query) => query.isError),
  }
}
