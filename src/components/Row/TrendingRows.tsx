import { MediaRow, type MediaRowItemOptions } from '@/components/Row/MediaRow'
import { PosterCard } from '@/components/Row/PosterCard'
import { useTrendingQuery } from '@/hooks/useTrendingQuery'
import type { TrendingMovie } from '@/types/trending'
import {
  MIN_GENRE_ROW_COUNT,
  moviesForGenreRow,
  TRENDING_GENRE_ROWS,
} from '@/utils/tmdbGenres'

const renderPoster = (movie: TrendingMovie, options: MediaRowItemOptions) => (
  <PosterCard
    movie={movie}
    tabIndex={options.tabIndex}
    onFocus={options.onFocus}
    eager={options.eager}
  />
)

export const TrendingRows = () => {
  const { data, isLoading, isError } = useTrendingQuery()
  const movies = data?.results ?? []

  return (
    <>
      <MediaRow
        label="Trending"
        title="Popular this week"
        items={movies}
        getKey={(movie) => movie.id}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No trending movies right now."
        errorMessage="Couldn't load trending movies."
        showHeading={isLoading || isError || movies.length > 0}
        eagerCount={4}
        renderItem={renderPoster}
      />

      {!isLoading && !isError
        ? TRENDING_GENRE_ROWS.map((row) => {
            const rowMovies = moviesForGenreRow(movies, row.genreIds)
            if (rowMovies.length < MIN_GENRE_ROW_COUNT) return null

            return (
              <MediaRow
                key={row.id}
                label={row.label}
                title={row.title}
                items={rowMovies}
                getKey={(movie) => `${row.id}-${movie.id}`}
                renderItem={renderPoster}
              />
            )
          })
        : null}
    </>
  )
}
