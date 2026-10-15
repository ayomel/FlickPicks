import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MediaRow } from './MediaRow'

afterEach(() => {
  cleanup()
})

const sampleItems = [
  { id: 1, label: 'One' },
  { id: 2, label: 'Two' },
]

describe('MediaRow', () => {
  it('renders the label, title, and items', () => {
    render(
      <MediaRow
        label="Trending"
        title="This week"
        items={sampleItems}
        getKey={(item) => item.id}
        renderItem={(item, { tabIndex }) => (
          <a href={`/movies/${item.id}`} tabIndex={tabIndex}>
            {item.label}
          </a>
        )}
      />,
    )

    expect(screen.getByText('Trending')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'This week' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'One' })).toBeInTheDocument()
  })

  it('shows an error message when the row fails', () => {
    render(
      <MediaRow
        label="Trending"
        title="This week"
        items={sampleItems}
        getKey={(item) => item.id}
        isError
        renderItem={(item) => <a href={`/movies/${item.id}`}>{item.label}</a>}
      />,
    )

    expect(screen.getByText("Couldn't load this row.")).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'One' })).not.toBeInTheDocument()
  })

  it('shows an empty message and can hide the heading', () => {
    render(
      <MediaRow
        label="Trending"
        title="This week"
        items={[]}
        getKey={(item: { id: number }) => item.id}
        emptyMessage="No trending movies right now."
        showHeading={false}
        renderItem={() => null}
      />,
    )

    expect(
      screen.getByText('No trending movies right now.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'This week' }),
    ).not.toBeInTheDocument()
  })

  it('exposes a skip link and mouse-only scroll controls at the ends', async () => {
    const user = userEvent.setup()
    const scrollBy = vi.fn()

    render(
      <MediaRow
        label="Trending"
        title="This week"
        items={sampleItems}
        getKey={(item) => item.id}
        renderItem={(item, { tabIndex }) => (
          <a href={`/movies/${item.id}`} tabIndex={tabIndex}>
            {item.label}
          </a>
        )}
      />,
    )

    const list = screen.getByRole('list', { name: 'This week' })
    Object.defineProperty(list, 'scrollBy', {
      value: scrollBy,
      configurable: true,
    })
    Object.defineProperty(list, 'clientWidth', {
      value: 400,
      configurable: true,
    })
    Object.defineProperty(list, 'scrollWidth', {
      value: 1200,
      configurable: true,
    })
    Object.defineProperty(list, 'scrollLeft', {
      value: 0,
      configurable: true,
      writable: true,
    })
    list.dispatchEvent(new Event('scroll'))

    expect(
      screen.getByRole('link', { name: 'Skip This week' }),
    ).toBeInTheDocument()

    const right = await screen.findByRole('button', {
      name: 'Scroll This week right',
    })
    expect(
      screen.queryByRole('button', { name: 'Scroll This week left' }),
    ).not.toBeInTheDocument()
    expect(right).toHaveAttribute('tabindex', '-1')

    await user.click(right)
    expect(scrollBy).toHaveBeenCalled()
  })
})
