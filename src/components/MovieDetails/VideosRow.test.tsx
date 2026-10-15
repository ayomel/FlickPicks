import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { VideosRow } from './VideosRow'
import type { MovieDetails } from '@/types/movieDetails'

afterEach(() => {
  cleanup()
})

const movie = {
  id: 603,
  title: 'The Matrix',
  videos: {
    results: [
      {
        id: '1',
        key: 'abc123',
        name: 'Official Trailer',
        site: 'YouTube',
        type: 'Trailer',
        official: true,
        iso_639_1: 'en',
        iso_3166_1: 'US',
        size: 1080,
        published_at: '1999-01-01',
      },
      {
        id: '2',
        key: 'vimeo1',
        name: 'Other',
        site: 'Vimeo',
        type: 'Clip',
        official: false,
        iso_639_1: 'en',
        iso_3166_1: 'US',
        size: 720,
        published_at: '1999-01-01',
      },
    ],
  },
} as MovieDetails

describe('VideosRow', () => {
  it('renders YouTube thumbnails and opens the selected clip', async () => {
    const user = userEvent.setup()
    render(<VideosRow movie={movie} />)

    expect(
      screen.getByRole('heading', { name: 'Trailers & clips' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Play Official Trailer, Trailer, Official',
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Other')).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Play Official Trailer, Trailer, Official',
      }),
    )

    const iframe = await screen.findByTitle('Official Trailer')
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/abc123?autoplay=1&rel=0',
    )
    expect(iframe).toHaveAttribute(
      'referrerPolicy',
      'strict-origin-when-cross-origin',
    )
  })

  it('drops the broken thumbnail and keeps the play control', () => {
    render(<VideosRow movie={movie} />)

    fireEvent.error(screen.getByRole('presentation'))
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Play Official Trailer, Trailer, Official',
      }).querySelector('svg'),
    ).toBeTruthy()
  })
})
