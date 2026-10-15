import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MediaRow } from './MediaRow'

afterEach(() => {
  cleanup()
})

describe('MediaRow', () => {
  it('renders the label, title, and children', () => {
    render(
      <MediaRow label="Trending" title="This week">
        <li>Card</li>
      </MediaRow>,
    )

    expect(screen.getByText('Trending')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'This week' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Card')).toBeInTheDocument()
  })

  it('shows an error message when the row fails', () => {
    render(
      <MediaRow label="Trending" title="This week" isError>
        <li>Card</li>
      </MediaRow>,
    )

    expect(screen.getByText("Couldn't load this row.")).toBeInTheDocument()
    expect(screen.queryByText('Card')).not.toBeInTheDocument()
  })
})
