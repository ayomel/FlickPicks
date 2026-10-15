import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Seo } from './Seo'
import { SITE_ORIGIN } from '@/utils/seo'

afterEach(() => {
  cleanup()
})

describe('Seo', () => {
  beforeEach(() => {
    document.head.innerHTML = `<title>FlickPick</title>`
    document.title = 'FlickPick'
  })

  it('sets document.title without adding a second title element', async () => {
    render(
      <Seo
        title="The Matrix · FlickPick"
        description="A computer hacker joins rebels."
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe('The Matrix · FlickPick')
    })
    expect(document.querySelectorAll('title')).toHaveLength(1)
  })

  it('keeps exactly one description and refreshes og tags without duplicates', async () => {
    document.head.innerHTML = `
      <title>FlickPick</title>
      <meta name="description" content="Browse trending movies." />
      <meta property="og:title" content="Stale title" />
      <link rel="canonical" href="https://example.com/stale" />
    `

    render(
      <Seo
        title="The Matrix · FlickPick"
        description="A computer hacker joins rebels."
        canonical={`${SITE_ORIGIN}/movies/603`}
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
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'video.movie',
    )
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_ORIGIN}/movies/603`,
    )
  })

  it('clears movie-only tags when navigating to Home', async () => {
    const { rerender } = render(
      <Seo
        title="The Matrix · FlickPick"
        description="A computer hacker joins rebels."
        canonical={`${SITE_ORIGIN}/movies/603`}
        ogType="video.movie"
        ogImage="https://image.tmdb.org/t/p/w780/matrix.jpg"
      />,
    )

    await waitFor(() => {
      expect(
        document.querySelector('meta[property="og:type"]'),
      ).toHaveAttribute('content', 'video.movie')
    })

    rerender(
      <Seo
        title="FlickPick"
        description="Browse trending movies, coming soon titles, and a shared watchlist."
        canonical={`${SITE_ORIGIN}/`}
        ogType="website"
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe('FlickPick')
    })
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website',
    )
    expect(
      document.querySelector('meta[property="og:image"]'),
    ).not.toBeInTheDocument()
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `${SITE_ORIGIN}/`,
    )
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_ORIGIN}/`,
    )
  })

  it('clears canonical and og:url when navigating to a 404 page', async () => {
    const { rerender } = render(
      <Seo
        title="The Matrix · FlickPick"
        description="A computer hacker joins rebels."
        canonical={`${SITE_ORIGIN}/movies/603`}
        ogType="video.movie"
        ogImage="https://image.tmdb.org/t/p/w780/matrix.jpg"
      />,
    )

    await waitFor(() => {
      expect(
        document.querySelector('link[rel="canonical"]'),
      ).toBeInTheDocument()
    })

    rerender(
      <Seo
        title="Page not found · FlickPick"
        description="This FlickPick page does not exist."
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe('Page not found · FlickPick')
    })
    expect(
      document.querySelector('meta[property="og:type"]'),
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('meta[property="og:image"]'),
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('meta[property="og:url"]'),
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('link[rel="canonical"]'),
    ).not.toBeInTheDocument()
  })
})
