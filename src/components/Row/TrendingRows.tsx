import { MediaRow } from '@/components/Row/MediaRow'
import { PosterCard } from '@/components/Row/PosterCard'
import { useTrendingQuery } from '@/hooks/useTrendingQuery'
import {
  MIN_GENRE_ROW_COUNT,
  moviesForGenreRow,
  TRENDING_GENRE_ROWS,
} from '@/utils/tmdbGenres'

export const TrendingRows = () => {
  const { data, isLoading, isError } = useTrendingQuery()

  if (isLoading) {
    return (
      <MediaRow
        label="Trending"
        title="Popular this week"
        isLoading
        errorMessage="Couldn't load trending movies."
      >
        {null}
      </MediaRow>
    )
  }

  if (isError) {
    return (
      <MediaRow
        label="Trending"
        title="Popular this week"
        isError
        errorMessage="Couldn't load trending movies."
      >
        {null}
      </MediaRow>
    )
  }

  const movies = data?.results ?? []

  return (
    <>
      <MediaRow
        label="Trending"
        title="Popular this week"
        isEmpty={movies.length === 0}
        emptyMessage="No trending movies right now."
        errorMessage="Couldn't load trending movies."
        showHeading={movies.length > 0}
      >
        {movies.map((movie) => (
          <li key={movie.id}>
            <PosterCard movie={movie} />
          </li>
        ))}
      </MediaRow>

      {TRENDING_GENRE_ROWS.map((row) => {
        const rowMovies = moviesForGenreRow(movies, row.genreIds)
        if (rowMovies.length < MIN_GENRE_ROW_COUNT) return null

        return (
          <MediaRow key={row.id} label={row.label} title={row.title}>
            {rowMovies.map((movie) => (
              <li key={`${row.id}-${movie.id}`}>
                <PosterCard movie={movie} />
              </li>
            ))}
          </MediaRow>
        )
      })}
    </>
  )
}
