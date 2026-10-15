import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { TrailerPlayer } from './TrailerPlayer'
import type { MovieDetails } from '@/types/movieDetails'

afterEach(() => {
  cleanup()
})

const movie = {
  id: 603,
  title: 'The Matrix',
  trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
  videos: { results: [] },
} as MovieDetails

describe('TrailerPlayer', () => {
  it('opens a youtube-nocookie embed only after Play trailer is pressed', async () => {
    const user = userEvent.setup()
    render(<TrailerPlayer movie={movie} />)

    expect(screen.queryByTitle('The Matrix trailer')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Play trailer' }))

    const iframe = await screen.findByTitle('The Matrix trailer')
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/vKQi3bBA1y8?autoplay=1&rel=0',
    )
    expect(iframe).toHaveAttribute(
      'referrerPolicy',
      'strict-origin-when-cross-origin',
    )
    expect(
      screen.getByText('Press Esc or Close to exit'),
    ).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<TrailerPlayer movie={movie} />)

    await user.click(screen.getByRole('button', { name: 'Play trailer' }))
    expect(await screen.findByTitle('The Matrix trailer')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByTitle('The Matrix trailer')).not.toBeInTheDocument()
  })
})
