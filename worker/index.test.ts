import { describe, expect, it } from 'vitest'
import worker from './index'
import type { Env } from './index'

const SHELL_HTML =
  '<!doctype html><html><body><div id="root"></div></body></html>'

const requestUrl = (input: RequestInfo | URL) => {
  if (typeof input === 'string') return new URL(input)
  if (input instanceof URL) return input
  return new URL(input.url)
}

const createAssets = (
  files: Record<string, { body: string; type: string }>,
): Env['ASSETS'] => {
  return {
    async fetch(input: RequestInfo | URL) {
      const url = requestUrl(input)
      const pathname = url.pathname

      // Mimic ASSETS: /index.html redirects to /
      if (pathname === '/index.html') {
        return Response.redirect(new URL('/', url).toString(), 307)
      }

      const file = files[pathname]
      if (file) {
        return new Response(file.body, {
          status: 200,
          headers: { 'content-type': file.type },
        })
      }

      // SPA not_found_handling: missing paths get the shell
      return new Response(SHELL_HTML, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      })
    },
    connect() {
      throw new Error('ASSETS.connect is not used in these tests')
    },
  } as Env['ASSETS']
}

const envWith = (
  files: Record<string, { body: string; type: string }>,
): Env => ({
  ASSETS: createAssets(files),
})

const request = (path: string) =>
  new Request(`https://flickpick.example${path}`, {
    headers: { accept: 'text/html' },
  })

const handle = (path: string, env: Env) =>
  worker.fetch(request(path), env, {} as ExecutionContext)

describe('worker fetch handler', () => {
  const files = {
    '/': { body: SHELL_HTML, type: 'text/html; charset=utf-8' },
    '/assets/app.js': {
      body: 'console.log("ok")',
      type: 'application/javascript',
    },
    '/assets/hero.png': { body: 'png-bytes', type: 'image/png' },
  }

  it('returns 200 shell for / and numeric movie routes', async () => {
    const env = envWith(files)

    for (const path of ['/', '/movies/123']) {
      const response = await handle(path, env)
      expect(response.status).toBe(200)
      expect(await response.text()).toContain('id="root"')
    }
  })

  it('returns 404 shell for unknown and non-numeric movie paths', async () => {
    const env = envWith(files)

    for (const path of ['/nope', '/movies/abc']) {
      const response = await handle(path, env)
      expect(response.status).toBe(404)
      expect(await response.text()).toContain('id="root"')
    }
  })

  it('serves existing assets and 404s missing hashed assets', async () => {
    const env = envWith(files)

    const js = await handle('/assets/app.js', env)
    expect(js.status).toBe(200)
    expect(await js.text()).toBe('console.log("ok")')

    const png = await handle('/assets/hero.png', env)
    expect(png.status).toBe(200)

    const missingJs = await handle('/assets/missing-abc123.js', env)
    expect(missingJs.status).toBe(404)
    expect(await missingJs.text()).not.toContain('id="root"')

    const missingPng = await handle('/assets/missing.png', env)
    expect(missingPng.status).toBe(404)
  })

  it('fetches the shell from / instead of following /index.html redirects', async () => {
    let fetchedPath = ''
    const env: Env = {
      ASSETS: {
        async fetch(input: RequestInfo | URL) {
          const url = requestUrl(input)
          fetchedPath = url.pathname
          if (url.pathname === '/index.html') {
            return Response.redirect(new URL('/', url).toString(), 307)
          }
          return new Response(SHELL_HTML, {
            status: 200,
            headers: { 'content-type': 'text/html; charset=utf-8' },
          })
        },
        connect() {
          throw new Error('ASSETS.connect is not used in these tests')
        },
      } as Env['ASSETS'],
    }

    const response = await handle('/nope', env)
    expect(fetchedPath).toBe('/')
    expect(response.status).toBe(404)
    expect(await response.text()).toContain('id="root"')
  })
})
