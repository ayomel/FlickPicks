import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.css'),
  'utf8',
)

describe('theme tokens', () => {
  it('defines the red brand palette tokens', () => {
    expect(css).toMatch(/--background:/)
    expect(css).toMatch(/--primary:/)
    expect(css).toMatch(/--brand-text:/)
    expect(css).toMatch(/--brand-glow:/)
  })

  it('drops the old green brand tokens', () => {
    expect(css).not.toMatch(/--brand-green/)
  })
})
