import { MediaRow } from '@/components/Row/MediaRow'
import { PosterCard } from '@/components/Row/PosterCard'
import { useWatchlistMovies } from '@/hooks/useWatchlistQuery'

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
      items={movies}
      getKey={(movie) => movie.id}
      isLoading={isLoadingMovies}
      isError={isError}
      errorMessage="Couldn't load your watchlist."
      footer={
        !isLoadingMovies && !isError && entriesQuery.data?.length ? (
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            {movies.length} title{movies.length === 1 ? '' : 's'}
          </p>
        ) : null
      }
      renderItem={(movie, { tabIndex, onFocus, eager }) => (
        <PosterCard
          movie={movie}
          tabIndex={tabIndex}
          onFocus={onFocus}
          eager={eager}
        />
      )}
    />
  )
}
