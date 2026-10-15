import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MobileTabBar } from './MobileTabBar'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const renderBar = (initialEntry = '/') => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div id="watchlist">Watchlist target</div>
                <MobileTabBar />
              </div>
            }
          />
          <Route path="/movies/:id" element={<MobileTabBar />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('MobileTabBar', () => {
  it('renders Home, Search, and Watchlist tabs', () => {
    renderBar()

    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Watchlist' }),
    ).toBeInTheDocument()
  })

  it('opens the search panel from the Search tab', async () => {
    const user = userEvent.setup()
    renderBar()

    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(
      screen.getByRole('dialog', { name: 'Search movies' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveFocus()
  })

  it('marks Home as the current page on /', () => {
    renderBar('/')
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('scrolls to the watchlist anchor when Watchlist is pressed', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.fn()
    renderBar('/#watchlist')

    const target = document.getElementById('watchlist')
    expect(target).toBeTruthy()
    if (target) {
      target.scrollIntoView = scrollIntoView
    }

    await user.click(screen.getByRole('button', { name: 'Watchlist' }))
    expect(scrollIntoView).toHaveBeenCalled()
  })
})
