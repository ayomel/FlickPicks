import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { WatchProviders } from './WatchProviders'

afterEach(() => {
  cleanup()
})

const netflix = {
  provider_id: 1,
  provider_name: 'Netflix',
  logo_path: '/n.jpg',
  display_priority: 1,
}

const apple = {
  provider_id: 2,
  provider_name: 'Apple TV',
  logo_path: '/a.jpg',
  display_priority: 1,
}

const amazon = {
  provider_id: 3,
  provider_name: 'Amazon',
  logo_path: '/z.jpg',
  display_priority: 1,
}

describe('WatchProviders', () => {
  it('uses Where to watch as h2 and Stream/Rent/Buy as h3 with JustWatch and TMDB credit', () => {
    render(
      <WatchProviders
        providers={{
          link: 'https://www.themoviedb.org/movie/603/watch?locale=US',
          flatrate: [netflix],
          rent: [apple],
          buy: [amazon],
        }}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Where to watch' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Stream' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Rent' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Buy' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/US availability via JustWatch/),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'TMDB' })).toHaveAttribute(
      'href',
      'https://www.themoviedb.org/movie/603/watch?locale=US',
    )
  })

  it('shows an empty-state card when no US providers are listed', () => {
    render(<WatchProviders providers={{ flatrate: [], rent: [], buy: [] }} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Where to watch' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('No streaming options listed yet.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/US availability via JustWatch · TMDB/),
    ).toBeInTheDocument()
  })

  it('dedupes provider ids within a group', () => {
    render(
      <WatchProviders
        providers={{
          flatrate: [netflix, { ...netflix, logo_path: '/dup.jpg' }],
        }}
      />,
    )

    const stream = screen.getByRole('heading', { name: 'Stream' }).parentElement
    expect(stream).toBeTruthy()
    expect(within(stream!).getAllByRole('listitem')).toHaveLength(1)
  })

  it('falls back to initials when a provider logo fails', () => {
    render(
      <WatchProviders
        providers={{
          flatrate: [apple],
        }}
      />,
    )

    const logo = screen.getByRole('img', { name: 'Apple TV' })
    expect(logo).toHaveAttribute('loading', 'lazy')
    expect(logo).toHaveAttribute('decoding', 'async')
    expect(logo).toHaveAttribute('width', '92')
    expect(logo).toHaveAttribute('height', '92')

    fireEvent.error(logo)

    expect(document.querySelector('img')).toBeNull()
    expect(screen.getByRole('img', { name: 'Apple TV' })).toHaveTextContent(
      'AT',
    )
  })
})
