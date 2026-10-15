export type TrendingMovie = {
  adult: boolean
  backdrop_path: string | null
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  media_type: string
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: string
  softcore: boolean
  video: boolean
  vote_average: number
  vote_count: number
}

export type TrendingResponse = {
  page: number
  results: TrendingMovie[]
  total_pages: number
  total_results: number
}

export type FeaturedMovie = TrendingMovie & { backdrop_path: string }

export const hasBackdrop = (movie: TrendingMovie): movie is FeaturedMovie =>
  Boolean(movie.backdrop_path)
