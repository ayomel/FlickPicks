import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MediaRow } from './MediaRow'

afterEach(() => {
  cleanup()
})

describe('MediaRow', () => {
  it('renders the label, title, and children', () => {
    render(
      <MediaRow label="Trending" title="This week">
        <li>
          <a href="/movies/1">Card</a>
        </li>
      </MediaRow>,
    )

    expect(screen.getByText('Trending')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'This week' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Card' })).toBeInTheDocument()
  })

  it('shows an error message when the row fails', () => {
    render(
      <MediaRow label="Trending" title="This week" isError>
        <li>
          <a href="/movies/1">Card</a>
        </li>
      </MediaRow>,
    )

    expect(screen.getByText("Couldn't load this row.")).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Card' })).not.toBeInTheDocument()
  })

  it('shows an empty message and can hide the heading', () => {
    render(
      <MediaRow
        label="Trending"
        title="This week"
        isEmpty
        emptyMessage="No trending movies right now."
        showHeading={false}
      >
        {null}
      </MediaRow>,
    )

    expect(
      screen.getByText('No trending movies right now.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'This week' }),
    ).not.toBeInTheDocument()
  })

  it('exposes a skip link and scroll controls', async () => {
    const user = userEvent.setup()
    const scrollBy = vi.fn()

    render(
      <MediaRow label="Trending" title="This week">
        <li>
          <a href="/movies/1">One</a>
        </li>
        <li>
          <a href="/movies/2">Two</a>
        </li>
      </MediaRow>,
    )

    const list = screen.getByRole('list', { name: 'This week' })
    Object.defineProperty(list, 'scrollBy', { value: scrollBy })
    Object.defineProperty(list, 'clientWidth', { value: 400 })

    expect(
      screen.getByRole('link', { name: 'Skip This week' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Scroll This week right' }),
    )
    expect(scrollBy).toHaveBeenCalled()
  })
})
