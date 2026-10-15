const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const tmdbImageUrl = (size: string, path: string) =>
  `${TMDB_IMAGE_BASE}/${size}${path}`

/** Default poster src (w342). Pair with getPosterSrcSet. */
export const getPosterCardPath = (path: string) => tmdbImageUrl('w342', path)

export const getPosterSrcSet = (path: string) =>
  `${tmdbImageUrl('w185', path)} 185w, ${tmdbImageUrl('w342', path)} 342w`

export const POSTER_SIZES_CARD = '(min-width: 640px) 160px, 144px'

/** Search dropdown thumbs stay small. */
export const getPosterThumbPath = (path: string) => tmdbImageUrl('w92', path)

/** Default backdrop src (w780). Pair with getBackdropSrcSet. */
export const getBackdropCardPath = (path: string) => tmdbImageUrl('w780', path)

export const getBackdropSrcSet = (path: string) =>
  `${tmdbImageUrl('w780', path)} 780w, ${tmdbImageUrl('w1280', path)} 1280w`

export const BACKDROP_SIZES_CARD = '(min-width: 640px) 320px, 256px'

export const BACKDROP_SIZES_HERO = '100vw'

/** Detail sidebar posters. */
export const getPosterPath = (path: string) => tmdbImageUrl('w780', path)

export const getPosterSrcSetDetail = (path: string) =>
  `${tmdbImageUrl('w185', path)} 185w, ${tmdbImageUrl('w342', path)} 342w, ${tmdbImageUrl('w780', path)} 780w`

export const POSTER_SIZES_DETAIL =
  '(min-width: 1280px) 18rem, (min-width: 1024px) 16rem, 40vw'

/** Hero / full-bleed backdrops default to w780. */
export const getBackdropPath = (path: string) => tmdbImageUrl('w780', path)
