export type MovieGenre = {
  id: number
  name: string
}

export type MovieCollection = {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export type ProductionCompany = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

export type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type SearchMovie = {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: MovieCollection | null
  budget: number
  genres: MovieGenre[]
  homepage: string
  id: number
  imdb_id: string | null
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  softcore: boolean
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

/** TMDB movie search hit (list endpoint). */
export type SearchMovieResult = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  softcore: boolean
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type SearchMoviesResponse = {
  page: number
  results: SearchMovieResult[]
  total_pages?: number
  total_results?: number
}
