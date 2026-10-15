import { isAppShellPath, isStaticAssetPath } from './routes'

export interface Env {
  ASSETS: Fetcher
}

const fetchShell = (request: Request, env: Env) =>
  env.ASSETS.fetch(
    new Request(new URL('/', request.url), { headers: request.headers }),
  )

const isHtmlResponse = (response: Response) => {
  const contentType = response.headers.get('content-type') ?? ''
  return contentType.includes('text/html')
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
