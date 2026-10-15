import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HeroBackdrop } from './HeroBackdrop'

afterEach(() => {
  cleanup()
})

describe('HeroBackdrop', () => {
  it('renders the backdrop image when a url is provided', () => {
    const { container } = render(
      <HeroBackdrop backdropUrl="https://image.tmdb.org/t/p/original/b.jpg" />,
    )

    const image = container.querySelector('img')
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original/b.jpg',
    )
  })

  it('falls back to the card background when the image fails', () => {
    const { container } = render(
      <HeroBackdrop backdropUrl="https://image.tmdb.org/t/p/original/broken.jpg" />,
    )

    const image = container.querySelector('img')
    expect(image).toBeTruthy()
    if (image) fireEvent.error(image)

    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('.bg-card')).toBeTruthy()
  })

  it('renders the card background when no url is provided', () => {
    const { container } = render(<HeroBackdrop backdropUrl={null} />)
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('.bg-card')).toBeTruthy()
  })
})
