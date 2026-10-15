import { describe, expect, it } from 'vitest'
import { absoluteUrl, SITE_ORIGIN } from './seo'

describe('absoluteUrl', () => {
  it('always uses the production SITE_ORIGIN', () => {
    expect(SITE_ORIGIN).toBe('https://flickpick.mel-2cb.workers.dev')
    expect(absoluteUrl('/movies/603')).toBe(
      'https://flickpick.mel-2cb.workers.dev/movies/603',
    )
    expect(absoluteUrl('/')).toBe('https://flickpick.mel-2cb.workers.dev/')
  })
})
