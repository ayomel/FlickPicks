import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppHeader } from '@/components/AppHeader'
import { Wordmark } from './Wordmark'

describe('Wordmark', () => {
  it('exposes FlickPick as the accessible name', () => {
    render(<Wordmark />)
    expect(screen.getByLabelText('FlickPick')).toBeInTheDocument()
  })
})

describe('AppHeader', () => {
  it('links home with the wordmark instead of plain FlickPick text', () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <AppHeader />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    const home = screen.getByRole('link', { name: 'FlickPick' })
    expect(home).toHaveAttribute('href', '/')
    expect(home).toHaveTextContent('Flick')
    expect(home).toHaveTextContent('Pick')
    expect(home.textContent).toContain('◆')
  })
})
