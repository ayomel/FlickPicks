import { isAppShellPath, isStaticAssetPath } from './routes'

export interface Env {
  ASSETS: Fetcher
}

const fetchShell = (request: Request, env: Env) =>
  env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request))

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (isStaticAssetPath(pathname)) {
      return env.ASSETS.fetch(request)
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
