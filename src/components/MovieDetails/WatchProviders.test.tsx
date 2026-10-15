import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { WatchProviders } from './WatchProviders'

afterEach(() => {
  cleanup()
})

describe('WatchProviders', () => {
  it('uses Where to watch as h2 and Stream/Rent/Buy as h3 with JustWatch attribution', () => {
    render(
      <WatchProviders
        providers={{
          link: 'https://www.themoviedb.org/movie/603/watch?locale=US',
          flatrate: [
            {
              provider_id: 1,
              provider_name: 'Netflix',
              logo_path: '/n.jpg',
              display_priority: 1,
            },
          ],
          rent: [
            {
              provider_id: 2,
              provider_name: 'Apple TV',
              logo_path: '/a.jpg',
              display_priority: 1,
            },
          ],
          buy: [
            {
              provider_id: 3,
              provider_name: 'Amazon',
              logo_path: '/z.jpg',
              display_priority: 1,
            },
          ],
        }}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Where to watch' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Stream' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Rent' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Buy' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'JustWatch' })).toHaveAttribute(
      'href',
      'https://www.themoviedb.org/movie/603/watch?locale=US',
    )
  })

  it('shows an empty-state card when no US providers are listed', () => {
    render(<WatchProviders providers={{ flatrate: [], rent: [], buy: [] }} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Where to watch' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('No streaming options listed yet.'),
    ).toBeInTheDocument()
    expect(screen.getByText(/TMDB \/ JustWatch/)).toBeInTheDocument()
  })
})
