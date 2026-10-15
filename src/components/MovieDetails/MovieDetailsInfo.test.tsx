import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MovieDetailsInfo } from './MovieDetailsInfo'
import type { MovieDetails } from '@/types/movieDetails'

afterEach(() => {
  cleanup()
})

const movie = {
  id: 603,
  title: 'The Matrix',
  genres: [
    { id: 28, name: 'Action' },
    { id: 878, name: 'Science Fiction' },
  ],
  poster_path: '/p.jpg',
  budget: 63_000_000,
  production_companies: [
    { id: 1, name: 'Warner Bros.', logo_path: null, origin_country: 'US' },
  ],
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
} as MovieDetails

describe('MovieDetailsInfo', () => {
  it('renders the side panel details and hides a zero budget', () => {
    render(<MovieDetailsInfo movie={movie} />)

    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Science Fiction')).toBeInTheDocument()
    expect(screen.getByText('United States of America')).toBeInTheDocument()
    expect(screen.getByText('Warner Bros.')).toBeInTheDocument()
    expect(screen.getByText('$63M')).toBeInTheDocument()

    cleanup()
    render(
      <MovieDetailsInfo
        movie={{
          ...movie,
          budget: 0,
          production_companies: [],
          production_countries: [],
        }}
      />,
    )
    expect(screen.queryByText('Budget')).not.toBeInTheDocument()
    expect(screen.queryByText('$63M')).not.toBeInTheDocument()
  })

  it('falls back to the Film icon when the poster fails', () => {
    render(<MovieDetailsInfo movie={movie} />)

    fireEvent.error(screen.getByRole('img', { name: 'The Matrix poster' }))
    expect(
      screen.queryByRole('img', { name: 'The Matrix poster' }),
    ).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeTruthy()
  })
})
