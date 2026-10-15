import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PosterCard } from './PosterCard'

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
})
