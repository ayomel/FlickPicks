const API_ORIGIN = 'https://flickpicks.fastapicloud.dev'
export const SITE_ORIGIN = 'https://flickpick.mel-2cb.workers.dev'
const TMDB_OG_IMAGE = 'https://image.tmdb.org/t/p/w780'
const CACHE_TTL_SECONDS = 60 * 60

export type MovieMetaSource = {
  id: number
  title: string
  overview?: string | null
  poster_path?: string | null
  backdrop_path?: string | null
}

export const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

export const moviePageTitle = (title: string) => `${title} · FlickPick`

export const movieCanonicalUrl = (id: number) => `${SITE_ORIGIN}/movies/${id}`

export const movieOgImage = (movie: MovieMetaSource) => {
  const path = movie.backdrop_path || movie.poster_path
  if (!path) return null
  return `${TMDB_OG_IMAGE}${path}`
}

export const buildMetaTagsHtml = (movie: MovieMetaSource) => {
  const title = escapeHtml(moviePageTitle(movie.title))
  const description = escapeHtml(
    (movie.overview ?? '').trim() || `Details for ${movie.title} on FlickPick.`,
  )
  const canonical = escapeHtml(movieCanonicalUrl(movie.id))
  const image = movieOgImage(movie)
  const imageTag = image
    ? `<meta property="og:image" content="${escapeHtml(image)}" />`
    : ''

  return [
    `<meta name="description" content="${description}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    imageTag,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="canonical" href="${canonical}" />`,
  ]
    .filter(Boolean)
    .join('')
}

export const fetchMovieMeta = async (
  id: string,
): Promise<MovieMetaSource | null> => {
  try {
    const response = await fetch(`${API_ORIGIN}/movies/${id}`, {
      cf: {
        cacheTtl: CACHE_TTL_SECONDS,
        cacheEverything: true,
      },
    })
    if (!response.ok) return null
    const data = (await response.json()) as MovieMetaSource
    if (!data?.id || !data?.title) return null
    return data
  } catch {
    return null
  }
}

export const injectMovieMeta = (shell: Response, movie: MovieMetaSource) => {
  const title = moviePageTitle(movie.title)
  const tags = buildMetaTagsHtml(movie)

  return new HTMLRewriter()
    .on('title', {
      element(element) {
        element.setInnerContent(title)
      },
    })
    .on('head', {
      element(element) {
        element.append(tags, { html: true })
      },
    })
    .transform(shell)
}
