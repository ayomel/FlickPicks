import { cleanup, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MoreTrendingRow } from './MoreTrendingRow'

vi.mock('@/hooks/useTrendingQuery', () => ({
  useTrendingQuery: () => ({
    data: {
      results: [
        {
          id: 1,
          title: 'Keep Me',
          poster_path: '/a.jpg',
          backdrop_path: '/b.jpg',
          overview: '',
          release_date: '2024-01-01',
          vote_average: 8,
          genre_ids: [28],
        },
        {
          id: 99,
          title: 'Current Movie',
          poster_path: '/c.jpg',
          backdrop_path: '/d.jpg',
          overview: '',
          release_date: '2024-01-02',
          vote_average: 7,
          genre_ids: [12],
        },
      ],
    },
    isLoading: false,
    isError: false,
  }),
}))

afterEach(() => {
  cleanup()
})

describe('MoreTrendingRow', () => {
  it('renders More trending and excludes the current movie id', () => {
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <MoreTrendingRow excludeId={99} />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    expect(
      screen.getByRole('heading', { name: 'More trending' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Keep Me')).toBeInTheDocument()
    expect(screen.queryByText('Current Movie')).not.toBeInTheDocument()
  })
})
