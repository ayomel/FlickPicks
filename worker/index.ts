import { isAppShellPath, isStaticAssetPath } from './routes'
import { DEFAULT_API_ORIGIN, fetchMovieMeta, injectMovieMeta } from './meta'

export interface Env {
  ASSETS: Fetcher
  API_ORIGIN?: string
}

const fetchShell = (request: Request, env: Env) => {
  const headers = new Headers(request.headers)
  headers.delete('If-None-Match')
  headers.delete('If-Modified-Since')
  return env.ASSETS.fetch(new Request(new URL('/', request.url), { headers }))
}

const isHtmlResponse = (response: Response) => {
  const contentType = response.headers.get('content-type') ?? ''
  return contentType.includes('text/html')
}

const movieIdFromPath = (pathname: string) => {
  const match = pathname.match(/^\/movies\/(\d+)$/)
  return match?.[1] ?? null
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (isStaticAssetPath(pathname)) {
      const asset = await env.ASSETS.fetch(request)
      // SPA not_found_handling serves index.html for missing files.
      // Hashed /assets/*.js and images must stay hard 404s.
      if (isHtmlResponse(asset)) {
        return new Response('Not found', { status: 404 })
      }
      return asset
    }

    const shell = await fetchShell(request, env)
    const movieId = movieIdFromPath(pathname)

    if (movieId) {
      const movie = await fetchMovieMeta(
        movieId,
        env.API_ORIGIN ?? DEFAULT_API_ORIGIN,
      )
      if (movie === 'not_found') {
        return new Response(shell.body, {
          status: 404,
          headers: shell.headers,
        })
      }
      if (movie) {
        return injectMovieMeta(shell, movie)
      }
      // Timeouts and 5xx keep a 200 SPA shell so the client can retry.
      return shell
    }

    if (isAppShellPath(pathname)) {
      return shell
    }

    // Real 404 status with the SPA shell so React can render NotFound.
    return new Response(shell.body, {
      status: 404,
      headers: shell.headers,
    })
  },
} satisfies ExportedHandler<Env>
