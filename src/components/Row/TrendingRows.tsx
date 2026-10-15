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
  const movies = data?.results ?? []

  return (
    <>
      <MediaRow
        label="Trending"
        title="Popular this week"
        isLoading={isLoading}
        isError={isError}
        errorMessage="Couldn't load trending movies."
      >
        {movies.map((movie) => (
          <li key={movie.id}>
            <PosterCard movie={movie} />
          </li>
        ))}
      </MediaRow>

      {TRENDING_GENRE_ROWS.map((row) => {
        const rowMovies = moviesForGenreRow(movies, row.genreIds)
        if (isLoading) return null
        if (isError) return null
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
