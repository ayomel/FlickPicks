import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MovieMetadata } from './MovieMetadata'
import type { MovieDetails } from '@/types/movieDetails'

afterEach(() => {
  cleanup()
})

const movie = {
  id: 1,
  title: 'Untitled',
  tagline: 'A quiet film.',
  release_date: '2026-01-01',
  runtime: 100,
  vote_average: 0,
  vote_count: 0,
  genres: [],
} as MovieDetails

describe('MovieMetadata', () => {
  it('hides the rating badge when there are no votes', () => {
    render(<MovieMetadata movie={movie} />)

    expect(screen.queryByText('0.0')).not.toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('shows the rating badge when votes exist', () => {
    render(
      <MovieMetadata
        movie={{ ...movie, vote_average: 8.2, vote_count: 1200 }}
      />,
    )

    expect(screen.getByText('8.2')).toBeInTheDocument()
  })
})
