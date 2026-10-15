import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { PosterCard } from './PosterCard'

afterEach(() => {
  cleanup()
})

describe('PosterCard', () => {
  it('links to the movie detail page', () => {
    render(
      <MemoryRouter>
        <PosterCard
          movie={{
            id: 550,
            title: 'Fight Club',
            poster_path: null,
            release_date: '1999-10-15',
          }}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /fight club/i })).toHaveAttribute(
      'href',
      '/movies/550',
    )
    expect(screen.getByText('1999')).toBeInTheDocument()
  })

  it('falls back to the film icon when the poster fails', () => {
    render(
      <MemoryRouter>
        <PosterCard
          movie={{
            id: 550,
            title: 'Fight Club',
            poster_path: '/broken.jpg',
            release_date: '1999-10-15',
          }}
        />
      </MemoryRouter>,
    )

    fireEvent.error(screen.getByRole('img', { name: 'Fight Club poster' }))
    expect(
      screen.queryByRole('img', { name: 'Fight Club poster' }),
    ).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeTruthy()
  })

  it('uses a real poster alt text', () => {
    render(
      <MemoryRouter>
        <PosterCard
          movie={{
            id: 550,
            title: 'Fight Club',
            poster_path: '/fight.jpg',
            release_date: '1999-10-15',
          }}
        />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('img', { name: 'Fight Club poster' }),
    ).toBeInTheDocument()
  })
})
