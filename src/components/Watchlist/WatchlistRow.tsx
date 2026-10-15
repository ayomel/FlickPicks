import { MediaRow } from '@/components/Row/MediaRow'
import { useWatchlistMovies } from '@/hooks/useWatchlistQuery'
import { WatchlistCard } from './WatchlistCard'

export const WatchlistRow = () => {
  const { tmdbIds, movies, isLoadingMovies, isError, entriesQuery } =
    useWatchlistMovies()

  if (!isLoadingMovies && tmdbIds.length === 0) {
    return null
  }

  return (
    <MediaRow
      label="Your watchlist"
      title="Saved to watch"
      isLoading={isLoadingMovies}
      isError={isError}
      errorMessage="Couldn't load your watchlist."
      className="pb-8 pt-8"
      footer={
        !isLoadingMovies && !isError && entriesQuery.data?.length ? (
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            {movies.length} title{movies.length === 1 ? '' : 's'}
          </p>
        ) : null
      }
    >
      {movies.map((movie) => (
        <li key={movie.id}>
          <WatchlistCard movie={movie} />
        </li>
      ))}
    </MediaRow>
  )
}
