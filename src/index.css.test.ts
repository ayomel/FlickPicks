import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.css'),
  'utf8',
)

const readToken = (name: string) => {
  const match = css.match(new RegExp(`${name}:\\s*([^;]+);`))
  expect(match, `missing token ${name}`).toBeTruthy()
  return match![1].trim().toLowerCase()
}

describe('theme tokens', () => {
  it('uses the red brand palette and dark canvas', () => {
    expect(readToken('--background')).toBe('#141414')
    expect(readToken('--primary')).toBe('#d42a20')
    expect(readToken('--brand-text')).toBe('#ff5a4e')
  })

  it('drops the old green brand tokens', () => {
    expect(css).not.toMatch(/--brand-green/)
  })
})
