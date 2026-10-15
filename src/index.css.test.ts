import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const cssPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'index.css',
)

describe('theme tokens', () => {
  it('sets muted-foreground to the brighter gray', () => {
    const css = readFileSync(cssPath, 'utf8')
    const mutedValues = [
      ...css.matchAll(/--muted-foreground:\s*([^;]+);/g),
    ].map((match) => match[1].trim().toLowerCase())

    expect(mutedValues.length).toBeGreaterThanOrEqual(2)
    expect(mutedValues.every((value) => value === '#b3b3b3')).toBe(true)
  })
})
