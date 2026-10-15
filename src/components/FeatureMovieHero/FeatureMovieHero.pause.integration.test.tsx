import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FeatureMovieHero } from './FeatureMovieHero'
import { HERO_INTERVAL_MS } from '@/hooks/useHeroSlideshow'
import type { FeaturedMovie } from '@/types/trending'

vi.mock('@/hooks/useTrendingQuery', () => ({
  useTrendingQuery: () => ({
    data: {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/backdrop.jpg',
          id: 550,
          title: 'Fight Club',
          original_title: 'Fight Club',
          overview: 'An office worker forms an underground club.',
          poster_path: '/poster.jpg',
          media_type: 'movie',
          original_language: 'en',
          genre_ids: [18],
          popularity: 100,
          release_date: '1999-10-15',
          softcore: false,
          video: false,
          vote_average: 8.4,
          vote_count: 1000,
        } satisfies FeaturedMovie,
        {
          adult: false,
          backdrop_path: '/other.jpg',
          id: 603,
          title: 'The Matrix',
          original_title: 'The Matrix',
          overview: 'A hacker learns the truth.',
          poster_path: '/m.jpg',
          media_type: 'movie',
          original_language: 'en',
          genre_ids: [28],
          popularity: 90,
          release_date: '1999-03-31',
          softcore: false,
          video: false,
          vote_average: 8.7,
          vote_count: 2000,
        } satisfies FeaturedMovie,
      ],
      total_pages: 1,
      total_results: 2,
    },
    isLoading: false,
    isError: false,
  }),
}))

vi.mock('@/hooks/useWatchlistQuery', () => ({
  useIsMovieOnWatchlist: () => ({ isOnWatchlist: false, isLoading: false }),
}))

vi.mock('@/hooks/useAddToWatchlistMutation', () => ({
  useAddToWatchlistMutation: () => ({
    isPending: false,
    isError: false,
    mutate: vi.fn(),
  }),
}))

vi.mock('@/hooks/useRemoveFromWatchlistMutation', () => ({
  useRemoveFromWatchlistMutation: () => ({
    isPending: false,
    isError: false,
    mutate: vi.fn(),
  }),
}))

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  )
})

const renderHero = () => {
  const client = new QueryClient()
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <FeatureMovieHero />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('FeatureMovieHero pause integration', () => {
  it('keeps autoplay paused when moving straight from content to controls', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'performance'] })
    renderHero()

    expect(
      screen.getByRole('heading', { name: 'Fight Club' }),
    ).toBeInTheDocument()

    const contentHotzone = screen
      .getByRole('heading', { name: 'Fight Club' })
      .closest('.absolute')!.parentElement!
    const controlsHotzone = screen
      .getByRole('button', { name: 'Next movie' })
      .closest('.absolute')!.parentElement!

    fireEvent.mouseEnter(contentHotzone)

    act(() => {
      fireEvent.mouseLeave(contentHotzone)
      fireEvent.mouseEnter(controlsHotzone)
      vi.advanceTimersByTime(HERO_INTERVAL_MS + 100)
    })

    expect(
      screen.getByRole('heading', { name: 'Fight Club' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'The Matrix' }),
    ).not.toBeInTheDocument()
  })
})
