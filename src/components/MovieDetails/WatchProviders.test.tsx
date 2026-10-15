import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { WatchProviders } from './WatchProviders'

afterEach(() => {
  cleanup()
})

describe('WatchProviders', () => {
  it('uses Where to watch as h2 and Stream/Rent/Buy as h3', () => {
    render(
      <WatchProviders
        providers={{
          flatrate: [
            {
              provider_id: 1,
              provider_name: 'Netflix',
              logo_path: '/n.jpg',
              display_priority: 1,
            },
          ],
          rent: [
            {
              provider_id: 2,
              provider_name: 'Apple TV',
              logo_path: '/a.jpg',
              display_priority: 1,
            },
          ],
          buy: [
            {
              provider_id: 3,
              provider_name: 'Amazon',
              logo_path: '/z.jpg',
              display_priority: 1,
            },
          ],
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
  })
})
