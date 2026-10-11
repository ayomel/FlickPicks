const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original'
const TMDB_IMAGE_W92 = 'https://image.tmdb.org/t/p/w92'
const TMDB_IMAGE_W342 = 'https://image.tmdb.org/t/p/w342'

export const getTmdbImagePath = (path: string) => {
  return `${TMDB_IMAGE_ORIGINAL}${path}`
}

export const getPosterThumbPath = (path: string) => {
  return `${TMDB_IMAGE_W92}${path}`
}

export const getPosterCardPath = (path: string) => {
  return `${TMDB_IMAGE_W342}${path}`
}

export const getPosterPath = getTmdbImagePath
export const getBackdropPath = getTmdbImagePath
