import { SectionLabel } from '@/components/ui/section-label'
import { Skeleton } from '@/components/ui/skeleton'
import { useWatchlistMovies } from '@/hooks/useWatchlistQuery'
import { WatchlistCard } from './WatchlistCard'

const WatchlistSkeleton = () => {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="w-36 shrink-0 sm:w-40">
          <Skeleton className="aspect-[2/3] w-full rounded-md" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export const WatchlistRow = () => {
  const { tmdbIds, movies, isLoadingMovies, isError, entriesQuery } =
    useWatchlistMovies()

  if (!isLoadingMovies && tmdbIds.length === 0) {
    return null
  }

  return (
    <section className="relative z-10 pb-16 pt-8">
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionLabel className="mb-2">Your watchlist</SectionLabel>
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
            Saved to watch
          </h2>

          {isLoadingMovies ? (
            <WatchlistSkeleton />
          ) : isError ? (
            <p className="m-0 text-sm text-muted-foreground">
              Couldn&apos;t load your watchlist.
            </p>
          ) : (
            <ul className="m-0 flex list-none gap-3 overflow-x-auto p-0 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]">
              {movies.map((movie) => (
                <li key={movie.id}>
                  <WatchlistCard movie={movie} />
                </li>
              ))}
            </ul>
          )}

          {!isLoadingMovies && !isError && entriesQuery.data?.length ? (
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {movies.length} title{movies.length === 1 ? '' : 's'}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
