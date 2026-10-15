export const movieOgImageUrl = (movie: {
  backdrop_path?: string | null
  poster_path?: string | null
}) => {
  const path = movie.backdrop_path || movie.poster_path
  if (!path) return null
  return `https://image.tmdb.org/t/p/w780${path}`
}

export const absoluteUrl = (pathname: string) => {
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://flickpick.mel-2cb.workers.dev'
  return `${origin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
