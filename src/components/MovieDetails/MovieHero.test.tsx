import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { MovieHero } from './MovieHero'
import type { MovieDetails } from '@/types/movieDetails'

afterEach(() => {
  cleanup()
})

const movie = {
  id: 603,
  title: 'The Matrix',
  tagline: 'Welcome to the Real World.',
  overview: 'A computer hacker learns...',
  release_date: '1999-03-31',
  runtime: 136,
  vote_average: 8.2,
  genres: [{ id: 28, name: 'Action' }],
  backdrop_path: '/b.jpg',
  poster_path: '/p.jpg',
  budget: 63_000_000,
  production_companies: [],
  production_countries: [],
  trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
} as MovieDetails

describe('MovieHero', () => {
  it('shows a back link, title, tagline, and meta without action buttons', () => {
    render(
      <MemoryRouter>
        <MovieHero movie={movie} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: 'Back to browse' }),
    ).toHaveAttribute('href', '/')
    expect(
      screen.getByRole('heading', { name: 'The Matrix' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Welcome to the Real World.')).toBeInTheDocument()
    expect(screen.getByText(/1999/)).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /play trailer/i }),
    ).not.toBeInTheDocument()
  })
})
