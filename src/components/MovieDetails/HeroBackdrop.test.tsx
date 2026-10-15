import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { HeroBackdrop } from './HeroBackdrop'

afterEach(() => {
  cleanup()
})

describe('HeroBackdrop', () => {
  it('renders a responsive TMDB backdrop with high fetch priority', () => {
    const { container } = render(<HeroBackdrop backdropPath="/b.jpg" />)

    const image = container.querySelector('img')
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w780/b.jpg',
    )
    expect(image).toHaveAttribute(
      'srcSet',
      'https://image.tmdb.org/t/p/w780/b.jpg 780w, https://image.tmdb.org/t/p/w1280/b.jpg 1280w',
    )
    expect(image).toHaveAttribute('sizes', '100vw')
    expect(image).toHaveAttribute('fetchPriority', 'high')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('width', '1280')
    expect(image).toHaveAttribute('height', '720')
  })

  it('falls back to the card background when the image fails', () => {
    const { container } = render(<HeroBackdrop backdropPath="/broken.jpg" />)

    const image = container.querySelector('img')
    expect(image).toBeTruthy()
    if (image) fireEvent.error(image)

    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('.bg-card')).toBeTruthy()
  })

  it('renders the card background when no path or url is provided', () => {
    const { container } = render(<HeroBackdrop backdropPath={null} />)
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('.bg-card')).toBeTruthy()
  })
})
