import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { MovieDetailsError } from './MovieDetailsError'

describe('MovieDetailsError', () => {
  it('shows the movie not found copy when notFound is set', () => {
    render(
      <MemoryRouter>
        <MovieDetailsError notFound />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Movie not found' }),
    ).toBeInTheDocument()
    expect(screen.getByText('No movie matches this id.')).toBeInTheDocument()
  })

  it('shows the generic error copy by default', () => {
    render(
      <MemoryRouter>
        <MovieDetailsError />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Something went wrong' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('We could not load this movie.'),
    ).toBeInTheDocument()
  })
})
