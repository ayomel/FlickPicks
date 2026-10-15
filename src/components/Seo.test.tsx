import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Seo } from './Seo'

afterEach(() => {
  cleanup()
})

describe('Seo', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <title>FlickPick</title>
      <meta name="description" content="Browse trending movies, coming soon titles, and a shared watchlist." />
      <meta property="og:title" content="Stale title" />
      <link rel="canonical" href="https://example.com/stale" />
    `
  })

  it('keeps exactly one description and refreshes og tags without duplicates', async () => {
    render(
      <Seo
        title="The Matrix · FlickPick"
        description="A computer hacker joins rebels."
        canonical="https://flickpick.mel-2cb.workers.dev/movies/603"
        ogType="video.movie"
        ogImage="https://image.tmdb.org/t/p/w780/matrix.jpg"
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe('The Matrix · FlickPick')
    })

    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(
      1,
    )
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'A computer hacker joins rebels.',
    )
    expect(document.querySelectorAll('meta[property="og:title"]')).toHaveLength(
      1,
    )
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'The Matrix · FlickPick',
    )
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'video.movie',
    )
    expect(
      document.querySelector('meta[property="og:description"]'),
    ).toHaveAttribute('content', 'A computer hacker joins rebels.')
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://image.tmdb.org/t/p/w780/matrix.jpg',
    )
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://flickpick.mel-2cb.workers.dev/movies/603',
    )
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://flickpick.mel-2cb.workers.dev/movies/603',
    )
  })
})
