import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { WatchlistRow } from './WatchlistRow'

vi.mock('@/hooks/useWatchlistQuery', () => ({
  useWatchlistMovies: () => ({
    tmdbIds: [1],
    movies: [
      {
        id: 1,
        title: 'Test Movie',
        poster_path: null,
        release_date: '2024-01-01',
      },
    ],
    isLoadingMovies: false,
    isError: false,
    entriesQuery: { data: [{ id: 1, tmdb_id: 1 }] },
  }),
}))

describe('WatchlistRow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not pull up over the hero with a negative top margin', () => {
    const client = new QueryClient()
    const { container } = render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <WatchlistRow />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    const section = container.querySelector('section')
    expect(section?.className).not.toMatch(/-mt-/)
    expect(screen.getByText('Your watchlist')).toBeInTheDocument()
  })
})
