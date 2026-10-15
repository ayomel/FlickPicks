import { describe, expect, it } from 'vitest'
import {
  buildMetaTagsHtml,
  escapeHtml,
  movieCanonicalUrl,
  moviePageTitle,
  SITE_ORIGIN,
} from './meta'

describe('escapeHtml', () => {
  it('escapes characters that break attribute and text context', () => {
    expect(escapeHtml(`A & B <C> "D" 'E'`)).toBe(
      'A &amp; B &lt;C&gt; &quot;D&quot; &#39;E&#39;',
    )
  })
})

describe('movie meta helpers', () => {
  it('builds title and canonical urls from the live origin', () => {
    expect(moviePageTitle('The Matrix')).toBe('The Matrix · FlickPick')
    expect(movieCanonicalUrl(603)).toBe(`${SITE_ORIGIN}/movies/603`)
  })

  it('builds escaped meta tags for crawlers', () => {
    const html = buildMetaTagsHtml({
      id: 603,
      title: 'The Matrix & Co',
      overview: 'A <hacker> joins "rebels".',
      backdrop_path: '/tlm.jpg',
    })

    expect(html).toContain('The Matrix &amp; Co · FlickPick')
    expect(html).toContain('A &lt;hacker&gt; joins &quot;rebels&quot;.')
    expect(html).toContain(`content="${SITE_ORIGIN}/movies/603"`)
    expect(html).toContain('property="og:type" content="video.movie"')
    expect(html).toContain('property="og:image"')
    expect(html).toContain('https://image.tmdb.org/t/p/w780/tlm.jpg')
    expect(html).toContain('name="twitter:card"')
    expect(html).toContain('rel="canonical"')
    expect(html).not.toContain('name="description"')
  })
})
