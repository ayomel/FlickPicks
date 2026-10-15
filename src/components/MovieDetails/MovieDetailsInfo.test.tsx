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
  runtime: 136,
  status: 'Released',
  release_date: '1999-03-31',
  original_language: 'en',
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
  ],
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

    expect(screen.getAllByText('Action').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Science Fiction').length).toBeGreaterThan(0)
    expect(
      screen.getAllByText('United States of America').length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('Warner Bros.').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$63M').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Release date').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Runtime').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Status').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Language').length).toBeGreaterThan(0)
    expect(screen.getAllByText('English').length).toBeGreaterThan(0)

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

  it('loads the lg sidebar poster eagerly and the mobile card lazily', () => {
    render(<MovieDetailsInfo movie={movie} />)

    const posters = screen.getAllByRole('img', { name: 'The Matrix poster' })
    expect(posters.some((img) => img.getAttribute('loading') === 'eager')).toBe(
      true,
    )
    expect(posters.some((img) => img.getAttribute('loading') === 'lazy')).toBe(
      true,
    )
  })

  it('falls back to the Film icon when the poster fails', () => {
    render(<MovieDetailsInfo movie={movie} />)

    for (const img of screen.getAllByRole('img', {
      name: 'The Matrix poster',
    })) {
      fireEvent.error(img)
    }
    expect(
      screen.queryByRole('img', { name: 'The Matrix poster' }),
    ).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeTruthy()
  })
})
