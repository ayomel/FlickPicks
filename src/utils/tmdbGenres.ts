import type { TrendingMovie } from '@/types/trending'

const TMDB_MOVIE_GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

export const MIN_GENRE_ROW_COUNT = 4

export type GenreRowConfig = {
  id: string
  label: string
  title: string
  genreIds: number[]
}

/** Genre rows built from the trending list (hide when thinner than MIN_GENRE_ROW_COUNT). */
export const TRENDING_GENRE_ROWS: GenreRowConfig[] = [
  {
    id: 'horror-thriller',
    label: 'Genre',
    title: 'Horror & Thriller',
    genreIds: [27, 53],
  },
  {
    id: 'action-adventure',
    label: 'Genre',
    title: 'Action & Adventure',
    genreIds: [28, 12],
  },
]

export const getMovieGenreName = (genreId: number) => {
  return TMDB_MOVIE_GENRES[genreId] ?? null
}

export const formatGenreLabels = (genreIds: number[], limit = 2) => {
  const names = genreIds
    .map((id) => getMovieGenreName(id))
    .filter((name): name is string => Boolean(name))
    .slice(0, limit)

  return names.join(' · ')
}

export const moviesForGenreRow = (
  movies: TrendingMovie[],
  genreIds: number[],
) => {
  return movies.filter((movie) =>
    movie.genre_ids.some((id) => genreIds.includes(id)),
  )
}
